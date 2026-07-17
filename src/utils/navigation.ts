import type { Route } from 'next';

export function getBackLink(returnTo: string | string[] | undefined, fallback: string): Route {
  if (typeof returnTo === 'string' && returnTo.startsWith('/')) {
    return returnTo as Route;
  }

  return fallback as Route;
}
