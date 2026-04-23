import { z } from 'zod';

const allowedDomains = ['dwl-rheine.de', 'dwl-gruppe.de'] as const;

export const dwlEmailSchema = z
  .string()
  .email('Bitte eine gültige E-Mail-Adresse eingeben.')
  .refine((value) => {
    const domain = value.split('@')[1]?.toLowerCase();
    return !!domain && allowedDomains.includes(domain as (typeof allowedDomains)[number]);
  }, 'Es sind nur @dwl-rheine.de oder @dwl-gruppe.de erlaubt.');

export const emailScreenSchema = z.object({
  email: dwlEmailSchema,
});

export type EmailScreenFormValues = z.infer<typeof emailScreenSchema>;
