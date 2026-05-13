import { Resend } from 'resend';
import { env } from '@/lib/env';
import type { EmailMessage } from '@/types/email';

let resend: Resend | null = null;

function getResend() {
  resend ??= new Resend(env.RESEND_API_KEY);
  return resend;
}

export async function sendEmail(to: string, message: EmailMessage) {
  await getResend().emails.send({
    from: `Delo <noreply@${env.RESEND_DOMAIN}>`,
    to,
    subject: message.subject,
    html: message.html,
  });
}
