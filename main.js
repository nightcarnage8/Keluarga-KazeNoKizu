document.addEventListener('DOMContentLoaded', function() {
    // Loading screen functionality
    const loadingScreen = document.querySelector('.loading-screen');
    const progressFill = document.querySelector('.progress-fill');

    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);

            // Hide loading screen after progress completes
            setTimeout(() => {
                loadingScreen.classList.add('hidden');

                // Start typing animations after loading
                setTimeout(() => {
                    startTypingAnimation();
                }, 500);

                // Start fade-in animations for content
                setTimeout(() => {
                    animateOnScroll();
                }, 500);

                // Initialize image modal
                initImageModal();
            }, 500);
        }
        progressFill.style.width = progress + '%';
    }, 200);
});

function startTypingAnimation() {
    const heroH1 = document.querySelector('.hero h1');
    const heroP = document.querySelector('.hero p');

    if (heroH1 && heroP) {
        // Typing for h1
        typeWriter(heroH1, 'Selamat Datang Di Keluarga Kaze No Kizu', 100, () => {
            // After h1 finishes, start p
            typeWriter(heroP, 'Keluarga Kaze No Kizu Adalah Keluarga Virtual Cemara Yang Harmois Penuh Kegembiraan Bersama', 50);
        });
    }
}

function typeWriter(element, text, speed, callback) {
    element.innerHTML = '';
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

// Image modal functionality
function initImageModal() {
    const heroImg = document.getElementById('hero-img');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const closeBtn = document.querySelector('.close');
    const zoomInBtn = document.getElementById('zoomIn');
    const zoomOutBtn = document.getElementById('zoomOut');

    if (!heroImg || !modal || !modalImg || !closeBtn || !zoomInBtn || !zoomOutBtn) return;

    let currentScale = 1;

    // Modal functionality removed for hero image to match profile images

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });

    // Zoom in
    zoomInBtn.addEventListener('click', () => {
        currentScale += 0.2;
        if (currentScale > 3) currentScale = 3;
        modalImg.style.transform = `scale(${currentScale})`;
    });

    // Zoom out
    zoomOutBtn.addEventListener('click', () => {
        currentScale -= 0.2;
        if (currentScale < 0.5) currentScale = 0.5;
        modalImg.style.transform = `scale(${currentScale})`;
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
            } else if (e.key === '+' || e.key === '=') {
                currentScale += 0.2;
                if (currentScale > 3) currentScale = 3;
                modalImg.style.transform = `scale(${currentScale})`;
            } else if (e.key === '-') {
                currentScale -= 0.2;
                if (currentScale < 0.5) currentScale = 0.5;
                modalImg.style.transform = `scale(${currentScale})`;
            }
        }
    });
}

// Intersection Observer for fade-in animations
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once animated to prevent repeating
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.custom-navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    }
});

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Terima kasih! Pesan Anda telah dikirim.');
            contactForm.reset();
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    if (themeToggle && themeIcon) {
        // Check for saved theme preference or default to light mode
        const currentTheme = localStorage.getItem('theme') || 'light';
        if (currentTheme === 'dark') {
            body.classList.add('dark-theme');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            // For light mode, set icon to moon
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }

        themeToggle.addEventListener('click', () => {
            // Add transition class for smooth animation
            body.classList.add('theme-transition');

            // Toggle theme after a short delay to allow transition to start
            setTimeout(() => {
                body.classList.toggle('dark-theme');

                // Toggle icon
                if (body.classList.contains('dark-theme')) {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                    localStorage.setItem('theme', 'dark');
                } else {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                    localStorage.setItem('theme', 'light');
                }

                // Remove transition class after animation completes
                setTimeout(() => {
                    body.classList.remove('theme-transition');
                }, 300);
            }, 50);
        });
    }

    // Scroll to Top Button functionality
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

/*music section*/

