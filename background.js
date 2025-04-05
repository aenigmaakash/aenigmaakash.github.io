// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// Initialize on DOMContentLoaded to ensure all elements are available
document.addEventListener('DOMContentLoaded', function() {
    // Star Formation Background Animation
    const canvas = document.getElementById('myCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Space theme colors
    const COLORS = {
        background: '#050314', // Deep space color
        nebula1: 'rgba(63, 43, 136, 0.3)', // Deep purple
        nebula2: 'rgba(30, 49, 120, 0.25)', // Deep blue
        nebula3: 'rgba(117, 58, 178, 0.2)', // Medium purple
        stars: [
            'rgba(255, 255, 255, ',
            'rgba(220, 220, 255, ',
            'rgba(170, 170, 255, ',
            'rgba(138, 43, 226, ', // Purple stars
            'rgba(75, 0, 130, '    // Indigo stars
        ]
    };
    
    // Animation elements
    let stars = [];      // Star particles
    let nebulaClouds = []; // Nebula cloud formations
    let gravityCenters = []; // Points that affect star movement
    
    // Set canvas dimensions
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // After resize, regenerate the star field and nebula
        generateStarField();
    }
    
    // Track window focus state
    let windowIsActive = true;
    let mousePosition = { x: null, y: null };
    
    // Listen for window focus/blur events
    window.addEventListener('focus', function() {
        windowIsActive = true;
    });
    
    window.addEventListener('blur', function() {
        windowIsActive = false;
    });
    
    // Track mouse position with some smoothing for gentle effects
    let lastMouseX = null;
    let lastMouseY = null;
    
    window.addEventListener('mousemove', function(event) {
        if (lastMouseX === null) {
            lastMouseX = event.clientX;
            lastMouseY = event.clientY;
        } else {
            // Smooth transition to new position (lag effect)
            lastMouseX = lastMouseX + (event.clientX - lastMouseX) * 0.2;
            lastMouseY = lastMouseY + (event.clientY - lastMouseY) * 0.2;
        }
        
        mousePosition.x = lastMouseX;
        mousePosition.y = lastMouseY;
    });
    
    window.addEventListener('mouseout', function() {
        mousePosition.x = null;
        mousePosition.y = null;
        lastMouseX = null;
        lastMouseY = null;
    });
    
    // Star class represents individual stars in the formation
    class Star {
        constructor(x, y, size = null, opacity = null, color = null, speed = null) {
            this.x = x;
            this.y = y;
            this.size = size || Math.random() * 2 + 0.5; // Star size variation
            
            // 20% chance for a brighter star with pulse effect
            this.isPulsing = Math.random() < 0.2;
            this.pulseSpeed = 0.01 + Math.random() * 0.02;
            this.pulseAmount = Math.random() * 0.5 + 0.5;
            this.pulseDirection = 1;
            this.pulseValue = Math.random();
            
            // Random opacity
            this.baseOpacity = opacity || (Math.random() * 0.5 + 0.1);
            this.opacity = this.baseOpacity;
            
            // Color variation (white to blue/purple)
            this.colorIndex = color || Math.floor(Math.random() * COLORS.stars.length);
            
            // Movement variables
            this.initialX = this.x;
            this.initialY = this.y;
            this.speedX = speed || (Math.random() - 0.5) * 0.05; // Very slow drift
            this.speedY = speed || (Math.random() - 0.5) * 0.05;
            this.maxDrift = 50 + Math.random() * 50; // Max distance to drift from original position
            
            // 5% chance to be a moving star (faster)
            if (Math.random() < 0.05) {
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = (Math.random() - 0.5) * 0.3;
                this.maxDrift = canvas.width * 2; // Can travel across screen
            }
        }
        
        update() {
            // Update pulse effect
            if (this.isPulsing) {
                this.pulseValue += this.pulseSpeed * this.pulseDirection;
                
                if (this.pulseValue > 1) {
                    this.pulseValue = 1;
                    this.pulseDirection = -1;
                } else if (this.pulseValue < 0.3) {
                    this.pulseValue = 0.3;
                    this.pulseDirection = 1;
                }
                
                this.opacity = this.baseOpacity * (0.5 + this.pulseValue * this.pulseAmount);
            }
            
            // Basic star movement
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Check if star has drifted too far from original position
            const dx = this.x - this.initialX;
            const dy = this.y - this.initialY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > this.maxDrift) {
                // Reverse direction with some randomness
                this.speedX = -this.speedX * (0.9 + Math.random() * 0.2);
                this.speedY = -this.speedY * (0.9 + Math.random() * 0.2);
            }
            
            // Check if star is outside the canvas
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                // Fast-moving stars that exit screen reappear on the other side
                if (Math.abs(this.speedX) > 0.1 || Math.abs(this.speedY) > 0.1) {
                    if (this.x < 0) this.x = canvas.width;
                    if (this.x > canvas.width) this.x = 0;
                    if (this.y < 0) this.y = canvas.height;
                    if (this.y > canvas.height) this.y = 0;
                    this.initialX = this.x;
                    this.initialY = this.y;
                } else {
                    // Slower stars are gently redirected
                    if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
                    if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
                }
            }
            
            // Apply gravity influence from mouse (if present)
            if (mousePosition.x && mousePosition.y) {
                const dx = this.x - mousePosition.x;
                const dy = this.y - mousePosition.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 150;
                
                if (distance < maxDistance && distance > 0) {
                    const force = (maxDistance - distance) / maxDistance * 0.015;
                    const angle = Math.atan2(dy, dx);
                    
                    // Stars are gently pushed away from cursor
                    this.x += Math.cos(angle) * force * this.size;
                    this.y += Math.sin(angle) * force * this.size;
                }
            }
            
            // Apply gravity from gravity centers
            for (const center of gravityCenters) {
                const dx = this.x - center.x;
                const dy = this.y - center.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < center.radius && distance > 0) {
                    const force = (center.radius - distance) / center.radius * center.strength;
                    const angle = Math.atan2(dy, dx);
                    
                    // Direction depends on gravity type (attract/repel)
                    const direction = center.type === 'attract' ? -1 : 1;
                    
                    this.x += Math.cos(angle) * force * direction;
                    this.y += Math.sin(angle) * force * direction;
                }
            }
        }
        
        draw() {
            ctx.beginPath();
            
            // For larger stars, add a glow effect
            if (this.size > 1.5) {
                const glow = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.size * 4
                );
                
                glow.addColorStop(0, COLORS.stars[this.colorIndex] + this.opacity + ')');
                glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
                
                ctx.fillStyle = glow;
                ctx.fillRect(
                    this.x - this.size * 4,
                    this.y - this.size * 4,
                    this.size * 8,
                    this.size * 8
                );
            }
            
            // Draw the star itself
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = COLORS.stars[this.colorIndex] + this.opacity + ')';
            ctx.fill();
        }
    }
    
    // NebulaCloud class for background nebula effect
    class NebulaCloud {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 150 + 100;
            this.colorIndex = Math.floor(Math.random() * 3) + 1; // nebula1, nebula2, or nebula3
            
            // Use proper color based on index
            switch(this.colorIndex) {
                case 1: this.color = COLORS.nebula1; break;
                case 2: this.color = COLORS.nebula2; break;
                case 3: this.color = COLORS.nebula3; break;
                default: this.color = COLORS.nebula1;
            }
            
            this.opacity = Math.random() * 0.2 + 0.05;
            
            // Slow movement
            this.speedX = (Math.random() - 0.5) * 0.05;
            this.speedY = (Math.random() - 0.5) * 0.05;
            
            // Create distortion points for non-uniform clouds
            this.distortionPoints = [];
            const pointCount = Math.floor(Math.random() * 5) + 5;
            
            for (let i = 0; i < pointCount; i++) {
                const angle = (i / pointCount) * Math.PI * 2;
                const distance = this.radius * (0.7 + Math.random() * 0.6);
                
                this.distortionPoints.push({
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    radiusOffset: Math.random() * 50 - 25
                });
            }
        }
        
        update() {
            // Move nebula cloud slowly
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap around edges
            if (this.x < -this.radius) this.x = canvas.width + this.radius;
            if (this.x > canvas.width + this.radius) this.x = -this.radius;
            if (this.y < -this.radius) this.y = canvas.height + this.radius;
            if (this.y > canvas.height + this.radius) this.y = -this.radius;
        }
        
        draw() {
            ctx.beginPath();
            
            // Create gradient for nebula effect
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.radius
            );
            
            gradient.addColorStop(0, this.color);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            ctx.fillStyle = gradient;
            
            // Create a non-uniform cloud shape
            if (this.distortionPoints.length > 2) {
                let firstPoint = true;
                
                for (let i = 0; i <= this.distortionPoints.length; i++) {
                    const point = this.distortionPoints[i % this.distortionPoints.length];
                    const x = this.x + point.x;
                    const y = this.y + point.y;
                    
                    if (firstPoint) {
                        ctx.moveTo(x, y);
                        firstPoint = false;
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
            } else {
                // Fallback to circle if not enough points
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            }
            
            ctx.closePath();
            ctx.fill();
        }
    }
    
    // GravityCenter affects star movement
    class GravityCenter {
        constructor(x, y, radius, strength, type, lifetime = null) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.strength = strength;
            this.type = type; // 'attract' or 'repel'
            this.lifetime = lifetime; // null for permanent, ms for temporary
            this.birthtime = Date.now();
            this.opacity = 1;
        }
        
        isActive() {
            if (!this.lifetime) return true;
            
            const age = Date.now() - this.birthtime;
            if (age > this.lifetime) return false;
            
            // Fade out in the last 500ms of lifetime
            if (this.lifetime - age < 500) {
                this.opacity = (this.lifetime - age) / 500;
            }
            
            return true;
        }
    }
    
    // Generate stars and nebula for the star field
    function generateStarField() {
        // Clear existing elements
        stars = [];
        nebulaClouds = [];
        gravityCenters = [];
        
        // Create nebula clouds first (background)
        const cloudsCount = Math.max(2, Math.floor((canvas.width * canvas.height) / 350000));
        for (let i = 0; i < cloudsCount; i++) {
            nebulaClouds.push(new NebulaCloud());
        }
        
        // Create stars (more dense where nebula clouds are)
        const starCount = Math.floor((canvas.width * canvas.height) / 1500);
        for (let i = 0; i < starCount; i++) {
            // Random position
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            
            // Check if star is in a nebula cloud (higher chance for larger star)
            let inNebula = false;
            let closestNebulaDistance = Infinity;
            
            for (const cloud of nebulaClouds) {
                const dx = x - cloud.x;
                const dy = y - cloud.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                closestNebulaDistance = Math.min(closestNebulaDistance, distance);
                
                if (distance < cloud.radius * 0.8) {
                    inNebula = true;
                    break;
                }
            }
            
            // Create star with properties based on nebula proximity
            let starSize, starOpacity, colorIndex, speed;
            
            if (inNebula) {
                // Stars in nebula are slightly larger and more colorful
                starSize = Math.random() * 2.5 + 0.5;
                starOpacity = Math.random() * 0.7 + 0.3;
                colorIndex = Math.floor(Math.random() * COLORS.stars.length);
                speed = (Math.random() - 0.5) * 0.08; // Slightly faster in nebula
            } else {
                // Normal stars
                starSize = Math.random() * 1.5 + 0.3;
                starOpacity = Math.random() * 0.5 + 0.1;
                colorIndex = Math.floor(Math.random() * 3); // Only white to light blue
                speed = (Math.random() - 0.5) * 0.04;
            }
            
            // Add larger stars occasionally
            if (Math.random() < 0.01) {
                starSize *= 2;
                starOpacity *= 1.5;
                if (starOpacity > 1) starOpacity = 1;
            }
            
            stars.push(new Star(x, y, starSize, starOpacity, colorIndex, speed));
        }
        
        // Add a few gravity centers in the nebula clouds
        for (let i = 0; i < nebulaClouds.length; i++) {
            if (Math.random() < 0.3) { // 30% chance for each cloud
                const cloud = nebulaClouds[i];
                const offset = {
                    x: (Math.random() - 0.5) * cloud.radius * 0.5,
                    y: (Math.random() - 0.5) * cloud.radius * 0.5
                };
                
                const gravityType = Math.random() < 0.7 ? 'attract' : 'repel';
                const strength = Math.random() * 0.01 + 0.005;
                
                gravityCenters.push(new GravityCenter(
                    cloud.x + offset.x,
                    cloud.y + offset.y,
                    cloud.radius * 0.7,
                    strength,
                    gravityType
                ));
            }
        }
    }
    
    // Create a new gravity center from a mouse click
    function createGravityFromClick(x, y) {
        if (!windowIsActive) return;
        
        // Get random properties
        const radius = Math.random() * 100 + 50;
        const strength = Math.random() * 0.02 + 0.01;
        const type = Math.random() < 0.5 ? 'attract' : 'repel';
        const lifetime = Math.random() * 3000 + 2000; // 2-5 seconds
        
        // Add to gravity centers
        gravityCenters.push(new GravityCenter(x, y, radius, strength, type, lifetime));
        
        // Create a new star burst effect
        createStarBurst(x, y, 20 + Math.floor(Math.random() * 15));
    }
    
    // Create a burst of new stars from a point
    function createStarBurst(x, y, count) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 0.8 + 0.2;
            const distance = Math.random() * 20;
            
            const newX = x + Math.cos(angle) * distance;
            const newY = y + Math.sin(angle) * distance;
            
            const star = new Star(
                newX, 
                newY, 
                Math.random() * 2 + 0.5,
                Math.random() * 0.7 + 0.3,
                Math.floor(Math.random() * COLORS.stars.length),
                (Math.random() - 0.5) * 0.5
            );
            
            // Make this star move outward
            star.speedX = Math.cos(angle) * speed * 0.2;
            star.speedY = Math.sin(angle) * speed * 0.2;
            star.maxDrift = 300; // Allow it to travel further
            
            stars.push(star);
        }
    }
    
    // Animation loop
    function animate() {
        // Clear canvas with a fade effect for trails
        ctx.fillStyle = 'rgba(5, 3, 20, 0.2)'; // Deep space with slight transparency
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw nebula clouds (background)
        for (const cloud of nebulaClouds) {
            cloud.update();
            cloud.draw();
        }
        
        // Update gravity centers
        gravityCenters = gravityCenters.filter(center => center.isActive());
        
        // Update and draw stars
        for (const star of stars) {
            star.update();
            star.draw();
        }
        
        // Create occasional star bursts at random positions
        if (windowIsActive && Math.random() < 0.001) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            createStarBurst(x, y, 5 + Math.floor(Math.random() * 8));
        }
        
        // Animation continues
        requestAnimationFrame(animate);
    }
    
    // Set up event listeners
    window.addEventListener('resize', resizeCanvas);
    
    // Click to create gravity center and star burst
    canvas.addEventListener('click', function(event) {
        createGravityFromClick(event.clientX, event.clientY);
    });
    
    // Start everything
    resizeCanvas();
    animate();

    // Initialize ripple effect
    initRippleEffect();
});

