import { z } from 'zod';

export function getValidationErrorMessage(error: z.ZodError) {
  return error.issues[0]?.message ?? 'Ошибка валидации';
}

export function requiredAmount(
  requiredMessage: string,
  minMessage: string,
  integerMessage: string
) {
  return z
    .union([z.number(), z.string(), z.null(), z.undefined()])
    .refine((value) => value !== '' && value != null, requiredMessage)
    .pipe(
      z.coerce
        .number<string | number | null | undefined>({ error: requiredMessage })
        .int(integerMessage)
        .min(1, minMessage)
    );
}
