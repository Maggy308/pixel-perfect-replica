import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Cloud, Server, ShieldCheck, Lightbulb, BarChart3, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { CATEGORIES, QUESTIONS } from "@/data/questions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AzurePrep AI — AZ-900 Practice Quiz" },
      { name: "description", content: "Free, unofficial AZ-900 Azure Fundamentals practice quiz with instant feedback and simple explanations." },
      { property: "og:title", content: "AzurePrep AI — AZ-900 Practice Quiz" },
      { property: "og:description", content: "Practice Azure Fundamentals with original questions, explanations, and scores." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const icons = [Cloud, Server, ShieldCheck];

function Index() {
  const counts = (name: string) => QUESTIONS.filter((q) => q.category === name).length;
  return (
    <AppShell>
      <section className="rounded-3xl bg-hero p-8 text-primary-foreground shadow-card sm:p-12">
        <p className="mb-3 inline-block rounded-full bg-sky/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider">For learners, by a learner</p>
        <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">Welcome to AzurePrep AI</h1>
        <p className="mt-4 max-w-xl text-lg opacity-90">
          Practice Azure Fundamentals (AZ-900) concepts with original questions, instant feedback, and beginner-friendly explanations.
        </p>
        <Link to="/quiz" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-sky px-6 py-3 font-semibold text-sky-foreground transition hover:brightness-110">
          Start Quiz <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold">Quiz categories</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {CATEGORIES.map((c, i) => {
            const Icon = icons[i];
            return (
              <div key={c.name} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground"><Icon className="h-5 w-5" /></span>
                <h3 className="mt-4 font-display font-semibold">{c.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
                <p className="mt-3 text-xs font-semibold text-primary">{counts(c.name)} questions</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-12 rounded-2xl bg-secondary p-6 sm:p-8">
        <h2 className="font-display text-2xl font-bold">How AzurePrep helps you learn</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          {[
            { Icon: BookOpen, t: "Original questions", d: "Exam-style practice written from scratch — never copied." },
            { Icon: Lightbulb, t: "Instant explanations", d: "See why an answer is right in plain, simple language." },
            { Icon: BarChart3, t: "Know what to revise", d: "Your results point to the exact topics to review." },
          ].map(({ Icon, t, d }) => (
            <div key={t} className="flex gap-3">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div><p className="font-semibold">{t}</p><p className="text-sm text-muted-foreground">{d}</p></div>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
