import type { ANALYTICS_GOALS } from '@/shared/constants/analytics';

export type AnalyticsConsent = 'accepted' | 'rejected' | null;
export type AnalyticsGoal = (typeof ANALYTICS_GOALS)[number];

export type YandexMetricaCounter = {
  hit: (url: string, options: { referrer: string; title: string }) => void;
  reachGoal: (goal: AnalyticsGoal) => void;
  destruct: () => void;
};

declare global {
  interface Window {
    Ya?: {
      Metrika2: new (options: Record<string, unknown>) => YandexMetricaCounter;
    };
  }
}
