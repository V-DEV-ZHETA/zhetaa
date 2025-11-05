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

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-fill');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (barTop < windowHeight - 50) {
            bar.style.width = bar.style.width || '0%';
        }
    });
}

window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars);

// Contact Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Reset previous errors
            const errorMessages = contactForm.querySelectorAll('.error-message');
            errorMessages.forEach(msg => msg.style.display = 'none');

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            const privacy = document.getElementById('privacy').checked;

            let isValid = true;

            // Validate name
            if (name === '') {
                showError('name', 'Nama tidak boleh kosong');
                isValid = false;
            }

            // Validate email
            if (email === '') {
                showError('email', 'Email tidak boleh kosong');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'Format email tidak valid');
                isValid = false;
            }

            // Validate subject
            if (subject === '') {
                showError('subject', 'Subjek tidak boleh kosong');
                isValid = false;
            }

            // Validate message
            if (message === '') {
                showError('message', 'Pesan tidak boleh kosong');
                isValid = false;
            } else if (message.length < 10) {
                showError('message', 'Pesan minimal 10 karakter');
                isValid = false;
            }

            // Validate privacy checkbox
            if (!privacy) {
                showError('privacy', 'Anda harus menyetujui kebijakan privasi');
                isValid = false;
            }

            // If form is valid, submit it
            if (isValid) {
                // Show loading state
                const submitButton = contactForm.querySelector('.submit-button');
                const originalText = submitButton.innerHTML;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
                submitButton.disabled = true;

                // Simulate form submission (replace with actual implementation)
                setTimeout(() => {
                    // Show success message
                    formStatus.textContent = 'Pesan Anda telah berhasil dikirim! Saya akan segera menghubungi Anda.';
                    formStatus.className = 'form-status success';
                    formStatus.style.display = 'block';

                    // Reset form
                    contactForm.reset();

                    // Reset button
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;

                    // Hide status message after 5 seconds
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 5000);
                }, 1500);
            }
        });
    }

    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorMessage = field.parentElement.querySelector('.error-message');

        if (errorMessage) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
        }

        field.style.borderColor = '#e74c3c';
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Remove error styling on input
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.style.borderColor = '#e0e0e0';
            const errorMessage = this.parentElement.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.style.display = 'none';
            }
        });
    });
});

// Add active class to nav links on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

function setActiveNavLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: #FF8C00;
        font-weight: 600;
    }
`;
document.head.appendChild(style);
