from __future__ import annotations

import datetime as dt
import json
import math
import re
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE_XLSX = ROOT / "0-fichiers-sensibles" / "Budget_Voyage_Japon_2025 - 5 personnes.xlsx"
OUTPUT_JS = ROOT / "js" / "data" / "budget-voyage-japon-data.js"

NS = {
    "main": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    "rel": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    "pkgrel": "http://schemas.openxmlformats.org/package/2006/relationships",
}

BUILTIN_DATE_FORMAT_IDS = {
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    27,
    30,
    36,
    45,
    46,
    47,
    50,
    57,
}


def col_to_index(col: str) -> int:
    value = 0
    for char in col:
        value = value * 26 + (ord(char.upper()) - 64)
    return value


def index_to_col(index: int) -> str:
    chars: list[str] = []
    while index > 0:
        index, rem = divmod(index - 1, 26)
        chars.append(chr(65 + rem))
    return "".join(reversed(chars))


def split_cell_ref(ref: str) -> tuple[int, int]:
    match = re.fullmatch(r"([A-Z]+)(\d+)", ref)
    if not match:
        raise ValueError(f"Invalid cell reference: {ref}")
    col, row = match.groups()
    return int(row), col_to_index(col)


def normalize_color(color: dict[str, str] | None) -> str | None:
    if not color:
        return None

    rgb = color.get("rgb")
    if rgb:
        if len(rgb) == 8:
            rgb = rgb[2:]
        return f"#{rgb.upper()}"

    return None


