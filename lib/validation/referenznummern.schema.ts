import { z } from 'zod';

const optionalFiveDigits = z
  .string()
  .trim()
  .optional()
  .refine((value) => !value || /^\d{5}$/.test(value), 'Wenn gesetzt, muss die Nummer genau 5 Ziffern haben.');

export const referenznummernSchema = z.object({
  beraternummer: optionalFiveDigits,
  mandantennummer: optionalFiveDigits,
});

export type ReferenznummernFormValues = z.infer<typeof referenznummernSchema>;
