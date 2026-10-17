import { ANALYTICS_CONSENT_KEY } from '@/shared/constants/analytics';
import type { AnalyticsConsent } from '@/shared/types/analytics';

let sessionConsent: AnalyticsConsent = null;

export function getAnalyticsConsent(): AnalyticsConsent {
  if (typeof window === 'undefined') return null;

  try {
    const value = localStorage.getItem(ANALYTICS_CONSENT_KEY);
    return value === 'accepted' || value === 'rejected' ? value : null;
  } catch {
    return sessionConsent;
  }
}

export function getServerAnalyticsConsent(): AnalyticsConsent {
  return null;
}

export function subscribeAnalyticsConsent(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

export function saveAnalyticsConsent(value: Exclude<AnalyticsConsent, null>) {
  sessionConsent = value;

  try {
    localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
  } catch {
    // A blocked storage must not prevent a choice for the current session.
  }

  window.dispatchEvent(new StorageEvent('storage'));
}
