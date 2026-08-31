import NextAuth from 'next-auth';
import { authConfig } from '@/config/auth-options';
import {
  AUTH_ROUTES,
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  PROTECTED_ROUTES,
  PUBLIC_ROUTES,
} from '@/constants/routes';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

function matchesRoutes(pathname: string, routes: readonly string[]) {
  return routes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const isAuthPage = matchesRoutes(pathname, AUTH_ROUTES);
  const isPublicPage = matchesRoutes(pathname, PUBLIC_ROUTES);
  const isProtectedPage = matchesRoutes(pathname, PROTECTED_ROUTES);

  if (isPublicPage) return NextResponse.next();

  if (isAuthPage) {
    if (isLoggedIn) return NextResponse.redirect(new URL(DASHBOARD_ROUTE, req.nextUrl));
    return NextResponse.next();
  }

  if (isProtectedPage && !isLoggedIn) {
    return NextResponse.redirect(new URL(LOGIN_ROUTE, req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
