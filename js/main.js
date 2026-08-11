/**
 * Alvin's Minimal Website - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initActiveNavLink();
  initTimelineScrollTracker();
});

/* ==========================================================================
   THEME SWITCHER (DARK / LIGHT)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme (default to dark if not set)
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'dark');
  document.documentElement.setAttribute('data-theme', initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }
}

/* ==========================================================================
   ACTIVE NAVIGATION LINK
   ========================================================================== */
function initActiveNavLink() {
  const path = window.location.pathname;
  const page = path.split("/").pop();
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (page === href || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ==========================================================================
   TIMELINE SCROLL TRACKER
   ========================================================================== */
function initTimelineScrollTracker() {
  const cards = document.querySelectorAll('.cv-card');
  const yearNodes = document.querySelectorAll('.timeline-year-node');

  if (!cards.length || !yearNodes.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // Trigger when card occupies center viewport
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetYearId = entry.target.getAttribute('data-year-target');
        
        // Remove active class from all year nodes
        yearNodes.forEach(node => node.classList.remove('active'));
        
        // Add active class to corresponding year node
        const activeNode = document.getElementById(targetYearId);
        if (activeNode) {
          activeNode.classList.add('active');
        }
      }
    });
  }, observerOptions);

  cards.forEach(card => observer.observe(card));
}
