export {};

const STORAGE_KEY = 'nhrc-cookie-consent';

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

function loadAnalytics() {
  const { gtagId, statcounterProject, statcounterSecurity } = document.body.dataset;
  if (!gtagId || !statcounterProject || !statcounterSecurity) return;

  const gtagScript = document.createElement('script');
  gtagScript.async = true;
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${gtagId}`;
  document.head.appendChild(gtagScript);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', gtagId);

  const scWindow = window as typeof window & {
    sc_project?: string;
    sc_invisible?: number;
    sc_security?: string;
  };
  scWindow.sc_project = statcounterProject;
  scWindow.sc_invisible = 1;
  scWindow.sc_security = statcounterSecurity;
  const statcounterScript = document.createElement('script');
  statcounterScript.async = true;
  statcounterScript.src = 'https://www.statcounter.com/counter/counter.js';
  document.body.appendChild(statcounterScript);
}

const banner = document.querySelector<HTMLElement>('.cookie-consent');
const acceptButton = document.querySelector<HTMLButtonElement>('.cookie-consent__accept');
const declineButton = document.querySelector<HTMLButtonElement>('.cookie-consent__decline');

const consent = localStorage.getItem(STORAGE_KEY);

if (consent === 'accepted') {
  loadAnalytics();
} else if (!consent && banner) {
  banner.classList.add('cookie-consent--visible');
}

acceptButton?.addEventListener('click', () => {
  localStorage.setItem(STORAGE_KEY, 'accepted');
  banner?.classList.remove('cookie-consent--visible');
  loadAnalytics();
});

declineButton?.addEventListener('click', () => {
  localStorage.setItem(STORAGE_KEY, 'declined');
  banner?.classList.remove('cookie-consent--visible');
});
