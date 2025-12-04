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

    // Open modal on image click
    heroImg.addEventListener('click', () => {
        modal.style.display = 'block';
        modal.classList.add('show');
        modalImg.src = heroImg.src;
        currentScale = 1;
        modalImg.style.transform = 'scale(1)';
    });

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
            } else {
                entry.target.classList.remove('visible');
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
