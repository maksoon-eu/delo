import { db } from '@/lib/db';
import { auth } from '@/lib/auth';
import type { Session } from 'next-auth';
import { EMAIL_VERIFICATION_REQUIRED_MESSAGE } from '@/constants/auth';

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
