// Main JavaScript for Bal Gokul Website

// Load external HTML files
async function loadComponent(url, containerId) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        document.getElementById(containerId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading ${url}:`, error);
    }
}

// Page navigation function
function showPage(pageId) {
    // Hide privacy policy and registration form if shown
    hidePrivacyPolicy();
    hideRegistrationForm();
    
    // Hide all page content
    const mainContent = document.getElementById('main-content');
    
    // Load the specific page
    loadComponent(`pages/${pageId}.html`, 'main-content')
        .then(() => {
            // Update navigation active state
            updateNavigation(pageId);
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Initialize page-specific functionality
            initializePageFeatures(pageId);
        });
}

// Update navigation active state
function updateNavigation(activePageId) {
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current page link
    const activeLink = document.querySelector(`[onclick*="showPage('${activePageId}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Initialize page-specific features
function initializePageFeatures(pageId) {
    // Initialize animations
    initializeAnimations();
    
    // Page-specific initialization
    switch(pageId) {
        case 'gallery':
            initializeGallery();
            break;
        case 'contact':
            initializeSocialLinks();
            break;
        case 'registration':
            initializeRegistrationPage();
            break;
    }
}

// Initialize animations for page elements
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and animated elements
    const animatedElements = document.querySelectorAll('.custom-card, .event-card, .contact-card, .gallery-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Initialize gallery functionality
function initializeGallery() {
    console.log('Gallery page loaded');
    // Add any gallery-specific functionality here
}

// Initialize social links
function initializeSocialLinks() {
    console.log('Contact page with social links loaded');
    // Add any social media specific functionality here
}

// Initialize registration page
function initializeRegistrationPage() {
    console.log('Registration page loaded');
    // Add registration page specific functionality here
}

// Privacy policy functions
function showPrivacyPolicy() {
    loadComponent('pages/privacy-policy.html', 'privacy-policy-container')
        .then(() => {
            document.getElementById('privacy-policy-container').style.display = 'block';
            document.getElementById('privacy-policy-container').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
}

function hidePrivacyPolicy() {
    const privacyContainer = document.getElementById('privacy-policy-container');
    if (privacyContainer) {
        privacyContainer.style.display = 'none';
    }
}

// Enhanced scroll effect for navbar
function initializeNavbarScroll() {
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.custom-navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        }
    });
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load header, navigation, and footer
    Promise.all([
        loadComponent('components/header.html', 'header-container'),
        loadComponent('components/navigation.html', 'navigation-container'),
        loadComponent('components/footer.html', 'footer-container')
    ]).then(() => {
        // Load home page by default
        showPage('home');
        
        // Initialize navbar scroll effect
        initializeNavbarScroll();
        
        // Add click event listeners to nav links to prevent default anchor behavior
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
            });
        });
        
        console.log('Bal Gokul website initialized successfully');
    });
});

// Global functions that need to be accessible from HTML
window.showPage = showPage;
window.showPrivacyPolicy = showPrivacyPolicy;
window.hidePrivacyPolicy = hidePrivacyPolicy;