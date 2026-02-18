import * as assert from "node:assert/strict";
import { test } from "node:test";

import {
  buildProgressPayload,
  buildQuizPayload,
  canSubmitQuiz,
  pickLessonId,
  pickModuleId,
} from "../lib/home-flow";

const modules = [
  { id: "m1", title: "M1", description: "d1", level: "Inicial", lesson_count: 2 },
  { id: "m2", title: "M2", description: "d2", level: "Medio", lesson_count: 1 },
];

const moduleDetail = {
  id: "m1",
  title: "M1",
  lessons: [
    { id: "l1", title: "L1" },
    { id: "l2", title: "L2" },
  ],
};

const lesson = {
  id: "l1",
  title: "Intro",
  goal: "goal",
  theory: "theory",
  example: "print('hola')",
  quiz: {
    questions: [
      { text: "q1", options: ["a", "b"], correct_index: 0 },
      { text: "q2", options: ["c", "d"], correct_index: 1 },
    ],
  },
};

test("pickModuleId conserva módulo actual si existe", () => {
  assert.equal(pickModuleId(modules, "m2"), "m2");
});

test("pickModuleId toma el primero si el actual no existe", () => {
  assert.equal(pickModuleId(modules, "no-existe"), "m1");
});

test("pickLessonId conserva lección actual si existe", () => {
  assert.equal(pickLessonId(moduleDetail, "l2"), "l2");
});

test("pickLessonId toma la primera si la actual no existe", () => {
  assert.equal(pickLessonId(moduleDetail, "x"), "l1");
});

test("canSubmitQuiz requiere todas las respuestas", () => {
  assert.equal(canSubmitQuiz(lesson, [0]), false);
  assert.equal(canSubmitQuiz(lesson, [0, 1]), true);
});

test("buildQuizPayload y buildProgressPayload generan estructura esperada", () => {
  const quizPayload = buildQuizPayload(lesson, "m1", [0, 1], "", "demo");
  assert.deepEqual(quizPayload, {
    user_id: "demo",
    module_id: "m1",
    lesson_id: "l1",
    answers: [0, 1],
  });

  const progressPayload = buildProgressPayload("l1", "m1", "user-1", "demo");
  assert.deepEqual(progressPayload, {
    user_id: "user-1",
    module_id: "m1",
    completed_lessons: ["l1"],
  });
});
