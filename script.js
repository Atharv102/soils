// Load auth script
if (!window.auth) {
    const script = document.createElement('script');
    script.src = 'auth.js';
    document.head.appendChild(script);
}

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
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

// Soil texture calculator
function calculateTexture() {
    const sand = parseFloat(document.getElementById('sand').value) || 0;
    const silt = parseFloat(document.getElementById('silt').value) || 0;
    const clay = parseFloat(document.getElementById('clay').value) || 0;
    const result = document.getElementById('textureResult');

    if (sand + silt + clay !== 100) {
        result.textContent = 'Error: Percentages must add up to 100%';
        result.style.color = 'red';
        return;
    }

    let texture = '';
    
    if (clay >= 40) {
        texture = 'Clay';
    } else if (clay >= 27 && sand <= 45) {
        texture = 'Clay Loam';
    } else if (clay >= 27 && sand > 45) {
        texture = 'Sandy Clay';
    } else if (clay >= 20 && sand <= 45) {
        texture = 'Loam';
    } else if (clay >= 7 && sand >= 52) {
        texture = 'Sandy Loam';
    } else if (sand >= 85) {
        texture = 'Sand';
    } else if (silt >= 80) {
        texture = 'Silt';
    } else if (silt >= 50) {
        texture = 'Silt Loam';
    } else {
        texture = 'Loamy Sand';
    }

    result.textContent = 'Soil Texture: ' + texture;
    result.style.color = '#2d5016';
}

// Update top bar on page load
window.addEventListener('DOMContentLoaded', () => {
    if (typeof updateTopBar === 'function') {
        updateTopBar();
    }
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .fact-card, .content-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});
