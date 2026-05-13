# Patterns

## Cooldown actions

- Server actions that throttle repeated user actions should return `{ error, retryAfter }` when blocked.
- Client buttons should use `useAsyncAction()` for loading/errors and `useCountdown()` for the visible countdown.
- The client countdown is only UX; server-side checks in `src/lib/rate-limit.ts` are authoritative.

## Email templates

- Store email template builders in named files in `src/emails/`; do not add `src/emails/index.ts`.
- Keep Resend delivery in `src/lib/email.ts` via `sendEmail()`.
- Server Actions should create tokens and call delivery helpers, not embed email HTML inline.
- Shared email types belong in `src/types/email.ts`, not inside `src/emails/`.

## Constants

- Store global constants in named domain files under `src/constants/`.
- Do not add a `src/constants/index.ts` barrel; import constants directly from the domain file.

## Types

- Store shared TypeScript-only types in named domain files under `src/types/`.
- Do not add a `src/types/index.ts` barrel; import types directly from the domain file.

## Profile images

- Store `User.image` as `profiles/<userId>/<file>`, not a public URL and not an env-prefixed S3 key.
- Add `APP_ENV` only inside `src/lib/s3.ts` when reading, writing, or deleting S3 objects.
- Build browser-facing image URLs with `getProfileImageUrl()` from `src/lib/profile-image.ts`.
- Serve profile images through `/api/profile-images/[...key]`.

## Validation and fallbacks

- Avoid defensive fallback values for data that has already been validated or is guaranteed by a storage invariant.
- Keep checks focused on meaningful validation, authorization, ownership, and external boundary failures.

## Order documents

- Store uploaded order document keys with `uuid~safe-file-name`; `~` is outside the UUID alphabet, so display/download names can be extracted by splitting the final path segment.
