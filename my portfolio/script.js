// Sticky Navbar
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.add('scrolled');
        // Keep navbar dark immediately or adjust threshold
        if(window.scrollY < 10) navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    // Change icon based on state
    const icon = hamburger.querySelector('i');
    if(navLinks.classList.contains('active')){
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Active Link Highlight on Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

// Simple Typing Effect
const typedTextSpan = document.querySelector(".typed");
const textArray = ["Creative Developer", "UI/UX Enthusiast", "Problem Solver"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if(!typedTextSpan.classList.contains("typing")) typedTextSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } 
  else {
    typedTextSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if(!typedTextSpan.classList.contains("typing")) typedTextSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } 
  else {
    typedTextSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
  if(textArray.length) setTimeout(type, newTextDelay + 250);
});

// Scroll Reveal Animations using Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // Stop observing once it's shown
        }
    });
}, observerOptions);

// Add 'hidden' class to all elements you want to animate on scroll
const hiddenElements = document.querySelectorAll('.about-container, .skills-container, .timeline-item, .contact-container, .section-title');
hiddenElements.forEach((el) => {
    el.classList.add('hidden');
    observer.observe(el);
});

// Form Submission handling (Prevent default)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = document.querySelector('.submit-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
        
        // Simulate sending
        setTimeout(() => {
            btn.innerHTML = 'Sent Successfully! <i class="fas fa-check"></i>';
            btn.style.background = '#10b981'; // Green
            contactForm.reset();
            
            // Revert back after 3 seconds
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
            }, 3000);
        }, 1500);
    });
}
