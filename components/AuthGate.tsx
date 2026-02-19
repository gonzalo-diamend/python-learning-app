import { FormEvent, useState } from "react";
import { login } from "../lib/auth";
import { StatusMessage } from "./StatusMessage";

type AuthGateProps = {
  onLogin: (userId: string) => void;
};

export function AuthGate({ onLogin }: AuthGateProps) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!userId.trim()) {
      setError("Debes ingresar un usuario.");
      return;
    }

    setSubmitting(true);
    try {
      const session = await login(userId.trim(), password);
      if (!session.authenticated || !session.user_id) {
        setError("No se pudo iniciar sesión.");
        return;
      }

      onLogin(session.user_id);
    } catch {
      setError("Credenciales inválidas o backend no disponible.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="main">
      <section className="auth-wrapper">
        <article className="card auth-card">
          <p className="badge">Acceso</p>
          <h1>Ingreso con sesión backend</h1>
          <p>Inicia sesión con tu usuario y contraseña. La sesión se mantiene vía cookie segura.</p>
          <form onSubmit={onSubmit}>
            <label className="field-label" htmlFor="auth-user-id">
              Usuario
            </label>
            <input
              id="auth-user-id"
              className="input"
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
              placeholder="ej: ana-python"
            />
            <label className="field-label" htmlFor="auth-password" style={{ marginTop: "0.75rem", display: "block" }}>
              Contraseña
            </label>
            <input
              id="auth-password"
              className="input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Ingresa tu contraseña"
            />
            <button className="btn btn-primary" type="submit" style={{ marginTop: "1rem" }} disabled={submitting}>
              {submitting ? "Ingresando..." : "Entrar"}
            </button>
          </form>
          {error && <StatusMessage kind="error" message={error} />}
        </article>
      </section>
    </main>
  );
}
