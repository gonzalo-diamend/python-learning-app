export function ProgressCard({ completionPercent, userId }: { completionPercent: number; userId: string }) {
  return (
    <article className="card">
      <p className="badge">Progreso en tiempo real</p>
      <h2>Racha diaria</h2>
      <p>{completionPercent}% del módulo completado</p>
      <div className="progress-bar">
        <span style={{ width: `${completionPercent}%` }} />
      </div>
      <p className="muted" style={{ color: "var(--muted)", marginTop: "0.5rem" }}>
        ID usuario activo: <code>{userId}</code>
      </p>
    </article>
  );
}
