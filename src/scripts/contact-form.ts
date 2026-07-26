export {};

const form = document.querySelector<HTMLFormElement>('.php-email-form');
const loading = form?.querySelector<HTMLElement>('.loading');
const errorMessage = form?.querySelector<HTMLElement>('.error-message');
const sentMessage = form?.querySelector<HTMLElement>('.sent-message');

function encode(data: FormData): string {
  return new URLSearchParams(data as unknown as Record<string, string>).toString();
}

function setState(state: 'idle' | 'loading' | 'success' | 'error') {
  loading?.classList.toggle('d-block', state === 'loading');
  errorMessage?.classList.toggle('d-block', state === 'error');
  sentMessage?.classList.toggle('d-block', state === 'success');
}

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  setState('loading');

  try {
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode(new FormData(form)),
    });

    if (!response.ok) throw new Error(`Form submission failed: ${response.status}`);

    setState('success');
    form.reset();
  } catch (error) {
    console.error(error);
    setState('error');
  }
});
