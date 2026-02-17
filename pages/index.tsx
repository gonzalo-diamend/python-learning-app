import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { LessonPicker } from "../components/LessonPicker";
import { ModulePicker } from "../components/ModulePicker";
import { ProfileCard } from "../components/ProfileCard";
import { ProgressCard } from "../components/ProgressCard";
import { QuizPanel } from "../components/QuizPanel";
import { RecommendedModules } from "../components/RecommendedModules";
import { StatusMessage } from "../components/StatusMessage";
import { fetchJson, postJson } from "../lib/api";
import { Lesson, ModuleCard, ModuleDetail, QuizResult } from "../lib/types";

type ProgressData = {
  completion_percent: number;
};

const DEFAULT_USER = "demo-wife";

export default function Home() {
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [userId, setUserId] = useState(DEFAULT_USER);
  const [submittingQuiz, setSubmittingQuiz] = useState(false);
  const [submittingProgress, setSubmittingProgress] = useState(false);
  const [quizSubmitError, setQuizSubmitError] = useState<string | null>(null);
  const [progressSubmitError, setProgressSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("learning_user_id");
    if (saved) {
      setUserId(saved);
    }
  }, []);

  const onChangeUserId = (next: string) => {
    const trimmed = next.trimStart();
    setUserId(trimmed);
    window.localStorage.setItem("learning_user_id", trimmed || DEFAULT_USER);
  };

  const { data: modules, isLoading: modulesLoading, error: modulesError } = useSWR<ModuleCard[]>(
    "/modules",
    fetchJson
  );

  useEffect(() => {
    if (!modules?.length) {
      return;
    }

    setSelectedModuleId((current) => {
      if (current && modules.some((module) => module.id === current)) {
        return current;
      }
      return modules[0].id;
    });
  }, [modules]);

  const { data: moduleDetail, error: moduleDetailError } = useSWR<ModuleDetail>(
    selectedModuleId ? `/modules/${selectedModuleId}` : null,
    fetchJson
  );

  useEffect(() => {
    if (!moduleDetail?.lessons?.length) {
      setSelectedLessonId(null);
      return;
    }

    setSelectedLessonId((current) => {
      if (current && moduleDetail.lessons.some((lesson) => lesson.id === current)) {
        return current;
      }
      return moduleDetail.lessons[0].id;
    });
  }, [moduleDetail]);

  const lessonKey = useMemo(() => {
    if (!selectedModuleId || !selectedLessonId) {
      return null;
    }
    return `/modules/${selectedModuleId}/lessons/${selectedLessonId}`;
  }, [selectedLessonId, selectedModuleId]);

  const { data: lesson, error: lessonError } = useSWR<Lesson | null>(lessonKey, fetchJson);

  useEffect(() => {
    setQuizResult(null);
    setAnswers([]);
    setQuizSubmitError(null);
    setProgressSubmitError(null);
  }, [lesson?.id]);

  const {
    data: progress,
    error: progressError,
    mutate: refreshProgress,
  } = useSWR<ProgressData>(
    selectedModuleId ? `/progress/${userId || DEFAULT_USER}/${selectedModuleId}` : null,
    fetchJson
  );

  const completionPercent = progress?.completion_percent ?? 0;

  const onSelectAnswer = (questionIndex: number, optionIndex: number) => {
    setAnswers((current) => {
      const next = [...current];
      next[questionIndex] = optionIndex;
      return next;
    });
  };

  const onSubmitQuiz = async () => {
    if (!lesson || !selectedModuleId) return;
    if (answers.length !== lesson.quiz.questions.length || answers.some((answer) => answer === undefined)) {
      return;
    }

    setSubmittingQuiz(true);
    setQuizSubmitError(null);
    try {
      const payload = await postJson<QuizResult>("/quiz/submit", {
        user_id: userId || DEFAULT_USER,
        module_id: selectedModuleId,
        lesson_id: lesson.id,
        answers,
      });
      setQuizResult(payload);
    } catch {
      setQuizSubmitError("No se pudo enviar el quiz. Verifica backend/conexión e intenta de nuevo.");
    } finally {
      setSubmittingQuiz(false);
    }
  };

  const onMarkLessonComplete = async () => {
    if (!selectedModuleId || !lesson) return;

    setSubmittingProgress(true);
    setProgressSubmitError(null);
    try {
      await postJson<unknown>("/progress", {
        user_id: userId || DEFAULT_USER,
        module_id: selectedModuleId,
        completed_lessons: [lesson.id],
      });
      refreshProgress();
    } catch {
      setProgressSubmitError("No se pudo guardar el progreso. Intenta nuevamente.");
    } finally {
      setSubmittingProgress(false);
    }
  };

  const isQuizReady = lesson
    ? answers.length === lesson.quiz.questions.length && answers.every((answer) => answer !== undefined)
    : false;

  return (
    <main className="main">
      <header>
        <h1>Aprende Python paso a paso</h1>
        <p>Estrategia guiada, pequeños retos y feedback inmediato.</p>
      </header>

      <section className="grid" style={{ marginTop: "2rem" }}>
        <ProfileCard userId={userId} onChangeUserId={onChangeUserId} />
        <ModulePicker
          modules={modules}
          loading={modulesLoading}
          error={modulesError ? "No se pudieron cargar los módulos." : undefined}
          selectedModuleId={selectedModuleId}
          onSelectModule={setSelectedModuleId}
        />
        <LessonPicker
          moduleDetail={moduleDetail}
          selectedLessonId={selectedLessonId}
          onSelectLesson={setSelectedLessonId}
          error={moduleDetailError ? "No se pudo cargar el detalle del módulo." : undefined}
        />
      </section>

      <RecommendedModules />

      {lessonError && (
        <section style={{ marginTop: "1rem" }}>
          <StatusMessage kind="error" message="No se pudo cargar la lección seleccionada." />
        </section>
      )}

      {progressError && (
        <section style={{ marginTop: "1rem" }}>
          <StatusMessage kind="error" message="No se pudo cargar el progreso del usuario." />
        </section>
      )}

      {lesson && (
        <section className="grid" style={{ marginTop: "3rem" }}>
          <article className="card">
            <p className="badge">Lección</p>
            <h2>{lesson.title}</h2>
            <p>{lesson.goal}</p>
            <p>{lesson.theory}</p>
            <pre style={{ whiteSpace: "pre-wrap", marginTop: "0.75rem" }}>{lesson.example}</pre>
            <div style={{ marginTop: "1rem" }}>
              <button className="btn btn-primary" onClick={onMarkLessonComplete} disabled={submittingProgress}>
                {submittingProgress ? "Guardando..." : "Marcar como completada"}
              </button>
            </div>
            {progressSubmitError && <StatusMessage kind="error" message={progressSubmitError} />}
          </article>

          <QuizPanel
            lesson={lesson}
            answers={answers}
            quizResult={quizResult}
            isQuizReady={isQuizReady}
            submitting={submittingQuiz}
            submitError={quizSubmitError ?? undefined}
            onSelectAnswer={onSelectAnswer}
            onSubmitQuiz={onSubmitQuiz}
          />

          <ProgressCard completionPercent={completionPercent} userId={userId || DEFAULT_USER} />
        </section>
      )}

      <section style={{ marginTop: "3rem" }}>
        <article className="card">
          <h2>Pasos para usarla</h2>
          <div className="badges">
            <span className="badge">1) Levanta backend en :8000</span>
            <span className="badge">2) Define NEXT_PUBLIC_API_BASE_URL</span>
            <span className="badge">3) Ejecuta npm run dev en este repo</span>
          </div>
        </article>
      </section>
    </main>
  );
}
