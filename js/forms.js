// Form handling JavaScript for Bal Gokul Website

// Registration form functions
function showRegistrationForm() {
    // Load the registration form if not already loaded
    loadComponent('components/registration-form.html', 'registration-form-container')
        .then(() => {
            document.getElementById('registration-form-container').style.display = 'block';
            document.getElementById('registration-form-container').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
}

function hideRegistrationForm() {
    const formContainer = document.getElementById('registration-form-container');
    if (formContainer) {
        formContainer.style.display = 'none';
    }
}

function handleRegistration(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const registration = {
        childName: formData.get('childName'),
        gradeLevel: formData.get('gradeLevel'),
        parentName: formData.get('parentName'),
        parentPhone: formData.get('parentPhone'),
        parentEmail: formData.get('parentEmail'),
        additionalInfo: formData.get('additionalInfo')
    };

    // Validate required fields
    if (!registration.childName || !registration.gradeLevel || !registration.parentName || 
        !registration.parentPhone || !registration.parentEmail) {
        alert('Please fill in all required fields.');
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registration.parentEmail)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^[\d\s\-\+\(\)\.]+$/;
    if (!phoneRegex.test(registration.parentPhone)) {
        alert('Please enter a valid phone number.');
        return;
    }

    // Simulate form submission (replace with actual form submission logic)
    console.log('Registration data:', registration);
    
    // Show success message
    alert(`Thank you for registering ${registration.childName} for Bal Gokul classes!\n\nWe will contact you at ${registration.parentEmail} within 24 hours with next steps.\n\nYou can also visit us any Sunday from 10:00 AM - 11:30 AM at Alvey Elementary School.`);
    
    // Reset form and hide it
    event.target.reset();
    hideRegistrationForm();
    
    // In a real implementation, you would send this data to your server
    // Example: await submitRegistration(registration);
}

// Function to load component (reused from main.js)
async function loadComponent(url, containerId) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        document.getElementById(containerId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading ${url}:`, error);
    }
}

// Contact form handling (if you add a contact form later)
function handleContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Validate required fields
    if (!contactData.name || !contactData.email || !contactData.message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Show success message
    alert('Thank you for your message! We will respond within 24 hours.');
    
    // Reset form
    event.target.reset();
    
    console.log('Contact form data:', contactData);
}

// Newsletter subscription handling
function handleNewsletterSignup(event) {
    event.preventDefault();
    
    const email = event.target.querySelector('input[type="email"]').value;
    
    if (!email) {
        alert('Please enter your email address.');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Show success message
    alert('Thank you for subscribing to our newsletter!');
    
    // Reset form
    event.target.reset();
    
    console.log('Newsletter signup:', { email });
}

// Form validation utilities
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validatePhone(phone) {
    const regex = /^[\d\s\-\+\(\)\.]+$/;
    return regex.test(phone);
}

function validateRequired(value) {
    return value && value.trim().length > 0;
}

// Make functions globally available
window.showRegistrationForm = showRegistrationForm;
window.hideRegistrationForm = hideRegistrationForm;
window.handleRegistration = handleRegistration;
window.handleContactForm = handleContactForm;
window.handleNewsletterSignup = handleNewsletterSignup;