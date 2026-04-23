import { z } from 'zod';

const startOfToday = (): Date => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

export const umsetzungsterminSchema = z.object({
  umsetzungstermin: z.coerce
    .date({
      errorMap: () => ({ message: 'Bitte ein gültiges Datum auswählen.' }),
    })
    .refine((date) => date > startOfToday(), 'Der Umsetzungstermin muss nach dem heutigen Datum liegen.'),
});

export type UmsetzungsterminFormValues = z.infer<typeof umsetzungsterminSchema>;
