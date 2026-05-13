import { Resend } from 'resend';
import { env } from '@/lib/env';
import type { EmailMessage } from '@/types/email';

const resend = new Resend(env.RESEND_API_KEY);

export async function sendEmail(to: string, message: EmailMessage) {
  await resend.emails.send({
    from: `Delo <noreply@${env.RESEND_DOMAIN}>`,
    to,
    subject: message.subject,
    html: message.html,
  });
}
