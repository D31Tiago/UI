import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function IntakeStartPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <Card className="w-full shadow-soft">
        <CardHeader>
          <CardTitle>Willkommen zum digitalen Intake</CardTitle>
          <CardDescription>
            Starten Sie Ihren strukturierten Anfrageprozess für Mandats- und Modulzuordnung.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Der Prozess ist responsiv und führt in mehreren Schritten durch alle relevanten Angaben.
          </p>
          <Button>Intake starten</Button>
        </CardContent>
      </Card>
    </main>
  );
}
