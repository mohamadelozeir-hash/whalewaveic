/**
 * Navigation Module
 * Handles navigation menu, mobile menu toggle, and active states
 */

(function() {
  'use strict';

  // ========================================
  // Mobile Menu Toggle
  // ========================================

  const initMobileMenu = () => {
    const toggle = document.querySelector('.nav__toggle');
    const mobileMenu = document.querySelector('.nav__mobile');
    const mobileLinks = document.querySelectorAll('.nav__mobile-link');

    if (!toggle || !mobileMenu) return;

    // Toggle mobile menu
    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

      toggle.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.setAttribute('aria-hidden', isExpanded);

      // Prevent body scroll when menu is open
      if (!isExpanded) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking on a link
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        toggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  };

  // ========================================
  // Active Section Highlighting
  // ========================================

  const initActiveSections = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    if (sections.length === 0 || navLinks.length === 0) return;

    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-80px 0px -70% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id');

          // Remove active class from all links
          navLinks.forEach(link => {
            link.classList.remove('nav__link--active');
          });

          // Add active class to corresponding link
          const activeLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
          if (activeLink) {
            activeLink.classList.add('nav__link--active');
          }
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });
  };

  // ========================================
  // Smooth Scroll with Offset
  // ========================================

  const initSmoothScroll = () => {
    const links = document.querySelectorAll('a[href^="#"]');
    const navHeight = document.querySelector('.header')?.offsetHeight || 80;

    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        // Skip if it's just "#"
        if (href === '#' || href === '') return;

        const target = document.querySelector(href);

        if (target) {
          e.preventDefault();

          const targetPosition = target.offsetTop - navHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Update URL without scrolling
          if (history.pushState) {
            history.pushState(null, null, href);
          }
        }
      });
    });
  };

  // ========================================
  // Hide/Show Header on Scroll
  // ========================================

  const initHeaderHideShow = () => {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;
    const scrollThreshold = 100;

    const handleScroll = () => {
      const currentScroll = window.pageYOffset;

      // Don't hide on very top
      if (currentScroll <= scrollThreshold) {
        header.style.transform = 'translateY(0)';
        return;
      }

      // Scrolling down - hide header
      if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
        header.style.transform = 'translateY(-100%)';
      }
      // Scrolling up - show header
      else if (currentScroll < lastScroll) {
        header.style.transform = 'translateY(0)';
      }

      lastScroll = currentScroll;
    };

    // Add transition
    header.style.transition = 'transform 0.3s ease-in-out';

    window.addEventListener('scroll', handleScroll, { passive: true });
  };

  // ========================================
  // Keyboard Navigation Enhancement
  // ========================================

  const initKeyboardNav = () => {
    const navLinks = document.querySelectorAll('.nav__link, .nav__mobile-link');

    navLinks.forEach((link, index) => {
      link.addEventListener('keydown', (e) => {
        let nextLink;

        // Arrow down or right - next link
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault();
          nextLink = navLinks[index + 1] || navLinks[0];
          nextLink.focus();
        }

        // Arrow up or left - previous link
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault();
          nextLink = navLinks[index - 1] || navLinks[navLinks.length - 1];
          nextLink.focus();
        }

        // Home - first link
        if (e.key === 'Home') {
          e.preventDefault();
          navLinks[0].focus();
        }

        // End - last link
        if (e.key === 'End') {
          e.preventDefault();
          navLinks[navLinks.length - 1].focus();
        }
      });
    });
  };

  // ========================================
  // Handle Hash on Page Load
  // ========================================

  const handleInitialHash = () => {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      const navHeight = document.querySelector('.header')?.offsetHeight || 80;

      if (target) {
        // Wait for page to load
        setTimeout(() => {
          const targetPosition = target.offsetTop - navHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  };

  // ========================================
  // Close Mobile Menu on Resize
  // ========================================

  const initResizeHandler = () => {
    const toggle = document.querySelector('.nav__toggle');
    const mobileMenu = document.querySelector('.nav__mobile');

    if (!toggle || !mobileMenu) return;

    let resizeTimer;

    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        // Close mobile menu on larger screens
        if (window.innerWidth > 1024) {
          toggle.setAttribute('aria-expanded', 'false');
          mobileMenu.setAttribute('aria-hidden', 'true');
          document.body.style.overflow = '';
        }
      }, 250);
    });
  };

  // ========================================
  // Scroll to Top Button (Optional)
  // ========================================

  const initScrollToTop = () => {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    scrollBtn.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 19V5m0 0-7 7m7-7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;

    // Style the button
    scrollBtn.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #000000;
      color: white;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    document.body.appendChild(scrollBtn);

    // Show/hide button based on scroll
    const handleScroll = () => {
      if (window.pageYOffset > 500) {
        scrollBtn.style.opacity = '1';
        scrollBtn.style.visibility = 'visible';
      } else {
        scrollBtn.style.opacity = '0';
        scrollBtn.style.visibility = 'hidden';
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Hover effect
    scrollBtn.addEventListener('mouseenter', () => {
      scrollBtn.style.transform = 'translateY(-4px) scale(1.05)';
    });

    scrollBtn.addEventListener('mouseleave', () => {
      scrollBtn.style.transform = 'translateY(0) scale(1)';
    });
  };

  // ========================================
  // Initialize All Navigation Features
  // ========================================

  const init = () => {
    initMobileMenu();
    initActiveSections();
    initSmoothScroll();
    // initHeaderHideShow(); // Optional: uncomment to enable auto-hide header
    initKeyboardNav();
    handleInitialHash();
    initResizeHandler();
    initScrollToTop();

    console.log('Navigation initialized');
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
