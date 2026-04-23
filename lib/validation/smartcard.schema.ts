import { z } from 'zod';

export const smartcardPersonSchema = z.object({
  id: z.string().min(1, 'Person-ID fehlt.'),
  name: z.string().min(1, 'Name fehlt.'),
});

export const smartcardSchema = z.object({
  personen: z.array(smartcardPersonSchema).min(1, 'Bitte mindestens eine Smartcard-Person erfassen.'),
});

export type SmartcardFormValues = z.infer<typeof smartcardSchema>;
