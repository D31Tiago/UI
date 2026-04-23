# Kanzlei UI Foundation

Initiales Next.js-Setup mit App Router + TypeScript, Tailwind, shadcn/ui-Basisbausteinen, Zod-Validierung und Zustand-Store.

## Struktur

- `app/(public)/page.tsx`: Start-/Intake-Entry
- `app/(wizard)/wizard/page.tsx`: mehrstufiger Wizard-Bereich
- `app/(modules)/modules/page.tsx`: Modul-Hub
- `app/(admin)/admin/page.tsx`: Admin-Bereich
- `app/(ops)/ops/page.tsx`: Ops-Bereich
- `components/ui/*`: UI-Bausteine im shadcn/ui-Stil
- `lib/validation/*`: Zod-Schemas
- `stores/*`: globaler State (Zustand)

## Start

```bash
npm install
npm run dev
```
