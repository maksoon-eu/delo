import { z } from 'zod';

export const ClientSchema = z.object({
  name: z.string().min(1, 'Имя обязательно'),
  email: z.union([z.email('Некорректный email'), z.literal('')]),
  phone: z.union([
    z.literal(''),
    z.string().refine((val) => {
      const digits = val.replace(/\D/g, '');
      return digits.length === 10 || digits.length === 11;
    }, 'Некорректный номер телефона'),
  ]),
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
