import { useMemo, useState } from "react";
import useSWR from "swr";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

const fetcher = async (path: string) => {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) {
    throw new Error("Error al cargar datos");
  }
  return res.json();
};

type Lesson = {
  id: string;
  title: string;
  goal: string;
  theory: string;
  example: string;
  quiz: {
    questions: {
      text: string;
      options: string[];
      correct_index: number;
    }[];
  };
};

type ModuleCard = {
  id: string;
  title: string;
  description: string;
  level: string;
  lesson_count: number;
};

type QuizResult = {
  score: number;
  total: number;
  correct_indices: number[];
};

const DEMO_USER = "demo-wife";

export default function Home() {
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const { data: modules } = useSWR<ModuleCard[]>("/modules", fetcher);
  const currentModule = modules?.[0];
  const { data: moduleDetail } = useSWR(
    currentModule ? `/modules/${currentModule.id}` : null,
    fetcher
  );
  const firstLessonId = moduleDetail?.lessons?.[0]?.id;
  const lessonKey = useMemo(() => {
    if (!currentModule?.id || !firstLessonId) {
      return null;
    }
    return `/modules/${currentModule.id}/lessons/${firstLessonId}`;
  }, [currentModule?.id, firstLessonId]);
  const { data: lesson } = useSWR<Lesson | null>(lessonKey, fetcher);
  const { data: progress, mutate: refreshProgress } = useSWR(
    currentModule ? `/progress/${DEMO_USER}/${currentModule.id}` : null,
    fetcher
  );

  const completionPercent = progress?.completion_percent ?? 0;

  const onSubmitQuiz = async () => {
    if (!lesson) return;
    const answers = lesson.quiz.questions.map((q) => q.correct_index);
    const res = await fetch(`${API_BASE}/quiz/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: DEMO_USER,
        module_id: currentModule?.id,
        lesson_id: lesson.id,
        answers,
      }),
    });
    if (!res.ok) return;
    setQuizResult(await res.json());
  };

  const onMarkLessonComplete = async () => {
    if (!currentModule || !lesson) return;
    await fetch(`${API_BASE}/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: DEMO_USER,
        module_id: currentModule.id,
        completed_lessons: [lesson.id],
      }),
    });
    refreshProgress();
  };

  return (
    <main className="main">
      <header>
        <h1>Aprende Python paso a paso</h1>
        <p>Estrategia guiada, pequeños retos y feedback inmediato para tu esposa.</p>
      </header>

      <section className="grid" style={{ marginTop: "2rem" }}>
        {modules?.map((module) => (
          <article key={module.id} className="card">
            <p className="badge">Nivel: {module.level}</p>
            <h2>{module.title}</h2>
            <p>{module.description}</p>
            <div className="badges">
              <span className="badge">{module.lesson_count} lecciones</span>
            </div>
          </article>
        ))}
      </section>

      {lesson && (
        <section className="grid" style={{ marginTop: "3rem" }}>
          <article className="card">
            <p className="badge">Lección</p>
            <h2>{lesson.title}</h2>
            <p>{lesson.goal}</p>
            <p>{lesson.theory}</p>
            <pre style={{ whiteSpace: "pre-wrap", marginTop: "0.75rem" }}>{lesson.example}</pre>
            <div style={{ marginTop: "1rem" }}>
              <button
                style={{
                  background: "#38bdf8",
                  border: "none",
                  color: "#0f172a",
                  padding: "0.6rem 1.2rem",
                  borderRadius: "999px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
                onClick={onMarkLessonComplete}
              >
                Marcar como completada
              </button>
            </div>
          </article>

          <article className="card">
            <p className="badge">Quiz de la lección</p>
            <h2>Preguntas</h2>
            <div>
              {lesson.quiz.questions.map((question, index) => (
                <div key={index} style={{ marginBottom: "0.75rem" }}>
                  <p style={{ fontWeight: "600" }}>{question.text}</p>
                  <ul style={{ margin: 0, paddingLeft: "1rem" }}>
                    {question.options.map((option, optionIndex) => (
                      <li key={optionIndex}>{option}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <button
              style={{
                marginTop: "1rem",
                background: "transparent",
                border: "1px solid rgba(56, 189, 248, 0.8)",
                borderRadius: "999px",
                color: "#38bdf8",
                padding: "0.5rem 1.5rem",
                cursor: "pointer",
                fontWeight: "600",
              }}
              onClick={onSubmitQuiz}
            >
              Enviar respuestas sugeridas
            </button>
            {quizResult && (
              <p style={{ marginTop: "0.75rem" }}>
                Resultado: {quizResult.score} / {quizResult.total}
              </p>
            )}
          </article>

          <article className="card">
            <p className="badge">Progreso en tiempo real</p>
            <h2>Racha diaria</h2>
            <p>{completionPercent}% del módulo completado</p>
            <div className="progress-bar">
              <span style={{ width: `${completionPercent}%` }} />
            </div>
            <p className="muted" style={{ color: "var(--muted)", marginTop: "0.5rem" }}>
              ID usuario demo: <code>{DEMO_USER}</code>
            </p>
          </article>
        </section>
      )}

      <section style={{ marginTop: "3rem" }}>
        <article className="card">
          <h2>Pasos siguientes</h2>
          <div className="badges">
            <span className="badge">Inicia el backend con `uvicorn app.main:app --reload`</span>
            <span className="badge">Apunta `NEXT_PUBLIC_API_BASE_URL` al backend</span>
            <span className="badge">Ejecuta `npm run dev` en este directorio a http://localhost:3001</span>
          </div>
          <p style={{ marginTop: "1rem" }}>
            La app usa `fetch` y `useSWR` para mantener sincronizado el progreso y simular un flujo guiado.
          </p>
        </article>
      </section>
    </main>
  );
}
