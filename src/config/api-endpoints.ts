export const API_ENDPOINT = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGINBYTOKEN: "/auth/loginByToken",
  REFRESH_ACCESSTOKEN: "/auth/refresh",
  GETUSERS: "/user",
  GETUSER: (id: number) => `/user/${id}`,
  CREATEUSER: "/user",
  DELETEUSER: (id: number) => `/user/${id}`,
  UPDATE: (id: number) => `/user/${id}`,

  GETCOURSES: "/course",
  CREATECOURSE: "/course",

  GETLESSONS: "/lesson",


};
