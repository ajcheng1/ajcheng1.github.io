/**
 * Personal Portfolio & Resume - Main JavaScript
 * Alvin's Portfolio Website
 */

// Project Data Store for Interactive Modal
const PROJECTS_DATA = {
  'cloudflow': {
    title: 'CloudFlow Analytics Platform',
    subtitle: 'Full-Stack Cloud Infrastructure & Real-Time Monitoring',
    category: 'Full Stack',
    image: 'assets/images/project-cloudflow.jpg',
    description: 'A real-time telemetry and infrastructure monitoring dashboard engineered for high-throughput distributed microservices. Features sub-second metric updates, interactive global latency heatmaps, and customizable anomaly detection alerts.',
    highlights: [
      'Engineered an event-driven architecture processing 10,000+ metrics per second with low latency.',
      'Designed responsive glassmorphism UI with interactive charts, dark mode, and geo-distribution maps.',
      'Implemented role-based access control (RBAC), multi-tenant isolation, and OAuth2 authentication.',
      'Automated alerting pipelines with webhook integration for Slack, Discord, and PagerDuty.'
    ],
    techStack: ['React', 'Node.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Redis', 'Docker'],
    liveUrl: 'https://example.com/cloudflow-demo',
    githubUrl: 'https://github.com/example/cloudflow'
  },
  'lumin': {
    title: 'Lumin AI Code Assistant',
    subtitle: 'Intelligent Workspace & Real-Time Code Companion',
    category: 'AI / Tools',
    image: 'assets/images/project-lumin.jpg',
    description: 'An AI-powered development workspace that provides context-aware code generation, interactive chat explanations, syntax optimization suggestions, and automated unit test authoring.',
    highlights: [
      'Built a split-pane Monaco code editor with real-time streaming LLM completions and diff previews.',
      'Implemented local vector search indexing for workspace-wide semantic code context understanding.',
      'Engineered intelligent prompt caching reducing API token overhead by over 40%.',
      'Designed a sleek keyboard-driven interface with custom shortcut palette and commands.'
    ],
    techStack: ['Next.js', 'TypeScript', 'Python', 'FastAPI', 'OpenAI API', 'ChromaDB', 'WebSockets'],
    liveUrl: 'https://example.com/lumin-demo',
    githubUrl: 'https://github.com/example/lumin-ai'
  },
  'nexus': {
    title: 'Nexus Crypto & Digital Banking',
    subtitle: 'Modern Multi-Currency & Digital Asset Financial App',
    category: 'Web Apps',
    image: 'assets/images/project-nexus.jpg',
    description: 'A modern web & mobile-first fintech dashboard offering seamless crypto asset tracking, fiat banking transfers, virtual debit card issuance, and instant transaction categorization.',
    highlights: [
      'Designed high-fidelity interactive UI with glowing glassmorphism cards and smooth micro-animations.',
      'Integrated real-time crypto price feeds and currency conversion rates with offline caching.',
      'Implemented bank-grade client-side encryption and biometric authentication simulation.',
      'Achieved 100/100 Lighthouse performance score with zero layout shift and sub-1s initial load.'
    ],
    techStack: ['Vue.js', 'TypeScript', 'Pinia', 'Tailwind CSS', 'Chart.js', 'Stripe API'],
    liveUrl: 'https://example.com/nexus-demo',
    githubUrl: 'https://github.com/example/nexus-fintech'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavbar();
  initTypewriter();
  initProjectFilters();
  initProjectModal();
  initScrollAnimations();
  initContactForm();
  initBackToTop();
});

/* ==========================================================================
   1. THEME SWITCHER (DARK / LIGHT)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('site-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'dark');
  document.documentElement.setAttribute('data-theme', initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('site-theme', newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
    });
  }
}

/* ==========================================================================
   2. NAVBAR & MOBILE NAVIGATION
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-link');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightActiveNavLink();
  });

  // Mobile menu toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    // Close menu when clicking link
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }
}

// Highlight active navigation section on scroll
function highlightActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 120;
    const sectionId = current.getAttribute('id');
    const link = document.querySelector(`.nav-link[href*="${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      if (link) link.classList.add('active');
    } else {
      if (link) link.classList.remove('active');
    }
  });
}

/* ==========================================================================
   3. TYPEWRITER EFFECT (HERO HEADLINE)
   ========================================================================== */
function initTypewriter() {
  const typewriterElement = document.getElementById('typewriterText');
  if (!typewriterElement) return;

  const words = [
    'Full-Stack Developer',
    'Software Engineer',
    'Creative Technologist',
    'UI/UX Craftsman',
    'Open Source Enthusiast'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at end of word
      isDeleting = true;
      typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   4. PROJECT CATEGORY FILTERING
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   5. PROJECT DETAILS MODAL
   ========================================================================== */
function initProjectModal() {
  const modalOverlay = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const detailButtons = document.querySelectorAll('[data-modal-target]');

  if (!modalOverlay) return;

  function openModal(projectId) {
    const data = PROJECTS_DATA[projectId];
    if (!data) return;

    document.getElementById('modalImg').src = data.image;
    document.getElementById('modalImg').alt = data.title;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalSubtitle').textContent = data.subtitle;
    document.getElementById('modalDescription').textContent = data.description;
    
    // Render highlights
    const highlightsContainer = document.getElementById('modalHighlights');
    highlightsContainer.innerHTML = '';
    data.highlights.forEach(point => {
      const li = document.createElement('li');
      li.textContent = point;
      highlightsContainer.appendChild(li);
    });

    // Render tech stack badges
    const techContainer = document.getElementById('modalTechStack');
    techContainer.innerHTML = '';
    data.techStack.forEach(tech => {
      const span = document.createElement('span');
      span.className = 'badge';
      span.textContent = tech;
      techContainer.appendChild(span);
    });

    // Update Action Links
    document.getElementById('modalLiveLink').href = data.liveUrl;
    document.getElementById('modalGithubLink').href = data.githubUrl;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-modal-target');
      openModal(projectId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  // Close on backdrop click
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   6. SCROLL REVEAL (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('active'));
  }
}

/* ==========================================================================
   7. CONTACT FORM & EMAIL COPY
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const copyEmailBtn = document.getElementById('copyEmailBtn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName').value;
      const email = document.getElementById('senderEmail').value;
      const message = document.getElementById('senderMessage').value;

      if (!name || !email || !message) {
        showToast('Please fill out all fields.');
        return;
      }

      // Simulated success feedback (ready for Formspree / EmailJS)
      showToast('🎉 Message sent successfully! I will reply soon.');
      form.reset();
    });
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = copyEmailBtn.getAttribute('data-email') || 'alvin@example.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('📋 Email copied to clipboard!');
      }).catch(() => {
        showToast('Could not copy email.');
      });
    });
  }
}

/* ==========================================================================
   8. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   TOAST HELPER NOTIFICATION
   ========================================================================== */
let toastTimeout;
function showToast(message) {
  let toast = document.getElementById('siteToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'siteToast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-secondary)">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