// Music player functionality
document.addEventListener('DOMContentLoaded', function() {
    const playButtons = document.querySelectorAll('.play-btn');
    const nextButtons = document.querySelectorAll('.next-btn');
    const audios = document.querySelectorAll('audio');

    // Function to pause all audios and reset their icons
    function pauseAllAudios(exceptAudioId) {
        audios.forEach(audio => {
            if (audio.id !== exceptAudioId) {
                audio.pause();
                const button = document.querySelector(`[data-audio="${audio.id}"].play-btn`);
                if (button) {
                    const icon = button.querySelector('i');
                    icon.classList.remove('fa-pause');
                    icon.classList.add('fa-play');
                }
            }
        });
    }

    // Function to get next audio ID
    function getNextAudioId(currentAudioId) {
        const currentNum = parseInt(currentAudioId.slice(5));
        const nextNum = currentNum === 39 ? 1 : currentNum + 1;
        return 'audio' + nextNum;
    }

    // Function to get previous audio ID
    function getPreviousAudioId(currentAudioId) {
        const currentNum = parseInt(currentAudioId.slice(5));
        const prevNum = currentNum === 1 ? 39 : currentNum - 1;
        return 'audio' + prevNum;
    }

    // Function to format time (seconds to mm:ss)
    function formatTime(seconds) {
        if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Function to update progress bar and time display
    function updateAudioProgress(audioId) {
        const audio = document.getElementById(audioId);
        if (!audio) return;

        const progressBar = document.querySelector(`.audio-progress[data-audio="${audioId}"]`);
        const currentTimeDisplay = document.querySelector(`.audio-current-time[data-audio="${audioId}"]`);
        const durationDisplay = document.querySelector(`.audio-duration[data-audio="${audioId}"]`);

        if (progressBar && currentTimeDisplay) {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.value = isNaN(progress) ? 0 : progress;
            currentTimeDisplay.textContent = formatTime(audio.currentTime);
        }

        if (durationDisplay && audio.duration) {
            durationDisplay.textContent = formatTime(audio.duration);
        }
    }

    // Initialize duration display for all audios
    audios.forEach(audio => {
        audio.addEventListener('loadedmetadata', function() {
            const audioId = this.id;
            const durationDisplay = document.querySelector(`.audio-duration[data-audio="${audioId}"]`);
            if (durationDisplay) {
                durationDisplay.textContent = formatTime(this.duration);
            }
            const progressBar = document.querySelector(`.audio-progress[data-audio="${audioId}"]`);
            if (progressBar) {
                progressBar.max = 100;
            }
        });

        // Update progress while playing
        audio.addEventListener('timeupdate', function() {
            updateAudioProgress(this.id);
        });
    });

    // Seek functionality for progress bars
    const progressBars = document.querySelectorAll('.audio-progress');
    progressBars.forEach(progressBar => {
        progressBar.addEventListener('input', function() {
            const audioId = this.getAttribute('data-audio');
            const audio = document.getElementById(audioId);
            if (audio && audio.duration) {
                const seekTime = (this.value / 100) * audio.duration;
                audio.currentTime = seekTime;
            }
        });
    });

    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const audioId = this.getAttribute('data-audio');
            const audio = document.getElementById(audioId);
            const icon = this.querySelector('i');

            if (audio.paused) {
                // Pause all other audios before playing this one
                pauseAllAudios(audioId);
                audio.play();
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
            } else {
                audio.pause();
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
            }
        });
    });

    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentAudioId = this.getAttribute('data-audio');
            const nextAudioId = getNextAudioId(currentAudioId);
            const currentAudio = document.getElementById(currentAudioId);
            const nextAudio = document.getElementById(nextAudioId);

            // Pause current audio
            currentAudio.pause();
            const currentPlayButton = document.querySelector(`[data-audio="${currentAudioId}"].play-btn`);
            if (currentPlayButton) {
                const currentIcon = currentPlayButton.querySelector('i');
                currentIcon.classList.remove('fa-pause');
                currentIcon.classList.add('fa-play');
            }

            // Play next audio
            pauseAllAudios(nextAudioId);
            nextAudio.play();
            const nextPlayButton = document.querySelector(`[data-audio="${nextAudioId}"].play-btn`);
            if (nextPlayButton) {
                const nextIcon = nextPlayButton.querySelector('i');
                nextIcon.classList.remove('fa-play');
                nextIcon.classList.add('fa-pause');
            }
            // Reset progress bar for current audio
            const currentProgressBar = document.querySelector(`.audio-progress[data-audio="${currentAudioId}"]`);
            if (currentProgressBar) {
                currentProgressBar.value = 0;
            }
            const currentTimeDisplay = document.querySelector(`.audio-current-time[data-audio="${currentAudioId}"]`);
            if (currentTimeDisplay) {
                currentTimeDisplay.textContent = '0:00';
            }
        });
    });

    // Previous buttons functionality
    const prevButtons = document.querySelectorAll('.prev-btn');
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentAudioId = this.getAttribute('data-audio');
            const prevAudioId = getPreviousAudioId(currentAudioId);
            const currentAudio = document.getElementById(currentAudioId);
            const prevAudio = document.getElementById(prevAudioId);

            // Pause current audio
            currentAudio.pause();
            const currentPlayButton = document.querySelector(`[data-audio="${currentAudioId}"].play-btn`);
            if (currentPlayButton) {
                const currentIcon = currentPlayButton.querySelector('i');
                currentIcon.classList.remove('fa-pause');
                currentIcon.classList.add('fa-play');
            }

            // Play previous audio
            pauseAllAudios(prevAudioId);
            prevAudio.play();
            const prevPlayButton = document.querySelector(`[data-audio="${prevAudioId}"].play-btn`);
            if (prevPlayButton) {
                const prevIcon = prevPlayButton.querySelector('i');
                prevIcon.classList.remove('fa-play');
                prevIcon.classList.add('fa-pause');
            }
            // Reset progress bar for current audio
            const currentProgressBar = document.querySelector(`.audio-progress[data-audio="${currentAudioId}"]`);
            if (currentProgressBar) {
                currentProgressBar.value = 0;
            }
            const currentTimeDisplay = document.querySelector(`.audio-current-time[data-audio="${currentAudioId}"]`);
            if (currentTimeDisplay) {
                currentTimeDisplay.textContent = '0:00';
            }
        });
    });

    // Auto play next when audio ends
    audios.forEach(audio => {
        audio.addEventListener('ended', function() {
            const audioId = this.id;
            const nextAudioId = getNextAudioId(audioId);
            const nextAudio = document.getElementById(nextAudioId);

            // Reset current icon
            const currentPlayButton = document.querySelector(`[data-audio="${audioId}"].play-btn`);
            if (currentPlayButton) {
                const currentIcon = currentPlayButton.querySelector('i');
                currentIcon.classList.remove('fa-pause');
                currentIcon.classList.add('fa-play');
            }
            // Reset progress bar for current audio
            const currentProgressBar = document.querySelector(`.audio-progress[data-audio="${audioId}"]`);
            if (currentProgressBar) {
                currentProgressBar.value = 0;
            }
            const currentTimeDisplay = document.querySelector(`.audio-current-time[data-audio="${audioId}"]`);
            if (currentTimeDisplay) {
                currentTimeDisplay.textContent = '0:00';
            }

            // Play next audio
            pauseAllAudios(nextAudioId);
            nextAudio.play();
            const nextPlayButton = document.querySelector(`[data-audio="${nextAudioId}"].play-btn`);
            if (nextPlayButton) {
                const nextIcon = nextPlayButton.querySelector('i');
                nextIcon.classList.remove('fa-play');
                nextIcon.classList.add('fa-pause');
            }
        });
    });
});
