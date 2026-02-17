import { Lesson } from "./types";

export type ContextType = "in-progress" | "correct" | "incorrect";

export type AnswerContext = {
  type: ContextType;
  title: string;
  message: string;
};

export const buildContext = (
  question: Lesson["quiz"]["questions"][number],
  selectedIndex: number | undefined,
  quizSubmitted: boolean
): AnswerContext | null => {
  if (selectedIndex === undefined) {
    return null;
  }

  const selectedOption = question.options[selectedIndex];
  const correctOption = question.options[question.correct_index];
  const isCorrect = selectedIndex === question.correct_index;

  if (!quizSubmitted) {
    return {
      type: "in-progress",
      title: `Tu respuesta: ${selectedOption}`,
      message:
        "Buen avance. Antes de enviar, explica con tus palabras por qué elegiste esta opción; eso fortalece la comprensión.",
    };
  }

  if (isCorrect) {
    return {
      type: "correct",
      title: "✅ Respuesta correcta",
      message: "Excelente. Este concepto te ayuda a resolver variaciones de la misma idea en ejercicios más complejos.",
    };
  }

  return {
    type: "incorrect",
    title: "❌ Respuesta a reforzar",
    message: `Elegiste "${selectedOption}". La opción correcta es "${correctOption}". Revisa la teoría y vuelve a intentar para consolidar el contexto.`,
  };
};
