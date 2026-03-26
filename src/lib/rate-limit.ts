import { db } from '@/lib/db';

const ATTEMPTS_PER_TIER = 4;
const BASE_LOCKOUT_SECONDS = 30;
const PASSWORD_RESET_COOLDOWN_MS = 30 * 1000; // 30 секунд

// 5 попыток → 30с, 10 → 60с, 15 → 120с, ...
function getLockoutSeconds(count: number): number {
  const tier = Math.floor(count / ATTEMPTS_PER_TIER);
  return BASE_LOCKOUT_SECONDS * Math.pow(2, tier - 1);
}

export async function checkLoginRateLimit(email: string) {
  const count = await db.loginAttempt.count({ where: { email } });

  if (count < ATTEMPTS_PER_TIER) {
    return { blocked: false, retryAfter: 0 };
  }

  const lastAttempt = await db.loginAttempt.findFirst({
    where: { email },
    orderBy: { createdAt: 'desc' },
  });

  if (!lastAttempt) return { blocked: false, retryAfter: 0 };

  const lockoutSeconds = getLockoutSeconds(count);
  const secondsSinceLast = (Date.now() - lastAttempt.createdAt.getTime()) / 1000;
  const retryAfter = Math.ceil(lockoutSeconds - secondsSinceLast);

  if (retryAfter > 0) {
    return { blocked: true, remainingAttempts: 0, retryAfter };
  }

  return { blocked: false, retryAfter: 0 };
}

export async function recordFailedLogin(email: string) {
  await db.loginAttempt.create({ data: { email } });
}

export async function clearLoginAttempts(email: string) {
  await db.loginAttempt.deleteMany({ where: { email } });
}

export async function checkPasswordResetCooldown(email: string) {
  const recent = await db.passwordResetToken.findFirst({
    where: { email },
    orderBy: { createdAt: 'desc' },
  });

  if (!recent) return { blocked: false, retryAfter: 0 };

  const elapsed = Date.now() - recent.createdAt.getTime();
  if (elapsed < PASSWORD_RESET_COOLDOWN_MS) {
    return { blocked: true, retryAfter: Math.ceil((PASSWORD_RESET_COOLDOWN_MS - elapsed) / 1000) };
  }

  return { blocked: false, retryAfter: 0 };
}
