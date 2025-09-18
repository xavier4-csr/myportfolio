// UI Component Functions

class PortfolioUI {
    constructor() {
        this.elements = this.initializeElements();
        this.loadingStates = new Set();
    }

    // Initialize DOM elements
    initializeElements() {
        return {
            // Profile elements
            userName: document.getElementById('user-name'),
            userTitle: document.getElementById('user-title'),
            userIntro: document.getElementById('user-intro'),
            profileImage: document.getElementById('profile-image'),
            
            // Content containers
            aboutContent: document.getElementById('about-content'),
            personalDetails: document.getElementById('personal-details'),
            technicalSkills: document.getElementById('technical-skills'),
            professionalSkills: document.getElementById('professional-skills'),
            technologies: document.getElementById('technologies'),
            projectsContainer: document.getElementById('projects-container'),
            timeline: document.getElementById('timeline'),
            contactInfo: document.getElementById('contact-info'),
            socialLinks: document.getElementById('social-links'),
            footerSocial: document.getElementById('footer-social'),
            footerName: document.getElementById('footer-name'),
            
            // Form elements
            contactForm: document.getElementById('contact-form'),
            downloadResume: document.getElementById('download-resume'),
            
            // Buttons
            loadMoreProjects: document.getElementById('load-more-projects'),
            
            // Footer
            currentYear: document.getElementById('current-year')
        };
    }

