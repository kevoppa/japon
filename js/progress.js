// Gère la barre de progression selon les positions Web/Mobile que tu as définies.

const positionsMobile = { 
    'header': 0, 
    'tokyo1': 11, 
    'osaka': 31, 
    'okinawa': 51, 
    'tokyo2': 70, 
    'france': 100 
};

const positionsMobileHorizontal = { 
    'header': 0, 
    'tokyo1': 12, 
    'osaka': 32, 
    'okinawa': 51, 
    'tokyo2': 71, 
    'france': 100
};

const positionsWeb = { 
    'header': 0, 
    'tokyo1': 28, 
    'osaka': 39, 
    'okinawa': 51, 
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
    }
}

window.addEventListener('resize', () => {
    const activeLink = document.querySelector('.main-nav a.active');
    const currentId = activeLink ? activeLink.getAttribute('href').replace('#', '') : 'header';
    updateProgress(currentId);
});