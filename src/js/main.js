/* Your JS here. */
console.log('Hello World!')

const progressBar = document.querySelector('.scroll-indicator__bar');
const navbar = document.querySelector('.navbar');
const navLinks = Array.from(document.querySelectorAll('.navbar nav a'));
const sections = document.querySelectorAll('main > section');
const NAVBAR_SCROLL_THRESHOLD = 24;

const indicatorSections = navLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);


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

const updatePositionIndicator = () => {
    if (!navbar || indicatorSections.length === 0) return;

    const navHeight = navbar.getBoundingClientRect().height;
    let currentLink = navLinks[0];

    indicatorSections.forEach((section, i) => {
        const rect = section.getBoundingClientRect();
        if(rect.top <= navHeight + 8) {
            currentLink = navLinks[i];
        }
    });

    const scrolledToBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (scrolledToBottom) {
        currentLink = navLinks[navLinks.length - 1];
    }

    navLinks.forEach((link) => {
        link.classList.toggle('is-active', link === currentLink);
    });
};

let ticking = false;
const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
        updateNavbar();
        updatePositionIndicator();
        ticking = false;
    })
}

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
  onScroll();
}, { passive: true });
window.addEventListener('resize', updatePositionIndicator);

updateScrollIndicator();
updateNavbar();
updateActiveNavLink();
updatePositionIndicator();



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
const modalGithub = modal?.querySelector('.modal__github');
const modalSlidesLink = modal?.querySelector('.modal__slides');
const modalSlidesImg = modal?.querySelector('.modal__slides-img'); 

const projectDetails = {
  promoximity: {
    title: 'PromoXimity',
    body: 'A real-time discount discovery engine that surfaces nearby restaurant offers using geofencing and makes redeeming them seamless through integrated Stripe checkout. At its heart, the product helps users instantly find deals around them and complete their purchase in just a few taps.',
    tags: ['Python', 'SQLite/SQLAlchemy', 'FastAPI', 'Stripe'],
    github: 'https://github.com/Divya-T1/HackIllinois', 
    slidesUrl: 'https://docs.google.com/presentation/d/1gBn9ke9dWyppAyLc4BBZyejjtPeSN-2_Igxw9apv1Jw/edit?usp=sharing', 
    slidesImage: 'assets/promoximity_slides.png'
  },
  pagepal: {
    title: 'PagePal',
    body: 'PagePal is an AI-powered reading assistant designed to streamlinehow students read articles and research papers. Integrated directly into the workspace, it eliminates the need to constantly switch between reading materials and external search engines or chat boxes.',
    tags: ['React', 'TypeScript', 'Python', 'AWS'],
    github: 'https://github.com/claire082915/page-pal/tree/main', 
    slidesUrl: 'https://docs.google.com/presentation/d/1InxYY6YTYqkn8JMemrj1DcBeWZgOJ8mfH9NEk2szQJA/edit?usp=sharing', 
    slidesImage: 'assets/pagepal_slides.png'
  },
  shelp: {
    title: 'Shelp',
    body: 'Shelp is a smart virtual pantry management app designed to help users reduce food waste and save money by allowing users to manually log food items alongside their expiration dates, which are organized chronologically from nearest to latest expiry. Near the expiration date, the user will receive a notification to their phone. The app also leverages AI to suggest custom recipe ideas based on near-expiry ingredients selected by the user.',
    tags: ['React', 'Node.js', 'Firebase'],
    github: 'https://github.com/CS222-UIUC/team-11-project', 
    slidesUrl: 'https://docs.google.com/presentation/d/1VyeFV2rkmNIRTPmUT9FjyMC9GW16rmLI0BE0epYwxbU/edit?usp=sharing', 
    slidesImage: 'assets/shelp_slides.png'
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

  if (modalGithub) modalGithub.href = data.github;

  if (modalSlidesLink && modalSlidesImg) {
    modalSlidesLink.href = data.slidesUrl;
    modalSlidesImg.src = data.slidesImage;
    modalSlidesImg.alt = `${data.title} slide deck cover`;
  }
 
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