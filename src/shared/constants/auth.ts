import { ClipboardList, UsersRound, WalletCards } from 'lucide-react';
import type { AuthFeature, AuthPanelContent, AuthPanelSegment, AuthTab } from '@/types/auth';
import { LOGIN_ROUTE } from '@/constants/routes';

export const LEGAL_CONSENT_VERSION = '2026-07-06';

export const LOGIN_ATTEMPTS_PER_TIER = 4;
export const LOGIN_BASE_LOCKOUT_SECONDS = 30;
export const PASSWORD_RESET_COOLDOWN_MS = 30 * 1000;
export const EMAIL_VERIFICATION_COOLDOWN_MS = 30 * 1000;
export const EMAIL_VERIFICATION_TOKEN_TTL_MS = 1000 * 60 * 60 * 24;
export const EMAIL_VERIFICATION_REQUIRED_MESSAGE =
  'Подтвердите email в профиле, чтобы выполнять это действие';

export const AUTH_TABS: AuthTab[] = [
  { id: 'login', label: 'Войти', href: LOGIN_ROUTE },
  { id: 'register', label: 'Регистрация', href: '/register' },
];

export const AUTH_FEATURES: AuthFeature[] = [
  { label: 'Заказы', Icon: ClipboardList },
  { label: 'Клиенты', Icon: UsersRound },
  { label: 'Финансы', Icon: WalletCards },
];

export const AUTH_PANEL_BY_SEGMENT = {
  login: {
    activeTab: 'login',
    title: 'Добро пожаловать',
    description: 'Войдите в свой аккаунт',
  },
  register: {
    activeTab: 'register',
    title: 'Создайте аккаунт',
    description: 'Начните управлять проектами прямо сейчас',
  },
  'forgot-password': {
    activeTab: null,
    title: 'Восстановление пароля',
    description: 'Введите email - мы пришлём ссылку для сброса пароля',
  },
  'reset-password': {
    activeTab: null,
    title: 'Новый пароль',
    description: 'Придумайте надёжный пароль для вашего аккаунта',
  },
  'verify-email': {
    activeTab: null,
    title: 'Подтверждаем email',
    description: 'Проверяем ссылку и открываем аккаунт',
  },
} satisfies Record<AuthPanelSegment, AuthPanelContent>;
