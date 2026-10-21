import { describe, it, expect } from "vitest";
import { scoreQuiz } from "@/lib/quiz";
import { QUESTIONS } from "@/data/questions";

describe("scoreQuiz", () => {
  it("counts correct and incorrect answers and percentage", () => {
    const answers = QUESTIONS.map((q, i) => (i < 9 ? q.correctIndex : (q.correctIndex + 1) % 4));
    const r = scoreQuiz(QUESTIONS, answers);
    expect(r.correct).toBe(9);
    expect(r.incorrect).toBe(QUESTIONS.length - 9);
    expect(r.percentage).toBe(Math.round((9 / QUESTIONS.length) * 100));
    expect(r.revisionTopics.length).toBeGreaterThan(0);
  });
  it("has at least 10 questions with 4 options each", () => {
    expect(QUESTIONS.length).toBeGreaterThanOrEqual(10);
    QUESTIONS.forEach((q) => expect(q.options).toHaveLength(4));
  });
  it("treats unanswered as incorrect", () => {
    expect(scoreQuiz(QUESTIONS, QUESTIONS.map(() => null)).correct).toBe(0);
  });
});
