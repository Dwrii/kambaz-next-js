import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const USERS_API = `${HTTP_SERVER}/api/users`;
export const COURSES_API = `${HTTP_SERVER}/api/courses`;

export interface Module {
  _id?: string;
  name?: string;
  description?: string;
  course?: string;
  order?: number;
}

export interface Course {
  _id?: string;
  name?: string;
  number?: string;
  description?: string;
  image?: string;
}

export const createModuleForCourse = async (
  courseId: string,
  module: Module
) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

export const findModulesForCourse = async (cid: string) => {
  const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
  const { data } = await axios.get(`${HTTP_SERVER}/api/courses/${cid}/modules`);
  return data;
};

export const deleteModule = async (courseId: string, moduleId: string) => {
  const response = await axios.delete(
    `${COURSES_API}/${courseId}/modules/${moduleId}`
  );
  return response.data;
};

export const updateModule = async (courseId: string, module: Module) => {
  const { data } = await axios.put(
    `${COURSES_API}/${courseId}/modules/${module._id}`,
    module
  );
  return data;
};

export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/courses`
  );
  return data;
};

export const createCourse = async (course: Course) => {
  const { data } = await axiosWithCredentials.post(COURSES_API, course);
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axios.delete(`${COURSES_API}/${id}`);
  return data;
};

export const updateCourse = async (course: Course) => {
  const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

export const enrollIntoCourse = async (
  userId: string,
  courseId: string
) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/${userId}/courses/${courseId}`
  );
  return data;
};

export const unenrollFromCourse = async (
  userId: string,
  courseId: string
) => {
  const { data } = await axiosWithCredentials.delete(
    `${USERS_API}/${userId}/courses/${courseId}`
  );
  return data;
};

export const findUsersForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/users`);
  return response.data;
};
