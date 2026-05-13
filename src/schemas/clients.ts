import { z } from 'zod';

export const ClientSchema = z.object({
  name: z.string().min(1, 'Имя обязательно'),
  contact: z.string(),
  company: z.string(),
  inn: z.union([
    z.literal(''),
    z
      .string()
      .refine((val) => /^\d{10}$|^\d{12}$/.test(val), 'ИНН должен содержать 10 или 12 цифр'),
  ]),
  notes: z.string(),
});

export type ClientInput = z.infer<typeof ClientSchema>;
