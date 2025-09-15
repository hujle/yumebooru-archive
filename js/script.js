const THEME_KEY          = 'site-theme';
const MENU_TRANSITION_MS = 300;

const menuBtn        = document.getElementById('menu-btn');
const sideMenu       = document.getElementById('side-menu');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const htmlEl         = document.documentElement;

(function applySavedTheme() {
  try {
    if (localStorage.getItem(THEME_KEY) === 'light') {
      htmlEl.classList.add('light');
    }
  } catch (e) {}
})();

window.addEventListener('DOMContentLoaded', () => {
  if (htmlEl.classList.contains('light')) {
    themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
  }

  themeToggleBtn.addEventListener('click', e => {
    e.stopPropagation();
    const isLight = htmlEl.classList.toggle('light');
    localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark');
    themeToggleBtn.innerHTML = isLight
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  });

  menuBtn.addEventListener('click', e => {
    e.stopPropagation();
    sideMenu.classList.contains('open') ? closeMenu() : openMenu();
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
  }
});

function openMenu() {
  sideMenu.classList.add('active');
  requestAnimationFrame(() => sideMenu.classList.add('open'));
}

function closeMenu() {
  sideMenu.classList.remove('open');
  setTimeout(() => sideMenu.classList.remove('active'), MENU_TRANSITION_MS);
}