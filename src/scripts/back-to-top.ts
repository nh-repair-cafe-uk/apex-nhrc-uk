export {};

const backToTop = document.querySelector<HTMLAnchorElement>('.back-to-top');
const header = document.getElementById('header');

function toggleOnScroll() {
  const scrolled = window.scrollY > 100;
  backToTop?.classList.toggle('active', scrolled);
  header?.classList.toggle('header-scrolled', scrolled);
}

window.addEventListener('load', toggleOnScroll);
document.addEventListener('scroll', toggleOnScroll);
