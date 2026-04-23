import { z } from "zod";

export const intakeSchema = z.object({
  firstName: z.string().min(2, "Vorname muss mindestens 2 Zeichen lang sein."),
  lastName: z.string().min(2, "Nachname muss mindestens 2 Zeichen lang sein."),
  email: z.string().email("Bitte eine gültige E-Mail-Adresse angeben."),
  phone: z.string().min(6, "Bitte eine gültige Telefonnummer angeben.")
});

export type IntakeFormData = z.infer<typeof intakeSchema>;
