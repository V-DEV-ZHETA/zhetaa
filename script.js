// ==================== INTERSECTION OBSERVER UNTUK SCROLL ANIMATIONS ====================
// Membuat observer untuk mendeteksi elemen yang masuk viewport

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Special handling untuk progress bars
            if (entry.target.classList.contains('skill-box')) {
                const progressFill = entry.target.querySelector('.progress-fill');
                if (progressFill) {
                    const targetWidth = progressFill.style.width;
                    progressFill.style.width = '0';
                    setTimeout(() => {
                        progressFill.style.width = targetWidth;
                    }, 100);
                }
            }
            
            // Unobserve setelah animasi untuk performa
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Offset untuk navbar sticky
            const navHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== FORM HANDLING DENGAN ANIMATION ====================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const submitBtn = this.querySelector('button[type="submit"]');
        
        if (name && email && message) {
            // Button loading animation
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<span class="loading-dots">Mengirim...</span>';
            submitBtn.disabled = true;
            
            // Simulate sending
            setTimeout(() => {
                submitBtn.innerHTML = '✓ Terkirim!';
                submitBtn.style.backgroundColor = '#22c55e';
                
                // Success notification
                showNotification('Pesan berhasil terkirim! Terima kasih ' + name + '.', 'success');
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                    contactForm.reset();
                }, 2000);
            }, 1500);
        } else {
            showNotification('Mohon lengkapi semua field.', 'error');
        }
    });
}

// ==================== NOTIFICATION SYSTEM ====================
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
    `;
    
    // Styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    `;
    
    if (type === 'success') {
        notification.style.backgroundColor = '#22c55e';
    } else {
        notification.style.backgroundColor = '#ef4444';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// ==================== SCROLL TO TOP BUTTON ====================
const scrollTopBtn = document.createElement('div');
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
`;
document.body.appendChild(scrollTopBtn);

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Show/hide scroll top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    }
    
    lastScroll = currentScroll;
});

// ==================== INITIALIZE OBSERVERS ====================
document.addEventListener('DOMContentLoaded', () => {
    // Observe elements untuk scroll animations
    const animatedElements = document.querySelectorAll(
        '.about-text, .card, .achievement-item, .skill-box, .contact-wrapper, .footer'
    );
    
    animatedElements.forEach(el => observer.observe(el));
    
    // Parallax effect untuk hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBg = document.querySelector('.hero::before');
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
});

// ==================== TYPING EFFECT (Optional untuk hero) ====================
// Uncomment jika ingin efek typing pada subtitle
/*
const subtitle = document.querySelector('.hero-subtitle');
const text = subtitle.textContent;
subtitle.textContent = '';

let i = 0;
function typeWriter() {
    if (i < text.length) {
        subtitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing after delay
setTimeout(typeWriter, 1000);
*/