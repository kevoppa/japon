// Gere le mode sombre/clair et la persistance entre les pages.

const THEME_STORAGE_KEY = 'japon2026-theme';

function getCurrentTheme() {
    const urlTheme = new URLSearchParams(window.location.search).get('theme');
    if (urlTheme === 'dark' || urlTheme === 'light') {
        return urlTheme;
    }

    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
    }

    return 'light';
}

function setCurrentPageThemeParam(theme) {
    const url = new URL(window.location.href);
    url.searchParams.set('theme', theme);
    window.history.replaceState({}, '', url);
}

function applyTheme(theme) {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    const text = document.querySelector('#theme-toggle .theme-text');
    const button = document.getElementById('theme-toggle');

    if (theme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        if (icon) icon.innerText = '\u2600\uFE0F';
        if (text) text.innerText = 'Mode Jour';
        if (button) button.setAttribute('aria-label', 'Activer le mode jour');
    } else {
        body.removeAttribute('data-theme');
        if (icon) icon.innerText = '\uD83C\uDF19';
        if (text) text.innerText = 'Mode Nuit';
        if (button) button.setAttribute('aria-label', 'Activer le mode nuit');
    }

    localStorage.setItem(THEME_STORAGE_KEY, theme);
    setCurrentPageThemeParam(theme);
    syncThemeLinks(theme);
}

function syncThemeLinks(theme) {
    document.querySelectorAll('a[href$=".html"], a[href*=".html?"]').forEach((link) => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('http://') || href.startsWith('https://') || href.startsWith('#')) {
            return;
        }

        const [pathWithQuery, hash = ''] = href.split('#');
        const [pathPart, queryString = ''] = pathWithQuery.split('?');
        const params = new URLSearchParams(queryString);

        params.set('theme', theme);

        const query = params.toString();
        const nextHref = `${pathPart}${query ? `?${query}` : ''}${hash ? `#${hash}` : ''}`;
        link.setAttribute('href', nextHref);
    });
}

function toggleTheme() {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    applyTheme(isDark ? 'light' : 'dark');
}

function toggleSiteMenu() {
    const menu = document.querySelector('.site-menu');
    const toggle = document.querySelector('.site-menu__toggle');
    const container = document.querySelector('.site-menu__container');

    if (!menu || !toggle) {
        return;
    }

    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

    if (isOpen && container) {
        container.scrollTop = 0;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    applyTheme(getCurrentTheme());

    document.querySelectorAll('.site-menu__link, .site-menu__summary-link').forEach((link) => {
        link.addEventListener('click', () => {
            const menu = document.querySelector('.site-menu');
            const toggle = document.querySelector('.site-menu__toggle');

            if (!menu || !toggle) {
                return;
            }

            menu.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
});

window.addEventListener('storage', (event) => {
    if (event.key !== THEME_STORAGE_KEY) {
        return;
    }

    applyTheme(event.newValue === 'dark' ? 'dark' : 'light');
});
