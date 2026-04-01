// Gère la barre de progression selon les positions Web/Mobile que tu as définies.

/* VERTICAL */
const positionsMobile = { 
    'header': 0, 
    'tokyo1': 11, 
    'osaka': 30.5, 
    'okinawa': 50.5, 
    'tokyo2': 70, 
    'france': 100 
};

/* HORIZONTAL */
const positionsMobileHorizontal = { 
    'header': 0, 
    'tokyo1': 11.5, 
    'osaka': 31.5, 
    'okinawa': 50.5, 
    'tokyo2': 70, 
    'france': 100
};

/* DESKTOP */
const positionsWeb = { 
    'header': 0, 
    'tokyo1': 27, 
    'osaka': 38.5, 
    'okinawa': 50, 
    'tokyo2': 62, 
    'france': 100
};

function updateProgress(id) {
    const progressBar = document.getElementById('progress-bar');
    if (!progressBar) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    let positions = (width <= 600) ? positionsMobile : (width <= 950 && width > height) ? positionsMobileHorizontal : positionsWeb;
    const pourcentage = positions[id];
    if (pourcentage !== undefined) {
        progressBar.style.width = pourcentage + '%';
        progressBar.classList.toggle('show-glow', pourcentage > 0 && pourcentage < 100);
    }
}

window.addEventListener('resize', () => {
    const activeLink = document.querySelector('.main-nav a.active');
    const currentId = activeLink ? activeLink.getAttribute('href').replace('#', '') : 'header';
    updateProgress(currentId);
});