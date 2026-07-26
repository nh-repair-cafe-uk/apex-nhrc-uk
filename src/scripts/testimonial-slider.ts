import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';

new Swiper('.testimonials-slider', {
  modules: [Autoplay, Pagination],
  speed: 600,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  slidesPerView: 'auto',
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
});
