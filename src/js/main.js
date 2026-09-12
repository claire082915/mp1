/* Your JS here. */
console.log('Hello World!')

const scrollBar = documnet.querySelector('.scroll-indicator');

const updateScrollIndicator = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollheight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollBar?.style.setProperty('--scroll', percent.toFixed(2));
}

const navbar = document.querySelector('.navbar');
const NAVBAR_SCROLL_THRESHOLD = 40;

const updateNavbar = () => {
    if (!navbar) return;
    navbar.classList.toggle('is-scrolled', window.scrollY > NAVBAR_SCROLL_THRESHOLD);
};

window.addEventListener('scroll', () => {
    updateScrollIndicator();
    updateNavbar();
}, {passive: true});

updateScrollIndicator();
updateNavbar();