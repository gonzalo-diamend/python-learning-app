type ProfileCardProps = {
  userId: string;
  onChangeUserId: (next: string) => void;
};

export function ProfileCard({ userId, onChangeUserId }: ProfileCardProps) {
  return (
    <article className="card">
      <p className="badge">Perfil activo</p>
      <h2>Tu usuario</h2>
      <label className="field-label" htmlFor="user-id">
        ID de estudiante
      </label>
      <input
        id="user-id"
        className="input"
        value={userId}
        onChange={(event) => onChangeUserId(event.target.value)}
        placeholder="ej: ana-python"
      />
      <p className="muted">Se guarda en este navegador para continuar tu progreso.</p>
    </article>
  );
}
