import type { NextAuthConfig } from 'next-auth';
import { LOGIN_ROUTE } from '@/constants/routes';

export const authConfig = {
  providers: [],
  session: { strategy: 'jwt' },
  pages: {
    signIn: LOGIN_ROUTE,
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      if (token.id) session.user.id = token.id as string;
      return session;
    },
  },
} satisfies NextAuthConfig;
