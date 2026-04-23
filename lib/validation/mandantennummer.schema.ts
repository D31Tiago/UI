import { z } from 'zod';

export const fiveDigitNumber = z
  .string()
  .regex(/^\d{5}$/, 'Bitte genau 5 Ziffern eingeben.');

export const mandantennummerSchema = z.object({
  mandantennummer: fiveDigitNumber,
});

export type MandantennummerFormValues = z.infer<typeof mandantennummerSchema>;
