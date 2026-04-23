import { z } from 'zod';

export const paketEntscheidungSchema = z
  .object({
    paketId: z.string().min(1, 'Paket-ID fehlt.'),
    ja: z.boolean().default(false),
    nein: z.boolean().default(false),
  })
  .refine((value) => Number(value.ja) + Number(value.nein) === 1, {
    message: 'Pro Paket muss genau eine Entscheidung getroffen werden.',
    path: ['ja'],
  });

export const auswertungenSchema = z.object({
  pakete: z.array(paketEntscheidungSchema),
});

export type AuswertungenFormValues = z.infer<typeof auswertungenSchema>;
