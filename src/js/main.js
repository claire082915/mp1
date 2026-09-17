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



class Carousel {
  constructor(root) {
    this.root = root;
    this.track = root.querySelector('.carousel__track');
    this.slides = Array.from(root.querySelectorAll('.carousel__slide'));
    this.dotsWrap = root.querySelector('.carousel__dots');
    this.index = 0;
 
    this.buildDots();
    this.bindControls();
    this.goTo(0);
 
    this.autoplayId = setInterval(() => this.next(), 6000);
    root.addEventListener('mouseenter', () => clearInterval(this.autoplayId));
    root.addEventListener('mouseleave', () => {
      this.autoplayId = setInterval(() => this.next(), 6000);
    });
  }
 
  buildDots() {
    this.dots = this.slides.map((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel__dot';
      dot.type = 'button';
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => this.goTo(i));
      this.dotsWrap.appendChild(dot);
      return dot;
    });
  }
 
  bindControls() {
    this.root.querySelector('.carousel__btn--prev')
      ?.addEventListener('click', () => this.prev());
    this.root.querySelector('.carousel__btn--next')
      ?.addEventListener('click', () => this.next());
  }
 
  goTo(i) {
    this.index = (i + this.slides.length) % this.slides.length;
    this.track.style.transform = `translateX(-${this.index * 100}%)`;
    this.dots.forEach((dot, di) => dot.classList.toggle('is-active', di === this.index));
  }
 
  next() { this.goTo(this.index + 1); }
  prev() { this.goTo(this.index - 1); }
}
 
document.querySelectorAll('.carousel').forEach((el) => new Carousel(el));

const modalOverlay = document.querySelector('.modal-overlay');
const modal = document.querySelector('.modal');
const modalTitle = modal?.querySelector('.modal__title');
const modalBody = modal?.querySelector('.modal__body');
const modalTags = modal?.querySelector('.modal__tags');
 
const projectDetails = {
  promoximity: {
    title: 'PromoXimity',
    body: 'short description',
    tags: ['Python', 'SQLite/SQLAlchemy', 'FastAPI', 'Stripe'],
  },
  pagepal: {
    title: 'PagePal',
    body: 'short description',
    tags: ['React', 'TypeScript', 'Python', 'AWS'],
  },
  shelp: {
    title: 'Shelp',
    body: 'Add a short write-up of the problem, your approach, and the outcome.',
    tags: ['React', 'Node.js', 'Firebase'],
  },
};
 
const openModal = (key) => {
  const data = projectDetails[key];
  if (!data || !modal || !modalOverlay) return;
 
  modalTitle.textContent = data.title;
  modalBody.textContent = data.body;
  modalTags.innerHTML = '';
  data.tags.forEach((tag) => {
    const span = document.createElement('span');
    span.textContent = tag;
    modalTags.appendChild(span);
  });
 
  modal.classList.add('is-open');
  modalOverlay.classList.add('is-open');
  document.body.classList.add('modal-open');
  modal.querySelector('.modal__close')?.focus();
};
 
const closeModal = () => {
  modal?.classList.remove('is-open');
  modalOverlay?.classList.remove('is-open');
  document.body.classList.remove('modal-open');
};
 
document.querySelectorAll('.project-card__details-btn').forEach((btn) => {
  btn.addEventListener('click', () => openModal(btn.dataset.project));
});
 
modal?.querySelector('.modal__close')?.addEventListener('click', closeModal);
modalOverlay?.addEventListener('click', closeModal);
 
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});