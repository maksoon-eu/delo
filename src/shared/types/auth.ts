export type AuthPanelSegment =
  | 'login'
  | 'register'
  | 'forgot-password'
  | 'reset-password'
  | 'verify-email';

export type AuthPanelContent = {
  title: string;
  description: string;
};
