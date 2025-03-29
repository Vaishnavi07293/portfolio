document.addEventListener("DOMContentLoaded", function() {
    // Initialize AOS animation
    AOS.init({
        offset: 100,
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
    
    // Hide loading screen
    const loadingScreen = document.querySelector('.loading-screen');
    loadingScreen.classList.add('fade-out');
    setTimeout(() => {
        loadingScreen.remove();
    }, 500);
    
    // Show home section by default
    showSection('home');
    
    // Initialize skill meter animations
    animateSkillMeters();
});

// Show specific section with smooth transition
function showSection(sectionId) {
    document.querySelectorAll('.section-content').forEach(section => {
        section.classList.remove('visible');
    });
    
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('visible');
        window.scrollTo({top: 0, behavior: 'smooth'});
        
        // Update active nav link
        setActiveNav();
    }
}

// Toggle mobile menu
function toggleMenu() {
    const dropdown = document.getElementById('dropdownMenu');
    const hamburg = document.querySelector('.hamburg');
    
    if (dropdown && hamburg) {
        dropdown.classList.toggle('active');
        
        if (dropdown.classList.contains('active')) {
            hamburg.classList.replace('fa-bars', 'fa-times');
        } else {
            hamburg.classList.replace('fa-times', 'fa-bars');
        }
    }
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('dropdownMenu');
    const hamburg = document.querySelector('.hamburg');
    const navContainer = document.querySelector('.nav-container');
    
    if (dropdown && hamburg && navContainer && 
        !navContainer.contains(event.target) &&
        !event.target.classList.contains('hamburg')) {
        dropdown.classList.remove('active');
        hamburg.classList.replace('fa-times', 'fa-bars');
    }
});

// Set active navigation link based on scroll position
function setActiveNav() {
    const sections = document.querySelectorAll('.section-content.visible');
    const navLinks = document.querySelectorAll('.nav-links a, .dropdown-links a');
    
    if (sections.length > 0) {
        const id = sections[0].getAttribute('id');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('onclick').includes(id)) {
                link.classList.add('active');
            }
        });
    }
}

// Animate skill meters when they come into view
function animateSkillMeters() {
    const skillMeters = document.querySelectorAll('.meter-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, {threshold: 0.5});
    
    skillMeters.forEach(meter => {
        observer.observe(meter);
    });
}

// Back to top button visibility
window.addEventListener('scroll', function() {
    const backToTop = document.querySelector('.back-to-top');
    if (window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
    
    // Update active nav link based on scroll
    const sections = document.querySelectorAll('.section-content');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const id = section.getAttribute('id');
            document.querySelectorAll('.nav-links a, .dropdown-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('onclick').includes(id)) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        const icon = this.querySelector('i');
        if (document.body.classList.contains('light-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }
}

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple validation
        const inputs = this.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = 'red';
                isValid = false;
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (isValid) {
            // In a real application, you would send the form data to a server here
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
}