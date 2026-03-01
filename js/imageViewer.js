// Gère le zoom sur les images et la sécurité des images cassées.

document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll('.card-img');
    images.forEach(img => {
        if (!img.getAttribute('src') || img.getAttribute('src') === "") {
            img.remove();
        }
        img.onerror = function() {
            this.src = "documents/photo-par-defaut.jpg";
            this.onerror = null;
        };
    });
});

document.addEventListener('click', function (e) {
    if (e.target.tagName === 'IMG') {
        if (e.target.id === 'full-image') return;
        const viewer = document.getElementById('image-viewer');
        const fullImg = document.getElementById('full-image');
        if (viewer && fullImg) {
            fullImg.src = e.target.src;
            viewer.style.display = 'flex';
        }
    }
});

document.getElementById('image-viewer')?.addEventListener('click', function() {
    this.style.display = 'none';
});