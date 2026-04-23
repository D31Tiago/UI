import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kanzlei Intake Plattform",
  description: "Ruhige B2B-Oberfläche für Intake, Module und interne Abläufe"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
