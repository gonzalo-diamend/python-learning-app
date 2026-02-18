import { ModuleDetail } from "../lib/types";
import { StatusMessage } from "./StatusMessage";

type LessonPickerProps = {
  moduleDetail?: ModuleDetail;
  loading?: boolean;
  selectedLessonId: string | null;
  onSelectLesson: (id: string) => void;
  error?: string;
};

export function LessonPicker({ moduleDetail, loading = false, selectedLessonId, onSelectLesson, error }: LessonPickerProps) {
  const showEmpty = !loading && !error && Boolean(moduleDetail) && !moduleDetail?.lessons?.length;

  return (
    <article className="card">
      <p className="badge">Lecciones</p>
      <h2>Elige por dónde seguir</h2>
      {loading && <StatusMessage message="Cargando lecciones..." />}
      {error && <StatusMessage kind="error" message={error} />}
      {showEmpty && <StatusMessage message="Este módulo aún no tiene lecciones." />}
      <div className="stack">
        {moduleDetail?.lessons?.map((lesson, index) => (
          <button
            key={lesson.id}
            className={`lesson-button ${selectedLessonId === lesson.id ? "active" : ""}`}
            onClick={() => onSelectLesson(lesson.id)}
          >
            <span>
              {index + 1}. {lesson.title}
            </span>
          </button>
        ))}
        {!loading && !error && !moduleDetail && <p className="muted">Selecciona un módulo para ver sus lecciones.</p>}
      </div>
    </article>
  );
}
