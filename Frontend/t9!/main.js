document.addEventListener('DOMContentLoaded', () => {
    // Footer year
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Data
    const carouselImages = [
        { id: 1, src: 'assets/aqaba.jpg', name: 'Aqaba', info: 'Red Sea reefs, crystal waters, and world-class diving.' },
        { id: 2, src: 'assets/alexandria.jpg', name: 'Alexandria', info: 'Mediterranean gem with rich Greco‑Roman heritage.' },
        { id: 3, src: 'assets/antalya.jpg', name: 'Antalya', info: 'Turkish Riviera beaches and ancient ruins.' },
        { id: 4, src: 'assets/cyprus.jpg', name: 'Cyprus', info: 'Island of history, beaches, and great cuisine.' },
        { id: 5, src: 'assets/bulgaria.jpg', name: 'Bulgaria', info: 'Mountains, Black Sea coast, and culture.' },
    ];

    const testimonials = [
        { id: 1, name: 'Sara', rating: 5, text: 'Amazing experience! Will book again.' },
        { id: 2, name: 'Ali', rating: 5, text: 'Perfectly organized family trip to Petra.' },
        { id: 3, name: 'Mohammed', rating: 4, text: 'Great service and hotel recommendations.' },
        { id: 4, name: 'Ahmed', rating: 5, text: 'Dead Sea tour was incredible with a great guide.' },
        { id: 5, name: 'Basel', rating: 4, text: 'Professional service and balanced itinerary.' },
        { id: 6, name: 'Salam', rating: 5, text: 'Saved money on flights. Exceptional support.' },
    ];

    // State
    let activeSlide = 0;
    let isTransitioning = false;
    let currentTestimonialIndex = 0;
    let carouselTimer = null;

    // Init carousel backgrounds and cards
    function initCarousel() {
        const container = document.querySelector('.carousel-container');
        const info = document.querySelector('.location-info');
        const strip = document.querySelector('.stacked-carousel.horizontal');
        if (!container || !info || !strip) return;

        // Backgrounds
        carouselImages.forEach((img, i) => {
            const bg = document.createElement('div');
            bg.className = `full-slide-background ${i === activeSlide ? 'active' : ''}`;
            bg.style.backgroundImage = `url(${img.src})`;
            bg.style.opacity = i === activeSlide ? 1 : 0;
            container.insertBefore(bg, info);
        });

        // Cards
        carouselImages.forEach((image, index) => {
            const card = document.createElement('div');
            const pos = (index - activeSlide + carouselImages.length) % carouselImages.length;
            card.className = `carousel-card ${pos === 0 ? 'active' : ''}`;
            card.style.transform = `translateX(${pos * 80 - 20}px) scale(${pos === 0 ? 1 : 0.85 - pos * 0.05})`;
            card.style.opacity = pos > 4 ? 0 : 1 - pos * 0.2;
            card.style.zIndex = carouselImages.length - pos;

            const imgEl = document.createElement('img');
            imgEl.src = image.src;
            imgEl.alt = image.name;
            card.appendChild(imgEl);

            card.addEventListener('click', () => {
                if (pos !== 0) {
                    setTransition(true);
                    setTimeout(() => { updateCarousel(index); setTransition(false); }, 550);
                }
            });

            strip.insertBefore(card, document.querySelector('.carousel-controls'));
        });

        updateLocationInfo();
        startAutoSlide();
    }

    function updateLocationInfo() {
        const info = document.querySelector('.location-info');
        if (!info) return;
        const h2 = info.querySelector('h2');
        const p = info.querySelector('p');
        info.classList.remove('active');
        setTimeout(() => {
            if (h2) h2.textContent = carouselImages[activeSlide].name;
            if (p) p.textContent = carouselImages[activeSlide].info;
            info.classList.add('active');
        }, 250);
    }

    function updateCarousel(newIndex) {
        const bgs = document.querySelectorAll('.full-slide-background');
        const cards = document.querySelectorAll('.carousel-card');
        if (!bgs.length || !cards.length) return;

        bgs.forEach((bg, i) => {
            if (i === newIndex) { bg.classList.add('active'); bg.style.opacity = 1; }
            else { bg.classList.remove('active'); bg.style.opacity = 0; }
        });

        activeSlide = newIndex;
        cards.forEach((card, i) => {
            const pos = (i - activeSlide + carouselImages.length) % carouselImages.length;
            card.className = `carousel-card ${pos === 0 ? 'active' : ''}`;
            card.style.transform = `translateX(${pos * 80 - 20}px) scale(${pos === 0 ? 1 : 0.85 - pos * 0.05})`;
            card.style.opacity = pos > 4 ? 0 : 1 - pos * 0.2;
            card.style.zIndex = carouselImages.length - pos;
        });

        updateLocationInfo();
        restartAutoSlide();
    }

    function setTransition(v) {
        isTransitioning = v;
        document.querySelectorAll('.full-slide-background')
            .forEach(bg => bg.classList.toggle('transitioning', v));
    }

    function nextSlide() {
        if (isTransitioning) return;
        setTransition(true);
        setTimeout(() => {
            updateCarousel((activeSlide + 1) % carouselImages.length);
            setTransition(false);
        }, 420);
    }

    function prevSlide() {
        if (isTransitioning) return;
        setTransition(true);
        setTimeout(() => {
            updateCarousel(activeSlide === 0 ? carouselImages.length - 1 : activeSlide - 1);
            setTransition(false);
        }, 420);
    }

    function startAutoSlide() {
        stopAutoSlide();
        carouselTimer = setInterval(nextSlide, 4000);
    }
    function stopAutoSlide() {
        if (carouselTimer) clearInterval(carouselTimer);
    }
    function restartAutoSlide() {
        startAutoSlide();
    }

    //testimonials
    function initTestimonials() {
        const track = document.getElementById('testimonials-track');
        if (!track) return;
        track.innerHTML = '';
        testimonials.forEach(t => {
            const slide = document.createElement('div');
            slide.className = 'testimonial-slide';
            slide.innerHTML = `
        <div class="testimonial-card">
          <div class="testimonial-user-info">
            <div class="user-icon"><i class="fas fa-user" style="font-size:28px;"></i></div>
            <div class="testimonial-rating">
              ${Array(5).fill(0).map((_, i) => `<span class="${i < t.rating ? 'star filled' : 'star'}">★</span>`).join('')}
            </div>
            <div class="testimonial-name">${t.name}</div>
          </div>
          <div class="testimonial-content"><p>"${t.text}"</p></div>
        </div>`;
            track.appendChild(slide);
        });
    }
    function updateTestimonialPosition() {
        const track = document.getElementById('testimonials-track');
        if (!track) return;
        track.style.transform = `translateX(-${currentTestimonialIndex * 396}px)`;
    }
    function nextTestimonial() {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % Math.max(1, testimonials.length - 2);
        updateTestimonialPosition();
    }
    function prevTestimonial() {
        currentTestimonialIndex = (currentTestimonialIndex - 1 + Math.max(1, testimonials.length - 2)) % Math.max(1, testimonials.length - 2);
        updateTestimonialPosition();
    }

    // Tabs
    function initTabs() {
        const buttons = document.querySelectorAll('.HomePage-nav-link');
        const forms = {
            flights: document.getElementById('flights-form'),
            hotels: document.getElementById('hotels-form'),
            guide: document.getElementById('guide-form'),
        };
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.getAttribute('data-tab');
                buttons.forEach(b => b.classList.remove('HomePage-active'));
                btn.classList.add('HomePage-active');

                Object.entries(forms).forEach(([k, f]) => {
                    if (!f) return;
                    f.style.display = (k === tab) ? 'flex' : 'none';
                });
            });
        });
        // Header quick-links to tabs
        document.querySelectorAll('.flight-tab, .hotel-tab').forEach(a => {
            a.addEventListener('click', (e) => {
                e.preventDefault();

                // Activate the appropriate tab
                const tabType = a.classList.contains('flight-tab') ? 'flights' : 'hotels';
                document.querySelector(`[data-tab="${tabType}"]`).click();

                // Scroll to the booking card
                const bookingCard = document.getElementById('booking');
                if (bookingCard) {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    //controls
    function wireControls() {
        const next = document.querySelector('.carousel-arrow.next');
        const prev = document.querySelector('.carousel-arrow.prev');
        if (next) next.addEventListener('click', nextSlide);
        if (prev) prev.addEventListener('click', prevSlide);

        const tNext = document.getElementById('next-testimonial');
        const tPrev = document.getElementById('prev-testimonial');
        if (tNext) tNext.addEventListener('click', nextTestimonial);
        if (tPrev) tPrev.addEventListener('click', prevTestimonial);

        const strip = document.querySelector('.stacked-carousel.horizontal');
        if (strip) {
            strip.addEventListener('mouseenter', stopAutoSlide);
            strip.addEventListener('mouseleave', startAutoSlide);
        }
    }

    initCarousel();
    initTestimonials();
    initTabs();
    initHotelsForm();
    initFlightsForm();
    wireControls();
});