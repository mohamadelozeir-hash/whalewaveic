/**
 * Contact Form Module
 * Handles form validation, submission, and user feedback
 */

(function() {
  'use strict';

  // ========================================
  // Form Configuration
  // ========================================

  const config = {
    // Set to true when you have a backend endpoint
    enableSubmission: false,

    // Backend endpoint (e.g., Web3Forms, FormSubmit, etc.)
    submitEndpoint: '',

    // Form validation rules
    validation: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 100
      },
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      },
      phone: {
        required: false,
        pattern: /^[\d\s\-\+\(\)]+$/
      },
      subject: {
        required: true,
        minLength: 3,
        maxLength: 200
      },
      message: {
        required: true,
        minLength: 10,
        maxLength: 2000
      }
    }
  };

  // ========================================
  // Form Validation
  // ========================================

  const validateField = (field, rules) => {
    const value = field.value.trim();
    const errors = [];

    // Required check
    if (rules.required && !value) {
      errors.push('This field is required');
    }

    // If value exists, perform other validations
    if (value) {
      // Min length check
      if (rules.minLength && value.length < rules.minLength) {
        errors.push(`Must be at least ${rules.minLength} characters`);
      }

      // Max length check
      if (rules.maxLength && value.length > rules.maxLength) {
        errors.push(`Must be no more than ${rules.maxLength} characters`);
      }

      // Pattern check
      if (rules.pattern && !rules.pattern.test(value)) {
        if (field.type === 'email') {
          errors.push('Please enter a valid email address');
        } else if (field.type === 'tel') {
          errors.push('Please enter a valid phone number');
        } else {
          errors.push('Invalid format');
        }
      }
    }

    return errors;
  };

  const showFieldError = (field, errors) => {
    const fieldName = field.getAttribute('name');
    const errorElement = document.getElementById(`${fieldName}-error`);

    if (errors.length > 0) {
      field.classList.add('error');
      field.setAttribute('aria-invalid', 'true');

      if (errorElement) {
        errorElement.textContent = errors[0];
      }

      return false;
    } else {
      field.classList.remove('error');
      field.setAttribute('aria-invalid', 'false');

      if (errorElement) {
        errorElement.textContent = '';
      }

      return true;
    }
  };

  const validateForm = (form) => {
    let isValid = true;

    // Validate each field
    Object.keys(config.validation).forEach(fieldName => {
      const field = form.querySelector(`[name="${fieldName}"]`);
      const rules = config.validation[fieldName];

      if (field) {
        const errors = validateField(field, rules);
        const fieldValid = showFieldError(field, errors);
        isValid = isValid && fieldValid;
      }
    });

    return isValid;
  };

  // ========================================
  // Real-time Validation
  // ========================================

  const initRealTimeValidation = (form) => {
    Object.keys(config.validation).forEach(fieldName => {
      const field = form.querySelector(`[name="${fieldName}"]`);

      if (field) {
        // Validate on blur
        field.addEventListener('blur', () => {
          const rules = config.validation[fieldName];
          const errors = validateField(field, rules);
          showFieldError(field, errors);
        });

        // Clear error on input
        field.addEventListener('input', () => {
          if (field.classList.contains('error')) {
            const rules = config.validation[fieldName];
            const errors = validateField(field, rules);
            showFieldError(field, errors);
          }
        });
      }
    });
  };

  // ========================================
  // Honeypot Spam Protection
  // ========================================

  const checkHoneypot = (form) => {
    const honeypot = form.querySelector('[name="_honeypot"]');
    return !honeypot || honeypot.value === '';
  };

  // ========================================
  // Form Submission
  // ========================================

  const submitForm = async (form, formData) => {
    const submitButton = form.querySelector('button[type="submit"]');
    const statusElement = document.getElementById('form-status');

    // Disable button and show loading state
    submitButton.disabled = true;
    submitButton.classList.add('btn--loading');

    try {
      if (!config.enableSubmission || !config.submitEndpoint) {
        // Simulate submission for demo
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success message
        showFormStatus(statusElement, 'success',
          'Form validation successful! To enable email functionality, please configure a backend service (Web3Forms, FormSubmit, etc.) in form.js'
        );

        // Reset form
        form.reset();

        return;
      }

      // Actual form submission
      const response = await fetch(config.submitEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
      });

      if (response.ok) {
        showFormStatus(statusElement, 'success',
          'Thank you for your message! We\'ll get back to you soon.'
        );
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }

    } catch (error) {
      console.error('Form submission error:', error);
      showFormStatus(statusElement, 'error',
        'Sorry, there was an error sending your message. Please try again or email us directly at contact@whalewaveic.com'
      );
    } finally {
      // Re-enable button
      submitButton.disabled = false;
      submitButton.classList.remove('btn--loading');
    }
  };

  const showFormStatus = (element, type, message) => {
    if (!element) return;

    element.className = `form-status ${type}`;
    element.textContent = message;

    // Auto-hide after 10 seconds
    setTimeout(() => {
      element.className = 'form-status';
      element.textContent = '';
    }, 10000);

    // Scroll to status message
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  // ========================================
  // Initialize Contact Form
  // ========================================

  const initContactForm = () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // Initialize real-time validation
    initRealTimeValidation(form);

    // Handle form submission
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Validate form
      if (!validateForm(form)) {
        // Scroll to first error
        const firstError = form.querySelector('.error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstError.focus();
        }
        return;
      }

      // Check honeypot
      if (!checkHoneypot(form)) {
        console.warn('Spam detected');
        return;
      }

      // Get form data
      const formData = new FormData(form);

      // Remove honeypot from submission
      formData.delete('_honeypot');

      // Submit form
      await submitForm(form, formData);
    });

    // Prevent form submission on Enter key in text inputs
    form.querySelectorAll('input:not([type="submit"])').forEach(input => {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();

          // Move to next field
          const inputs = Array.from(form.querySelectorAll('input, textarea'));
          const index = inputs.indexOf(input);
          const nextInput = inputs[index + 1];

          if (nextInput) {
            nextInput.focus();
          }
        }
      });
    });

    console.log('Contact form initialized');
  };

  // ========================================
  // Character Counter (Optional Enhancement)
  // ========================================

  const initCharacterCounter = () => {
    const textareas = document.querySelectorAll('textarea[maxlength]');

    textareas.forEach(textarea => {
      const maxLength = textarea.getAttribute('maxlength');
      if (!maxLength) return;

      // Create counter element
      const counter = document.createElement('div');
      counter.className = 'character-counter';
      counter.style.cssText = `
        font-size: var(--font-size-sm);
        color: var(--color-text-tertiary);
        text-align: right;
        margin-top: var(--space-xs);
      `;

      textarea.parentNode.insertBefore(counter, textarea.nextSibling);

      // Update counter
      const updateCounter = () => {
        const remaining = maxLength - textarea.value.length;
        counter.textContent = `${remaining} characters remaining`;

        if (remaining < 50) {
          counter.style.color = 'var(--color-warning)';
        } else {
          counter.style.color = 'var(--color-text-tertiary)';
        }
      };

      textarea.addEventListener('input', updateCounter);
      updateCounter(); // Initial update
    });
  };

  // ========================================
  // Auto-resize Textarea
  // ========================================

  const initAutoResizeTextarea = () => {
    const textareas = document.querySelectorAll('textarea');

    textareas.forEach(textarea => {
      const resize = () => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      };

      textarea.addEventListener('input', resize);

      // Initial resize
      if (textarea.value) {
        resize();
      }
    });
  };

  // ========================================
  // Form Analytics (Optional)
  // ========================================

  const trackFormInteraction = (eventName, data = {}) => {
    // Implement your analytics tracking here
    // Example: Google Analytics, Plausible, etc.
    console.log('Form Event:', eventName, data);

    // Example with Google Analytics (if available)
    if (window.gtag) {
      window.gtag('event', eventName, data);
    }
  };

  const initFormAnalytics = () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // Track form start
    let formStarted = false;
    form.addEventListener('focusin', () => {
      if (!formStarted) {
        trackFormInteraction('form_start', { form_name: 'contact' });
        formStarted = true;
      }
    }, { once: true });

    // Track form completion time
    let startTime;
    form.addEventListener('focusin', () => {
      if (!startTime) {
        startTime = Date.now();
      }
    });

    form.addEventListener('submit', () => {
      if (startTime) {
        const completionTime = Math.round((Date.now() - startTime) / 1000);
        trackFormInteraction('form_submit', {
          form_name: 'contact',
          completion_time: completionTime
        });
      }
    });
  };

  // ========================================
  // Initialize All Form Features
  // ========================================

  const init = () => {
    initContactForm();
    initCharacterCounter();
    initAutoResizeTextarea();
    initFormAnalytics();

    // Show configuration message in console
    if (!config.enableSubmission) {
      console.warn('⚠️ Contact form is in demo mode. To enable email functionality:');
      console.log('1. Choose a service: Web3Forms, FormSubmit, or custom backend');
      console.log('2. Update config.submitEndpoint in form.js');
      console.log('3. Set config.enableSubmission = true');
      console.log('\nRecommended free services:');
      console.log('• Web3Forms: https://web3forms.com/ (250 submissions/month)');
      console.log('• FormSubmit: https://formsubmit.co/ (unlimited, completely free)');
    }
  };

  // ========================================
  // DOM Ready
  // ========================================

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
