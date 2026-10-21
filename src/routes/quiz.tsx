import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, XCircle, RotateCcw, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { QUESTIONS } from "@/data/questions";
import { useQuiz } from "@/hooks/use-quiz";
import { saveResult } from "@/lib/quiz";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Practice Quiz — AzurePrep AI" },
      { name: "description", content: "Answer AZ-900 style questions one at a time with instant feedback." },
      { property: "og:title", content: "Practice Quiz — AzurePrep AI" },
      { property: "og:description", content: "Answer AZ-900 style questions one at a time with instant feedback." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: QuizPage,
});

function QuizPage() {
  const quiz = useQuiz(QUESTIONS);
  const navigate = useNavigate();

  if (!quiz.current) {
    return (
      <AppShell>
        <div className="rounded-2xl border border-border bg-card p-10 text-center">
          <h1 className="font-display text-xl font-bold">No questions available</h1>
          <p className="mt-2 text-muted-foreground">Please check back later.</p>
          <Link to="/" className="mt-6 inline-block text-primary underline">Back home</Link>
        </div>
      </AppShell>
    );
  }

  const q = quiz.current;
  const finish = () => { saveResult(quiz.result()); navigate({ to: "/results" }); };

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold">Question {quiz.index + 1} of {quiz.total}</span>
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">{q.category}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={Math.round(quiz.progress)} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full rounded-full bg-sky transition-all" style={{ width: `${quiz.progress}%` }} />
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
          <h1 className="font-display text-xl font-semibold leading-snug">{q.question}</h1>
          <div className="mt-6 space-y-3" role="radiogroup">
            {q.options.map((opt, i) => {
              const chosen = quiz.selected === i;
              let state = "border-border hover:border-sky hover:bg-secondary";
              if (quiz.submitted && i === q.correctIndex) state = "border-success bg-success/10";
              else if (quiz.submitted && chosen) state = "border-destructive bg-destructive/10";
              else if (chosen) state = "border-primary bg-secondary ring-2 ring-sky";
              return (
                <button key={i} role="radio" aria-checked={chosen} disabled={quiz.submitted} onClick={() => quiz.select(i)}
                  className={`flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition ${state} disabled:cursor-default`}>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-muted text-sm font-semibold">{String.fromCharCode(65 + i)}</span>
                  <span className="flex-1">{opt}</span>
                  {quiz.submitted && i === q.correctIndex && <CheckCircle2 className="h-5 w-5 text-success" />}
                  {quiz.submitted && chosen && i !== q.correctIndex && <XCircle className="h-5 w-5 text-destructive" />}
                </button>
              );
            })}
          </div>

          {quiz.submitted && (
            <div className={`mt-6 rounded-xl p-4 ${quiz.isCorrect ? "bg-success/10" : "bg-destructive/10"}`} aria-live="polite">
              <p className={`font-semibold ${quiz.isCorrect ? "text-success" : "text-destructive"}`}>
                {quiz.isCorrect ? "Correct!" : "Not quite."}
              </p>
              <p className="mt-1 text-sm">{q.explanation}</p>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <button onClick={quiz.restart} className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium hover:bg-secondary">
              <RotateCcw className="h-4 w-4" /> Restart Quiz
            </button>
            {!quiz.submitted ? (
              <button onClick={quiz.submit} disabled={quiz.selected === null}
                className="rounded-xl bg-primary px-6 py-2.5 font-semibold text-primary-foreground hover:brightness-125 disabled:cursor-not-allowed disabled:opacity-40">
                Submit Answer
              </button>
            ) : quiz.isLast ? (
              <button onClick={finish} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 font-semibold text-primary-foreground hover:brightness-125">
                See Results <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button onClick={quiz.next} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 font-semibold text-primary-foreground hover:brightness-125">
                Next Question <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
          {quiz.selected === null && !quiz.submitted && (
            <p className="mt-3 text-right text-xs text-muted-foreground">Select an answer to continue.</p>
          )}
        </div>
      </div>
    </AppShell>
  );
}
