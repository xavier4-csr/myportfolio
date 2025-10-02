// Main Application Logic

class PortfolioApp {
    constructor() {
        this.api = window.portfolioAPI;
        this.ui = new window.PortfolioUI();
        this.isLoading = false;
        this.init();
    }

    // Initialize the application
    async init() {
        try {
            // Initialize AOS (Animate On Scroll)
            if (typeof AOS !== 'undefined') {
                AOS.init({
                    duration: 800,
                    once: true,
                    offset: 100
                });
            }

            // Initialize Vanta.js background
            this.initBackground();

            // Set up event listeners
            this.setupEventListeners();

            // Inline edit logic removed; all edits are backend-only

            // Initialize footer
            this.ui.initializeFooter();

            // Load all content
            await this.loadAllContent();

        } catch (error) {
            console.error('Failed to initialize portfolio app:', error);
        }
    }

    // Removed inline edit logic; all edits are now backend-only

    // Removed setupEditSection and all inline edit logic for robustness

    // Initialize background animation
    initBackground() {
        try {
            if (typeof VANTA !== 'undefined' && VANTA.GLOBE) {
                VANTA.GLOBE({
                    el: "#vanta-bg",
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 1.00,
                    scaleMobile: 1.00,
                    color: 0x3b82f6,
                    backgroundColor: 0xf8fafc,
                    size: 0.8
                });
            }
        } catch (error) {
            console.error('Failed to initialize background:', error);
        }
    }

    // Set up event listeners
    setupEventListeners() {
        // Mobile menu toggle
        const menuBtn = document.getElementById('menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });

            // Close mobile menu when clicking a link
            const mobileLinks = mobileMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });
        }

        // Contact form submission
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleContactFormSubmit.bind(this));
        }

        // Load more projects button
        const loadMoreBtn = document.getElementById('load-more-projects');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', this.loadAllProjects.bind(this));
        }

        // Refresh skills button
        const refreshSkillsBtn = document.getElementById('refresh-skills-btn');
        if (refreshSkillsBtn) {
            console.log('Refresh skills button found, adding event listener');
            refreshSkillsBtn.addEventListener('click', this.refreshSkills.bind(this));
        } else {
            console.log('Refresh skills button not found');
        }

        // Smooth scrolling for navigation links
        this.setupSmoothScrolling();

        // Skills animation observer
        this.setupSkillsObserver();
    }

    // Set up smooth scrolling
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Set up skills section observer for animation
    setupSkillsObserver() {
        const skillsSection = document.getElementById('skills');
        if (!skillsSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.ui.animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(skillsSection);
    }

    // Load all content
    async loadAllContent() {
        const loadingPromises = [
            this.loadProfile(),
            this.loadSkills(),
            this.loadFeaturedProjects(),
            this.loadExperience(),
            this.loadContactInfo()
        ];

        // Show loading states
        this.showLoadingStates();

        try {
            await Promise.all(loadingPromises);
        } catch (error) {
            console.error('Failed to load some content:', error);
        } finally {
            this.hideLoadingStates();
        }
    }

    // Load profile information
    async loadProfile() {
        try {
            const profile = await this.api.getProfile();
            // Normalize API shape (backend vs fallback may differ)
            const about = profile.about || {
                journey: profile.about_journey,
                interests: profile.about_interests,
            };
            const personalDetails = profile.personalDetails || {
                email: profile.email,
                location: profile.location,
                experience: profile.experience_years,
            };
            this.ui.renderProfile(profile);
            this.ui.renderAbout(about, personalDetails);
        } catch (error) {
            console.error('Failed to load profile:', error);
        }
    }

    // Load skills data
    async loadSkills() {
        try {
            const skills = await this.api.getSkills();
            this.ui.renderSkills(skills);
        } catch (error) {
            console.error('Failed to load skills:', error);
        }
    }

    // Load featured projects
    async loadFeaturedProjects() {
        try {
            const projects = await this.api.getProjects(6); // Featured projects, limit 6
            this.ui.renderProjects(projects);
        } catch (error) {
            console.error('Failed to load featured projects:', error);
        }
    }

    // Load all projects
    async loadAllProjects() {
        const loadMoreBtn = document.getElementById('load-more-projects');
        if (loadMoreBtn) {
            loadMoreBtn.textContent = 'Loading...';
            loadMoreBtn.disabled = true;
        }

        try {
            const projects = await this.api.getProjects(false); // All projects
            this.ui.renderProjects(projects);
            
            if (loadMoreBtn) {
                loadMoreBtn.style.display = 'none'; // Hide the button after loading all
            }
        } catch (error) {
            console.error('Failed to load all projects:', error);
            if (loadMoreBtn) {
                loadMoreBtn.textContent = 'View All Projects';
                loadMoreBtn.disabled = false;
            }
        }
    }

    // Load experience data
    async loadExperience() {
        try {
            const experiences = await this.api.getExperience();
            this.ui.renderExperience(experiences);
        } catch (error) {
            console.error('Failed to load experience:', error);
        }
    }

    // Load contact information
    async loadContactInfo() {
        try {
            const contactInfo = await this.api.getContactInfo();
            this.ui.renderContactInfo(contactInfo);
        } catch (error) {
            console.error('Failed to load contact info:', error);
        }
    }

    // Handle contact form submission
    async handleContactFormSubmit(e) {
        e.preventDefault();
        
        if (this.isLoading) return;

        const form = e.target;
        const formData = new FormData(form);
        const messageData = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Validate form data
        if (!this.validateContactForm(messageData)) {
            return;
        }

        this.isLoading = true;
        this.ui.setFormSubmitting(true);

        try {
            const result = await this.api.sendContactMessage(messageData);
            
            if (result.success) {
                this.ui.showSuccessMessage(form, 'Message sent successfully! Thank you for reaching out.');
                form.reset();
            } else {
                this.ui.showErrorMessage(form, result.error || 'Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Failed to send message:', error);
            this.ui.showErrorMessage(form, 'An error occurred. Please try again later.');
        } finally {
            this.isLoading = false;
            this.ui.setFormSubmitting(false);
        }
    }

    // Validate contact form
    validateContactForm(data) {
        const errors = [];

        if (!data.name || data.name.trim().length < 2) {
            errors.push('Name is required and must be at least 2 characters.');
        }

        if (!data.email || !this.isValidEmail(data.email)) {
            errors.push('A valid email address is required.');
        }

        if (!data.subject || data.subject.trim().length < 5) {
            errors.push('Subject is required and must be at least 5 characters.');
        }

        if (!data.message || data.message.trim().length < 10) {
            errors.push('Message is required and must be at least 10 characters.');
        }

        if (errors.length > 0) {
            const form = document.getElementById('contact-form');
            this.ui.showErrorMessage(form, errors.join(' '));
            return false;
        }

        return true;
    }

    // Email validation helper
    isValidEmail(email) {
        if (!email || typeof email !== 'string') return false;
        const trimmed = email.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return emailRegex.test(trimmed);
    }
}

// Bootstrap app when DOM is ready
(function () {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => new PortfolioApp());
    } else {
        new PortfolioApp();
    }
})();