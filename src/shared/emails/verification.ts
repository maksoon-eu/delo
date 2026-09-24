import { createEmailLayout } from '@/emails/email-layout';
import type { EmailMessage } from '@/types/email';

export function createEmailVerificationEmail(verificationUrl: string): EmailMessage {
  return {
    subject: 'Подтверждение email — Delo',
    html: createEmailLayout({
      title: 'Подтвердите email',
      intro:
        'Нужно подтвердить адрес, чтобы защищённые действия в Delo были доступны только владельцу аккаунта.',
      ctaLabel: 'Подтвердить email',
      ctaUrl: verificationUrl,
      note: 'Ссылка действительна 24 часа. Если вы не регистрировались в Delo, просто проигнорируйте это письмо.',
    }),
  };
}
