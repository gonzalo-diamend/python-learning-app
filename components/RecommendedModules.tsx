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
    title: "Control de flujo y decisiones",
    focus: "usar condicionales y bucles para resolver escenarios comunes",
    level: "Principiante",
    outcomes: ["if/elif/else", "for y while", "control con break y continue"],
  },
  {
    title: "Funciones reutilizables",
    focus: "diseñar funciones claras con parámetros y valores de retorno",
    level: "Principiante",
    outcomes: ["definición de funciones", "parámetros opcionales", "retornos consistentes"],
  },
  {
    title: "Manejo de errores en Python",
    focus: "capturar fallos sin romper la ejecución del programa",
    level: "Principiante",
    outcomes: ["try/except", "validación de entradas", "mensajes de error útiles"],
  },
  {
    title: "Trabajo con archivos CSV",
    focus: "leer, transformar y guardar datos tabulares",
    level: "Intermedio",
    outcomes: ["csv module", "limpieza básica", "exportación de resultados"],
  },
  {
    title: "Introducción a JSON",
    focus: "serializar y deserializar estructuras de datos",
    level: "Principiante",
    outcomes: ["json.loads y dumps", "estructuras anidadas", "validación de campos"],
  },
  {
    title: "Comprensiones de listas",
    focus: "escribir transformaciones compactas y legibles",
    level: "Intermedio",
    outcomes: ["list comprehensions", "filtros en línea", "mejora de rendimiento básico"],
  },
  {
    title: "Tuplas, sets y diccionarios avanzados",
    focus: "elegir la estructura correcta para cada problema",
    level: "Intermedio",
    outcomes: ["operaciones de conjuntos", "dict methods", "hash y pertenencia"],
  },
  {
    title: "Programación orientada a objetos I",
    focus: "crear clases simples para modelar entidades",
    level: "Intermedio",
    outcomes: ["clases e instancias", "__init__", "métodos de instancia"],
  },
  {
    title: "Programación orientada a objetos II",
    focus: "aplicar herencia y composición en proyectos pequeños",
    level: "Intermedio",
    outcomes: ["herencia básica", "composición", "encapsulación"],
  },
  {
    title: "Decoradores en práctica",
    focus: "extender funciones sin modificar su código fuente",
    level: "Avanzado",
    outcomes: ["funciones de orden superior", "wrappers", "reutilización transversal"],
  },
  {
    title: "Generadores e iteradores",
    focus: "procesar grandes volúmenes de datos de forma eficiente",
    level: "Avanzado",
    outcomes: ["yield", "iter y next", "pipelines ligeros"],
  },
  {
    title: "Módulos y paquetes",
    focus: "organizar proyectos Python de forma mantenible",
    level: "Intermedio",
    outcomes: ["imports claros", "__init__.py", "estructura de carpetas"],
  },
  {
    title: "Entornos virtuales y dependencias",
    focus: "aislar librerías por proyecto y evitar conflictos",
    level: "Principiante",
    outcomes: ["venv", "requirements.txt", "pip freeze"],
  },
  {
    title: "Pruebas unitarias con unittest",
    focus: "asegurar comportamiento correcto con test automatizados",
    level: "Intermedio",
    outcomes: ["casos de prueba", "asserts", "cobertura básica"],
  },
  {
    title: "Testing con pytest",
    focus: "crear pruebas legibles y rápidas para código real",
    level: "Intermedio",
    outcomes: ["fixtures", "parametrización", "ejecución selectiva"],
  },
  {
    title: "Tipado estático con typing",
    focus: "documentar contratos y detectar errores antes de ejecutar",
    level: "Intermedio",
    outcomes: ["type hints", "Optional y Union", "mypy básico"],
  },
  {
    title: "Expresiones regulares para datos",
    focus: "extraer patrones útiles desde texto no estructurado",
    level: "Intermedio",
    outcomes: ["re.search y findall", "grupos", "limpieza de cadenas"],
  },
  {
    title: "Procesamiento de texto",
    focus: "normalizar y transformar contenido textual",
    level: "Principiante",
    outcomes: ["split/join", "strip/replace", "tokenización simple"],
  },
  {
    title: "CLI con argparse",
    focus: "crear herramientas de terminal reutilizables",
    level: "Intermedio",
    outcomes: ["argumentos posicionales", "flags opcionales", "help automático"],
  },
  {
    title: "Automatización de backups",
    focus: "respaldar carpetas y versionar copias con scripts",
    level: "Intermedio",
    outcomes: ["manejo de rutas", "copias seguras", "registro de ejecución"],
  },
  {
    title: "Web scraping responsable",
    focus: "extraer datos de páginas HTML respetando buenas prácticas",
    level: "Intermedio",
    outcomes: ["requests + bs4", "parseo DOM", "throttling básico"],
  },
  {
    title: "APIs y consumo de servicios",
    focus: "hacer peticiones HTTP y procesar respuestas JSON",
    level: "Intermedio",
    outcomes: ["usar requests", "manejar errores", "crear mini integraciones"],
  },
  {
    title: "APIs REST con FastAPI",
    focus: "exponer endpoints simples para apps educativas",
    level: "Intermedio",
    outcomes: ["rutas GET/POST", "modelos pydantic", "documentación automática"],
  },
  {
    title: "Flask para microservicios",
    focus: "levantar servicios ligeros con rutas personalizadas",
    level: "Intermedio",
    outcomes: ["blueprints básicos", "JSON responses", "manejo de errores HTTP"],
  },
  {
    title: "Concurrencia con asyncio",
    focus: "ejecutar tareas IO-bound de manera eficiente",
    level: "Avanzado",
    outcomes: ["async/await", "gather", "timeouts y cancelación"],
  },
  {
    title: "Multihilo y multiproceso",
    focus: "elegir estrategia de paralelismo según la carga",
    level: "Avanzado",
    outcomes: ["threading", "multiprocessing", "colas de trabajo"],
  },
  {
    title: "Bases de datos con SQLite",
    focus: "persistir datos locales en aplicaciones pequeñas",
    level: "Intermedio",
    outcomes: ["CRUD básico", "queries parametrizadas", "normalización inicial"],
  },
  {
    title: "ORM con SQLAlchemy",
    focus: "modelar tablas con clases Python mantenibles",
    level: "Avanzado",
    outcomes: ["modelos ORM", "sesiones", "migraciones introductorias"],
  },
  {
    title: "Pandas para análisis rápido",
    focus: "explorar datasets y generar insights en minutos",
    level: "Intermedio",
    outcomes: ["DataFrame operations", "agrupaciones", "limpieza de nulos"],
  },
  {
    title: "Visualización con Matplotlib",
    focus: "comunicar datos mediante gráficos simples y claros",
    level: "Intermedio",
    outcomes: ["line/bar charts", "etiquetas y estilos", "exportación de figuras"],
  },
  {
    title: "Estadística práctica con Python",
    focus: "aplicar medidas descriptivas sobre datos reales",
    level: "Intermedio",
    outcomes: ["media y mediana", "desviación estándar", "distribuciones básicas"],
  },
  {
    title: "Fundamentos de machine learning",
    focus: "entender el flujo de entrenamiento y evaluación",
    level: "Intermedio",
    outcomes: ["train/test split", "métricas base", "pipeline sencillo"],
  },
  {
    title: "Modelos supervisados con scikit-learn",
    focus: "entrenar clasificadores y regresores iniciales",
    level: "Avanzado",
    outcomes: ["fit/predict", "validación cruzada", "ajuste de hiperparámetros"],
  },
  {
    title: "Procesamiento de imágenes con OpenCV",
    focus: "aplicar filtros y detecciones en tiempo real",
    level: "Avanzado",
    outcomes: ["lectura y transformación", "detección de bordes", "captura de video"],
  },
  {
    title: "Introducción a NLP",
    focus: "analizar texto con técnicas básicas de lenguaje natural",
    level: "Avanzado",
    outcomes: ["tokenización", "stemming/lemmatización", "vectores de texto"],
  },
  {
    title: "Calidad de código y linters",
    focus: "mantener estándares consistentes en equipo",
    level: "Intermedio",
    outcomes: ["flake8/ruff", "formateo automático", "convenciones de estilo"],
  },
  {
    title: "Documentación técnica efectiva",
    focus: "escribir guías claras para usuarios y colaboradores",
    level: "Principiante",
    outcomes: ["README útil", "docstrings", "ejemplos reproducibles"],
  },
  {
    title: "Git y colaboración para Python",
    focus: "trabajar con ramas, PRs y flujos de integración",
    level: "Principiante",
    outcomes: ["commits atómicos", "pull requests", "resolución de conflictos"],
  },
  {
    title: "CI/CD básico para proyectos Python",
    focus: "automatizar pruebas y despliegues con pipelines",
    level: "Intermedio",
    outcomes: ["workflow de CI", "checks automáticos", "deploy controlado"],
  },
  {
    title: "Seguridad en aplicaciones Python",
    focus: "reducir riesgos comunes en código y dependencias",
    level: "Avanzado",
    outcomes: ["gestión de secretos", "validación de inputs", "actualización segura"],
  },
  {
    title: "Rendimiento y profiling",
    focus: "medir cuellos de botella y optimizar puntos críticos",
    level: "Avanzado",
    outcomes: ["cProfile", "optimizaciones micro", "tradeoffs de memoria"],
  },
  {
    title: "Diseño de arquitectura modular",
    focus: "separar responsabilidades en aplicaciones escalables",
    level: "Avanzado",
    outcomes: ["capas de dominio", "interfaces claras", "desacoplamiento progresivo"],
  },
  {
    title: "Patrones de diseño en Python",
    focus: "aplicar soluciones recurrentes a problemas comunes",
    level: "Avanzado",
    outcomes: ["factory y strategy", "observer", "uso prudente de patrones"],
  },
  {
    title: "Integración con servicios cloud",
    focus: "conectar scripts con almacenamiento y colas administradas",
    level: "Avanzado",
    outcomes: ["SDKs cloud", "subida de archivos", "consumo de colas"],
  },
  {
    title: "ETL con Python",
    focus: "extraer, transformar y cargar datos de múltiples fuentes",
    level: "Avanzado",
    outcomes: ["pipelines ETL", "orquestación básica", "control de calidad de datos"],
  },
  {
    title: "Dashboards con Streamlit",
    focus: "publicar interfaces de datos en pocos pasos",
    level: "Intermedio",
    outcomes: ["widgets interactivos", "estado de sesión", "despliegue inicial"],
  },
  {
    title: "Proyecto integrador de datos",
    focus: "conectar adquisición, análisis y visualización en un solo flujo",
    level: "Avanzado",
    outcomes: ["pipeline end-to-end", "dashboard final", "presentación de hallazgos"],
  },
  {
    title: "Proyecto final guiado",
    focus: "construir una app pequeña de principio a fin",
    level: "Intermedio",
    outcomes: ["planificación modular", "buenas prácticas", "entrega funcional"],
  },
  {
    title: "Metaclasses y personalización de clases",
    focus: "controlar la creación de clases en tiempo de definición",
    level: "Avanzado",
    outcomes: ["type dinámico", "__new__ en metaclasses", "registro automático de clases"],
  },
  {
    title: "Protocolos y ABCs",
    focus: "definir contratos de comportamiento robustos en Python",
    level: "Avanzado",
    outcomes: ["abc.ABC", "Protocol de typing", "polimorfismo seguro"],
  },
  {
    title: "Data classes en profundidad",
    focus: "modelar entidades inmutables y mutables con menos boilerplate",
    level: "Intermedio",
    outcomes: ["@dataclass", "frozen classes", "orden y comparación"],
  },
  {
    title: "NamedTuple y TypedDict",
    focus: "estructurar datos ligeros con tipado claro",
    level: "Intermedio",
    outcomes: ["NamedTuple moderno", "TypedDict parcial", "compatibilidad con mypy"],
  },
  {
    title: "Context managers avanzados",
    focus: "gestionar recursos complejos con patrones seguros",
    level: "Avanzado",
    outcomes: ["__enter__/__exit__", "contextlib", "stack de contextos"],
  },
  {
    title: "Descriptors y atributos controlados",
    focus: "interceptar acceso a atributos con lógica reutilizable",
    level: "Avanzado",
    outcomes: ["__get__/__set__", "validación encapsulada", "reutilización por clase"],
  },
  {
    title: "Internals del modelo de objetos",
    focus: "entender MRO, resolución de atributos y namespaces",
    level: "Avanzado",
    outcomes: ["MRO linealizado", "__dict__", "lookup de métodos"],
  },
  {
    title: "Gestión avanzada de excepciones",
    focus: "diseñar jerarquías de errores para APIs mantenibles",
    level: "Avanzado",
    outcomes: ["custom exceptions", "exception chaining", "errores semánticos"],
  },
  {
    title: "Logging estructurado",
    focus: "emitir logs parseables para observabilidad real",
    level: "Intermedio",
    outcomes: ["logging config", "JSON logs", "niveles y handlers"],
  },
  {
    title: "Serialización binaria y pickle seguro",
    focus: "persistir objetos con atención a compatibilidad y riesgos",
    level: "Avanzado",
    outcomes: ["pickle protocols", "joblib", "mitigación de deserialización insegura"],
  },
  {
    title: "Parsers con ast de Python",
    focus: "analizar y transformar código fuente automáticamente",
    level: "Avanzado",
    outcomes: ["ast.parse", "NodeVisitor/NodeTransformer", "refactors automáticos"],
  },
  {
    title: "Bytecode y disassembler",
    focus: "inspeccionar ejecución interna para optimización fina",
    level: "Avanzado",
    outcomes: ["módulo dis", "opcodes comunes", "tradeoffs de micro-optimización"],
  },
  {
    title: "Gestión de memoria y GC",
    focus: "entender referencias, ciclos y recolección en CPython",
    level: "Avanzado",
    outcomes: ["reference counting", "gc module", "detección de fugas"],
  },
  {
    title: "Rendimiento con functools y cache",
    focus: "aplicar memoización y utilidades funcionales eficientes",
    level: "Intermedio",
    outcomes: ["lru_cache", "partial", "reduce con criterio"],
  },
  {
    title: "Concurrent futures en producción",
    focus: "orquestar pools de hilos y procesos con APIs limpias",
    level: "Avanzado",
    outcomes: ["ThreadPoolExecutor", "ProcessPoolExecutor", "manejo de futures"],
  },
  {
    title: "Patrones async robustos",
    focus: "construir servicios asíncronos resistentes a fallos",
    level: "Avanzado",
    outcomes: ["backpressure", "retry async", "circuit breakers básicos"],
  },
  {
    title: "Sockets y protocolos de red",
    focus: "implementar comunicación TCP/UDP directa en Python",
    level: "Avanzado",
    outcomes: ["socket API", "clientes/servidores", "manejo de timeouts"],
  },
  {
    title: "WebSockets con Python",
    focus: "crear canales bidireccionales para tiempo real",
    level: "Avanzado",
    outcomes: ["handshake", "broadcast", "manejo de desconexiones"],
  },
  {
    title: "HTTP avanzado con httpx",
    focus: "clientes síncronos y asíncronos con control fino",
    level: "Intermedio",
    outcomes: ["session pooling", "timeouts compuestos", "retries idempotentes"],
  },
  {
    title: "Validación de datos con pydantic",
    focus: "definir contratos fuertes para entradas y salidas",
    level: "Intermedio",
    outcomes: ["BaseModel", "validadores personalizados", "serialización consistente"],
  },
  {
    title: "SQL avanzado con SQLAlchemy Core",
    focus: "construir consultas complejas sin perder control",
    level: "Avanzado",
    outcomes: ["joins avanzados", "CTEs", "transacciones explícitas"],
  },
  {
    title: "Transacciones y locking en bases de datos",
    focus: "evitar inconsistencias bajo concurrencia",
    level: "Avanzado",
    outcomes: ["niveles de aislamiento", "deadlocks", "estrategias de reintento"],
  },
  {
    title: "Migraciones con Alembic",
    focus: "evolucionar esquemas de DB sin romper producción",
    level: "Intermedio",
    outcomes: ["revisiones versionadas", "downgrade seguro", "migraciones idempotentes"],
  },
  {
    title: "Caching técnico con Redis",
    focus: "reducir latencia y carga de backend Python",
    level: "Avanzado",
    outcomes: ["TTL y claves", "invalidación", "patrones cache-aside"],
  },
  {
    title: "Colas y workers con Celery",
    focus: "desacoplar tareas pesadas del ciclo de request",
    level: "Avanzado",
    outcomes: ["tasks distribuidas", "retry policies", "monitoring de workers"],
  },
  {
    title: "Orquestación con Prefect",
    focus: "modelar flujos de datos con observabilidad integrada",
    level: "Avanzado",
    outcomes: ["flows y tasks", "reintentos", "deploy de pipelines"],
  },
  {
    title: "Manejo de archivos Parquet",
    focus: "optimizar almacenamiento columnar para analítica",
    level: "Intermedio",
    outcomes: ["lectura/escritura parquet", "compresión", "particionado eficiente"],
  },
  {
    title: "Polars para procesamiento de datos",
    focus: "acelerar transformaciones sobre datasets grandes",
    level: "Avanzado",
    outcomes: ["lazy frames", "expresiones vectorizadas", "benchmark frente a pandas"],
  },
  {
    title: "NumPy vectorizado",
    focus: "evitar bucles Python con operaciones matriciales rápidas",
    level: "Intermedio",
    outcomes: ["broadcasting", "indexación avanzada", "uFuncs"],
  },
  {
    title: "Optimización numérica con SciPy",
    focus: "resolver problemas matemáticos aplicados",
    level: "Avanzado",
    outcomes: ["optimizers", "integración numérica", "álgebra lineal aplicada"],
  },
  {
    title: "Feature engineering técnico",
    focus: "transformar variables para modelos más robustos",
    level: "Avanzado",
    outcomes: ["pipelines reproducibles", "encoding", "scaling avanzado"],
  },
  {
    title: "ML evaluation avanzado",
    focus: "analizar sesgo, varianza y estabilidad de modelos",
    level: "Avanzado",
    outcomes: ["curvas ROC/PR", "drift de datos", "validación temporal"],
  },
  {
    title: "Entrenamiento distribuido en Python",
    focus: "escalar entrenamiento y procesamiento en múltiples nodos",
    level: "Avanzado",
    outcomes: ["Dask/Ray básico", "particionado", "agregación distribuida"],
  },
  {
    title: "Serving de modelos con FastAPI",
    focus: "publicar inferencias con bajo tiempo de respuesta",
    level: "Avanzado",
    outcomes: ["carga de modelo", "batching", "versionado de endpoints"],
  },
  {
    title: "Pruebas de integración con pytest",
    focus: "verificar contratos entre módulos y servicios externos",
    level: "Intermedio",
    outcomes: ["fixtures de entorno", "testcontainers", "aislamiento de dependencias"],
  },
  {
    title: "Mocks y doubles técnicos",
    focus: "simular colaboraciones complejas sin pruebas frágiles",
    level: "Intermedio",
    outcomes: ["unittest.mock", "autospeccing", "asserts de interacción"],
  },
  {
    title: "Property-based testing",
    focus: "descubrir casos límite automáticamente",
    level: "Avanzado",
    outcomes: ["hypothesis", "invariantes", "generadores de datos"],
  },
  {
    title: "Análisis estático profundo",
    focus: "combinar type checking y linting para calidad alta",
    level: "Avanzado",
    outcomes: ["mypy estricto", "ruff rulesets", "detección temprana de defectos"],
  },
  {
    title: "Empaquetado moderno con pyproject",
    focus: "publicar librerías Python con estándares actuales",
    level: "Intermedio",
    outcomes: ["pyproject.toml", "build backends", "versionado semántico"],
  },
  {
    title: "Distribución de paquetes internos",
    focus: "gestionar dependencias privadas en equipos técnicos",
    level: "Avanzado",
    outcomes: ["índices privados", "firmado de artefactos", "resolución de conflictos"],
  },
  {
    title: "Configuración técnica con pydantic-settings",
    focus: "centralizar configuración por ambiente sin hardcode",
    level: "Intermedio",
    outcomes: ["env var parsing", "defaults seguros", "config por entorno"],
  },
  {
    title: "Arquitectura hexagonal en Python",
    focus: "separar dominio de infraestructura en sistemas complejos",
    level: "Avanzado",
    outcomes: ["puertos y adaptadores", "casos de uso", "testabilidad alta"],
  },
  {
    title: "DDD táctico con Python",
    focus: "modelar dominios ricos con límites explícitos",
    level: "Avanzado",
    outcomes: ["entidades y value objects", "agregados", "lenguaje ubicuo"],
  },
  {
    title: "Event-driven Python",
    focus: "diseñar flujos basados en eventos y handlers desacoplados",
    level: "Avanzado",
    outcomes: ["event bus", "idempotencia", "consistencia eventual"],
  },
  {
    title: "Seguridad ofensiva y defensiva en código Python",
    focus: "identificar y mitigar vectores comunes de ataque",
    level: "Avanzado",
    outcomes: ["inyección y sanitización", "hardening de dependencias", "auditorías automatizadas"],
  },
  {
    title: "Criptografía aplicada con Python",
    focus: "proteger datos en tránsito y en reposo",
    level: "Avanzado",
    outcomes: ["hashing y salting", "cifrado simétrico", "gestión de llaves"],
  },
  {
    title: "Observabilidad con OpenTelemetry",
    focus: "instrumentar trazas y métricas en servicios Python",
    level: "Avanzado",
    outcomes: ["spans distribuidos", "métricas de latencia", "correlación de logs"],
  },
  {
    title: "Profiling de memoria con tracemalloc",
    focus: "detectar crecimiento anómalo de memoria en producción",
    level: "Avanzado",
    outcomes: ["snapshots comparativos", "rastrear asignaciones", "plan de remediación"],
  },
  {
    title: "Optimización con Cython",
    focus: "acelerar secciones críticas manteniendo base en Python",
    level: "Avanzado",
    outcomes: ["tipado opcional", "compilación a C", "benchmarks confiables"],
  },
  {
    title: "Extensiones C para Python",
    focus: "integrar código nativo cuando el rendimiento lo exige",
    level: "Avanzado",
    outcomes: ["Python C API", "wrappers seguros", "distribución multiplataforma"],
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
