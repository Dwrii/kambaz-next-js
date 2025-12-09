import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

interface Quiz {
  _id?: string;
  title?: string;
  quizType?: string;
  points?: number;
  assignmentGroup?: string;
  shuffleAnswers?: boolean;
  timeLimit?: number;
  multipleAttempts?: boolean;
  attemptsAllowed?: number;
  showCorrectAnswers?: string;
  accessCode?: string;
  oneQuestionAtATime?: boolean;
  webcamRequired?: boolean;
  lockAfterAnswering?: boolean;
  description?: string;
  questions?: Record<string, unknown>[];
}


export const findQuizzesForCourse = async (courseId: string) => {
    const response = await axiosWithCredentials.get(
        `${HTTP_SERVER}/api/courses/${courseId}/quizzes`
    );
    return response.data;
};

export const createQuiz = async (courseId: string) => {
    const response = await axiosWithCredentials.post(
        `${HTTP_SERVER}/api/courses/${courseId}/quizzes`,
        {}
    );
    return response.data;
};

export const deleteQuiz = async (quizId: string) => {
    const response = await axiosWithCredentials.delete(
        `${HTTP_SERVER}/api/quizzes/${quizId}`
    );
    return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateQuiz = async (quizId: string, quiz: any) => {
  const response = await axiosWithCredentials.put(
    `${HTTP_SERVER}/api/quizzes/${quizId}`,
    quiz
  );
  return response.data;
};


export const findQuiz = async (quizId: string) => {
    const response = await axiosWithCredentials.get(
        `${HTTP_SERVER}/api/quizzes/${quizId}`
    );
    return response.data;
};

