import Tab from 'bootstrap/js/dist/tab';

document.querySelectorAll<HTMLAnchorElement>('#features [data-bs-toggle="tab"]').forEach((el) => {
  el.addEventListener('click', (event) => {
    event.preventDefault();
    new Tab(el).show();
  });
});
