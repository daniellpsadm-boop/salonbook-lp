/** URL do app principal (login, demo, dashboard). Definir na Vercel como VITE_APP_URL. */
const appBase = (import.meta.env.VITE_APP_URL || 'https://app.salonbook.com.br').replace(/\/$/, '');

export function appLink(path) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return appBase ? `${appBase}${normalized}` : normalized;
}

/** Link dos botões de assinatura / teste grátis na LP (etapa 1 do onboarding). */
export const SALONBOOK_CTA_URL = appLink('/onboarding');

const PLAN_SLUGS = ['starter', 'pro', 'enterprise'];

/** Checkout Stripe do plano via onboarding (?plan=). */
export function onboardingCheckoutUrl(planSlug) {
  const slug = String(planSlug || '').toLowerCase();
  const plan = PLAN_SLUGS.includes(slug) ? slug : 'pro';
  return appLink(`/onboarding?plan=${plan}`);
}
