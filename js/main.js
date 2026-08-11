/**
 * Alvin's Minimal Website - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initActiveNavLink();
});

/* ==========================================================================
   THEME SWITCHER (DARK / LIGHT)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('site-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme (default to dark if not set)
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'dark');
  document.documentElement.setAttribute('data-theme', initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('site-theme', newTheme);
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
