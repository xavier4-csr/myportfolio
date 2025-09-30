// Enhanced Interactive Features

class InteractiveFeatures {
    constructor() {
        this.init();
    }

    init() {
        this.initScrollEffects();
        this.initScrollToTop();
        this.initParallax();
        this.initCursor();
        this.initTypingEffect();
        this.initCounters();
        this.initCardHoverEffects();
        this.initFormAnimations();
    }

    // Scroll-based navigation effects
    initScrollEffects() {
        let lastScroll = 0;
        const nav = document.querySelector('nav');
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Add scrolled class
            if (currentScroll > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
            
            // Update active nav link
            this.updateActiveNavLink();
            
            lastScroll = currentScroll;
        });
    }

    // Update active navigation link based on scroll position
    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
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

    // Scroll to top button
    initScrollToTop() {
        // Create button if it doesn't exist
        let scrollBtn = document.getElementById('scroll-to-top');
        if (!scrollBtn) {
            scrollBtn = document.createElement('button');
            scrollBtn.id = 'scroll-to-top';
            scrollBtn.innerHTML = `
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                </svg>
            `;
            scrollBtn.setAttribute('aria-label', 'Scroll to top');
            document.body.appendChild(scrollBtn);
        }
        
        // Show/hide button
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('show');
            } else {
                scrollBtn.classList.remove('show');
            }
        });
        
        // Scroll to top on click
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Parallax effect for hero section
    initParallax() {
        const heroSection = document.getElementById('home');
        if (!heroSection) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = heroSection.querySelectorAll('[data-aos]');
            
            parallaxElements.forEach((el, index) => {
                const speed = (index + 1) * 0.1;
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // Custom cursor effect
    initCursor() {
        // Only on desktop
        if (window.innerWidth < 768) return;
        
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid #3b82f6;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.1s ease;
            display: none;
        `;
        document.body.appendChild(cursor);
        
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.display = 'block';
        });
        
        // Smooth cursor follow
        function animate() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursor.style.left = cursorX - 10 + 'px';
            cursor.style.top = cursorY - 10 + 'px';
            
            requestAnimationFrame(animate);
        }
        animate();
        
        // Expand cursor on hover
        const hoverElements = document.querySelectorAll('a, button, .project-card, .tech-icon');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursor.style.borderColor = '#8b5cf6';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.borderColor = '#3b82f6';
            });
        });
    }

    // Typing effect for hero text
    initTypingEffect() {
        const titleElement = document.getElementById('user-title');
        if (!titleElement) return;
        
        const originalText = titleElement.textContent;
        const titles = [
            originalText,
            'Web Developer',
            'UI/UX Enthusiast',
            'Problem Solver',
            'Tech Innovator'
        ];
        
        let titleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentTitle = titles[titleIndex];
            
            if (isDeleting) {
                titleElement.textContent = currentTitle.substring(0, charIndex - 1);
                charIndex--;
            } else {
                titleElement.textContent = currentTitle.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentTitle.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                typeSpeed = 500;
            }
            
            setTimeout(type, typeSpeed);
        }
        
        setTimeout(type, 1000);
    }

    // Animated counters for stats
    initCounters() {
        const counters = document.querySelectorAll('[data-counter]');
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-counter'));
                    animateCounter(counter, 0, target, 2000);
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);
        
        counters.forEach(counter => observer.observe(counter));
        
        function animateCounter(element, start, end, duration) {
            const startTime = performance.now();
            const range = end - start;
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = Math.round(start + (range * easeOutQuart));
                
                element.textContent = current + (element.getAttribute('data-suffix') || '');
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }
            
            requestAnimationFrame(updateCounter);
        }
    }

    // Enhanced card hover effects
    initCardHoverEffects() {
        const cards = document.querySelectorAll('.project-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // Form field animations
    initFormAnimations() {
        const formInputs = document.querySelectorAll('.form-input');
        
        formInputs.forEach(input => {
            // Floating label effect
            input.addEventListener('focus', () => {
                const label = input.previousElementSibling;
                if (label && label.classList.contains('form-label')) {
                    label.style.transform = 'translateY(-5px)';
                    label.style.color = '#3b82f6';
                }
            });
            
            input.addEventListener('blur', () => {
                const label = input.previousElementSibling;
                if (label && label.classList.contains('form-label') && !input.value) {
                    label.style.transform = '';
                    label.style.color = '';
                }
            });
            
            // Character counter for textarea
            if (input.tagName === 'TEXTAREA') {
                const maxLength = input.getAttribute('maxlength') || 1000;
                const counter = document.createElement('div');
                counter.className = 'text-sm text-gray-500 mt-1';
                counter.textContent = `0 / ${maxLength}`;
                input.parentElement.appendChild(counter);
                
                input.addEventListener('input', () => {
                    const length = input.value.length;
                    counter.textContent = `${length} / ${maxLength}`;
                    counter.style.color = length > maxLength * 0.9 ? '#ef4444' : '#6b7280';
                });
            }
            
            // Validation feedback
            input.addEventListener('input', () => {
                if (input.validity.valid) {
                    input.style.borderColor = '#10b981';
                } else if (input.value) {
                    input.style.borderColor = '#ef4444';
                } else {
                    input.style.borderColor = '#e5e7eb';
                }
            });
        });
    }
}

// Particle background effect
class ParticleBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        
        this.init();
    }

    init() {
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -2;
            pointer-events: none;
        `;
        document.body.appendChild(this.canvas);
        
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
            this.ctx.fill();
        });
        
        // Draw connections
        this.particles.forEach((p1, i) => {
            this.particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 - distance / 750})`;
                    this.ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Smooth reveal animations
class RevealAnimations {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements
        const fadeElements = document.querySelectorAll('.fade-in');
        const slideElements = document.querySelectorAll('.slide-in');

        fadeElements.forEach(el => observer.observe(el));
        slideElements.forEach(el => observer.observe(el));
    }
}

// Project filter functionality
class ProjectFilter {
    constructor() {
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        // Add filter buttons if not exists
        const projectsSection = document.getElementById('projects');
        if (!projectsSection) return;

        const header = projectsSection.querySelector('.section-header');
        if (!header) return;

        const filterContainer = document.createElement('div');
        filterContainer.className = 'flex justify-center gap-4 mt-8 flex-wrap';
        filterContainer.innerHTML = `
            <button class="filter-btn active" data-filter="all">All Projects</button>
            <button class="filter-btn" data-filter="featured">Featured</button>
            <button class="filter-btn" data-filter="web">Web Apps</button>
            <button class="filter-btn" data-filter="mobile">Mobile</button>
        `;

        // Add styles for filter buttons
        const style = document.createElement('style');
        style.textContent = `
            .filter-btn {
                padding: 0.5rem 1.5rem;
                border-radius: 2rem;
                border: 2px solid #e5e7eb;
                background: white;
                color: #6b7280;
                font-weight: 600;
                transition: all 0.3s;
                cursor: pointer;
            }
            .filter-btn:hover {
                border-color: #3b82f6;
                color: #3b82f6;
                transform: translateY(-2px);
            }
            .filter-btn.active {
                background: linear-gradient(135deg, #3b82f6, #8b5cf6);
                color: white;
                border-color: transparent;
            }
        `;
        document.head.appendChild(style);

        header.appendChild(filterContainer);

        // Add click handlers
        const filterBtns = filterContainer.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filterProjects(btn.dataset.filter);
            });
        });
    }

    filterProjects(filter) {
        const projects = document.querySelectorAll('.project-card');
        
        projects.forEach(project => {
            project.style.display = 'none';
            project.style.opacity = '0';
            
            setTimeout(() => {
                if (filter === 'all' || project.dataset.category === filter) {
                    project.style.display = 'block';
                    setTimeout(() => {
                        project.style.opacity = '1';
                    }, 50);
                }
            }, 300);
        });
    }
}

// Initialize all interactive features
document.addEventListener('DOMContentLoaded', () => {
    new InteractiveFeatures();
    new RevealAnimations();
    new ProjectFilter();
    
    // Only init particles on desktop for performance
    if (window.innerWidth > 768) {
        new ParticleBackground();
    }
});

// Export for use in other files
if (typeof window !== 'undefined') {
    window.InteractiveFeatures = InteractiveFeatures;
    window.ParticleBackground = ParticleBackground;
    window.RevealAnimations = RevealAnimations;
    window.ProjectFilter = ProjectFilter;
}