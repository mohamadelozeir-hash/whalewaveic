/**
 * Animations Module
 * Handles scroll-based animations, parallax effects, and reveal animations
 */

(function() {
  'use strict';

  // ========================================
  // Intersection Observer for Scroll Animations
  // ========================================

  const createObserver = (options = {}) => {
    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    return new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');

          // Optional: stop observing after reveal (one-time animation)
          // observer.unobserve(entry.target);
        }
      });
    }, { ...defaultOptions, ...options });
  };

  // Initialize observer for fade-in elements
  const observeFadeInElements = () => {
    const observer = createObserver();
    const elements = document.querySelectorAll('.fade-in');

    elements.forEach(element => {
      observer.observe(element);
    });
  };

  // ========================================
  // Scroll Progress Indicator
  // ========================================

  const updateScrollProgress = () => {
    const scrollProgress = document.getElementById('scroll-progress');
    if (!scrollProgress) return;

    const updateProgress = () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.pageYOffset / windowHeight) * 100;
      scrollProgress.style.width = `${scrolled}%`;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress(); // Initial call
  };

  // ========================================
  // Parallax Effect
  // ========================================

  const initParallax = () => {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (parallaxElements.length === 0) return;

    const handleParallax = () => {
      const scrolled = window.pageYOffset;

      parallaxElements.forEach(element => {
        const speed = element.dataset.parallax || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleParallax, { passive: true });
  };

  // ========================================
  // Staggered Animations for Service Cards
  // ========================================

  const initStaggeredAnimations = () => {
    const serviceCards = document.querySelectorAll('.service-card');

    if (serviceCards.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add delay based on index
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, index * 100);

          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    serviceCards.forEach(card => {
      observer.observe(card);
    });
  };

  // ========================================
  // Smooth Scroll to Anchor Links
  // ========================================

  const initSmoothScroll = () => {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        // Skip if it's just "#"
        if (href === '#') return;

        const target = document.querySelector(href);

        if (target) {
          e.preventDefault();

          const navHeight = document.querySelector('.header')?.offsetHeight || 80;
          const targetPosition = target.offsetTop - navHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  };

  // ========================================
  // Hero Particles Animation (Optional Enhancement)
  // ========================================

  const initHeroParticles = () => {
    const particlesContainer = document.querySelector('.hero__particles');
    if (!particlesContainer) return;

    // Create additional floating particles
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';

      // Random size between 20-60px
      const size = Math.random() * 40 + 20;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      // Random position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;

      // Random animation duration
      const duration = Math.random() * 10 + 5;
      particle.style.animationDuration = `${duration}s`;

      // Random delay
      const delay = Math.random() * 5;
      particle.style.animationDelay = `${delay}s`;

      particle.style.position = 'absolute';
      particle.style.borderRadius = '50%';
      particle.style.background = 'rgba(0, 102, 255, 0.1)';
      particle.style.pointerEvents = 'none';
      particle.style.animation = 'float 8s ease-in-out infinite';

      return particle;
    };

    // Create 3-5 particles
    const particleCount = Math.floor(Math.random() * 3) + 3;
    for (let i = 0; i < particleCount; i++) {
      particlesContainer.appendChild(createParticle());
    }
  };

  // ========================================
  // Text Reveal Animation (Character by Character)
  // ========================================

  const initTextReveal = () => {
    const textElements = document.querySelectorAll('[data-text-reveal]');
    if (textElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const text = entry.target.textContent;
          entry.target.textContent = '';
          entry.target.style.opacity = '1';

          // Split text into characters and animate
          text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.opacity = '0';
            span.style.display = 'inline-block';
            span.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.03}s`;
            entry.target.appendChild(span);
          });

          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });

    textElements.forEach(element => {
      element.style.opacity = '0';
      observer.observe(element);
    });
  };

  // ========================================
  // Magnetic Button Effect
  // ========================================

  const initMagneticButtons = () => {
    const buttons = document.querySelectorAll('.btn--primary, .btn--secondary');

    buttons.forEach(button => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Limit the magnetic effect
        const distance = Math.sqrt(x * x + y * y);
        const maxDistance = 50;

        if (distance < maxDistance) {
          const strength = (maxDistance - distance) / maxDistance;
          const moveX = (x / rect.width) * 10 * strength;
          const moveY = (y / rect.height) * 10 * strength;

          button.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
      });

      button.addEventListener('mouseleave', () => {
        button.style.transform = '';
      });
    });
  };

  // ========================================
  // Header Scroll Effect
  // ========================================

  const initHeaderScroll = () => {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.pageYOffset;

      // Add scrolled class when scrolled down
      if (currentScroll > 50) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }

      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
  };

  // ========================================
  // Number Counter Animation
  // ========================================

  const initCounterAnimations = () => {
    const counters = document.querySelectorAll('[data-counter]');
    if (counters.length === 0) return;

    const animateCounter = (element) => {
      const target = parseInt(element.dataset.counter);
      const duration = parseInt(element.dataset.duration) || 2000;
      const step = target / (duration / 16); // 60fps
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current < target) {
          element.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          element.textContent = target;
        }
      };

      updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });

    counters.forEach(counter => {
      observer.observe(counter);
    });
  };

  // ========================================
  // Initialize All Animations
  // ========================================

  const init = () => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      console.log('Animations disabled: user prefers reduced motion');
      return;
    }

    // Initialize all animation systems
    observeFadeInElements();
    updateScrollProgress();
    initParallax();
    initStaggeredAnimations();
    initSmoothScroll();
    initHeroParticles();
    initMagneticButtons();
    initHeaderScroll();
    initCounterAnimations();

    console.log('Animations initialized');
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