    // Show loading state
    showLoading(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.add('loading');
            this.loadingStates.add(elementId);
        }
    }

    // Hide loading state
    hideLoading(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.remove('loading');
            this.loadingStates.delete(elementId);
        }
    }

    // Render profile information
    renderProfile(profile) {
        if (this.elements.userName) {
            this.elements.userName.textContent = profile.name;
        }
        if (this.elements.userTitle) {
            this.elements.userTitle.textContent = profile.title;
        }
        if (this.elements.userIntro) {
            this.elements.userIntro.textContent = profile.intro;
        }
        if (this.elements.profileImage) {
            this.elements.profileImage.src = profile.profileImage;
            this.elements.profileImage.alt = profile.name;
        }
        if (this.elements.footerName) {
            this.elements.footerName.textContent = profile.name;
        }
    }

    // Render about section
    renderAbout(about, personalDetails) {
        if (this.elements.aboutContent) {
            this.elements.aboutContent.innerHTML = `
                <h3 class="text-2xl font-semibold text-gray-800 mb-4">My Journey</h3>
                <p class="text-gray-600 mb-6">${about.journey}</p>
                <p class="text-gray-600 mb-6">${about.interests}</p>
                <div class="flex space-x-4">
                    <div class="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
                        <svg class="inline mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                        </svg>
                        Problem Solver
                    </div>
                    <div class="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
                        <svg class="inline mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                        </svg>
                        Team Player
                    </div>
                </div>
            `;
        }

        if (this.elements.personalDetails) {
            this.elements.personalDetails.innerHTML = `
                <div class="flex items-center">
                    <svg class="text-blue-600 mr-4 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <div>
                        <p class="text-gray-500 text-sm">Name</p>
                        <p class="text-gray-800">${personalDetails.name || 'Your Name'}</p>
                    </div>
                </div>
                <div class="flex items-center">
                    <svg class="text-blue-600 mr-4 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <div>
                        <p class="text-gray-500 text-sm">Email</p>
                        <p class="text-gray-800">${personalDetails.email}</p>
                    </div>
                </div>
                <div class="flex items-center">
                    <svg class="text-blue-600 mr-4 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <div>
                        <p class="text-gray-500 text-sm">Location</p>
                        <p class="text-gray-800">${personalDetails.location}</p>
                    </div>
                </div>
                <div class="flex items-center">
                    <svg class="text-blue-600 mr-4 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"></path>
                    </svg>
                    <div>
                        <p class="text-gray-500 text-sm">Experience</p>
                        <p class="text-gray-800">${personalDetails.experience}</p>
                    </div>
                </div>
            `;
        }
    }

    // Render skills sections
    renderSkills(skills) {
        // Technical skills
        if (this.elements.technicalSkills) {
            this.elements.technicalSkills.innerHTML = skills.technical.map(skill => `
                <div>
                    <div class="flex justify-between mb-1">
                        <span class="text-gray-700">${skill.name}</span>
                        <span class="text-gray-500">${skill.level}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="skill-bar bg-blue-600 h-2 rounded-full" style="--skill-width: ${skill.level}%"></div>
                    </div>
                </div>
            `).join('');
        }

        // Professional skills
        if (this.elements.professionalSkills) {
            this.elements.professionalSkills.innerHTML = skills.professional.map(skill => `
                <div class="bg-white p-4 rounded-lg shadow-sm flex items-center">
                    ${this.getIconSVG(skill.icon)}
                    <span>${skill.name}</span>
                </div>
            `).join('');
        }

        // Technologies
        if (this.elements.technologies) {
            this.elements.technologies.innerHTML = skills.technologies.map(tech => `
                <div class="tech-icon transition-transform duration-200 hover:scale-110" data-tech="${tech.name.toLowerCase()}">
                    <img src="${tech.icon}" alt="${tech.name}" class="w-12 h-12" title="${tech.name}">
                </div>
            `).join('');
        }

        // Animate skill bars after rendering
        this.animateSkillBars();
    }

    // Render projects
    renderProjects(projects) {
        if (!this.elements.projectsContainer) return;

        this.elements.projectsContainer.innerHTML = projects.map((project, index) => `
            <div class="project-card bg-white rounded-xl shadow-md overflow-hidden transition duration-300" 
                 data-aos="fade-up" data-aos-delay="${(index + 1) * 100}">
                <div class="h-48 overflow-hidden">
                    <img src="${project.image_url}" alt="${project.title}" class="w-full h-full object-cover">
                </div>
                <div class="p-6">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="text-xl font-bold text-gray-800">${project.title}</h3>
                        <div class="flex space-x-2">
                            ${project.github_url ? `
                                <a href="${project.github_url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800">
                                    ${this.getIconSVG('github')}
                                </a>
                            ` : ''}
                            ${project.live_url ? `
                                <a href="${project.live_url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800">
                                    ${this.getIconSVG('external-link')}
                                </a>
                            ` : ''}
                        </div>
                    </div>
                    <p class="text-gray-600 mb-4">${project.description}</p>
                    <div class="flex flex-wrap gap-2">
                        ${Array.isArray(project.technologies) ? 
                            project.technologies.map(tech => `
                                <span class="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">${tech}</span>
                            `).join('') : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Render experience timeline
    renderExperience(experiences) {
        if (!this.elements.timeline) return;

        this.elements.timeline.innerHTML = experiences.map((exp, index) => `
            <div class="relative timeline-item pl-8" data-aos="fade-up" data-aos-delay="${(index + 1) * 100}">
                <div class="timeline-dot"></div>
                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                        <h3 class="text-xl font-bold text-gray-800">${exp.title}</h3>
                        <span class="text-blue-600 font-medium">${exp.period}</span>
                    </div>
                    <h4 class="text-gray-600 font-medium mb-3">${exp.company}</h4>
                    <p class="text-gray-600">${exp.description}</p>
                </div>
            </div>
        `).join('');
    }

    // Render contact information
    renderContactInfo(contactInfo) {
        if (this.elements.contactInfo) {
            this.elements.contactInfo.innerHTML = `
                <div class="flex items-start">
                    <div class="bg-blue-100 p-3 rounded-full mr-4">
                        ${this.getIconSVG('mail')}
                    </div>
                    <div>
                        <h4 class="text-gray-500 text-sm">Email</h4>
                        <a href="mailto:${contactInfo.email}" class="text-gray-800 hover:text-blue-600">${contactInfo.email}</a>
                    </div>
                </div>
                <div class="flex items-start">
                    <div class="bg-blue-100 p-3 rounded-full mr-4">
                        ${this.getIconSVG('phone')}
                    </div>
                    <div>
                        <h4 class="text-gray-500 text-sm">Phone</h4>
                        <a href="tel:${contactInfo.phone}" class="text-gray-800 hover:text-blue-600">${contactInfo.phone}</a>
                    </div>
                </div>
                <div class="flex items-start">
                    <div class="bg-blue-100 p-3 rounded-full mr-4">
                        ${this.getIconSVG('map-pin')}
                    </div>
                    <div>
                        <h4 class="text-gray-500 text-sm">Location</h4>
                        <p class="text-gray-800">${contactInfo.location}</p>
                    </div>
                </div>
            `;
        }

        // Render social links
        this.renderSocialLinks(contactInfo.social);

        // Update resume download link
        if (this.elements.downloadResume && contactInfo.resume_url) {
            this.elements.downloadResume.href = contactInfo.resume_url;
            this.elements.downloadResume.style.display = 'inline-flex';
        }
    }

    // Render social links
    renderSocialLinks(socialLinks) {
        const socialHTML = socialLinks.map(link => `
            <a href="${link.url}" target="_blank" rel="noopener noreferrer" 
               class="bg-gray-100 p-3 rounded-full hover:bg-blue-100 transition">
                ${this.getIconSVG(link.icon)}
            </a>
        `).join('');

        if (this.elements.socialLinks) {
            this.elements.socialLinks.innerHTML = socialHTML;
        }
        if (this.elements.footerSocial) {
            this.elements.footerSocial.innerHTML = socialHTML;
        }
    }

    // Animate skill bars
    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        skillBars.forEach(bar => {
            // Reset width
            bar.style.width = '0%';
            // Animate to target width
            setTimeout(() => {
                bar.classList.add('animated');
                bar.style.width = bar.style.getPropertyValue('--skill-width') || '0%';
            }, 100);
        });
    }

    // Show success message
    showSuccessMessage(element, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'success-message';
        messageDiv.textContent = message;
        element.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    // Show error message
    showErrorMessage(element, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'error-message';
        messageDiv.textContent = message;
        element.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    // Handle form submission states
    setFormSubmitting(isSubmitting) {
        const form = this.elements.contactForm;
        const submitBtn = form.querySelector('button[type="submit"]');
        const submitText = document.getElementById('submit-text');
        const loadingText = document.getElementById('loading-text');

        if (isSubmitting) {
            form.classList.add('loading');
            submitBtn.disabled = true;
            submitText.classList.add('hidden');
            loadingText.classList.remove('hidden');
        } else {
            form.classList.remove('loading');
            submitBtn.disabled = false;
            submitText.classList.remove('hidden');
            loadingText.classList.add('hidden');
        }
    }

    // Initialize current year in footer
    initializeFooter() {
        if (this.elements.currentYear) {
            this.elements.currentYear.textContent = new Date().getFullYear();
        }
    }

    // Get SVG icon for various icons
    getIconSVG(iconName) {
        const icons = {
            'github': `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
            'linkedin': `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
            'twitter': `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>`,
            'instagram': `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
            'external-link': `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>`,
            'mail': `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`,
            'phone': `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>`,
            'map-pin': `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`,
            'message-square': `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>`,
            'clock': `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
            'users': `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path></svg>`,
            'target': `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
        };
        return icons[iconName] || '';
    }
}

// Export the UI class
window.PortfolioUI = PortfolioUI;