// Global variables for ripple effect
let addRipple;
let windowIsActive = true;

// Listen for window focus/blur events
window.addEventListener('focus', function() {
    windowIsActive = true;
});

window.addEventListener('blur', function() {
    windowIsActive = false;
});

// Initialize ripple effect
function initRippleEffect() {
    const canvas = document.getElementById('myCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let ripples = [];
    
    // Space-themed Ripple class
    class SpaceRipple {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.radius = 0;
            this.maxRadius = 150;
            this.speed = 2;
            this.opacity = 0.7;
            this.color = 'rgba(138, 43, 226, '; // Purple
            this.segments = Math.floor(Math.random() * 5) + 6; // 6-10 segments
            this.rotation = Math.random() * Math.PI * 2;
        }
        
        update() {
            this.radius += this.speed;
            this.opacity -= 0.01;
            this.rotation += 0.01;
            
            return this.opacity > 0 && this.radius < this.maxRadius;
        }
        
        draw() {
            // Main ripple circle
            ctx.strokeStyle = this.color + this.opacity + ')';
            ctx.lineWidth = 1;
            
            // Draw main circle with gaps
            for (let i = 0; i < this.segments; i++) {
                const angle1 = this.rotation + (i / this.segments) * Math.PI * 2;
                const angle2 = this.rotation + ((i + 0.8) / this.segments) * Math.PI * 2;
                
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, angle1, angle2);
                ctx.stroke();
            }
            
            // Draw inner circle (30% of main radius)
            ctx.strokeStyle = 'rgba(75, 0, 130, ' + this.opacity * 0.8 + ')'; // Indigo
            
            for (let i = 0; i < this.segments; i++) {
                const angle1 = -this.rotation + (i / this.segments) * Math.PI * 2;
                const angle2 = -this.rotation + ((i + 0.6) / this.segments) * Math.PI * 2;
                
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius * 0.3, angle1, angle2);
                ctx.stroke();
            }
        }
    }
    
    // Animation loop
    function animate() {
        // We don't clear the canvas here - the main animation loop handles that
        
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
        // Only add ripples if window is active
        if (windowIsActive) {
            ripples.push(new SpaceRipple(x, y));
        }
    };
    
    // Add a ripple on click
    window.addEventListener('click', function(event) {
        // Don't create ripples when clicking on interactive elements or when window is not active
        if (!windowIsActive || 
            event.target.closest('a') || 
            event.target.closest('button') || 
            event.target.closest('.accordion-header')) {
            return;
        }
        
        addRipple(event.clientX, event.clientY);
    });
}

