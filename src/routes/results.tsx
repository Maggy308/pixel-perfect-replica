import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Trophy, RotateCcw, BookOpen } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { loadResult, supportiveMessage, type QuizResult } from "@/lib/quiz";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Your Results — AzurePrep AI" },
      { name: "description", content: "See your AZ-900 practice score and topics to revise." },
      { property: "og:title", content: "Your Results — AzurePrep AI" },
      { property: "og:description", content: "See your AZ-900 practice score and topics to revise." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ResultsPage,
});

function ResultsPage() {
  const [result, setResult] = useState<QuizResult | null | undefined>(undefined);
  useEffect(() => setResult(loadResult()), []);

  if (result === undefined) return <AppShell><div /></AppShell>;
  if (result === null) {
    return (
      <AppShell>
        <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-10 text-center shadow-card">
          <h1 className="font-display text-xl font-bold">No results yet</h1>
          <p className="mt-2 text-muted-foreground">Finish a quiz to see your score here.</p>
          <Link to="/quiz" className="mt-6 inline-block rounded-xl bg-primary px-6 py-2.5 font-semibold text-primary-foreground">Start Quiz</Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl bg-hero p-8 text-center text-primary-foreground shadow-card">
          <Trophy className="mx-auto h-10 w-10 text-sky" />
          <p className="mt-3 font-display text-6xl font-bold">{result.percentage}%</p>
          <p className="mt-3 opacity-90">{supportiveMessage(result.percentage)}</p>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3">
          <Stat label="Total" value={result.total} />
          <Stat label="Correct" value={result.correct} tone="text-success" />
          <Stat label="Incorrect" value={result.incorrect} tone="text-destructive" />
        </div>
        <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-card">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold"><BookOpen className="h-5 w-5 text-primary" /> Topics to revise</h2>
          {result.revisionTopics.length === 0 ? (
            <p className="mt-2 text-muted-foreground">Nothing to revise — perfect score! 🎉</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {result.revisionTopics.map((t) => <li key={t} className="rounded-lg bg-secondary px-4 py-2 text-sm">{t}</li>)}
            </ul>
          )}
        </div>
        <div className="mt-6 text-center">
          <Link to="/quiz" className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground hover:brightness-125">
            <RotateCcw className="h-4 w-4" /> Try Again
          </Link>
        </div>
      </div>
    </AppShell>
  );
}

function Stat({ label, value, tone = "text-foreground" }: { label: string; value: number; tone?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 text-center shadow-card">
      <p className={`font-display text-3xl font-bold ${tone}`}>{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
