// API Configuration
const API_CONFIG = {
    baseURL: 'http://localhost:3000/api', // Change this to your backend URL
    endpoints: {
        profile: '/profile',
        skills: '/skills',
        projects: '/projects',
        experience: '/experience',
        contact: '/contact',
        sendMessage: '/contact/send'
    }
};

// API Class for handling all backend communications
class PortfolioAPI {
    constructor(config) {
        this.baseURL = config.baseURL;
        this.endpoints = config.endpoints;
    }

    // Generic HTTP request method
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const finalOptions = { ...defaultOptions, ...options };

        try {
            const response = await fetch(url, finalOptions);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            console.error('API request failed:', error);
            return { success: false, error: error.message };
        }
    }

    // GET request method
    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }

    // POST request method
    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    // GET profile information
    async getProfile() {
        const result = await this.get(this.endpoints.profile);
        if (result.success) {
            return result.data;
        }
        // Return default data if API fails
        return this.getDefaultProfile();
    }

    // GET skills data
    async getSkills() {
        const result = await this.get(this.endpoints.skills);
        if (result.success) {
            return result.data;
        }
        return this.getDefaultSkills();
    }

    // GET projects data
    async getProjects(limit = null) {
        const endpoint = limit ? `${this.endpoints.projects}?limit=${limit}` : this.endpoints.projects;
        const result = await this.get(endpoint);
        if (result.success) {
            return result.data;
        }
        return this.getDefaultProjects();
    }

    // GET experience data
    async getExperience() {
        const result = await this.get(this.endpoints.experience);
        if (result.success) {
            return result.data;
        }
        return this.getDefaultExperience();
    }

    // GET contact information
    async getContactInfo() {
        const result = await this.get(this.endpoints.contact);
        if (result.success) {
            return result.data;
        }
        return this.getDefaultContact();
    }

    // POST send contact message
    async sendMessage(messageData) {
        return this.post(this.endpoints.sendMessage, messageData);
    }

    // Default/fallback data methods
    getDefaultProfile() {
        return {
            name: "Your Name",
            title: "Full Stack Developer",
            intro: "Building digital experiences that matter. Passionate about solving problems through code.",
            about: {
                journey: "I began my coding journey in 2020 when I discovered my passion for building things with code. Since then, I've worked on numerous projects, collaborated with talented people, and continuously improved my skills.",
                interests: "When I'm not coding, you'll find me reading tech blogs and exploring new technologies. I believe in lifelong learning and staying curious about technology and the world around me."
            },
            personalDetails: {
                email: "your.email@example.com",
                location: "City, Country",
                experience: "3+ Years"
            },
            profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
        };
    }

    getDefaultSkills() {
        return {
            technical: [
                { name: "JavaScript", level: 90 },
                { name: "React", level: 85 },
                { name: "Node.js", level: 80 },
                { name: "Python", level: 75 },
                { name: "MongoDB", level: 70 }
            ],
            professional: [
                { name: "Communication", icon: "message-square" },
                { name: "Time Management", icon: "clock" },
                { name: "Teamwork", icon: "users" },
                { name: "Problem Solving", icon: "target" }
            ],
            technologies: [
                { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
                { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
                { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
                { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
                { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
                { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" }
            ]
        };
    }

    getDefaultProjects() {
        return [
            {
                id: 1,
                title: "E-commerce Platform",
                description: "A full-featured e-commerce platform with payment integration and admin dashboard.",
                image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=640&h=360&fit=crop",
                technologies: ["React", "Node.js", "MongoDB"],
                githubUrl: "https://github.com/yourusername/ecommerce-platform",
                liveUrl: "https://your-ecommerce-demo.com",
                featured: true
            },
            {
                id: 2,
                title: "Task Management App",
                description: "A collaborative task management application with real-time updates.",
                image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=640&h=360&fit=crop",
                technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
                githubUrl: "https://github.com/yourusername/task-manager",
                liveUrl: "https://your-task-app.com",
                featured: true
            },
            {
                id: 3,
                title: "Portfolio Website",
                description: "A responsive portfolio website showcasing my work and skills.",
                image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=640&h=360&fit=crop",
                technologies: ["HTML/CSS", "JavaScript", "GSAP"],
                githubUrl: "https://github.com/yourusername/portfolio",
                liveUrl: "https://your-portfolio.com",
                featured: true
            }
        ];
    }

    getDefaultExperience() {
        return [
            {
                id: 1,
                title: "Senior Developer",
                company: "Tech Company Inc.",
                period: "2020 - Present",
                description: "Led a team of developers in building scalable web applications. Implemented CI/CD pipelines and mentored junior developers.",
                type: "experience"
            },
            {
                id: 2,
                title: "Frontend Developer",
                company: "Digital Agency",
                period: "2018 - 2020",
                description: "Developed responsive web applications using React and Vue.js. Collaborated with designers to implement UI/UX best practices.",
                type: "experience"
            },
            {
                id: 3,
                title: "Computer Science Degree",
                company: "University Name",
                period: "2014 - 2018",
                description: "Specialized in software engineering and web development. Completed coursework in algorithms, databases, and human-computer interaction.",
                type: "education"
            }
        ];
    }

    getDefaultContact() {
        return {
            email: "your.email@example.com",
            phone: "+1 (234) 567-890",
            location: "City, Country",
            social: [
                { name: "GitHub", url: "https://github.com/yourusername", icon: "github" },
                { name: "LinkedIn", url: "https://linkedin.com/in/yourusername", icon: "linkedin" },
                { name: "Twitter", url: "https://twitter.com/yourusername", icon: "twitter" },
                { name: "Instagram", url: "https://instagram.com/yourusername", icon: "instagram" }
            ],
            resumeUrl: "/assets/resume.pdf"
        };
    }
}

// Create and export API instance
const portfolioAPI = new PortfolioAPI(API_CONFIG);

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = portfolioAPI;
} else {
    window.portfolioAPI = portfolioAPI;
}