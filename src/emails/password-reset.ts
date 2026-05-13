import { createEmailLayout } from '@/emails/email-layout';
import type { EmailMessage } from '@/types/email';

export function createPasswordResetEmail(resetUrl: string): EmailMessage {
  return {
    subject: 'Сброс пароля — Delo',
    html: createEmailLayout({
      title: 'Сброс пароля',
      intro:
        'Мы получили запрос на смену пароля. Задайте новый пароль, чтобы снова войти в свой рабочий кабинет.',
      ctaLabel: 'Задать новый пароль',
      ctaUrl: resetUrl,
      note: 'Ссылка действительна 1 час. Если вы не запрашивали сброс, просто проигнорируйте это письмо.',
    }),
  };
}
