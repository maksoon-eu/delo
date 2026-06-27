import { createEmailVerificationEmail } from '@/emails/verification';
import {
  EMAIL_VERIFICATION_REQUIRED_MESSAGE,
  EMAIL_VERIFICATION_TOKEN_TTL_MS,
} from '@/constants/auth';
import { auth } from '@/config/auth';
import { db } from '@/config/db';
import { env } from '@/config/env';
import { sendEmail } from '@/utils/email';
import type { Session } from 'next-auth';

export async function sendEmailVerificationMessage(email: string) {
  await db.verificationToken.deleteMany({ where: { identifier: email } });

  const token = crypto.randomUUID();
  const expires = new Date(Date.now() + EMAIL_VERIFICATION_TOKEN_TTL_MS);

  await db.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  });

  const verificationUrl = `${env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;
  await sendEmail(email, createEmailVerificationEmail(verificationUrl));
}

export async function getVerifiedSession(): Promise<
  { ok: true; session: Session } | { ok: false; error: string }
> {
  const session = await auth();
  if (!session) return { ok: false, error: 'Не авторизован' };

  const verification = await requireVerifiedEmail(session);
  if (verification.error) return { ok: false, error: verification.error };

  return { ok: true, session };
}

async function requireVerifiedEmail(session: Session): Promise<{ error?: string }> {
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { emailVerified: true },
  });

  if (!user?.emailVerified) {
    return { error: EMAIL_VERIFICATION_REQUIRED_MESSAGE };
  }

  return {};
}
