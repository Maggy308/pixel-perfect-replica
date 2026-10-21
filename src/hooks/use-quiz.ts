import { useCallback, useState } from "react";
import type { Question } from "@/data/questions";
import { scoreQuiz } from "@/lib/quiz";

export function useQuiz(questions: Question[]) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));

  const current = questions[index];
  const isLast = index === questions.length - 1;

  const select = (i: number) => { if (!submitted) setSelected(i); };
  const submit = () => {
    if (selected === null || submitted) return;
    setAnswers((a) => a.map((v, i) => (i === index ? selected : v)));
    setSubmitted(true);
  };
  const next = () => {
    if (!submitted || isLast) return;
    setIndex((i) => i + 1);
    setSelected(null);
    setSubmitted(false);
  };
  const restart = useCallback(() => {
    setIndex(0); setSelected(null); setSubmitted(false);
    setAnswers(questions.map(() => null));
  }, [questions]);

  return {
    current, index, total: questions.length, selected, submitted, isLast,
    isCorrect: submitted && current ? selected === current.correctIndex : false,
    progress: questions.length ? ((index + (submitted ? 1 : 0)) / questions.length) * 100 : 0,
    select, submit, next, restart,
    result: () => scoreQuiz(questions, answers),
  };
}
