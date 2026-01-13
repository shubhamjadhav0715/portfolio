// Matrix Rain Effect
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
const matrixArray = matrix.split("");

const fontSize = 16;
const columns = canvas.width / fontSize;

const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00f0ff';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 35);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Typing Animation
const typingText = document.querySelector('.typing-text');
const texts = ['MERN Stack Developer', 'Software Engineer', 'Full Stack Developer', 'Problem Solver'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }

    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeText, typingSpeed);
}

setTimeout(typeText, 1000);

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scroll
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

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 0.8s ease';
    observer.observe(section);
});

// Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('.about');
if (aboutSection) {
    statsObserver.observe(aboutSection);
}

// Skill Items Animation
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'scale(0.8)';
    item.style.transition = `all 0.5s ease ${index * 0.05}s`;
});

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.skill-item');
            items.forEach(item => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Project Cards Animation
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = `all 0.6s ease ${index * 0.2}s`;
});

const projectsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.project-card');
            cards.forEach(card => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });
            projectsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

const projectsSection = document.querySelector('.projects');
if (projectsSection) {
    projectsObserver.observe(projectsSection);
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Create mailto link
        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        const mailtoLink = `mailto:shubhamjadhav0715@gmail.com?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        alert('Opening your email client...');
        
        // Reset form
        contactForm.reset();
    });
}

// Cursor Trail Effect
let cursorTrail = [];
const trailLength = 20;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY });
    
    if (cursorTrail.length > trailLength) {
        cursorTrail.shift();
    }
    
    // Remove old trail elements
    document.querySelectorAll('.cursor-trail').forEach(el => el.remove());
    
    // Create new trail
    cursorTrail.forEach((pos, index) => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.cssText = `
            position: fixed;
            width: ${10 - (index / trailLength) * 8}px;
            height: ${10 - (index / trailLength) * 8}px;
            background: rgba(0, 240, 255, ${1 - (index / trailLength)});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${pos.x}px;
            top: ${pos.y}px;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 10px rgba(0, 240, 255, 0.5);
        `;
        document.body.appendChild(trail);
        
        setTimeout(() => trail.remove(), 100);
    });
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.cyber-frame, .cyber-card');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add glitch effect to title on hover
const glitchText = document.querySelector('.glitch-text');
if (glitchText) {
    glitchText.addEventListener('mouseenter', () => {
        glitchText.style.animation = 'glitch 0.3s infinite';
    });
    
    glitchText.addEventListener('mouseleave', () => {
        glitchText.style.animation = 'none';
    });
}

// Random color change for skill items
setInterval(() => {
    const randomSkill = skillItems[Math.floor(Math.random() * skillItems.length)];
    if (randomSkill) {
        randomSkill.style.borderColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, 0.5)`;
        setTimeout(() => {
            randomSkill.style.borderColor = 'rgba(0, 240, 255, 0.3)';
        }, 1000);
    }
}, 3000);

// Console Easter Egg
console.log('%c🚀 Welcome to my Portfolio!', 'color: #00f0ff; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ by Shubham Jadhav', 'color: #ff00ff; font-size: 14px;');
console.log('%cInterested in the code? Check out my GitHub!', 'color: #00ff88; font-size: 12px;');
console.log('%chttps://github.com/shubhamjadhav0715', 'color: #00f0ff; font-size: 12px;');

// Prevent right-click (optional - remove if you don't want this)
// document.addEventListener('contextmenu', (e) => e.preventDefault());

// Loading Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
});