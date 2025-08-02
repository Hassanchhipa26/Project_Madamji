// ====== MEMORIES & SURPRISE THEME - COMPLETE INTERACTIVE SCRIPT ======

document.addEventListener('DOMContentLoaded', function() {
  
  // ====== DEVICE DETECTION & OPTIMIZATION ======
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isTouch = 'ontouchstart' in window;
  const supportsBackdrop = CSS.supports('backdrop-filter', 'blur(10px)');
  
  console.log('🎨 Memories Theme Loaded', { isMobile, isTouch, supportsBackdrop });

  // ====== DOM ELEMENTS ======
  const startJourneyBtn = document.getElementById('start-journey');
  const heroMessage = document.getElementById('hero-message');
  const memoriesSection = document.getElementById('memories');
  const timelineSection = document.getElementById('timeline');
  const surpriseSection = document.getElementById('surprise');
  const surpriseBox = document.getElementById('surprise-box');
  const surpriseContent = document.getElementById('surprise-content');
  const clickMessage = document.getElementById('click-message');
  const finalMessage = document.getElementById('final-message');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const memoryModal = document.getElementById('memory-modal');
  const modalClose = document.querySelector('.modal-close');
  
  // ====== ROMANTIC MESSAGES ARRAY ======
  const loveMessages = [
    "Every moment with you is a precious memory... 💕",
    "You make my heart skip a beat every single day 💓",
    "In your eyes, I found my home 🏡",
    "Our love story is my favorite fairy tale ✨",
    "You are the missing piece of my puzzle 🧩",
    "Together we create the most beautiful memories 📸",
    "Ready to see our journey together? 🌟"
  ];

  let currentMessageIndex = 0;
  let messageInterval;

  // ====== INITIALIZATION ======
  init();

  function init() {
    setupEventListeners();
    startMessageRotation();
    createDynamicParticles();
    setupScrollAnimations();
    optimizeForDevice();
  }

  // ====== EVENT LISTENERS SETUP ======
  function setupEventListeners() {
    // Start Journey Button
    startJourneyBtn.addEventListener('click', handleStartJourney);
    
    // Mobile Navigation Toggle
    navToggle.addEventListener('click', toggleMobileNav);
    
    // Navigation Links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', handleNavigation);
    });
    
    // Memory Cards
    document.querySelectorAll('.memory-card').forEach(card => {
      card.addEventListener('click', openMemoryModal);
    });
    
    // Surprise Box
    surpriseBox.addEventListener('click', openSurpriseBox);
    
    // Modal Close
    modalClose.addEventListener('click', closeMemoryModal);
    document.querySelector('.modal-backdrop').addEventListener('click', closeMemoryModal);
    
    // Surprise Buttons
    document.getElementById('play-song')?.addEventListener('click', playSong);
    document.getElementById('download-memories')?.addEventListener('click', downloadMemories);
    
    // Touch Events for Mobile
    if (isTouch) {
      setupTouchEvents();
    }
    
    // Keyboard Events
    document.addEventListener('keydown', handleKeyboardEvents);
  }

  // ====== HERO MESSAGE ROTATION ======
  function startMessageRotation() {
    messageInterval = setInterval(() => {
      currentMessageIndex = (currentMessageIndex + 1) % loveMessages.length;
      animateMessageChange();
    }, 4000);
  }

  function animateMessageChange() {
    heroMessage.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    heroMessage.style.opacity = '0';
    heroMessage.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
      heroMessage.textContent = loveMessages[currentMessageIndex];
      heroMessage.style.opacity = '1';
      heroMessage.style.transform = 'translateY(0)';
    }, 300);
  }

  // ====== JOURNEY START HANDLER ======
  function handleStartJourney() {
    clearInterval(messageInterval);
    
    // Add ripple effect
    createRippleEffect(startJourneyBtn);
    
    // Change message to final one
    setTimeout(() => {
      heroMessage.textContent = loveMessages[loveMessages.length - 1];
      animateMessageChange();
    }, 500);
    
    // Show sections with stagger effect
    setTimeout(() => {
      showSectionsSequentially();
    }, 1500);
  }

  // ====== SECTION REVEAL ANIMATION ======
  function showSectionsSequentially() {
    const sections = [memoriesSection, timelineSection, surpriseSection];
    
    sections.forEach((section, index) => {
      setTimeout(() => {
        section.classList.remove('hidden');
        section.style.animation = `sectionSlideUp 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) both`;
        
        // Auto-scroll to first section
        if (index === 0) {
          setTimeout(() => {
            section.scrollIntoView({ 
              behavior: 'smooth', 
              block: isMobile ? 'start' : 'center' 
            });
          }, 600);
        }
      }, index * 800);
    });
  }

  // ====== MOBILE NAVIGATION ======
  function toggleMobileNav() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Add haptic feedback on mobile
    if (isMobile && navigator.vibrate) {
      navigator.vibrate(50);
    }
  }

  // ====== NAVIGATION HANDLER ======
  function handleNavigation(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    
    if (target && !target.classList.contains('hidden')) {
      // Close mobile menu
      if (navMenu.classList.contains('active')) {
        toggleMobileNav();
      }
      
      // Add navigation ripple
      createRippleEffect(this);
      
      // Smooth scroll
      setTimeout(() => {
        target.scrollIntoView({ 
          behavior: 'smooth', 
          block: isMobile ? 'start' : 'center' 
        });
      }, 200);
      
      // Highlight section
      highlightSection(target);
    }
  }

  // ====== MEMORY MODAL FUNCTIONALITY ======
  function openMemoryModal(e) {
    const memoryData = this.dataset.memory;
    const memoryInfo = getMemoryInfo(memoryData);
    
    // Populate modal content
    document.getElementById('modal-title').textContent = memoryInfo.title;
    document.getElementById('modal-description').textContent = memoryInfo.description;
    document.getElementById('modal-date').textContent = memoryInfo.date;
    
    // Show modal with animation
    memoryModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add scale animation to card
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = 'scale(1)';
    }, 200);
  }

  function closeMemoryModal() {
    memoryModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function getMemoryInfo(memoryId) {
    const memories = {
      '1': {
        title: 'Our First Meeting',
        description: 'The day when destiny brought us together. I still remember every detail of that magical moment when our eyes first met.',
        date: 'A day that changed everything'
      },
      '2': {
        title: 'Perfect Moments',
        description: 'Those quiet moments when it was just us against the world. Time seemed to stand still whenever we were together.',
        date: 'Timeless memories'
      },
      '3': {
        title: 'Our Adventures',
        description: 'Every adventure became twice as amazing because I had you by my side. From sunrise hikes to midnight drives.',
        date: 'Adventures of a lifetime'
      },
      '4': {
        title: 'Pure Love',
        description: 'The moment I realized you were not just my love, but my best friend, my partner in crime, my everything.',
        date: 'Love beyond words'
      }
    };
    
    return memories[memoryId] || memories['1'];
  }

  // ====== SURPRISE BOX FUNCTIONALITY ======
  function openSurpriseBox() {
    if (surpriseBox.classList.contains('opened')) return;
    
    // Add opened class for animation
    surpriseBox.classList.add('opened');
    
    // Hide click message
    clickMessage.classList.add('hidden');
    
    // Show surprise content with delay
    setTimeout(() => {
      surpriseContent.classList.remove('hidden');
      
      // Add confetti effect
      createConfettiExplosion();
      
      // Show final message
      setTimeout(() => {
        finalMessage.style.display = 'block';
        finalMessage.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 2000);
      
    }, 1000);
    
    // Add haptic feedback
    if (isMobile && navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
  }

  // ====== SURPRISE BUTTON HANDLERS ======
  function playSong() {
    showNotification('🎵 Playing our special song in your heart! 💕', 'success');
    
    // Create music note animation
    createMusicNotes();
  }

  function downloadMemories() {
    showNotification('📱 Our memories are already saved in your heart! 💖', 'info');
    
    // Create download animation
    createDownloadAnimation();
  }

  // ====== DYNAMIC EFFECTS ======
  function createDynamicParticles() {
    if (isMobile && window.innerWidth < 480) return; // Skip on very small screens
    
    const particleContainer = document.querySelector('.floating-particles');
    
    setInterval(() => {
      if (Math.random() < 0.3) {
        const particle = document.createElement('div');
        particle.className = 'dynamic-particle';
        particle.style.cssText = `
          position: absolute;
          left: ${Math.random() * 100}%;
          bottom: -10px;
          width: ${Math.random() * 6 + 3}px;
          height: ${Math.random() * 6 + 3}px;
          background: rgba(255, 255, 255, ${Math.random() * 0.6 + 0.3});
          border-radius: 50%;
          pointer-events: none;
          animation: particleFloat ${8 + Math.random() * 4}s linear forwards;
        `;
        
        particleContainer.appendChild(particle);
        
        // Remove after animation
        setTimeout(() => {
          particle.remove();
        }, 12000);
      }
    }, 2000);
  }

  function createRippleEffect(element) {
    const ripple = element.querySelector('.btn-ripple');
    if (!ripple) return;
    
    ripple.style.width = '0';
    ripple.style.height = '0';
    
    setTimeout(() => {
      ripple.style.width = '200px';
      ripple.style.height = '200px';
    }, 10);
    
    setTimeout(() => {
      ripple.style.width = '0';
      ripple.style.height = '0';
    }, 600);
  }

  function createConfettiExplosion() {
    const confettiColors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'];
    const confettiEmojis = ['🎉', '✨', '💖', '🌟', '💕', '🎊'];
    
    for (let i = 0; i < (isMobile ? 15 : 30); i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        const isEmoji = Math.random() > 0.7;
        
        if (isEmoji) {
          confetti.textContent = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
          confetti.style.fontSize = `${Math.random() * 10 + 15}px`;
        } else {
          confetti.style.width = `${Math.random() * 8 + 4}px`;
          confetti.style.height = `${Math.random() * 8 + 4}px`;
          confetti.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        }
        
        confetti.style.cssText += `
          position: fixed;
          left: ${Math.random() * 100}%;
          top: -50px;
          pointer-events: none;
          z-index: 9999;
          animation: confettiFall ${3 + Math.random() * 2}s ease-out forwards;
          transform: rotate(${Math.random() * 360}deg);
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
      }, i * 100);
    }
  }

  function createMusicNotes() {
    const notes = ['🎵', '🎶', '♪', '♫'];
    
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const note = document.createElement('div');
        note.textContent = notes[Math.floor(Math.random() * notes.length)];
        note.style.cssText = `
          position: fixed;
          left: ${Math.random() * 100}%;
          top: 50%;
          font-size: ${Math.random() * 15 + 20}px;
          pointer-events: none;
          z-index: 9999;
          animation: musicNoteFloat ${2 + Math.random()}s ease-out forwards;
          color: rgba(255, 255, 255, 0.8);
        `;
        
        document.body.appendChild(note);
        
        setTimeout(() => note.remove(), 3000);
      }, i * 200);
    }
  }

  function createDownloadAnimation() {
    const downloadIcon = document.createElement('div');
    downloadIcon.innerHTML = '📥';
    downloadIcon.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 48px;
      pointer-events: none;
      z-index: 9999;
      animation: downloadPulse 2s ease-out forwards;
    `;
    
    document.body.appendChild(downloadIcon);
    
    setTimeout(() => downloadIcon.remove(), 2000);
  }

  // ====== NOTIFICATION SYSTEM ======
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    const bgColors = {
      success: 'rgba(72, 219, 251, 0.9)',
      info: 'rgba(255, 107, 107, 0.9)',
      warning: 'rgba(254, 202, 87, 0.9)'
    };
    
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${bgColors[type] || bgColors.info};
      backdrop-filter: blur(10px);
      color: white;
      padding: 15px 20px;
      border-radius: 10px;
      font-weight: 600;
      z-index: 10000;
      animation: notificationSlideIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      max-width: 300px;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'notificationSlideOut 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards';
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  }

  // ====== SCROLL ANIMATIONS ======
  function setupScrollAnimations() {
    const observerOptions = {
      threshold: isMobile ? 0.2 : 0.1,
      rootMargin: isMobile ? '0px 0px -50px 0px' : '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Animate child elements with stagger
          const children = entry.target.querySelectorAll('.memory-card, .timeline-item');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.style.animation = `fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both`;
            }, index * 100);
          });
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });
  }

  // ====== TOUCH EVENTS FOR MOBILE ======
  function setupTouchEvents() {
    // Touch feedback for buttons
    document.querySelectorAll('.glass-btn').forEach(btn => {
      btn.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
      });
      
      btn.addEventListener('touchend', function() {
        this.style.transform = 'scale(1)';
      });
    });

    // Touch feedback for cards
    document.querySelectorAll('.glass-card').forEach(card => {
      card.addEventListener('touchstart', function() {
        if (this.classList.contains('memory-card')) {
          this.style.transform = 'scale(0.98)';
        }
      });
      
      card.addEventListener('touchend', function() {
        if (this.classList.contains('memory-card')) {
          this.style.transform = 'scale(1)';
        }
      });
    });

    // Swipe gestures for modal
    let touchStartX = 0;
    let touchStartY = 0;

    memoryModal.addEventListener('touchstart', function(e) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    });

    memoryModal.addEventListener('touchend', function(e) {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;

      // Swipe down to close
      if (diffY < -50 && Math.abs(diffX) < 100) {
        closeMemoryModal();
      }
    });
  }

  // ====== KEYBOARD EVENTS ======
  function handleKeyboardEvents(e) {
    switch(e.key) {
      case 'Escape':
        if (memoryModal.classList.contains('active')) {
          closeMemoryModal();
        }
        if (navMenu.classList.contains('active')) {
          toggleMobileNav();
        }
        break;
      case 'Enter':
      case ' ':
        if (e.target.classList.contains('memory-card')) {
          e.preventDefault();
          openMemoryModal.call(e.target);
        }
        break;
    }
  }

  // ====== UTILITY FUNCTIONS ======
  function highlightSection(section) {
    const originalTransform = section.style.transform;
    section.style.transition = 'transform 0.3s ease-out';
    section.style.transform = 'scale(1.01)';
    
    setTimeout(() => {
      section.style.transform = originalTransform;
    }, 300);
  }

  function optimizeForDevice() {
    // Reduce animations on slower devices
    if (isMobile && navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
      document.documentElement.style.setProperty('--animation-duration', '0.3s');
      
      // Disable complex animations
      const complexElements = document.querySelectorAll('.orb, .floating-particles');
      complexElements.forEach(el => {
        el.style.animation = 'none';
      });
    }

    // Optimize for touch devices
    if (isTouch) {
      document.documentElement.classList.add('touch-device');
      
      // Add touch-friendly styles
      const style = document.createElement('style');
      style.textContent = `
        .touch-device .glass-card:hover {
          transform: none;
        }
        .touch-device .glass-btn:hover {
          transform: none;
        }
      `;
      document.head.appendChild(style);
    }

    // Add loading fade-in
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease-in-out';
    
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.body.style.opacity = '1';
      }, 100);
    });
  }

  // ====== DYNAMIC CSS ANIMATIONS ======
  function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes particleFloat {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(-100vh) rotate(360deg);
          opacity: 0;
        }
      }

      @keyframes confettiFall {
        0% {
          transform: translateY(-50px) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(calc(100vh + 50px)) rotate(720deg);
          opacity: 0;
        }
      }

      @keyframes musicNoteFloat {
        0% {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
        100% {
          transform: translateY(-100px) scale(1.5);
          opacity: 0;
        }
      }

      @keyframes downloadPulse {
        0% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }
        50% {
          transform: translate(-50%, -50%) scale(1.3);
          opacity: 0.8;
        }
        100% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 0;
        }
      }

      @keyframes notificationSlideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      @keyframes notificationSlideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Mobile-specific optimizations */
      @media (max-width: 768px) {
        @keyframes particleFloat {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 0.8;
          }
          80% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-80vh) rotate(180deg);
            opacity: 0;
          }
        }

        .orb {
          width: 200px !important;
          height: 200px !important;
          filter: blur(30px);
        }
      }

      @media (max-width: 480px) {
        .floating-particles::before,
        .floating-particles::after {
          display: none;
        }
        
        .orb {
          width: 150px !important;
          height: 150px !important;
          filter: blur(20px);
        }
      }

      /* Performance optimizations */
      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.1s !important;
          animation-iteration-count: 1 !important;
        }
        
        .animated-bg {
          animation: none !important;
        }
        
        .floating-particles::before,
        .floating-particles::after {
          display: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ====== ACCESSIBILITY ENHANCEMENTS ======
  function setupAccessibility() {
    // Add ARIA labels
    document.querySelectorAll('.memory-card').forEach((card, index) => {
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `View memory ${index + 1}`);
    });

    // Add focus indicators
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
      .memory-card:focus,
      .glass-btn:focus,
      .nav-link:focus {
        outline: 2px solid rgba(255, 255, 255, 0.8);
        outline-offset: 2px;
      }
    `;
    document.head.appendChild(focusStyle);
  }

  // ====== PERFORMANCE MONITORING ======
  function setupPerformanceMonitoring() {
    // Monitor frame rate
    let lastTime = performance.now();
    let frameCount = 0;
    
    function checkPerformance() {
      const currentTime = performance.now();
      frameCount++;
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        // Reduce effects if FPS is low
        if (fps < 30 && !document.documentElement.classList.contains('low-performance')) {
          document.documentElement.classList.add('low-performance');
          
          // Disable heavy animations
          const heavyElements = document.querySelectorAll('.orb, .floating-particles');
          heavyElements.forEach(el => {
            el.style.display = 'none';
          });
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(checkPerformance);
    }
    
    if (!isMobile) {
      requestAnimationFrame(checkPerformance);
    }
  }

  // ====== FINAL INITIALIZATION ======
  addDynamicStyles();
  setupAccessibility();
  setupPerformanceMonitoring();

  // ====== CONSOLE WELCOME MESSAGE ======
  console.log(`
  🎨 =============================================
     MEMORIES & SURPRISE THEME LOADED
  =============================================
  
  📱 Device: ${isMobile ? 'Mobile' : 'Desktop'}
  👆 Touch: ${isTouch ? 'Supported' : 'Not Available'}
  🎯 Backdrop Filter: ${supportsBackdrop ? 'Supported' : 'Fallback'}
  
  💕 Theme Features:
  ✨ Glassmorphism Effects
  🎭 Dynamic Animations  
  📱 Perfect Mobile Support
  🎪 Interactive Surprises
  🎵 Sound & Haptic Feedback
  
  Made with 💖 for your special someone
  =============================================
  `);

  // ====== EASTER EGGS ======
  let clickCount = 0;
  document.addEventListener('click', function() {
    clickCount++;
    
    // Secret animation after 50 clicks
    if (clickCount === 50) {
      showNotification('🎊 You found the secret! You really love exploring! 💕', 'success');
      
      // Add special effect
      for (let i = 0; i < 20; i++) {
        setTimeout(() => {
          createConfettiExplosion();
        }, i * 100);
      }
    }
  });

  // ====== FINAL LOAD COMPLETE ======
  window.addEventListener('load', function() {
    setTimeout(() => {
      showNotification('💖 Welcome to our beautiful memories! 🌟', 'success');
    }, 2000);
  });

});