def escape_html(value: str) -> str:
    return (
        value.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def escape_attr(value: str) -> str:
    return escape_html(value).replace("'", "&#39;")


def excel_date_to_string(serial: float) -> str:
    base = dt.datetime(1899, 12, 30)
    value = base + dt.timedelta(days=serial)
    if value.time() == dt.time.min:
        return value.strftime("%d/%m/%Y")
    return value.strftime("%d/%m/%Y %H:%M")


def format_number(value: float, fmt_code: str | None) -> str:
    if fmt_code and "€" in fmt_code:
        decimals = 2 if re.search(r"[.,]0{2}", fmt_code) else 0
        rendered = f"{value:,.{decimals}f}"
        rendered = rendered.replace(",", " ").replace(".", ",")
        return f"{rendered} €"

    if math.isclose(value, round(value)):
        return str(int(round(value)))

    rendered = f"{value:,.2f}".replace(",", " ").replace(".", ",")
    return rendered.rstrip("0").rstrip(",")


def load_shared_strings(archive: zipfile.ZipFile) -> list[str]:
    if "xl/sharedStrings.xml" not in archive.namelist():
        return []

    root = ET.fromstring(archive.read("xl/sharedStrings.xml"))
    strings: list[str] = []
    for item in root.findall("main:si", NS):
        texts = [node.text or "" for node in item.iterfind(".//main:t", NS)]
        strings.append("".join(texts))
    return strings


def parse_styles(archive: zipfile.ZipFile) -> tuple[list[dict[str, object]], dict[int, str]]:
    root = ET.fromstring(archive.read("xl/styles.xml"))

    custom_num_formats: dict[int, str] = {}
    num_formats = root.find("main:numFmts", NS)
    if num_formats is not None:
        for fmt in num_formats:
            custom_num_formats[int(fmt.attrib["numFmtId"])] = fmt.attrib["formatCode"]

    fonts: list[dict[str, object]] = []
    for font in root.find("main:fonts", NS):
        size_node = font.find("main:sz", NS)
        color_node = font.find("main:color", NS)
        fonts.append(
            {
                "bold": font.find("main:b", NS) is not None,
                "italic": font.find("main:i", NS) is not None,
                "size": size_node.attrib.get("val") if size_node is not None else None,
                "color": normalize_color(color_node.attrib if color_node is not None else None),
            }
        )

    fills: list[dict[str, object]] = []
    for fill in root.find("main:fills", NS):
        pattern_fill = fill.find("main:patternFill", NS)
        attrib = pattern_fill.attrib if pattern_fill is not None else {}
        fg = pattern_fill.find("main:fgColor", NS) if pattern_fill is not None else None
        fills.append(
            {
                "pattern": attrib.get("patternType"),
                "fg": normalize_color(fg.attrib if fg is not None else None),
            }
        )

    cell_styles: list[dict[str, object]] = []
    for xf in root.find("main:cellXfs", NS):
        alignment = xf.find("main:alignment", NS)
        cell_styles.append(
            {
                "num_fmt_id": int(xf.attrib.get("numFmtId", "0")),
                "font": fonts[int(xf.attrib.get("fontId", "0"))],
                "fill": fills[int(xf.attrib.get("fillId", "0"))],
                "alignment": alignment.attrib if alignment is not None else {},
            }
        )

    return cell_styles, custom_num_formats


def build_inline_style(cell_style: dict[str, object], is_numeric: bool) -> str:
    styles: list[str] = []
    font = cell_style["font"]
    fill = cell_style["fill"]
    alignment = cell_style["alignment"]

    if font["bold"]:
        styles.append("font-weight:700")
    if font["italic"]:
        styles.append("font-style:italic")
    if font["size"]:
        styles.append(f"font-size:{font['size']}pt")
    if font["color"]:
        styles.append(f"color:{font['color']}")

    if fill["pattern"] == "solid" and fill["fg"]:
        styles.append(f"background:{fill['fg']}")

    if alignment.get("horizontal"):
        styles.append(f"text-align:{alignment['horizontal']}")
    elif is_numeric:
        styles.append("text-align:right")

    if alignment.get("vertical"):
        styles.append(f"vertical-align:{alignment['vertical']}")
    if alignment.get("wrapText") == "1":
        styles.append("white-space:pre-wrap")

    return ";".join(styles)


def render_cell_content(value: str, href: str | None) -> str:
    if not value and not href:
        return ""

    if href:
        label = escape_html(value or href)
        safe_href = escape_attr(href)
        return f'<a href="{safe_href}" target="_blank" rel="noreferrer noopener">{label}</a>'

    if value.startswith("http://") or value.startswith("https://"):
        safe_href = escape_attr(value)
        return f'<a href="{safe_href}" target="_blank" rel="noreferrer noopener">{escape_html(value)}</a>'

    return escape_html(value)


def render_sheet_html(
    name: str,
    max_row: int,
    max_col: int,
    cells: dict[tuple[int, int], dict[str, object]],
    merges: list[dict[str, int]],
) -> str:
    covered: set[tuple[int, int]] = set()
    merge_map: dict[tuple[int, int], dict[str, int]] = {}

    for merge in merges:
        start = (merge["start_row"], merge["start_col"])
        merge_map[start] = merge
        for row in range(merge["start_row"], merge["end_row"] + 1):
            for col in range(merge["start_col"], merge["end_col"] + 1):
                if (row, col) != start:
                    covered.add((row, col))

    parts: list[str] = []
    parts.append('<div class="budget-sheet-frame">')
    parts.append('<div class="budget-grid-scroll">')
    parts.append('<table class="budget-grid" aria-label="Feuille {}">'.format(escape_attr(name)))
    parts.append("<thead>")
    parts.append("<tr>")
    parts.append('<th class="budget-corner"></th>')
    for col in range(1, max_col + 1):
        parts.append(f'<th class="budget-col-head">{index_to_col(col)}</th>')
    parts.append("</tr>")
    parts.append("</thead>")
    parts.append("<tbody>")

    for row in range(1, max_row + 1):
        parts.append("<tr>")
        parts.append(f'<th class="budget-row-head">{row}</th>')
        for col in range(1, max_col + 1):
            key = (row, col)
            if key in covered:
                continue

            cell = cells.get(key)
            attrs: list[str] = []
            classes = ["budget-cell"]
            if not cell or (cell["value"] == "" and not cell["href"]):
                classes.append("is-empty")

            merge = merge_map.get(key)
            if merge:
                colspan = merge["end_col"] - merge["start_col"] + 1
                rowspan = merge["end_row"] - merge["start_row"] + 1
                if colspan > 1:
                    attrs.append(f'colspan="{colspan}"')
                if rowspan > 1:
                    attrs.append(f'rowspan="{rowspan}"')

            if cell and cell["style"]:
                attrs.append(f'style="{escape_attr(cell["style"])}"')

            attrs.append(f'class="{" ".join(classes)}"')
            content = render_cell_content(cell["value"], cell["href"]) if cell else ""
            parts.append(f"<td {' '.join(attrs)}>{content}</td>")

        parts.append("</tr>")

    parts.append("</tbody></table></div></div>")
    return "".join(parts)


def main() -> None:
    with zipfile.ZipFile(SOURCE_XLSX) as archive:
        shared_strings = load_shared_strings(archive)
        cell_styles, custom_num_formats = parse_styles(archive)

        workbook_root = ET.fromstring(archive.read("xl/workbook.xml"))
        workbook_rels = ET.fromstring(archive.read("xl/_rels/workbook.xml.rels"))
        rel_map = {
            rel.attrib["Id"]: f"xl/{rel.attrib['Target']}"
            for rel in workbook_rels.findall("pkgrel:Relationship", NS)
        }

        sheets_output: list[dict[str, object]] = []

        for sheet in workbook_root.find("main:sheets", NS):
            sheet_name = sheet.attrib["name"]
            relation_id = sheet.attrib["{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id"]
            sheet_path = rel_map[relation_id]

            root = ET.fromstring(archive.read(sheet_path))

            hyperlinks: dict[str, str] = {}
            rel_path = sheet_path.replace("xl/", "xl/worksheets/_rels/") + ".rels"
            if rel_path in archive.namelist():
                rel_root = ET.fromstring(archive.read(rel_path))
                sheet_rel_map = {
                    rel.attrib["Id"]: rel.attrib.get("Target", "")
                    for rel in rel_root.findall("pkgrel:Relationship", NS)
                }
                hyperlink_nodes = root.find("main:hyperlinks", NS)
                if hyperlink_nodes is not None:
                    for link in hyperlink_nodes:
                        cell_ref = link.attrib.get("ref")
                        rel_id = link.attrib.get("{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id")
                        if cell_ref and rel_id and rel_id in sheet_rel_map:
                            hyperlinks[cell_ref] = sheet_rel_map[rel_id]

            merges: list[dict[str, int]] = []
            merge_nodes = root.find("main:mergeCells", NS)
            if merge_nodes is not None:
                for merge in merge_nodes:
                    start_ref, end_ref = merge.attrib["ref"].split(":")
                    start_row, start_col = split_cell_ref(start_ref)
                    end_row, end_col = split_cell_ref(end_ref)
                    merges.append(
                        {
                            "start_row": start_row,
                            "start_col": start_col,
                            "end_row": end_row,
                            "end_col": end_col,
                        }
                    )

            max_row = 0
            max_col = 0
            cells: dict[tuple[int, int], dict[str, object]] = {}

            for row in root.find("main:sheetData", NS):
                row_index = int(row.attrib["r"])
                max_row = max(max_row, row_index)

                for cell in row.findall("main:c", NS):
                    ref = cell.attrib["r"]
                    row_idx, col_idx = split_cell_ref(ref)
                    max_col = max(max_col, col_idx)

                    cell_type = cell.attrib.get("t")
                    style_index = int(cell.attrib.get("s", "0"))
                    style_meta = cell_styles[style_index]
                    num_fmt_id = style_meta["num_fmt_id"]
                    num_fmt = custom_num_formats.get(num_fmt_id)

                    value = ""
                    formula = cell.find("main:f", NS)
                    raw_value = cell.find("main:v", NS)
                    inline_str = cell.find("main:is", NS)

                    if cell_type == "s" and raw_value is not None:
                        value = shared_strings[int(raw_value.text)]
                    elif cell_type == "inlineStr" and inline_str is not None:
                        value = "".join(node.text or "" for node in inline_str.iterfind(".//main:t", NS))
                    elif cell_type == "b" and raw_value is not None:
                        value = "Oui" if raw_value.text == "1" else "Non"
                    elif raw_value is not None and raw_value.text is not None:
                        raw = raw_value.text
                        try:
                            numeric_raw = float(raw)
                        except ValueError:
                            numeric_raw = None

                        if numeric_raw is not None and num_fmt_id in BUILTIN_DATE_FORMAT_IDS:
                            value = excel_date_to_string(numeric_raw)
                        elif numeric_raw is not None and num_fmt and ("d" in num_fmt.lower() or "m" in num_fmt.lower() or "y" in num_fmt.lower()):
                            value = excel_date_to_string(numeric_raw)
                        elif numeric_raw is not None:
                            try:
                                value = format_number(numeric_raw, num_fmt)
                            except ValueError:
                                value = raw
                        else:
                            value = raw
                    elif formula is not None:
                        value = formula.text or ""

                    href = hyperlinks.get(ref)
                    is_numeric = bool(raw_value is not None and not cell_type)
                    style_string = build_inline_style(style_meta, is_numeric)

                    cells[(row_idx, col_idx)] = {
                        "value": value,
                        "href": href,
                        "style": style_string,
                    }

            for merge in merges:
                max_row = max(max_row, merge["end_row"])
                max_col = max(max_col, merge["end_col"])

            sheets_output.append(
                {
                    "name": sheet_name,
                    "html": render_sheet_html(sheet_name, max_row, max_col, cells, merges),
                }
            )

    payload = {
        "workbookName": SOURCE_XLSX.name,
        "sourcePath": "0-fichiers-sensibles/Budget_Voyage_Japon_2025 - 5 personnes.xlsx",
        "updatedAt": dt.datetime.now().strftime("%d/%m/%Y %H:%M"),
        "sheets": sheets_output,
    }

    OUTPUT_JS.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_JS.write_text(
        "window.BUDGET_WORKBOOK_DATA = " + json.dumps(payload, ensure_ascii=False) + ";",
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
