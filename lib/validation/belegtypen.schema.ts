import { z } from 'zod';

export const belegtypenSchema = z.object({
  standardBelegtypen: z
    .array(z.string().min(1, 'Ungültiger Belegtyp.'))
    .min(1, 'Bitte mindestens einen Standard-Belegtyp auswählen.'),
});

export type BelegtypenFormValues = z.infer<typeof belegtypenSchema>;
