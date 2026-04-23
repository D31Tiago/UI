import { useEffect, useState, type CSSProperties } from 'react';
import { FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form';

type Person = { name: string; role: string; accessLevel: string };
type BankConnection = { bankName: string; iban: string; bic: string };
type PayrollTaxEntry = { category: string; reference: string; note: string };
type ReportPackage = { packageName: string; recipients: string; cadence: string };

type FormValues = {
  people: Person[];
  bankConnections: BankConnection[];
  payrollTaxEntries: PayrollTaxEntry[];
  reportPackages: ReportPackage[];
};

type SectionProps<TItem extends Record<string, string>> = {
  title: string;
  description: string;
  badgeLabel: string;
  emptyText: string;
  name: 'people' | 'bankConnections' | 'payrollTaxEntries' | 'reportPackages';
  fieldsConfig: Array<{ key: keyof TItem; label: string; placeholder: string }>;
};

function EmptyState({ text, onAdd }: { text: string; onAdd: () => void }) {
  return (
    <div style={{ border: '1px dashed #9ca3af', borderRadius: 8, padding: 16, marginTop: 12 }}>
      <p style={{ margin: 0, color: '#6b7280' }}>{text}</p>
      <button type="button" onClick={onAdd} style={{ marginTop: 12 }}>
        + Eintrag hinzufügen
      </button>
    </div>
  );
}

function ConfirmDialog({
  open,
  title,
  message,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;

  return (
    <div style={overlayStyle}>
      <div style={dialogStyle}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button type="button" onClick={onCancel}>
            Abbrechen
          </button>
          <button type="button" onClick={onConfirm} style={{ background: '#ef4444', color: '#fff' }}>
            Löschen
          </button>
        </div>
      </div>
    </div>
  );
}

function EntryModal<TItem extends Record<string, string>>({
  open,
  title,
  fieldsConfig,
  initialValue,
  onClose,
  onSave,
}: {
  open: boolean;
  title: string;
  fieldsConfig: Array<{ key: keyof TItem; label: string; placeholder: string }>;
  initialValue: TItem;
  onClose: () => void;
  onSave: (item: TItem) => void;
}) {
  const [draft, setDraft] = useState<TItem>(initialValue);

  useEffect(() => setDraft(initialValue), [initialValue]);

  if (!open) return null;

  return (
    <div style={overlayStyle}>
      <div style={dialogStyle}>
        <h3>{title}</h3>
        <div style={{ display: 'grid', gap: 12 }}>
          {fieldsConfig.map((field) => (
            <label key={String(field.key)} style={{ display: 'grid', gap: 4 }}>
              <span>{field.label}</span>
              <input
                value={draft[field.key] ?? ''}
                placeholder={field.placeholder}
                onChange={(e) =>
                  setDraft((prev) => ({
                    ...prev,
                    [field.key]: e.target.value,
                  }))
                }
              />
            </label>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
          <button type="button" onClick={onClose}>
            Abbrechen
          </button>
          <button
            type="button"
            onClick={() => {
              onSave(draft);
              onClose();
            }}
          >
            Speichern
          </button>
        </div>
      </div>
    </div>
  );
}

function RepeatableSection<TItem extends Record<string, string>>(props: SectionProps<TItem>) {
  const { control } = useFormContext<FormValues>();

  const { fields, append, remove, update } = useFieldArray<FormValues, SectionProps<TItem>['name']>({
    control,
    name: props.name,
  });

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState<number | null>(null);

  const emptyTemplate = props.fieldsConfig.reduce((acc, field) => {
    acc[field.key as string] = '';
    return acc;
  }, {} as Record<string, string>) as TItem;

  const activeItem = editIndex !== null ? ((fields[editIndex] as unknown as TItem) ?? emptyTemplate) : emptyTemplate;

  return (
    <section style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 16, marginBottom: 16 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0 }}>{props.title}</h2>
          <small style={{ color: '#6b7280' }}>{props.description}</small>
        </div>
        <span
          style={{
            borderRadius: 999,
            background: '#eff6ff',
            color: '#1d4ed8',
            padding: '4px 10px',
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {fields.length} {props.badgeLabel}
        </span>
      </header>

      {fields.length === 0 ? (
        <EmptyState text={props.emptyText} onAdd={() => setEditIndex(fields.length)} />
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, marginTop: 12, display: 'grid', gap: 10 }}>
          {fields.map((field, index) => (
            <li key={field.id} style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>
              {props.fieldsConfig.map((cfg) => (
                <div key={String(cfg.key)}>
                  <strong>{cfg.label}:</strong>{' '}
                  <span>{(field as unknown as Record<string, string>)[cfg.key as string] || '—'}</span>
                </div>
              ))}
              <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                <button type="button" onClick={() => setEditIndex(index)}>
                  Bearbeiten
                </button>
                <button type="button" onClick={() => setConfirmDeleteIndex(index)}>
                  Löschen
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {fields.length > 0 && (
        <button type="button" onClick={() => setEditIndex(fields.length)} style={{ marginTop: 12 }}>
          + Weiteren Eintrag hinzufügen
        </button>
      )}

      <EntryModal<TItem>
        open={editIndex !== null}
        title={editIndex !== null && editIndex < fields.length ? 'Eintrag bearbeiten' : 'Eintrag hinzufügen'}
        fieldsConfig={props.fieldsConfig}
        initialValue={activeItem}
        onClose={() => setEditIndex(null)}
        onSave={(item) => {
          if (editIndex === null) return;
          if (editIndex < fields.length) {
            update(editIndex, item as never);
          } else {
            append(item as never);
          }
        }}
      />

      <ConfirmDialog
        open={confirmDeleteIndex !== null}
        title="Eintrag löschen"
        message="Möchtest du diesen Eintrag wirklich löschen?"
        onCancel={() => setConfirmDeleteIndex(null)}
        onConfirm={() => {
          if (confirmDeleteIndex !== null) {
            remove(confirmDeleteIndex);
          }
          setConfirmDeleteIndex(null);
        }}
      />
    </section>
  );
}

const overlayStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0, 0, 0, 0.35)',
  display: 'grid',
  placeItems: 'center',
  zIndex: 1000,
};

const dialogStyle: CSSProperties = {
  width: 'min(560px, 92vw)',
  borderRadius: 12,
  background: '#fff',
  padding: 16,
};

export default function App() {
  const methods = useForm<FormValues>({
    defaultValues: {
      people: [],
      bankConnections: [],
      payrollTaxEntries: [],
      reportPackages: [],
    },
  });

  return (
    <FormProvider {...methods}>
      <main style={{ maxWidth: 960, margin: '0 auto', padding: 24 }}>
        <h1>Konfiguration wiederholbarer Einträge</h1>

        <RepeatableSection<Person>
          title="Smartcard & Zugriffsrechte"
          description="Personen mit Zugriffsrechten verwalten"
          badgeLabel="Teammitglieder"
          emptyText="Noch keine Personen angelegt."
          name="people"
          fieldsConfig={[
            { key: 'name', label: 'Name', placeholder: 'Max Mustermann' },
            { key: 'role', label: 'Rolle', placeholder: 'Admin' },
            { key: 'accessLevel', label: 'Zugriffslevel', placeholder: 'Vollzugriff' },
          ]}
        />

        <RepeatableSection<BankConnection>
          title="Bank Online"
          description="Mehrere Bankverbindungen hinterlegen"
          badgeLabel="Bankverbindungen"
          emptyText="Noch keine Bankverbindungen angelegt."
          name="bankConnections"
          fieldsConfig={[
            { key: 'bankName', label: 'Bank', placeholder: 'Musterbank AG' },
            { key: 'iban', label: 'IBAN', placeholder: 'DE00 0000 0000 0000 0000 00' },
            { key: 'bic', label: 'BIC', placeholder: 'GENODEF1XXX' },
          ]}
        />

        <RepeatableSection<PayrollTaxEntry>
          title="Personalwirtschaft & Steuern"
          description="Mehrfacheinträge für Kategorien und Referenzen"
          badgeLabel="Einträge"
          emptyText="Noch keine Personal-/Steuer-Einträge vorhanden."
          name="payrollTaxEntries"
          fieldsConfig={[
            { key: 'category', label: 'Kategorie', placeholder: 'Lohnsteuer' },
            { key: 'reference', label: 'Referenz', placeholder: 'REF-2026-001' },
            { key: 'note', label: 'Notiz', placeholder: 'Optionaler Hinweis' },
          ]}
        />

        <RepeatableSection<ReportPackage>
          title="Auswertungen"
          description="Paketliste und Empfänger verwalten"
          badgeLabel="Pakete"
          emptyText="Noch keine Auswertungspakete vorhanden."
          name="reportPackages"
          fieldsConfig={[
            { key: 'packageName', label: 'Paketname', placeholder: 'Monatsreport' },
            { key: 'recipients', label: 'Empfänger', placeholder: 'team@example.com' },
            { key: 'cadence', label: 'Rhythmus', placeholder: 'Monatlich' },
          ]}
        />
      </main>
    </FormProvider>
  );
}
