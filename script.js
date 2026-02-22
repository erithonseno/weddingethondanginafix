// Initialize Intersection Observer untuk scroll animation
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Tambah class untuk trigger animasi
                entry.target.classList.add('visible');
                
                // Untuk elemen dengan animasi khusus
                if (entry.target.classList.contains('fade-in-up')) {
                    entry.target.style.animationPlayState = 'running';
                }
                if (entry.target.classList.contains('fade-in-left')) {
                    entry.target.style.animationPlayState = 'running';
                }
                if (entry.target.classList.contains('fade-in-right')) {
                    entry.target.style.animationPlayState = 'running';
                }
                if (entry.target.classList.contains('fade-in-scale')) {
                    entry.target.style.animationPlayState = 'running';
                }
                
                // Optional: jika ingin menghentikan observasi setelah animasi
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe semua elemen dengan class animasi
    const animatedElements = document.querySelectorAll(
        '.fade-in-up, .fade-in-left, .fade-in-right, .fade-in-scale'
    );
    
    animatedElements.forEach(element => {
        // Set initial state
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });

    // Particulate animation heroes yang sudah terlihat
    heroAnimations();
    
    // Button functionality
    setupButtonListeners();
});

// Hero section animation pada load
function heroAnimations() {
    const heroElements = document.querySelectorAll('.hero .fade-in-up');
    heroElements.forEach((element, index) => {
        element.style.animationPlayState = 'running';
    });
}

// Setup button listeners
function setupButtonListeners() {
    // Scroll button di hero
    const scrollBtn = document.querySelector('[href="#details"]');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector('#details');
            target.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Form submission
    const messageForms = document.querySelectorAll('.message-form button, .rsvp-form .btn-primary');
    messageForms.forEach(btn => {
        btn.addEventListener('click', handleFormSubmit);
    });
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    const button = e.target;
    const originalText = button.textContent;
    
    // Visual feedback
    button.textContent = 'Terkirim!';
    button.style.background = 'var(--soft-mahogany)';
    
    // Reset setelah 2 detik
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
        
        // Kosongkan form jika perlu
        const form = button.closest('.message-form') || button.closest('.rsvp-form');
        if (form) {
            form.querySelectorAll('input, textarea, select').forEach(input => {
                input.value = '';
            });
        }
    }, 2000);
}

// Smooth scroll untuk link navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Parallax effect pada hero section (optional)
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    }
});

// Mobile menu close setelah klik link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        if (navbarToggler.offsetParent !== null) { // Jika visible
            navbarToggler.click();
        }
    });
});
