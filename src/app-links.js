/** URL do app principal (login, demo, dashboard). Definir na Vercel como VITE_APP_URL. */
const appBase = (import.meta.env.VITE_APP_URL || 'https://app.salonbook.com.br').replace(/\/$/, '');

export function appLink(path) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return appBase ? `${appBase}${normalized}` : normalized;
}

/** Link dos botões de assinatura / teste grátis na LP. */
export const SALONBOOK_CTA_URL = appLink('/onboarding');
