export const ROOT_ROUTE = '/';
export const LOGIN_ROUTE = '/login';

export const AUTH_ROUTES = ['/login', '/register', '/forgot-password', '/reset-password'] as const;

export const PUBLIC_ROUTES = [
  '/order',
  '/verify-email',
  '/terms',
  '/privacy',
  '/api/auth',
] as const;

export const PROTECTED_ROUTES = [
  ROOT_ROUTE,
  '/clients',
  '/orders',
  '/profile',
  '/reports',
  '/api/documents',
] as const;
