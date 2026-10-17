import {
  ANALYTICS_PATHS,
  METRICA_PATHS,
  METRICA_DYNAMIC_PATHS,
} from '@/shared/constants/analytics';
import { SEO_SITE_URL } from '@/shared/constants/seo';
import { getAnalyticsConsent } from '@/shared/utils/analytics-consent';

export function isAnalyticsPath(pathname: string) {
  return ANALYTICS_PATHS.some((path) => path === pathname);
}

export function canSendAnalytics() {
  return (
    typeof window !== 'undefined' &&
    getAnalyticsConsent() === 'accepted' &&
    window.location.origin === SEO_SITE_URL
  );
}

export function getMetricaPath(pathname: string) {
  if (METRICA_PATHS.some((path) => path === pathname)) return pathname;
  return METRICA_DYNAMIC_PATHS.find((route) => route.pattern.test(pathname))?.pathname ?? null;
}

export function getMetricaUrl(value: string) {
  try {
    const url = new URL(value, SEO_SITE_URL);
    const pathname = getMetricaPath(url.pathname);
    return url.origin === SEO_SITE_URL && pathname ? `${SEO_SITE_URL}${pathname}` : null;
  } catch {
    return null;
  }
}

export function getAnalyticsReferrer() {
  try {
    // A nonempty fallback prevents the SDK from falling back to a raw document.referrer.
    return document.referrer ? new URL(document.referrer).origin : SEO_SITE_URL;
  } catch {
    return SEO_SITE_URL;
  }
}

export function filterAnalyticsEvent<T extends { url: string }>(event: T): T | null {
  if (!canSendAnalytics() || !isAnalyticsPath(window.location.pathname)) return null;

  try {
    const url = new URL(event.url, SEO_SITE_URL);
    if (url.origin !== SEO_SITE_URL || !isAnalyticsPath(url.pathname)) return null;

    return { ...event, url: `${url.origin}${url.pathname}` };
  } catch {
    return null;
  }
}
