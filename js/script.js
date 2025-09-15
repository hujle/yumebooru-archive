// Constants
const THEME_KEY = 'site-theme';
const MENU_TRANSITION_MS = 300;

// Elements
const menuBtn = document.getElementById('menu-btn');
const sideMenu = document.getElementById('side-menu');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const body = document.body;

// Restore theme from localStorage
const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme === 'light') {
  body.classList.add('light');
  themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
} else {
  body.classList.remove('light');
  themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
}

// Menu functions
function openMenu() {
  sideMenu.classList.add('active');
  requestAnimationFrame(() => {
    sideMenu.classList.add('open');
  });
}

function closeMenu() {
  sideMenu.classList.remove('open');
  setTimeout(() => {
    sideMenu.classList.remove('active');
  }, MENU_TRANSITION_MS);
}

// Toggle side menu
menuBtn.addEventListener('click', e => {
  e.stopPropagation();
  if (sideMenu.classList.contains('open')) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Close menu on outside click
document.addEventListener('click', e => {
  if (
    sideMenu.classList.contains('open') &&
    !sideMenu.contains(e.target) &&
    e.target !== menuBtn &&
    !menuBtn.contains(e.target)
  ) {
    closeMenu();
  }
});

// Theme toggle
themeToggleBtn.addEventListener('click', e => {
  e.stopPropagation();
  const isLight = body.classList.toggle('light');
  localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark');
  themeToggleBtn.innerHTML = isLight
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
});

// Dropdown logic
document.addEventListener('DOMContentLoaded', () => {
  const dropdown = document.querySelector('.dropdown');
  if (!dropdown) return;

  const toggleBtn = dropdown.querySelector('.dropdown-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', e => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });
  }

  document.addEventListener('click', e => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });
});