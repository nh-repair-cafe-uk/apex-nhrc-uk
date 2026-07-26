export {};

const header = document.getElementById('header');
const navbar = document.getElementById('navbar');
const mobileNavToggle = document.querySelector<HTMLElement>('.mobile-nav-toggle');
const navLinks = document.querySelectorAll<HTMLAnchorElement>('#navbar .scrollto');

function scrollToWithOffset(hash: string) {
  const target = document.querySelector<HTMLElement>(hash);
  if (!target || !header) return;

  let offset = header.offsetHeight;
  if (!header.classList.contains('header-scrolled')) {
    offset -= 20;
  }

  window.scrollTo({
    top: target.offsetTop - offset,
    behavior: 'smooth',
  });
}

function updateActiveLink() {
  const position = window.scrollY + 200;
  navLinks.forEach((link) => {
    if (!link.hash) return;
    const section = document.querySelector<HTMLElement>(link.hash);
    if (!section) return;
    const inView =
      position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight;
    link.classList.toggle('active', inView);
  });
}

window.addEventListener('load', updateActiveLink);
document.addEventListener('scroll', updateActiveLink);

mobileNavToggle?.addEventListener('click', function (this: HTMLElement) {
  navbar?.classList.toggle('navbar-mobile');
  this.classList.toggle('bi-list');
  this.classList.toggle('bi-x');
});

document.querySelectorAll<HTMLAnchorElement>('.scrollto').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (!link.hash || !document.querySelector(link.hash)) return;
    event.preventDefault();

    if (navbar?.classList.contains('navbar-mobile')) {
      navbar.classList.remove('navbar-mobile');
      mobileNavToggle?.classList.toggle('bi-list');
      mobileNavToggle?.classList.toggle('bi-x');
    }

    scrollToWithOffset(link.hash);
  });
});

window.addEventListener('load', () => {
  if (window.location.hash && document.querySelector(window.location.hash)) {
    scrollToWithOffset(window.location.hash);
  }
});
