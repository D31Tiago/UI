import { z } from 'zod';

const ibanRegex = /^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/;
const bicRegex = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/;

export const bankverbindungSchema = z.object({
  iban: z
    .string()
    .transform((value) => value.replace(/\s+/g, '').toUpperCase())
    .refine((value) => ibanRegex.test(value), 'Bitte eine gültige IBAN eingeben.'),
  bic: z
    .string()
    .transform((value) => value.replace(/\s+/g, '').toUpperCase())
    .refine((value) => bicRegex.test(value), 'Bitte eine gültige BIC eingeben.'),
});

export type BankverbindungFormValues = z.infer<typeof bankverbindungSchema>;
