export type Lesson = {
  id: string;
  title: string;
  goal: string;
  theory: string;
  example: string;
  quiz: {
    questions: {
      text: string;
      options: string[];
      correct_index: number;
    }[];
  };
};

export type ModuleCard = {
  id: string;
  title: string;
  description: string;
  level: string;
  lesson_count: number;
};

export type ModuleDetail = {
  id: string;
  title: string;
  lessons: { id: string; title: string }[];
};

export type QuizResult = {
  score: number;
  total: number;
  correct_indices: number[];
};
