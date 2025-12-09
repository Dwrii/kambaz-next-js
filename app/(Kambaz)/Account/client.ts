import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

export const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

export const USERS_API = `${HTTP_SERVER}/api/users`;

console.log("USERS_API =", USERS_API);

export type Credentials = {
  username: string;
  password: string;
};

export type User = {
  _id?: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  email?: string;
  role?: string;
  loginId?: string;
  section?: string;
  lastActivity?: string;
  totalActivity?: string;
};

export const findAllUsers = async () => {
  const response = await axiosWithCredentials.get<User[]>(USERS_API);
  return response.data;
};

export const signin = async (credentials: Credentials) => {
  const response = await axiosWithCredentials.post<User | null>(
    `${USERS_API}/signin`,
    credentials
  );
  return response.data;
};

export const profile = async () => {
  const response = await axiosWithCredentials.post<User | null>(
    `${USERS_API}/profile`
  );
  return response.data;
};

export const signup = async (user: User) => {
  const response = await axiosWithCredentials.post<User>(
    `${USERS_API}/signup`,
    user
  );
  return response.data;
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};

export const updateUser = async (user: User) => {
  const response = await axiosWithCredentials.put<User>(
    `${USERS_API}/${user._id}`,
    user
  );
  return response.data;
};

export const findUsersByRole = async (role: string) => {
  const response = await axiosWithCredentials.get<User[]>(
    `${USERS_API}?role=${role}`
  );
  return response.data;
};

export const findUsersByPartialName = async (name: string) => {
  const response = await axiosWithCredentials.get<User[]>(
    `${USERS_API}?name=${encodeURIComponent(name)}`
  );
  return response.data;
};


export const findUserById = async (id: string) => {
  const response = await axios.get(`${USERS_API}/${id}`);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await axiosWithCredentials.delete(`${USERS_API}/${id}`);
  return response.data;
};

export const createUser = async (user: User) => {
  const response = await axiosWithCredentials.post<User>(USERS_API, user);
  return response.data;
};