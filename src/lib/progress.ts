import type { QuizResult } from "@/lib/quiz";

export interface QuizSummary {
  date: string; // ISO
  topic: string;
  difficulty: string;
  total: number;
  correct: number;
  percentage: number;
  byCategory: Record<string, { correct: number; total: number }>;
}

const KEY = "azureprep-progress-v1";
const MAX = 50;

export function summarize(result: QuizResult, date = new Date()): QuizSummary {
  const byCategory: QuizSummary["byCategory"] = {};
  result.review.forEach((r) => {
    const c = (byCategory[r.category] ??= { correct: 0, total: 0 });
    c.total++;
    if (r.correct) c.correct++;
  });
  return {
    date: date.toISOString(),
    topic: result.settings?.topic ?? "All Topics",
    difficulty: result.settings?.difficulty ?? "All Levels",
    total: result.total, correct: result.correct, percentage: result.percentage, byCategory,
  };
}

export function loadHistory(): QuizSummary[] {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as QuizSummary[]) : [];
  } catch { return []; }
}

export function addToHistory(summary: QuizSummary) {
  try {
    localStorage.setItem(KEY, JSON.stringify([summary, ...loadHistory()].slice(0, MAX)));
  } catch { /* storage unavailable — ignore */ }
}

export function clearHistory() {
  try { localStorage.removeItem(KEY); } catch { /* ignore */ }
}

export function bestScore(history: QuizSummary[]): number | null {
  return history.length ? Math.max(...history.map((h) => h.percentage)) : null;
}

export function topicPerformance(history: QuizSummary[]) {
  const agg: Record<string, { correct: number; total: number }> = {};
  history.forEach((h) =>
    Object.entries(h.byCategory).forEach(([cat, v]) => {
      const a = (agg[cat] ??= { correct: 0, total: 0 });
      a.correct += v.correct; a.total += v.total;
    }),
  );
  return Object.entries(agg).map(([category, v]) => ({
    category, ...v, percentage: v.total ? Math.round((v.correct / v.total) * 100) : 0,
  }));
}
