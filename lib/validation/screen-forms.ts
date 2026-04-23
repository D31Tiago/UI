import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormProps, UseFormReturn } from 'react-hook-form';

import { auswertungenSchema, AuswertungenFormValues } from './auswertungen.schema';
import { bankverbindungSchema, BankverbindungFormValues } from './bankverbindung.schema';
import { belegtypenSchema, BelegtypenFormValues } from './belegtypen.schema';
import { emailScreenSchema, EmailScreenFormValues } from './email.schema';
import { mandantennummerSchema, MandantennummerFormValues } from './mandantennummer.schema';
import {
  personalwirtschaftSteuernSchema,
  PersonalwirtschaftSteuernFormValues,
} from './personalwirtschaft-steuern.schema';
import { referenznummernSchema, ReferenznummernFormValues } from './referenznummern.schema';
import { smartcardSchema, SmartcardFormValues } from './smartcard.schema';
import { umsetzungsterminSchema, UmsetzungsterminFormValues } from './umsetzungstermin.schema';

const defaultFormOptions = {
  mode: 'onBlur',
  reValidateMode: 'onChange',
} as const;

export const useMandantennummerForm = (
  options?: UseFormProps<MandantennummerFormValues>,
): UseFormReturn<MandantennummerFormValues> =>
  useForm<MandantennummerFormValues>({
    ...defaultFormOptions,
    ...options,
    resolver: zodResolver(mandantennummerSchema),
  });

export const useEmailForm = (options?: UseFormProps<EmailScreenFormValues>): UseFormReturn<EmailScreenFormValues> =>
  useForm<EmailScreenFormValues>({
    ...defaultFormOptions,
    ...options,
    resolver: zodResolver(emailScreenSchema),
  });

export const useUmsetzungsterminForm = (
  options?: UseFormProps<UmsetzungsterminFormValues>,
): UseFormReturn<UmsetzungsterminFormValues> =>
  useForm<UmsetzungsterminFormValues>({
    ...defaultFormOptions,
    ...options,
    resolver: zodResolver(umsetzungsterminSchema),
  });

export const useBelegtypenForm = (
  options?: UseFormProps<BelegtypenFormValues>,
): UseFormReturn<BelegtypenFormValues> =>
  useForm<BelegtypenFormValues>({
    ...defaultFormOptions,
    ...options,
    resolver: zodResolver(belegtypenSchema),
  });

export const useSmartcardForm = (
  options?: UseFormProps<SmartcardFormValues>,
): UseFormReturn<SmartcardFormValues> =>
  useForm<SmartcardFormValues>({
    ...defaultFormOptions,
    ...options,
    resolver: zodResolver(smartcardSchema),
  });

export const useBankverbindungForm = (
  options?: UseFormProps<BankverbindungFormValues>,
): UseFormReturn<BankverbindungFormValues> =>
  useForm<BankverbindungFormValues>({
    ...defaultFormOptions,
    ...options,
    resolver: zodResolver(bankverbindungSchema),
  });

export const usePersonalwirtschaftSteuernForm = (
  options?: UseFormProps<PersonalwirtschaftSteuernFormValues>,
): UseFormReturn<PersonalwirtschaftSteuernFormValues> =>
  useForm<PersonalwirtschaftSteuernFormValues>({
    ...defaultFormOptions,
    ...options,
    resolver: zodResolver(personalwirtschaftSteuernSchema),
  });

export const useReferenznummernForm = (
  options?: UseFormProps<ReferenznummernFormValues>,
): UseFormReturn<ReferenznummernFormValues> =>
  useForm<ReferenznummernFormValues>({
    ...defaultFormOptions,
    ...options,
    resolver: zodResolver(referenznummernSchema),
  });

export const useAuswertungenForm = (
  options?: UseFormProps<AuswertungenFormValues>,
): UseFormReturn<AuswertungenFormValues> =>
  useForm<AuswertungenFormValues>({
    ...defaultFormOptions,
    ...options,
    resolver: zodResolver(auswertungenSchema),
  });
