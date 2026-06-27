const PROFILE_IMAGE_ROUTE = '/api/profile-images';

export function getInitials(name: string): string {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 1).toUpperCase();
}

export function getProfileImageUrl(imageKey: string | null) {
  if (!imageKey) return null;

  const encodedKey = imageKey.split('/').map(encodeURIComponent).join('/');
  return `${PROFILE_IMAGE_ROUTE}/${encodedKey}`;
}
