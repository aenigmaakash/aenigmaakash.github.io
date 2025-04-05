// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// Initialize on DOMContentLoaded to ensure all elements are available
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced particle background
    particlesJS("backgroundCanvas", {
        "particles": {
            "number": {
                "value": 100,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.3,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.3,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 0.6
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 4,
                    "duration": 2,
                    "opacity": 0.8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // Initialize ripple effect
    initRippleEffect();
});

// Global function for adding ripples
let addRipple;

// Initialize ripple effect
function initRippleEffect() {
    const canvas = document.getElementById('myCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let ripples = [];
    
    // Set canvas to full screen
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Ripple class
    class Ripple {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.radius = 0;
            this.maxRadius = 100;
            this.speed = 2;
            this.opacity = 1;
            this.color = 'rgba(255, 255, 255,';
        }
        
        update() {
            this.radius += this.speed;
            this.opacity -= 0.01;
            
            return this.opacity > 0;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.strokeStyle = this.color + this.opacity + ')';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ripples = ripples.filter(ripple => {
            ripple.draw();
            return ripple.update();
        });
        
        requestAnimationFrame(animate);
    }
    
    // Start the animation
    animate();
    
    // Expose the addRipple function globally
    addRipple = function(x, y) {
        ripples.push(new Ripple(x, y));
    };
    
    // Add a ripple on click
    window.addEventListener('click', function(event) {
        // Don't create ripples when clicking on interactive elements
        if (event.target.closest('a') || event.target.closest('button') || 
            event.target.closest('.accordion-header')) {
            return;
        }
        
        addRipple(event.clientX, event.clientY);
    });
    
    // Add random ripples occasionally
    setInterval(() => {
        if (Math.random() > 0.8) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            ripples.push(new Ripple(x, y));
        }
    }, 5000);
}

