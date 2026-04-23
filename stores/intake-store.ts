import { create } from "zustand";

import type { IntakeFormData } from "@/lib/validation/intake";

type IntakeStore = {
  data: Partial<IntakeFormData>;
  setField: <K extends keyof IntakeFormData>(field: K, value: IntakeFormData[K]) => void;
  reset: () => void;
};

export const useIntakeStore = create<IntakeStore>((set) => ({
  data: {},
  setField: (field, value) => set((state) => ({ data: { ...state.data, [field]: value } })),
  reset: () => set({ data: {} })
}));
