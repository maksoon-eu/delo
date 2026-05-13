# Current Task State

## 2026-05-13

- Profile saving now submits immediately from the profile form; the confirmation dialog was removed.
- Profile cards use a stretched right column so the profile form block and side blocks align by height.
- Email HTML templates now live in named files in `src/emails/`, while Resend delivery is centralized in `src/lib/email.ts`.
- `src/constants/index.ts` was removed; constants are split by domain files under `src/constants/`.
- `src/types/index.ts` was removed; shared types are split by domain files under `src/types/`.
- Profile images now store keys like `profiles/<userId>/<file>` in `User.image`; `APP_ENV` is added only in S3 helpers.
- Added a 30-second server-side cooldown for resending email verification links.
- The profile resend button now uses `useCountdown()` for client-side UX and restarts from the server-provided `retryAfter` after reload/direct retry.
- Prisma migration `20260513120000_add_email_verification_cooldown` adds `VerificationToken.createdAt`.
- Public order pages now include the executor's profile `workTerms` in a dedicated "Условия работы исполнителя" section when terms are present.
- Dashboard order cards now keep new orders in `DRAFT` until the user copies the public order link.
- Clicking `Скопировать и отправить` copies the public order URL, moves `DRAFT` orders to `SENT`, and logs a `SENT` activity.
- Public order links can be copied from any order status; only `DRAFT` orders are moved to `SENT` by copying.
- Order sending state is stored on `Order.sentAt`; order activity remains display-only history.
- Client `email` and `phone` were replaced by a free-form `contact` field for phone numbers, Telegram/VK nicknames, email, or any other contact text.
- Dashboard order status panel is a titled "Действия по заказу" section with aligned status, inline next actions, and client link controls.
- Order status badges now use per-status active highlight styles, so the current status in the order panel and status chips in the orders table are visually distinct.
