import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

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

