import { ModuleCard } from "../lib/types";
import { StatusMessage } from "./StatusMessage";

type ModulePickerProps = {
  modules?: ModuleCard[];
  loading: boolean;
  error?: string;
  selectedModuleId: string | null;
  onSelectModule: (id: string) => void;
};

export function ModulePicker({ modules, loading, error, selectedModuleId, onSelectModule }: ModulePickerProps) {
  const currentModule = modules?.find((module) => module.id === selectedModuleId);
  const showEmpty = !loading && !error && modules?.length === 0;

  return (
    <article className="card">
      <p className="badge">Ruta activa</p>
      <h2>Selecciona módulo</h2>
      {loading && <StatusMessage message="Cargando módulos..." />}
      {error && <StatusMessage kind="error" message={error} />}
      {showEmpty && <StatusMessage message="Todavía no hay módulos disponibles." />}
      <div className="stack">
        {modules?.map((module) => (
          <button
            key={module.id}
            className={`module-button ${selectedModuleId === module.id ? "active" : ""}`}
            onClick={() => onSelectModule(module.id)}
          >
            <strong>{module.title}</strong>
            <span>
              {module.level} · {module.lesson_count} lecciones
            </span>
          </button>
        ))}
      </div>
      {currentModule && <p style={{ marginTop: "0.75rem" }}>{currentModule.description}</p>}
    </article>
  );
}
