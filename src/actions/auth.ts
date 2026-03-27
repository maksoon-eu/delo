'use server';

import { signOut } from '@/lib/auth';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { Resend } from 'resend';
import { env } from '@/lib/env';
import {
  LoginSchema,
  RegisterSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
  type LoginInput,
  type RegisterInput,
  type ForgotPasswordInput,
  type ResetPasswordInput,
} from '@/schemas/auth';
import {
  checkLoginRateLimit,
  recordFailedLogin,
  clearLoginAttempts,
  checkPasswordResetCooldown,
} from '@/lib/rate-limit';

export async function logoutUser() {
  await signOut({ redirect: false });
}

export async function loginUser(
  data: LoginInput
): Promise<{ error?: string; retryAfter?: number }> {
  const { data: parsed, success, error } = LoginSchema.safeParse(data);
  if (!success) return { error: error.issues[0].message };

  const rateLimit = await checkLoginRateLimit(parsed.email);
  if (rateLimit.blocked) {
    return { error: 'Слишком много попыток. Попробуйте позже.', retryAfter: rateLimit.retryAfter };
  }

  const user = await db.user.findUnique({ where: { email: parsed.email } });
  const valid = user && (await bcrypt.compare(parsed.password, user.password));

  if (!valid) {
    await recordFailedLogin(parsed.email);
    return { error: 'Неверный email или пароль' };
  }

  await clearLoginAttempts(parsed.email);
  return {};
}

export async function registerUser(data: RegisterInput): Promise<{ error?: string }> {
  const { data: parsedData, success, error } = RegisterSchema.safeParse(data);
  if (!success) {
    return { error: error.issues[0].message };
  }

  const existing = await db.user.findUnique({
    where: { email: parsedData.email },
  });

  if (existing) {
    return { error: 'Пользователь с таким email уже существует' };
  }

  const hashedPassword = await bcrypt.hash(parsedData.password, 10);

  await db.user.create({
    data: {
      name: parsedData.name,
      email: parsedData.email,
      password: hashedPassword,
    },
  });

  return {};
}

export async function sendPasswordResetEmail(
  data: ForgotPasswordInput
): Promise<{ error?: string; retryAfter?: number }> {
  const { data: parsed, success, error } = ForgotPasswordSchema.safeParse(data);
  if (!success) return { error: error.issues[0].message };

  const cooldown = await checkPasswordResetCooldown(parsed.email);
  if (cooldown.blocked) {
    return {
      error: 'Письмо уже отправлено. Подождите перед повторной отправкой.',
      retryAfter: cooldown.retryAfter,
    };
  }

  const user = await db.user.findUnique({ where: { email: parsed.email } });
  if (!user) return {};

  await db.passwordResetToken.deleteMany({ where: { email: parsed.email } });

  const token = crypto.randomUUID();
  const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 час

  await db.passwordResetToken.create({ data: { email: parsed.email, token, expires } });

  const resetUrl = `${env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  const resend = new Resend(env.RESEND_API_KEY);
  await resend.emails.send({
    from: `Delo <noreply@${env.RESEND_DOMAIN}>`,
    to: parsed.email,
    subject: 'Сброс пароля — Delo',
    html: `
      <p>Вы запросили сброс пароля.</p>
      <p><a href="${resetUrl}">Нажмите здесь, чтобы задать новый пароль</a></p>
      <p>Ссылка действительна 1 час. Если вы не запрашивали сброс — просто проигнорируйте это письмо.</p>
    `,
  });

  return {};
}

export async function resetPassword(
  token: string,
  data: ResetPasswordInput
): Promise<{ error?: string; email?: string; password?: string }> {
  const { data: parsed, success, error } = ResetPasswordSchema.safeParse(data);
  if (!success) return { error: error.issues[0].message };

  const resetToken = await db.passwordResetToken.findUnique({ where: { token } });

  if (!resetToken || resetToken.expires < new Date()) {
    return { error: 'Ссылка недействительна или истекла' };
  }

  const hashedPassword = await bcrypt.hash(parsed.password, 10);

  await db.user.update({
    where: { email: resetToken.email },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({ where: { token } });

  return { email: resetToken.email, password: parsed.password };
}
