import { z } from "zod";

export const wizardStepSchema = z.object({
  stepId: z.string().min(1),
  completed: z.boolean(),
  notes: z.string().max(2000).optional()
});

export const wizardStateSchema = z.object({
  currentStep: z.number().int().min(1),
  steps: z.array(wizardStepSchema).min(1)
});

export type WizardState = z.infer<typeof wizardStateSchema>;
