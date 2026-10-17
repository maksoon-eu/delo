import {
  METRICA_MAX_PENDING_GOALS,
  YANDEX_METRICA_ID,
  YANDEX_METRICA_OPTIONS,
} from '@/shared/constants/analytics';
import type { AnalyticsGoal, YandexMetricaCounter } from '@/shared/types/analytics';
import {
  canSendAnalytics,
  getAnalyticsReferrer,
  getMetricaPath,
  getMetricaUrl,
} from '@/shared/utils/analytics';

let enabled = false;
let counter: YandexMetricaCounter | null = null;
let pendingGoals: AnalyticsGoal[] = [];

export function startMetricaTracking() {
  enabled = true;
}

export function stopMetricaTracking() {
  enabled = false;
  pendingGoals = [];
  const previousCounter = counter;
  counter = null;

  try {
    previousCounter?.destruct();
  } catch {
    // Optional analytics must not break consent withdrawal or navigation.
  }
}

export function trackMetricaPageView() {
  if (!enabled || !canSendAnalytics()) return;
  const url = getMetricaUrl(window.location.href);
  if (!url) return;

  try {
    if (!counter) {
      const Metrika = window.Ya?.Metrika2;
      if (!Metrika) return;

      counter = new Metrika({
        id: YANDEX_METRICA_ID,
        ...YANDEX_METRICA_OPTIONS,
        url,
        referrer: getAnalyticsReferrer(),
      });
    }

    counter.hit(url, { referrer: getAnalyticsReferrer(), title: 'Delo' });
    pendingGoals.splice(0).forEach(trackGoal);
  } catch {
    // Analytics failures must not interrupt application actions.
  }
}

export function trackGoal(goal: AnalyticsGoal) {
  if (!enabled || !canSendAnalytics() || !getMetricaPath(window.location.pathname)) return;

  if (!counter) {
    if (pendingGoals.length < METRICA_MAX_PENDING_GOALS) pendingGoals.push(goal);
    return;
  }

  try {
    counter.reachGoal(goal);
  } catch {
    // A failed metric must not turn a successful business action into an error.
  }
}
