import { FormEvent, useState } from "react";
import { StatusMessage } from "./StatusMessage";

type AuthGateProps = {
  onLogin: () => void;
};

const APP_PASSWORD = process.env.NEXT_PUBLIC_APP_PASSWORD ?? "python123";

export function AuthGate({ onLogin }: AuthGateProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== APP_PASSWORD) {
      setError("Contraseña incorrecta. Intenta nuevamente.");
      return;
    }

    window.localStorage.setItem("learning_auth", "ok");
    onLogin();
  };

  return (
    <main className="main">
      <section className="auth-wrapper">
        <article className="card auth-card">
          <p className="badge">Acceso</p>
          <h1>Bienvenida a tu app de aprendizaje</h1>
          <p>Ingresa la contraseña para continuar con tus módulos, quizzes y progreso.</p>
          <form onSubmit={onSubmit}>
            <label className="field-label" htmlFor="auth-password">
              Contraseña
            </label>
            <input
              id="auth-password"
              className="input"
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError(null);
              }}
              placeholder="Ingresa tu contraseña"
            />
            <button className="btn btn-primary" type="submit" style={{ marginTop: "1rem" }}>
              Entrar
            </button>
          </form>
          {error && <StatusMessage kind="error" message={error} />}
        </article>
      </section>
    </main>
  );
}
