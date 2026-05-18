/** URL do app principal (login, demo, dashboard). Definir na Vercel como VITE_APP_URL. */
const appBase = (import.meta.env.VITE_APP_URL || 'https://app.salonbook.com.br').replace(/\/$/, '');

/** Link do botão "Começar agora" / contratação na LP. */
export const SALONBOOK_CTA_URL = 'https://www.salonbook.com.br';

export function appLink(path) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return appBase ? `${appBase}${normalized}` : normalized;
}
