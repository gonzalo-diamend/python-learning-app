import { buildContext } from "../lib/quiz";
import { Lesson, QuizResult } from "../lib/types";

type QuizPanelProps = {
  lesson: Lesson;
  answers: number[];
  quizResult: QuizResult | null;
  isQuizReady: boolean;
  submitting: boolean;
  submitError?: string;
  onSelectAnswer: (questionIndex: number, optionIndex: number) => void;
  onSubmitQuiz: () => void;
};

export function QuizPanel({
  lesson,
  answers,
  quizResult,
  isQuizReady,
  submitting,
  submitError,
  onSelectAnswer,
  onSubmitQuiz,
}: QuizPanelProps) {
  return (
    <article className="card">
      <p className="badge">Quiz de la lección</p>
      <h2>Responde y valida</h2>
      <div>
        {lesson.quiz.questions.map((question, index) => {
          const context = buildContext(question, answers[index], Boolean(quizResult));

          return (
            <div key={index} style={{ marginBottom: "1rem" }}>
              <p style={{ fontWeight: "600" }}>{question.text}</p>
              <div className="options">
                {question.options.map((option, optionIndex) => {
                  const isSelected = answers[index] === optionIndex;
                  return (
                    <button
                      key={optionIndex}
                      className={`option-button ${isSelected ? "selected" : ""}`}
                      onClick={() => onSelectAnswer(index, optionIndex)}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {context && (
                <div className={`answer-context ${context.type}`}>
                  <p className="context-title">{context.title}</p>
                  <p>{context.message}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <button className="btn btn-outline" onClick={onSubmitQuiz} disabled={!isQuizReady || submitting}>
        {submitting ? "Enviando..." : "Enviar respuestas"}
      </button>
      {!isQuizReady && <p className="muted">Completa todas las preguntas para enviar el quiz.</p>}
      {submitError && <p className="status-message error">{submitError}</p>}
      {quizResult && (
        <p style={{ marginTop: "0.75rem" }}>
          Resultado: {quizResult.score} / {quizResult.total}
        </p>
      )}
    </article>
  );
}
