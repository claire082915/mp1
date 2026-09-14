/* Your JS here. */
console.log('Hello World!')

const progressBar = document.querySelector('.scroll-indicator__bar');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar nav a');
const sections = document.querySelectorAll('main > section');
const NAVBAR_SCROLL_THRESHOLD = 40;

const updateScrollIndicator = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  
  if (progressBar) {
    progressBar.style.width = `${percent}%`;
  }
};

const updateNavbar = () => {
  if (!navbar) return;
  navbar.classList.toggle('is-scrolled', window.scrollY > NAVBAR_SCROLL_THRESHOLD);
};

const updateActiveNavLink = () => {
  const scrollPosition = window.scrollY + (navbar?.offsetHeight || 0) + 10;
  const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5;

  let currentSectionId = '';

  if (isAtBottom && sections.length > 0) {
    currentSectionId = sections[sections.length - 1].getAttribute('id');
  } else {
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });
  }

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (currentSectionId && link.getAttribute('href') === `#${currentSectionId}`) {
      link.classList.add('active');
    }
  });
};

window.addEventListener('scroll', () => {
  updateScrollIndicator();
  updateNavbar();
  updateActiveNavLink();
}, { passive: true });

updateScrollIndicator();
updateNavbar();
updateActiveNavLink();