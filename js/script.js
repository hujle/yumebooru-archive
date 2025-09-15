const THEME_KEY         = 'site-theme';
const MENU_TRANSITION_MS = 300;

const menuBtn        = document.getElementById('menu-btn');
const sideMenu       = document.getElementById('side-menu');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const root           = document.documentElement;

(function() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  const isLight    = savedTheme === 'light';

  if (isLight) {
    root.classList.add('light');
    themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    root.classList.remove('light');
    themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
  }
})();

window.addEventListener('DOMContentLoaded', () => {
  themeToggleBtn.addEventListener('click', e => {
    e.stopPropagation();
    const isLight = root.classList.toggle('light');
    localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark');
    themeToggleBtn.innerHTML = isLight
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  });

  menuBtn.addEventListener('click', e => {
    e.stopPropagation();
    if (sideMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  document.addEventListener('click', e => {
    if (
      sideMenu.classList.contains('open') &&
      !sideMenu.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) {
      closeMenu();
    }
  });

  const dropdown = document.querySelector('.dropdown');
  if (dropdown) {
    const toggleBtn = dropdown.querySelector('.dropdown-toggle');
    toggleBtn.addEventListener('click', e => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });
    document.addEventListener('click', e => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  }
});

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