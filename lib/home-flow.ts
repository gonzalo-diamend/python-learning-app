import { Lesson, ModuleCard, ModuleDetail } from "./types";

export const pickModuleId = (modules: ModuleCard[] | undefined, currentModuleId: string | null): string | null => {
  if (!modules?.length) {
    return null;
  }

  if (currentModuleId && modules.some((module) => module.id === currentModuleId)) {
    return currentModuleId;
  }

  return modules[0].id;
};

export const pickLessonId = (moduleDetail: ModuleDetail | undefined, currentLessonId: string | null): string | null => {
  if (!moduleDetail?.lessons?.length) {
    return null;
  }

  if (currentLessonId && moduleDetail.lessons.some((lesson) => lesson.id === currentLessonId)) {
    return currentLessonId;
  }

  return moduleDetail.lessons[0].id;
};

export const canSubmitQuiz = (lesson: Lesson | null, answers: number[]): boolean => {
  if (!lesson) {
    return false;
  }

  return answers.length === lesson.quiz.questions.length && answers.every((answer) => answer !== undefined);
};

export const buildQuizPayload = (
  lesson: Lesson,
  moduleId: string,
  answers: number[],
  userId: string,
  defaultUserId: string
) => ({
  user_id: userId || defaultUserId,
  module_id: moduleId,
  lesson_id: lesson.id,
  answers,
});

export const buildProgressPayload = (lessonId: string, moduleId: string, userId: string, defaultUserId: string) => ({
  user_id: userId || defaultUserId,
  module_id: moduleId,
  completed_lessons: [lessonId],
});
