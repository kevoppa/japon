// Gère le mode sombre/clair et la persistance dans le navigateur.

function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    const isDark = body.getAttribute('data-theme') === 'dark';
    
    if (isDark) {
        body.removeAttribute('data-theme');
        if(icon) icon.innerText = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        if(icon) icon.innerText = '☀️';
        localStorage.setItem('theme', 'dark');
    }
}

(function() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
    }
    window.addEventListener('DOMContentLoaded', () => {
        const icon = document.getElementById('theme-icon');
        if (icon) {
            icon.innerText = (savedTheme === 'dark') ? '☀️' : '🌙';
        }
    });
})();