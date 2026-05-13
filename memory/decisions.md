# Decisions

## 2026-05-13: Email verification resend cooldown

- Email verification resend uses a 30-second server-side cooldown, matching password reset resend behavior.
- Cooldown is based on `VerificationToken.createdAt`, not derived from `expires`, so changing token TTL does not affect resend timing.
- Frontend countdown is only UX; the backend remains authoritative and returns `retryAfter` when cooldown is active.

## 2026-05-13: Explicit order link sharing

- Creating an order does not send it to the client and does not automatically change `DRAFT` to `SENT`.
- `DRAFT -> SENT` is not a generic status transition in the status panel; it happens only when the user copies the public order link.
- The app does not email public order links to clients. The user manually sends the copied link through the client's preferred channel.
- Clicking `Скопировать и отправить` copies the public order URL and marks the order as `SENT`.
- Public order links can be copied from any order status; only `DRAFT` orders are moved to `SENT` by the copy action.
- Order send state is based on `Order.sentAt`; `Activity` is only a history log and must not be used as a business-state source.

## 2026-05-13: Client contact field

- Client contact details are stored in free-form `Client.contact`.
- Old `Client.email` and `Client.phone` data are merged into `contact` during migration, because contact may contain a phone number, Telegram/VK nickname, email, or any other text.
