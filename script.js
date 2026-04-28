document.addEventListener("DOMContentLoaded", function () {

    const guestElements = document.querySelectorAll('[data-guest-name]');
    const params = new URLSearchParams(window.location.search);
    let guestName = params.get('guest') || '';
    const pathTail = window.location.pathname.split('/').pop() || '';
    if (!guestName && pathTail && !pathTail.includes('.html')) {
        guestName = decodeURIComponent(pathTail.replace(/[-_]/g, ' '));
    }
    const hashName = window.location.hash ? decodeURIComponent(window.location.hash.replace(/^#/, '')) : '';
    if (!guestName && hashName) {
        guestName = hashName;
    }
    if (!guestName) {
        guestName = 'Guest Name Here';
    }
    guestElements.forEach(el => el.textContent = guestName);

    const eventDate = new Date('2026-06-28T09:00:00');
    function updateCountdown() {
        const now = new Date();
        let diff = eventDate - now;
        if (diff < 0) diff = 0;
        const days = Math.floor(diff / 86400000);
        const hours = Math.floor((diff % 86400000) / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        document.getElementById('count-days').textContent = String(days).padStart(2, '0');
        document.getElementById('count-hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('count-minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('count-seconds').textContent = String(seconds).padStart(2, '0');
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    document.querySelectorAll('.animate-once').forEach(el => observer.observe(el));

    // Open invitation
    const openBtn = document.getElementById('open-invitation-btn');
    const audio = document.getElementById('backsound');

    openBtn.addEventListener('click', () => {
        // Show all locked sections at once
        document.querySelectorAll('.locked-section').forEach(section => {
            section.style.display = 'block';
            section.classList.add('fade-in');
        });
        
        // Scroll to quote
        setTimeout(() => {
            document.getElementById('quote').scrollIntoView({ behavior: 'smooth' });
        }, 200);
        
        // AUDIO FIX with fade in
        audio.volume = 0;
        audio.muted = false;
        audio.load();

        let playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                // fade in volume
                let vol = 0;
                let fade = setInterval(() => {
                    if (vol < 1) {
                        vol += 0.05;
                        audio.volume = vol;
                    } else {
                        clearInterval(fade);
                    }
                }, 150);
            }).catch(() => {
                // fallback klik kedua
                document.body.addEventListener('click', () => {
                    audio.play();
                }, { once: true });
            });
        }
    });

    // Music control
    const muteBtn = document.getElementById('mute-btn');
    let isMuted = false;

    muteBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        }

        audio.muted = !audio.muted;
        isMuted = audio.muted;
        muteBtn.innerText = isMuted ? "🔇" : "🔊";
    });

    // AUTO RESUME (kalau pindah tab)
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden && audio.paused) {
            audio.play().catch(() => {});
        }
    });

});
