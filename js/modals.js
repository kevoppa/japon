// La fonction d'ouverture
function openModal(id) {
    const contentArea = document.getElementById('modal-content-area');
    const titleArea = document.getElementById('modal-title-placeholder');
    const overlay = document.getElementById('modal-overlay');
    const modalBox = document.getElementById('modal-box');
    
    // On va chercher dans l'objet global window.modalData
    const data = window.modalData && window.modalData[id];

    if (data) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = data;
        const titleElement = tempDiv.querySelector('h3');
        
        if (titleElement) {
            titleArea.innerHTML = `<h3 style="margin:0; color:var(--accent-blue);">${titleElement.innerHTML}</h3>`;
            titleElement.remove();
        } else {
            titleArea.innerHTML = "";
        }
        
        contentArea.innerHTML = tempDiv.innerHTML;
        overlay.style.display = 'block';
        modalBox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    document.getElementById('modal-overlay').style.display = 'none';
    document.getElementById('modal-box').style.display = 'none';
    document.body.style.overflow = 'auto';
}