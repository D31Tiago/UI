import { z } from 'zod';

export const personalwirtschaftSteuernSchema = z
  .object({
    personalwirtschaft: z.boolean().default(false),
    steuern: z.boolean().default(false),
  })
  .refine((value) => value.personalwirtschaft || value.steuern, {
    message: 'Bitte mindestens eine Option auswählen (Personalwirtschaft oder Steuern).',
    path: ['personalwirtschaft'],
  });

export type PersonalwirtschaftSteuernFormValues = z.infer<typeof personalwirtschaftSteuernSchema>;
