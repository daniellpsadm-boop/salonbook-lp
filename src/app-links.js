/** URL do app principal (login, demo, dashboard). Definir na Vercel como VITE_APP_URL. */
const appBase = (import.meta.env.VITE_APP_URL || 'https://app.salonbook.com.br').replace(/\/$/, '');

export function appLink(path) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return appBase ? `${appBase}${normalized}` : normalized;
}

/** Link dos botões de assinatura / teste grátis na LP (etapa 1 do onboarding). */
export const SALONBOOK_CTA_URL = appLink('/onboarding');

const PLAN_SLUGS = ['starter', 'pro', 'enterprise'];

/**
 * Payment Links Stripe (modo teste — criados via Stripe MCP).
 * Em produção, defina VITE_STRIPE_CHECKOUT_URL_STARTER|PRO|ENTERPRISE na Vercel.
 */
const DEFAULT_STRIPE_CHECKOUT_URLS = {
  starter: 'https://buy.stripe.com/test_7sY7sM7vgcQIbvzdDIf3a00',
  pro: 'https://buy.stripe.com/test_aFa9AU7vgg2U9nreHMf3a01',
  enterprise: 'https://buy.stripe.com/test_dRm9AU6rcdUM2Z3eHMf3a02',
};

function stripeCheckoutFromEnv(planSlug) {
  const envKey = `VITE_STRIPE_CHECKOUT_URL_${planSlug.toUpperCase()}`;
  const fromEnv = import.meta.env[envKey]?.trim();
  return fromEnv || DEFAULT_STRIPE_CHECKOUT_URLS[planSlug] || null;
}

/** Checkout Stripe direto na LP (Payment Link). Após pagamento → app/onboarding?checkout=success. */
export function stripeCheckoutUrl(planSlug) {
  const slug = String(planSlug || '').toLowerCase();
  const plan = PLAN_SLUGS.includes(slug) ? slug : 'pro';
  return stripeCheckoutFromEnv(plan) || onboardingCheckoutUrl(plan);
}

/** Fallback: app onboarding com auto-checkout autenticado (API /api/stripe/checkout). */
export function onboardingCheckoutUrl(planSlug) {
  const slug = String(planSlug || '').toLowerCase();
  const plan = PLAN_SLUGS.includes(slug) ? slug : 'pro';
  return appLink(`/onboarding?plan=${plan}`);
}
