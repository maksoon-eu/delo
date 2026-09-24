import { z } from 'zod';

export const ProfileSchema = z.object({
  name: z.string().trim().min(1, 'Имя обязательно'),
  workTerms: z.string().trim().max(2000, 'Не больше 2000 символов'),
});

export type ProfileInput = z.infer<typeof ProfileSchema>;
