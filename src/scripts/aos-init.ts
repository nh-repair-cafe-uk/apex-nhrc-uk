import AOS from 'aos';

window.addEventListener('load', () => {
  AOS.init({
    duration: 1000,
    easing: 'ease-in-quad',
    once: true,
    mirror: false,
  });
});
