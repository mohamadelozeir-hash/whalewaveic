/**
 * Main JavaScript Module
 * Handles service card interactions and other main functionality
 */

(function() {
  'use strict';

  // ========================================
  // Service Card Expand/Collapse
  // ========================================

  const initServiceCards = () => {
    const readMoreButtons = document.querySelectorAll('.service-card__read-more');

    readMoreButtons.forEach(button => {
      const card = button.closest('.service-card');
      const content = card.querySelector('.service-card__content');

      if (!content) return;

      button.addEventListener('click', () => {
        const isExpanded = content.classList.contains('expanded');

        if (isExpanded) {
          content.classList.remove('expanded');
          button.textContent = 'Read more';
        } else {
          content.classList.add('expanded');
          button.textContent = 'Read less';
        }
      });
    });
  };

  // ========================================
  // Lazy Load Images
  // ========================================

  const initLazyLoading = () => {
    const images = document.querySelectorAll('img[data-src]');
    if (images.length === 0) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);

          // Add loaded class for fade-in effect
          img.classList.add('loaded');
        }
      });
    }, {
      rootMargin: '50px'
    });

    images.forEach(img => {
      imageObserver.observe(img);
    });
  };

  // ========================================
  // Copy Email to Clipboard
  // ========================================

  const initCopyEmail = () => {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

    emailLinks.forEach(link => {
      // Add click handler to copy email
      link.addEventListener('contextmenu', (e) => {
        e.preventDefault();

        const email = link.getAttribute('href').replace('mailto:', '');

        // Modern clipboard API
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(email).then(() => {
            showToast('Email copied to clipboard!');
          }).catch(err => {
            console.error('Failed to copy email:', err);
          });
        }
      });
    });
  };

  // ========================================
  // Show Toast Notification
  // ========================================

  const showToast = (message, duration = 3000) => {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

    // Style the toast
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: var(--color-text-primary);
      color: var(--color-text-inverse);
      padding: 1rem 1.5rem;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-xl);
      z-index: 10000;
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
      opacity: 0;
      transition: all 0.3s ease;
    `;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.style.transform = 'translateX(-50%) translateY(0)';
      toast.style.opacity = '1';
    }, 10);

    // Animate out and remove
    setTimeout(() => {
      toast.style.transform = 'translateX(-50%) translateY(100px)';
      toast.style.opacity = '0';

      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, duration);
  };

  // ========================================
  // External Link Handling
  // ========================================

  const initExternalLinks = () => {
    const links = document.querySelectorAll('a[href^="http"]');

    links.forEach(link => {
      // Skip if it's linking to the same domain
      if (link.hostname === window.location.hostname) return;

      // Skip mailto, tel, and other protocol links
      const href = link.getAttribute('href');
      if (href.startsWith('mailto:') || href.startsWith('tel:')) return;

      // Add external link attributes
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');

      // Optional: add icon to indicate external link
      if (!link.querySelector('.external-icon')) {
        const icon = document.createElement('span');
        icon.className = 'external-icon';
        icon.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-3h6v6m-11 5L21 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        `;
        link.appendChild(icon);
      }
    });
  };

  // ========================================
  // Print Detection
  // ========================================

  const initPrintDetection = () => {
    window.addEventListener('beforeprint', () => {
      console.log('Preparing to print...');
      // Add print-specific styles or modifications
      document.body.classList.add('printing');
    });

    window.addEventListener('afterprint', () => {
      console.log('Print complete');
      document.body.classList.remove('printing');
    });
  };

  // ========================================
  // Detect Online/Offline Status
  // ========================================

  const initOnlineDetection = () => {
    const showConnectionStatus = (online) => {
      const message = online
        ? 'Back online!'
        : 'No internet connection';

      showToast(message, 2000);
    };

    window.addEventListener('online', () => showConnectionStatus(true));
    window.addEventListener('offline', () => showConnectionStatus(false));
  };

  // ========================================
  // Performance Monitoring (Development)
  // ========================================

  const initPerformanceMonitoring = () => {
    // Only in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

        console.group('Performance Metrics');
        console.log(`Page Load Time: ${pageLoadTime}ms`);
        console.log(`DOM Content Loaded: ${perfData.domContentLoadedEventEnd - perfData.navigationStart}ms`);
        console.log(`DOM Interactive: ${perfData.domInteractive - perfData.navigationStart}ms`);
        console.groupEnd();
      });
    }
  };

  // ========================================
  // Focus Trap for Modals (if needed)
  // ========================================

  const createFocusTrap = (element) => {
    const focusableElements = element.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    element.addEventListener('keydown', handleKeyDown);

    // Return cleanup function
    return () => {
      element.removeEventListener('keydown', handleKeyDown);
    };
  };

  // ========================================
  // Debounce Utility
  // ========================================

  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // ========================================
  // Throttle Utility
  // ========================================

  const throttle = (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  // ========================================
  // Console Message (Branding)
  // ========================================

  const initConsoleMessage = () => {
    const styles = [
      'color: #0066FF',
      'font-size: 16px',
      'font-weight: bold',
      'padding: 10px'
    ].join(';');

    console.log('%cWhaleWaveIC', styles);
    console.log('%cExpert IC Design Services', 'color: #57534E; font-size: 12px;');
    console.log('%cInterested in working with us? Contact us at contact@whalewaveic.com', 'color: #A8A29E; font-size: 10px;');
  };

  // ========================================
  // Initialize All Main Features
  // ========================================

  const init = () => {
    initServiceCards();
    initLazyLoading();
    initCopyEmail();
    initExternalLinks();
    initPrintDetection();
    initOnlineDetection();
    initPerformanceMonitoring();
    initConsoleMessage();

    console.log('Main functionality initialized');
  };

  // ========================================
  // DOM Ready
  // ========================================

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export utilities for use in other modules
  window.WhaleWaveIC = {
    debounce,
    throttle,
    showToast,
    createFocusTrap
  };

})();
