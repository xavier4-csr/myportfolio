// Security and Utility Functions

class SecurityUtils {
    // Sanitize HTML to prevent XSS
    static sanitizeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // Validate URL to prevent malicious links
    static isValidURL(url) {
        try {
            const urlObj = new URL(url);
            return ['http:', 'https:', 'mailto:', 'tel:'].includes(urlObj.protocol);
        } catch {
            return false;
        }
    }

    // Rate limiting for form submissions
    static createRateLimiter(maxAttempts = 3, windowMs = 60000) {
        const attempts = new Map();
        
        return function(identifier) {
            const now = Date.now();
            const userAttempts = attempts.get(identifier) || [];
            
            // Clean old attempts
            const recentAttempts = userAttempts.filter(time => now - time < windowMs);
            
            if (recentAttempts.length >= maxAttempts) {
                return false; // Rate limited
            }
            
            recentAttempts.push(now);
            attempts.set(identifier, recentAttempts);
            return true; // Allowed
        };
    }
}

class UIUtils {
    // Debounce function for performance
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle function for scroll events
    static throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Image lazy loading with error handling
    static lazyLoadImage(img, src, fallbackSrc = null) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    
                    image.onload = () => {
                        image.classList.remove('loading');
                        image.classList.add('loaded');
                    };
                    
                    image.onerror = () => {
                        if (fallbackSrc && image.src !== fallbackSrc) {
                            image.src = fallbackSrc;
                        } else {
                            image.style.display = 'none';
                            console.warn('Failed to load image:', src);
                        }
                    };
                    
                    image.src = src;
                    observer.unobserve(image);
                }
            });
        });
        
        observer.observe(img);
    }

    // Create loading skeleton
    static createSkeleton(className = 'skeleton', width = '100%', height = '20px') {
        const skeleton = document.createElement('div');
        skeleton.className = className;
        skeleton.style.width = width;
        skeleton.style.height = height;
        return skeleton;
    }

    // Format date consistently
    static formatDate(dateString) {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch {
            return dateString; // Return original if parsing fails
        }
    }

    // Animate counter numbers
    static animateCounter(element, start, end, duration = 2000) {
        const startTime = performance.now();
        const difference = end - start;
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.round(start + (difference * easeOutQuart));
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
}

class AccessibilityUtils {
    // Announce content changes to screen readers
    static announceToScreenReader(message, priority = 'polite') {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', priority);
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only'; // Screen reader only
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // Manage focus for single page apps
    static manageFocus(element) {
        if (element && typeof element.focus === 'function') {
            element.focus();
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // Add skip link for keyboard navigation
    static addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'sr-only sr-only-focusable';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #000;
            color: #fff;
            padding: 8px 16px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
}

class PerformanceUtils {
    // Measure and log performance metrics
    static measurePerformance(name, fn) {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        
        console.log(`${name} took ${end - start} milliseconds`);
        return result;
    }

    // Preload critical resources
    static preloadResource(href, as = 'script') {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = as;
        link.href = href;
        document.head.appendChild(link);
    }

    // Optimize images for device
    static getOptimizedImageURL(baseUrl, width, height) {
        if (baseUrl.includes('unsplash.com')) {
            return `${baseUrl}&w=${width}&h=${height}&fit=crop&auto=format&q=80`;
        }
        return baseUrl; // Return original if not supported
    }
}

// Export utilities
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SecurityUtils,
        UIUtils,
        AccessibilityUtils,
        PerformanceUtils
    };
} else {
    window.SecurityUtils = SecurityUtils;
    window.UIUtils = UIUtils;
    window.AccessibilityUtils = AccessibilityUtils;
    window.PerformanceUtils = PerformanceUtils;
}