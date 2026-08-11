/**
 * Alvin's Tailwind Website - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initTimelineScrollTracker();
});

/* ==========================================================================
   THEME SWITCHER (DARK / LIGHT) - Tailwind CSS Compatible
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme (default to dark if not set)
  const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isCurrentlyDark = document.documentElement.classList.contains('dark');
      if (isCurrentlyDark) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  }
}

/* ==========================================================================
   TIMELINE SCROLL TRACKER (Used on cv.html)
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
