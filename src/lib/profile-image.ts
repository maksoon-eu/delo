const PROFILE_IMAGE_ROUTE = '/api/profile-images';

export function getProfileImageUrl(imageKey: string | null) {
  if (!imageKey) return null;

  const encodedKey = imageKey.split('/').map(encodeURIComponent).join('/');
  return `${PROFILE_IMAGE_ROUTE}/${encodedKey}`;
}
