document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Audio Control ---
    const bgMusic = document.getElementById('bg-music');
    const toggleBtn = document.getElementById('toggle-music');
    const icon = toggleBtn.querySelector('i');
    let isPlaying = false;

    // Try to lower volume for background effect
    bgMusic.volume = 0.4;

    toggleBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
            toggleBtn.style.animation = 'none'; // Stop pulsing if playing
        } else {
            bgMusic.play().catch(e => console.log("Audio play failed (browser policy):", e));
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
            toggleBtn.style.animation = 'pulse-glow 2s infinite';
        }
        isPlaying = !isPlaying;
    });

    // --- 2. Scroll Animations (Fade-in) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger a bit earlier
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // --- 3. Smooth Scroll Button ---
    window.scrollToSection = (id) => {
        const el = document.getElementById(id);
        if(el) el.scrollIntoView({ behavior: 'smooth' });
    };

    // --- 4. 3D Tilt Effect for Gallery (Removed for CSS Smooth Animation) ---
    // CSS hover effect now handles the "Modern Lift & Zoom" interaction.


    // --- 5. Final Button Interaction (Confetti + Popup) ---
    const finalBtn = document.getElementById('final-btn');
    const popupModal = document.getElementById('popup-modal');
    const closeBtn = document.querySelector('.close-btn');
    const typingContainer = document.getElementById('typing-container');

    finalBtn.addEventListener('click', () => {
        // Trigger Confetti
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#a29bfe', '#6c5ce7', '#dfe6e9', '#ff7675']
        });

        // Show Modal after a slight delay
        setTimeout(() => {
            popupModal.classList.add('visible');
            typeWriterEffect("Aku sudah bilang kan?\nKamu bisa. ❤️\n\nSelamat Gelar Barunya! 🎓");
        }, 800);
    });

    closeBtn.addEventListener('click', () => {
        closeModal();
    });

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === popupModal) {
            closeModal();
        }
    });

    function closeModal() {
        popupModal.classList.remove('visible');
        typingContainer.innerHTML = ''; // Clear text
    }

    // --- 6. Typing Effect ---
    function typeWriterEffect(text) {
        let i = 0;
        typingContainer.innerHTML = '';
        const speed = 40; // ms per char

        function type() {
            if (i < text.length) {
                const char = text.charAt(i);
                if (char === '\n') {
                    typingContainer.innerHTML += '<br>';
                } else {
                    typingContainer.innerHTML += char;
                }
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
});
