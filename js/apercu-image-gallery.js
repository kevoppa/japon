        (function () {
            const gallery = document.getElementById('restaurant-gallery');
            const viewer = document.getElementById('restaurant-image-viewer');
            const fullImage = document.getElementById('restaurant-image-full');
            const btnPrev = document.getElementById('restaurant-image-prev');
            const btnNext = document.getElementById('restaurant-image-next');
            const btnClose = document.getElementById('restaurant-image-close');
            const zoneLeft = document.getElementById('restaurant-image-zone-left');
            const zoneRight = document.getElementById('restaurant-image-zone-right');
            if (!gallery || !viewer || !fullImage) return;

            const images = Array.from(gallery.querySelectorAll('img'));
            if (!images.length) return;

            let currentIndex = 0;

            function renderImage() {
                const img = images[currentIndex];
                fullImage.src = img.src;
                fullImage.alt = img.alt || 'Aperçu image restaurant';
            }

            function setHoverSide(side) {
                viewer.classList.remove('is-hover-left', 'is-hover-right');
                if (side === 'left') viewer.classList.add('is-hover-left');
                if (side === 'right') viewer.classList.add('is-hover-right');
            }

            function openViewer(index) {
                currentIndex = index;
                renderImage();
                viewer.classList.add('is-open');
                viewer.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
                setHoverSide('');
            }

            function closeViewer() {
                viewer.classList.remove('is-open');
                viewer.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
                setHoverSide('');
            }

            function showPrev() {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                renderImage();
            }

            function showNext() {
                currentIndex = (currentIndex + 1) % images.length;
                renderImage();
            }

            images.forEach((img, index) => {
                img.addEventListener('click', () => openViewer(index));
            });

            btnPrev?.addEventListener('click', (e) => {
                e.stopPropagation();
                showPrev();
            });

            btnNext?.addEventListener('click', (e) => {
                e.stopPropagation();
                showNext();
            });

            zoneLeft?.addEventListener('click', (e) => {
                e.stopPropagation();
                showPrev();
            });

            zoneRight?.addEventListener('click', (e) => {
                e.stopPropagation();
                showNext();
            });

            zoneLeft?.addEventListener('mouseenter', () => setHoverSide('left'));
            zoneLeft?.addEventListener('mouseleave', () => setHoverSide(''));
            zoneRight?.addEventListener('mouseenter', () => setHoverSide('right'));
            zoneRight?.addEventListener('mouseleave', () => setHoverSide(''));

            fullImage.addEventListener('click', (e) => {
                e.stopPropagation();
                const rect = fullImage.getBoundingClientRect();
                const x = e.clientX - rect.left;
                if (x < rect.width / 2) {
                    showPrev();
                } else {
                    showNext();
                }
            });

            fullImage.addEventListener('mousemove', (e) => {
                const rect = fullImage.getBoundingClientRect();
                const x = e.clientX - rect.left;
                if (x < rect.width / 2) {
                    setHoverSide('left');
                } else {
                    setHoverSide('right');
                }
            });

            fullImage.addEventListener('mouseleave', () => setHoverSide(''));

            btnClose?.addEventListener('click', (e) => {
                e.stopPropagation();
                closeViewer();
            });

            viewer.addEventListener('click', (e) => {
                if (e.target === viewer) closeViewer();
            });

            document.addEventListener('keydown', (e) => {
                if (!viewer.classList.contains('is-open')) return;
                if (e.key === 'Escape') closeViewer();
                if (e.key === 'ArrowLeft') showPrev();
                if (e.key === 'ArrowRight') showNext();
            });
        })();