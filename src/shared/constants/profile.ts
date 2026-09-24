export const PROFILE_IMAGE_MAX_BYTES = 5 * 1024 * 1024;
export const PROFILE_IMAGE_ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;
export const PROFILE_IMAGE_ACCEPT = PROFILE_IMAGE_ALLOWED_TYPES.join(',');
export const PROFILE_IMAGE_EXTENSION_BY_TYPE = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
} satisfies Record<(typeof PROFILE_IMAGE_ALLOWED_TYPES)[number], string>;
