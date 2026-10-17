'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { YANDEX_METRICA_SCRIPT_URL } from '@/shared/constants/analytics';
import {
  startMetricaTracking,
  stopMetricaTracking,
  trackGoal,
  trackMetricaPageView,
} from '@/shared/utils/metrica';

export function YandexMetrica() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  function handleReady() {
    setReady(true);
  }

  useEffect(() => {
    startMetricaTracking();

    function handleRegistrationClick(event: MouseEvent) {
      if (window.location.pathname !== '/' || !(event.target instanceof Element)) return;

      const link = event.target.closest('a[href="/register"]');
      if (!link) return;

      trackGoal('registration_click');
    }

    // Capture the click before Next.js changes the current route.
    document.addEventListener('click', handleRegistrationClick, true);

    return () => {
      document.removeEventListener('click', handleRegistrationClick, true);
      stopMetricaTracking();
    };
  }, []);

  useEffect(() => {
    if (ready) trackMetricaPageView();
  }, [ready, pathname]);

  return (
    <Script
      id="yandex-metrica"
      src={YANDEX_METRICA_SCRIPT_URL}
      strategy="afterInteractive"
      referrerPolicy="origin"
      onReady={handleReady}
    />
  );
}
