const EXTRA_MODULES: Array<{ title: string; focus: string; level: string; outcomes: string[] }> = [
  {
    title: "Python para automatización diaria",
    focus: "scripts pequeños para archivos, carpetas y tareas repetitivas",
    level: "Principiante",
    outcomes: ["leer y escribir archivos", "automatizar tareas comunes", "uso básico de funciones"],
  },
  {
    title: "Manipulación de datos con listas y diccionarios",
    focus: "organizar información real en estructuras simples",
    level: "Principiante",
    outcomes: ["filtrar datos", "agrupar información", "resolver ejercicios de lógica"],
  },
  {
    title: "APIs y consumo de servicios",
    focus: "hacer peticiones HTTP y procesar respuestas JSON",
    level: "Intermedio",
    outcomes: ["usar requests", "manejar errores", "crear mini integraciones"],
  },
  {
    title: "Proyecto final guiado",
    focus: "construir una app pequeña de principio a fin",
    level: "Intermedio",
    outcomes: ["planificación modular", "buenas prácticas", "entrega funcional"],
  },
];

export function RecommendedModules() {
  return (
    <section style={{ marginTop: "1.5rem" }}>
      <article className="card">
        <p className="badge">Más módulos recomendados</p>
        <h2>Expande tu ruta de aprendizaje</h2>
        <div className="extra-module-grid">
          {EXTRA_MODULES.map((module) => (
            <div key={module.title} className="extra-module-card">
              <h3>{module.title}</h3>
              <p className="muted">Nivel: {module.level}</p>
              <p>{module.focus}</p>
              <ul>
                {module.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
