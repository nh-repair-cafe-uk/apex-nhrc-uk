export {};

const modal = document.getElementById('volunteer-modal');
const openButton = document.getElementById('volunteer-modal-open');
const closeButton = modal?.querySelector<HTMLElement>('.close');

function open() {
  if (modal) modal.style.display = 'block';
  openButton?.setAttribute('aria-expanded', 'true');
}

function close() {
  if (modal) modal.style.display = 'none';
  openButton?.setAttribute('aria-expanded', 'false');
}

openButton?.addEventListener('click', open);
closeButton?.addEventListener('click', close);
modal?.addEventListener('click', (event) => {
  if (event.target === modal) close();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') close();
});
