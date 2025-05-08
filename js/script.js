// Main JavaScript for Greek Mythology Portfolio

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero-section');
    
    // Navbar background change on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(13, 13, 13, 0.95)';
        } else {
            header.style.backgroundColor = 'rgba(13, 13, 13, 0.8)';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = targetPosition + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Simple animation for sections when they come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing after animation
            }
        });
    }, observerOptions);
    
    // Observe all main sections
    document.querySelectorAll('section:not(.hero-section)').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
    // Add some particle effects for the hero section to simulate stars
    if (heroSection) {
        createPixelStars();
    }
});

// Function to create animated pixel stars in the hero section
function createPixelStars() {
    const heroSection = document.querySelector('.hero-section');
    const starCount = 50; // Number of stars
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('pixel-star');
        
        // Random position
        const x = Math.floor(Math.random() * 100);
        const y = Math.floor(Math.random() * 100);
        
        // Random size (1-3px)
        const size = Math.floor(Math.random() * 3) + 1;
        
        // Random animation delay
        const delay = Math.random() * 5;
        
        // Apply styles
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDelay = `${delay}s`;
        
        // Add to hero section
        heroSection.appendChild(star);
    }
}

// Add CSS for the pixel stars (dynamically to avoid modifying CSS file)
const starStyles = document.createElement('style');
starStyles.textContent = `
    .pixel-star {
        position: absolute;
        background-color: #FFDF8C;
        opacity: 0.7;
        z-index: 1;
        animation: twinkle 3s infinite alternate;
    }
    
    @keyframes twinkle {
        0% { opacity: 0.3; }
        100% { opacity: 1; }
    }
    
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(starStyles);
