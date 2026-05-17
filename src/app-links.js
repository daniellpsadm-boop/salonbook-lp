/** URL do app principal (login, demo, dashboard). Definir na Vercel como VITE_APP_URL. */
const appBase = (import.meta.env.VITE_APP_URL || '').replace(/\/$/, '');

export function appLink(path) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return appBase ? `${appBase}${normalized}` : normalized;
}
