import Isotope from 'isotope-layout';
import AOS from 'aos';

const container = document.querySelector<HTMLElement>('.portfolio-container');
const filters = document.querySelectorAll<HTMLElement>('#portfolio-flters li');

if (container) {
  const isotope = new Isotope(container, {
    itemSelector: '.portfolio-item',
  });

  filters.forEach((filter) => {
    filter.addEventListener('click', () => {
      filters.forEach((el) => el.classList.remove('filter-active'));
      filter.classList.add('filter-active');

      isotope.arrange({ filter: filter.dataset.filter });
      isotope.once('arrangeComplete', () => AOS.refresh());
    });
  });
}
