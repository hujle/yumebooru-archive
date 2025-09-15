const menuBtn = document.getElementById('menu-btn');
const sideMenu = document.getElementById('side-menu');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const body = document.body;

const MENU_TRANSITION_MS = 300;

// Function to open menu
function openMenu() {
  sideMenu.classList.add('active');
  requestAnimationFrame(() => {
    sideMenu.classList.add('open');
  });
}

// Function to close menu
function closeMenu() {
  sideMenu.classList.remove('open');
  setTimeout(() => {
    sideMenu.classList.remove('active');
  }, MENU_TRANSITION_MS);
}

// Toggle side menu on button click
menuBtn.addEventListener('click', e => {
  e.stopPropagation(); // не дать событию всплыть дальше
  if (sideMenu.classList.contains('open')) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Close menu on click outside
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

// Toggle theme
themeToggleBtn.addEventListener('click', e => {
  e.stopPropagation();
  const isLight = body.classList.toggle('light');
  themeToggleBtn.innerHTML = isLight
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
});

// Dropdown logic
document.addEventListener('DOMContentLoaded', () => {
  const dropdown = document.querySelector('.dropdown');
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
});