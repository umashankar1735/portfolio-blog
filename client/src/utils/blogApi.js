const ADMIN_TOKEN_KEY = 'portfolio_blog_admin_token';

export function getAdminToken() {
  try {
    return sessionStorage.getItem(ADMIN_TOKEN_KEY) || '';
  } catch {
    return '';
  }
}

export function setAdminToken(token) {
  try {
    if (token) {
      sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
    } else {
      sessionStorage.removeItem(ADMIN_TOKEN_KEY);
    }
  } catch {
    // Ignore storage errors in restricted contexts
  }
}

export function authHeaders(extra = {}) {
  const token = getAdminToken();
  return token ? { ...extra, 'x-admin-token': token } : { ...extra };
}

export async function fetchAuthStatus() {
  const res = await fetch('/api/auth/status');
  if (!res.ok) return { authRequired: false };
  return res.json();
}

export async function verifyAdminPassword(password) {
  const res = await fetch('/api/auth/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  return res.ok;
}

export function stripMarkup(text = '') {
  return String(text)
    .replace(/<[^>]*>/g, ' ')
    .replace(/[#*_`>~-]{1,3}/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function formatDate(timestamp) {
  if (!timestamp) return '';
  const date = new Date(Number(timestamp));
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function estimateReadTime(text = '') {
  const words = stripMarkup(text).split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.ceil(words / 180));
  return `${mins} min read`;
}
