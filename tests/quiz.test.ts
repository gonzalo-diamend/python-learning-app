import * as assert from "node:assert/strict";
import { test } from "node:test";
import { buildContext } from "../lib/quiz";

const sampleQuestion = {
  text: "¿Qué imprime print(2+2)?",
  options: ["3", "4", "5"],
  correct_index: 1,
};

test("buildContext retorna in-progress antes de enviar", () => {
  const result = buildContext(sampleQuestion, 1, false);
  assert.equal(result?.type, "in-progress");
});

test("buildContext retorna correct si respuesta correcta y quiz enviado", () => {
  const result = buildContext(sampleQuestion, 1, true);
  assert.equal(result?.type, "correct");
});

test("buildContext retorna incorrect si respuesta incorrecta y quiz enviado", () => {
  const result = buildContext(sampleQuestion, 0, true);
  assert.equal(result?.type, "incorrect");
});

test("buildContext retorna null si el índice seleccionado es inválido", () => {
  const result = buildContext(sampleQuestion, 10, true);
  assert.equal(result, null);
});

test("buildContext retorna null si correct_index está fuera de rango", () => {
  const malformedQuestion = {
    ...sampleQuestion,
    correct_index: 10,
  };
  const result = buildContext(malformedQuestion, 1, true);
  assert.equal(result, null);
});
