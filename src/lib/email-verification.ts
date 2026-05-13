import { createEmailVerificationEmail } from '@/emails/email-verification';
import { EMAIL_VERIFICATION_TOKEN_TTL_MS } from '@/constants/auth';
import { db } from '@/lib/db';
import { sendEmail } from '@/lib/email';
import { env } from '@/lib/env';

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
