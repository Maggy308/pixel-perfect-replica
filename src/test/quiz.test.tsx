import { describe, it, expect } from "vitest";
import { scoreQuiz, selectQuestions } from "@/lib/quiz";
import { QUESTIONS, CATEGORIES } from "@/data/questions";

describe("question bank", () => {
  it("has at least 20 questions, 4 options each, valid correct answer", () => {
    expect(QUESTIONS.length).toBeGreaterThanOrEqual(20);
    QUESTIONS.forEach((q) => {
      expect(q.options).toHaveLength(4);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(4);
    });
  });
  it("covers all three topics", () => {
    CATEGORIES.forEach((c) => expect(QUESTIONS.some((q) => q.category === c.name)).toBe(true));
  });
});

describe("selectQuestions", () => {
  it("returns the requested count when enough exist", () => {
    const r = selectQuestions(QUESTIONS, { topic: "All Topics", difficulty: "All Levels", count: 20 });
    expect(r.questions).toHaveLength(20);
    expect(r.shortfall).toBe(false);
  });
  it("filters by topic and difficulty and flags a shortfall", () => {
    const r = selectQuestions(QUESTIONS, { topic: "Cloud Concepts", difficulty: "Beginner", count: 20 });
    expect(r.shortfall).toBe(true);
    expect(r.questions.length).toBe(r.available);
    r.questions.forEach((q) => {
      expect(q.category).toBe("Cloud Concepts");
      expect(q.difficulty).toBe("Beginner");
    });
  });
});

describe("scoreQuiz", () => {
  it("counts correct/incorrect, percentage, and review", () => {
    const qs = QUESTIONS.slice(0, 10);
    const answers = qs.map((q, i) => (i < 7 ? q.correctIndex : (q.correctIndex + 1) % 4));
    const r = scoreQuiz(qs, answers);
    expect(r.correct).toBe(7);
    expect(r.incorrect).toBe(3);
    expect(r.percentage).toBe(70);
    expect(r.review).toHaveLength(10);
    expect(r.review.filter((x) => !x.correct)).toHaveLength(3);
  });
  it("treats unanswered as incorrect", () => {
    expect(scoreQuiz(QUESTIONS, QUESTIONS.map(() => null)).correct).toBe(0);
  });
});
