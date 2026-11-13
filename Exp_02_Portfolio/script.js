/**
 * ============================================================================
 * EXPERIMENT 02: PERSONAL PORTFOLIO WEBSITE
 * Course: B.Tech Computer Science & Engineering - Web Development Lab
 * File: script.js
 * Description: Client-side DOM scripts for navigation toggle, active link 
 *              highlighting, form validation, and submission feedback.
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Mobile Navigation Toggle
  // --------------------------------------------------------------------------
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      navMenu.classList.toggle('is-open');
    });

    // Close the mobile dropdown when a menu item is clicked
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 2. Active Section Navigation Highlighting (IntersectionObserver)
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // --------------------------------------------------------------------------
  // 3. Contact Form Validation & Submission Handling
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('senderName');
  const emailInput = document.getElementById('senderEmail');
  const subjectInput = document.getElementById('senderSubject');
  const messageInput = document.getElementById('senderMessage');
  const formSuccess = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('submitBtn');

  // Helper function to validate email using standard pattern
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Helper function to toggle error messages
  const setFieldStatus = (inputElement, errorElementId, isValid) => {
    const errorElement = document.getElementById(errorElementId);
    if (!isValid) {
      inputElement.classList.add('invalid');
      if (errorElement) errorElement.classList.add('visible');
    } else {
      inputElement.classList.remove('invalid');
      if (errorElement) errorElement.classList.remove('visible');
    }
  };

  if (contactForm) {
    // Real-time input cleanup on typing
    nameInput?.addEventListener('input', () => {
      if (nameInput.value.trim().length >= 2) {
        setFieldStatus(nameInput, 'nameError', true);
      }
    });

    emailInput?.addEventListener('input', () => {
      if (isValidEmail(emailInput.value.trim())) {
        setFieldStatus(emailInput, 'emailError', true);
      }
    });

    subjectInput?.addEventListener('input', () => {
      if (subjectInput.value.trim().length >= 3) {
        setFieldStatus(subjectInput, 'subjectError', true);
      }
    });

    messageInput?.addEventListener('input', () => {
      if (messageInput.value.trim().length >= 10) {
        setFieldStatus(messageInput, 'messageError', true);
      }
    });

    // Form submission event
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const subjectVal = subjectInput ? subjectInput.value.trim() : '';
      const messageVal = messageInput ? messageInput.value.trim() : '';

      // Validate all fields
      const isNameValid = nameVal.length >= 2;
      const isEmailValid = isValidEmail(emailVal);
      const isSubjectValid = subjectVal.length >= 3;
      const isMessageValid = messageVal.length >= 10;

      setFieldStatus(nameInput, 'nameError', isNameValid);
      setFieldStatus(emailInput, 'emailError', isEmailValid);
      setFieldStatus(subjectInput, 'subjectError', isSubjectValid);
      setFieldStatus(messageInput, 'messageError', isMessageValid);

      if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        // Save submission to localStorage for demonstration/viva proof
        const submission = {
          name: nameVal,
          email: emailVal,
          subject: subjectVal,
          message: messageVal,
          timestamp: new Date().toISOString()
        };

        const existingSubmissions = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
        existingSubmissions.push(submission);
        localStorage.setItem('portfolio_messages', JSON.stringify(existingSubmissions));

        // Display success feedback
        if (formSuccess) {
          formSuccess.style.display = 'flex';
          formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Disable submit button temporarily
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `
            <span>Message Sent</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
            </svg>
          `;
        }

        // Reset form inputs after brief delay
        setTimeout(() => {
          contactForm.reset();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `
              <span>Send Message</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="14" y1="2" x2="6" y2="10"/>
                <polygon points="14 2 9 14 6 10 2 7 14 2"/>
              </svg>
            `;
          }
        }, 3000);
      }
    });
  }
});
