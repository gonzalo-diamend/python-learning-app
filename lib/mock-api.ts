import { Lesson, ModuleCard, ModuleDetail, QuizResult } from "./types";

type ProgressRecord = Record<string, Record<string, number>>;

type LessonRecord = Record<string, Record<string, Lesson>>;

const mockModules: ModuleCard[] = [
  {
    id: "python-basics",
    title: "Fundamentos de Python",
    description: "Variables, tipos de datos y estructuras básicas para empezar rápido.",
    level: "Inicial",
    lesson_count: 2,
  },
  {
    id: "python-functions",
    title: "Funciones y práctica",
    description: "Funciones, argumentos y ejercicios prácticos para consolidar.",
    level: "Inicial",
    lesson_count: 2,
  },
];

const mockModuleDetails: Record<string, ModuleDetail> = {
  "python-basics": {
    id: "python-basics",
    title: "Fundamentos de Python",
    lessons: [
      { id: "intro-print", title: "Tu primer print" },
      { id: "variables", title: "Variables y tipos" },
    ],
  },
  "python-functions": {
    id: "python-functions",
    title: "Funciones y práctica",
    lessons: [
      { id: "funciones", title: "Definir funciones" },
      { id: "parametros", title: "Parámetros y retorno" },
    ],
  },
};

const mockLessons: LessonRecord = {
  "python-basics": {
    "intro-print": {
      id: "intro-print",
      title: "Tu primer print",
      goal: "Mostrar texto en pantalla",
      theory: "La función print() permite mostrar mensajes y resultados.",
      example: 'print("Hola, amor ❤️")',
      quiz: {
        questions: [
          {
            text: "¿Qué hace print('Hola')?",
            options: ["Guarda una variable", "Muestra texto en pantalla", "Borra la consola"],
            correct_index: 1,
          },
        ],
      },
    },
    variables: {
      id: "variables",
      title: "Variables y tipos",
      goal: "Guardar y reutilizar datos",
      theory: "Una variable almacena valores para usar luego en el programa.",
      example: 'nombre = "Mica"\nedad = 30\nprint(nombre, edad)',
      quiz: {
        questions: [
          {
            text: "¿Cuál es una asignación válida en Python?",
            options: ["x == 5", "x = 5", "let x = 5"],
            correct_index: 1,
          },
        ],
      },
    },
  },
  "python-functions": {
    funciones: {
      id: "funciones",
      title: "Definir funciones",
      goal: "Reutilizar lógica",
      theory: "Las funciones agrupan instrucciones para reutilizarlas.",
      example: 'def saludar(nombre):\n    return f"Hola {nombre}"',
      quiz: {
        questions: [
          {
            text: "¿Con qué palabra se define una función?",
            options: ["func", "define", "def"],
            correct_index: 2,
          },
        ],
      },
    },
    parametros: {
      id: "parametros",
      title: "Parámetros y retorno",
      goal: "Enviar datos y devolver resultados",
      theory: "Los parámetros entran a la función y return devuelve un valor.",
      example: "def sumar(a, b):\n    return a + b",
      quiz: {
        questions: [
          {
            text: "¿Qué hace return?",
            options: ["Imprime en pantalla", "Finaliza y devuelve un valor", "Crea una variable global"],
            correct_index: 1,
          },
        ],
      },
    },
  },
};

const progressDb: ProgressRecord = {};

const getProgress = (userId: string, moduleId: string): number => progressDb[userId]?.[moduleId] ?? 0;

export const mockFetchJson = async <T>(path: string): Promise<T> => {
  if (path === "/modules") {
    return mockModules as T;
  }

  const moduleMatch = path.match(/^\/modules\/([^/]+)$/);
  if (moduleMatch) {
    const moduleDetail = mockModuleDetails[moduleMatch[1]];
    if (!moduleDetail) throw new Error(`Mock: módulo no encontrado (${moduleMatch[1]})`);
    return moduleDetail as T;
  }

  const lessonMatch = path.match(/^\/modules\/([^/]+)\/lessons\/([^/]+)$/);
  if (lessonMatch) {
    const lesson = mockLessons[lessonMatch[1]]?.[lessonMatch[2]];
    if (!lesson) throw new Error(`Mock: lección no encontrada (${lessonMatch[1]}/${lessonMatch[2]})`);
    return lesson as T;
  }

  const progressMatch = path.match(/^\/progress\/([^/]+)\/([^/]+)$/);
  if (progressMatch) {
    return { completion_percent: getProgress(progressMatch[1], progressMatch[2]) } as T;
  }

  throw new Error(`Mock: endpoint GET no soportado (${path})`);
};

export const mockPostJson = async <T>(path: string, body: unknown): Promise<T> => {
  if (path === "/progress") {
    const payload = body as { user_id: string; module_id: string; completed_lessons: string[] };
    const moduleDetail = mockModuleDetails[payload.module_id];
    if (!moduleDetail) throw new Error(`Mock: módulo inválido (${payload.module_id})`);

    const completed = Math.min(payload.completed_lessons.length, moduleDetail.lessons.length);
    const completionPercent = Math.round((completed / moduleDetail.lessons.length) * 100);

    if (!progressDb[payload.user_id]) {
      progressDb[payload.user_id] = {};
    }
    progressDb[payload.user_id][payload.module_id] = completionPercent;

    return { ok: true } as T;
  }

  if (path === "/quiz/submit") {
    const payload = body as {
      module_id: string;
      lesson_id: string;
      answers: number[];
    };

    const lesson = mockLessons[payload.module_id]?.[payload.lesson_id];
    if (!lesson) throw new Error(`Mock: lección inválida (${payload.module_id}/${payload.lesson_id})`);

    const correctIndices = lesson.quiz.questions.map((question) => question.correct_index);
    const score = correctIndices.reduce((acc, correctIndex, idx) => (payload.answers[idx] === correctIndex ? acc + 1 : acc), 0);

    const result: QuizResult = {
      score,
      total: correctIndices.length,
      correct_indices: correctIndices,
    };

    return result as T;
  }

  throw new Error(`Mock: endpoint POST no soportado (${path})`);
};
