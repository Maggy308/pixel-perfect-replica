import type { Category, Difficulty, Question } from "@/data/questions";

export type TopicChoice = Category | "All Topics";
export type DifficultyChoice = Difficulty | "All Levels";
export const QUESTION_COUNTS = [5, 10, 20] as const;

export interface QuizSettings {
  topic: TopicChoice;
  difficulty: DifficultyChoice;
  count: number;
}

export interface ReviewItem {
  question: string;
  options: string[];
  selectedIndex: number | null;
  correctIndex: number;
  explanation: string;
  topic: string;
  category: string;
  correct: boolean;
}

export interface QuizResult {
  total: number;
  correct: number;
  incorrect: number;
  percentage: number;
  revisionTopics: string[];
  review: ReviewItem[];
}

/** Filters the bank by topic & difficulty, shuffles, and takes up to `count`. */
export function selectQuestions(
  bank: Question[],
  settings: QuizSettings,
  random: () => number = Math.random,
): { questions: Question[]; available: number; shortfall: boolean } {
  const pool = bank.filter(
    (q) =>
      (settings.topic === "All Topics" || q.category === settings.topic) &&
      (settings.difficulty === "All Levels" || q.difficulty === settings.difficulty),
  );
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
  }
  const questions = shuffled.slice(0, settings.count);
  return { questions, available: pool.length, shortfall: pool.length < settings.count };
}

/** answers[i] = selected option index for questions[i], or null if unanswered. */
export function scoreQuiz(questions: Question[], answers: (number | null)[]): QuizResult {
  const total = questions.length;
  let correct = 0;
  const topics = new Set<string>();
  const review: ReviewItem[] = questions.map((q, i) => {
    const sel = answers[i] ?? null;
    const ok = sel === q.correctIndex;
    if (ok) correct++;
    else topics.add(`${q.topic} (${q.category})`);
    return {
      question: q.question, options: [...q.options], selectedIndex: sel, correctIndex: q.correctIndex,
      explanation: q.explanation, topic: q.topic, category: q.category, correct: ok,
    };
  });
  return {
    total,
    correct,
    incorrect: total - correct,
    percentage: total === 0 ? 0 : Math.round((correct / total) * 100),
    revisionTopics: [...topics],
    review,
  };
}

export function supportiveMessage(percentage: number): string {
  if (percentage >= 90) return "Outstanding! You have a strong grasp of these Azure fundamentals.";
  if (percentage >= 70) return "Great work! A little revision and you'll be in excellent shape.";
  if (percentage >= 50) return "Good effort! You're building a solid foundation — keep practicing.";
  return "Every expert started here. Review the topics below and try again — you've got this!";
}

const KEY = "azureprep-last-result";
export function saveResult(r: QuizResult) {
  try { sessionStorage.setItem(KEY, JSON.stringify(r)); } catch { /* ignore */ }
}
export function loadResult(): QuizResult | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    const r = raw ? (JSON.parse(raw) as QuizResult) : null;
    if (r && !Array.isArray(r.review)) r.review = [];
    return r;
  } catch { return null; }
}
