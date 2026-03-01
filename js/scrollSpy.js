// Gère la détection de la section active pour la navigation et la mise à jour de la progression.

window.addEventListener('DOMContentLoaded', () => {
    const headerEl = document.querySelector('header');
    if (headerEl) headerEl.id = 'header';

    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                document.querySelectorAll('.main-nav a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
                if (typeof updateProgress === "function") updateProgress(id);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section[id], header').forEach(el => observer.observe(el));
});