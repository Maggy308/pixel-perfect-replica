import type { Question } from "@/data/questions";

export interface QuizResult {
  total: number;
  correct: number;
  incorrect: number;
  percentage: number;
  revisionTopics: string[];
}

/** answers[i] = selected option index for questions[i], or null if unanswered. */
export function scoreQuiz(questions: Question[], answers: (number | null)[]): QuizResult {
  const total = questions.length;
  let correct = 0;
  const topics = new Set<string>();
  questions.forEach((q, i) => {
    if (answers[i] === q.correctIndex) correct++;
    else topics.add(`${q.topic} (${q.category})`);
  });
  return {
    total,
    correct,
    incorrect: total - correct,
    percentage: total === 0 ? 0 : Math.round((correct / total) * 100),
    revisionTopics: [...topics],
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
    return raw ? (JSON.parse(raw) as QuizResult) : null;
  } catch { return null; }
}
