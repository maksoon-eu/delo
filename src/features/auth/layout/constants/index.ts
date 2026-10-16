import type { AuthPanelContent, AuthPanelSegment } from '../types';

export const AUTH_PANEL_BY_SEGMENT = {
  login: {
    title: 'Добро пожаловать',
    description: 'Войдите в свой аккаунт',
  },
  register: {
    title: 'Создайте аккаунт',
    description: 'Начните управлять проектами прямо сейчас',
  },
  'forgot-password': {
    title: 'Восстановление пароля',
    description: 'Введите email - мы пришлём ссылку для сброса пароля',
  },
  'reset-password': {
    title: 'Новый пароль',
    description: 'Придумайте надёжный пароль для вашего аккаунта',
  },
  'verify-email': {
    title: 'Подтверждаем email',
    description: 'Проверяем ссылку и открываем аккаунт',
  },
} satisfies Record<AuthPanelSegment, AuthPanelContent>;
