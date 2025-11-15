import axios from "axios";

const SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
const ENROLLMENTS_API = `${SERVER}/api`;

export const getUserEnrollments = async (uid: string) => {
  const response = await axios.get(`${ENROLLMENTS_API}/users/${uid}/enrollments`, {
    withCredentials: true,
  });
  return response.data;
};

export const enroll = async (user: string, course: string) => {
  const response = await axios.post(
    `${ENROLLMENTS_API}/enrollments`,
    { user, course },
    { withCredentials: true }
  );
  return response.data;
};

export const unenroll = async (user: string, course: string) => {
  const response = await axios.delete(
    `${ENROLLMENTS_API}/users/${user}/enrollments/${course}`,
    { withCredentials: true }
  );
  return response.data;
};
