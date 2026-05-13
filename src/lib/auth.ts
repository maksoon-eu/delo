import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { LoginSchema } from '@/schemas/auth';

async function deleteVerificationToken(identifier: string, token: string) {
  await db.verificationToken.deleteMany({ where: { identifier, token } });
}

async function verifyEmailAndGetUser(token: string) {
  const verificationToken = await db.verificationToken.findFirst({ where: { token } });

  if (!verificationToken) return null;

  if (verificationToken.expires < new Date()) {
    await deleteVerificationToken(verificationToken.identifier, verificationToken.token);
    return null;
  }

  const user = await db.user.findUnique({ where: { email: verificationToken.identifier } });
  if (!user) {
    await deleteVerificationToken(verificationToken.identifier, verificationToken.token);
    return null;
  }

  await db.$transaction([
    db.user.update({
      where: { id: user.id },
      data: { emailVerified: user.emailVerified ?? new Date() },
    }),
    db.verificationToken.deleteMany({
      where: {
        identifier: verificationToken.identifier,
        token: verificationToken.token,
      },
    }),
  ]);

  return user;
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string | null;
    };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        verificationToken: { label: 'Verification token', type: 'text' },
      },
      async authorize(credentials) {
        const verificationToken =
          typeof credentials?.verificationToken === 'string' ? credentials.verificationToken : '';

        if (verificationToken) {
          return verifyEmailAndGetUser(verificationToken);
        }

        const parsed = LoginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const user = await db.user.findUnique({
          where: { email: parsed.data.email },
        });

        if (!user) return null;

        const valid = await bcrypt.compare(parsed.data.password, user.password);
        if (!valid) return null;

        return user;
      },
    }),
  ],
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
});
