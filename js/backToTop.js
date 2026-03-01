// Le bouton de remontée.

window.addEventListener('scroll', () => {
    const btn = document.getElementById('back-to-top');
    if (btn) {
        btn.style.display = (window.scrollY > 400) ? 'block' : 'none';
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}