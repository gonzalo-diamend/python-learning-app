import { ModuleDetail } from "../lib/types";
import { StatusMessage } from "./StatusMessage";

type LessonPickerProps = {
  moduleDetail?: ModuleDetail;
  selectedLessonId: string | null;
  onSelectLesson: (id: string) => void;
  error?: string;
};

export function LessonPicker({ moduleDetail, selectedLessonId, onSelectLesson, error }: LessonPickerProps) {
  return (
    <article className="card">
      <p className="badge">Lecciones</p>
      <h2>Elige por dónde seguir</h2>
      {error && <StatusMessage kind="error" message={error} />}
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
        {!moduleDetail?.lessons?.length && <p className="muted">No hay lecciones disponibles todavía.</p>}
      </div>
    </article>
  );
}
