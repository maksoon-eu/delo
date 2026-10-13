export const SEO_SITE_URL = 'https://delo-doc.ru';
export const SEO_SITE_HOST = new URL(SEO_SITE_URL).hostname;
export const SEO_SITE_HOST_PATTERN = SEO_SITE_HOST.replace(/\./g, '\\.');

export const SEO_SITE_NAME = 'Delo';
export const SEO_TITLE = 'Delo — клиенты, заказы и оплаты для фрилансеров';
export const SEO_DESCRIPTION =
  'Сервис для фрилансеров и самозанятых: клиенты, заказы, согласование условий по ссылке, учёт оплат и PDF. Все функции бесплатны на этапе MVP.';

export const SEO_SOCIAL_IMAGE = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
  alt: 'Delo — простой способ вести дела с клиентами. Бесплатно на этапе MVP.',
} as const;

export const SEO_PUBLIC_PATHS = ['/', '/privacy', '/terms'] as const;

export const SEO_PRIVATE_ROBOTS = { index: false, follow: false } as const;
export const SEO_PUBLIC_ROBOTS = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
} as const;

export const SEO_NO_INDEX_HEADERS = [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }];
