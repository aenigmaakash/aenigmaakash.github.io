// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect - keeping this as it improves usability
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Logo click animation
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.stopPropagation(); // Stop event from propagating to prevent conflicts
            
            this.classList.add('clicked');
            
            // Create a ripple effect at the logo position
            const rect = this.getBoundingClientRect();
            const x = rect.left + rect.width/2;
            const y = rect.top + rect.height/2;
            
            // Add ripple if we have the ripple function available
            if (typeof addRipple === 'function') {
                addRipple(x, y);
            }
            
            // Reset animation
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 800);
        });
    }

    // Initialize typewriter effect
    const typewriterElement = document.getElementById('text-effect');
    
    const typewriter = new Typewriter(typewriterElement, {
        loop: true,
        delay: 50,
        deleteSpeed: 30,
        cursor: '|'
    });
    
    typewriter
        .typeString('Hello! I\'m Akash.')
        .pauseFor(1000)
        .deleteAll()
        .typeString('I love tinkering with tech.')
        .pauseFor(1000)
        .deleteAll()
        .typeString('I make systems work together.')
        .pauseFor(1000)
        .deleteAll()
        .typeString('Network enthusiast.')
        .pauseFor(1000)
        .deleteAll()
        .typeString('IoT & hardware explorer.')
        .pauseFor(1000)
        .deleteAll()
        .typeString('I speak Python, SQL & C#.')
        .pauseFor(1000)
        .deleteAll()
        .typeString('Cloud architecture enthusiast.')
        .pauseFor(1000)
        .deleteAll()
        .typeString('I turn complex tech into clear solutions.')
        .pauseFor(1000)
        .start();

    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    // Initialize accordion content heights and styles
    document.querySelectorAll('.accordion-content').forEach(content => {
        if (content.classList.contains('active')) {
            content.style.maxHeight = '2000px';
            content.style.padding = '1.5rem';
            content.style.overflow = 'visible';
            content.style.borderTop = '1px solid rgba(221, 221, 221, 0.2)';
        } else {
            content.style.maxHeight = '0';
            content.style.padding = '0 1.5rem';
            content.style.overflow = 'hidden';
            content.style.borderTop = '0';
        }
    });
    
    // Add click event to accordion headers
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle active class on the header
            this.classList.toggle('active');
            
            // Get the corresponding content
            const content = this.nextElementSibling;
            const isActive = content.classList.contains('active');
            
            // Toggle active class on content
            content.classList.toggle('active');
            
            // If closing the accordion
            if (isActive) {
                // First set padding to just horizontal
                content.style.padding = '0 1.5rem';
                content.style.borderTop = '0';
                
                // Then after a small delay, collapse the height
                setTimeout(() => {
                    content.style.maxHeight = '0';
                    
                    // After the transition is complete, hide overflow
                    setTimeout(() => {
                        content.style.overflow = 'hidden';
                    }, 300);
                }, 10);
            } 
            // If opening the accordion
            else {
                // First make overflow visible and add border
                content.style.overflow = 'hidden';
                content.style.borderTop = '1px solid rgba(221, 221, 221, 0.2)';
                
                // Then set padding fully and expand height
                setTimeout(() => {
                    content.style.padding = '1.5rem';
                    content.style.maxHeight = '2000px';
                    
                    // After the height transition is mostly complete, make overflow visible
                    setTimeout(() => {
                        content.style.overflow = 'visible';
                    }, 300);
                }, 10);
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}); 