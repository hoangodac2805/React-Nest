export const API_ENDPOINT = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGINBYTOKEN: "/auth/loginByToken",
  REFRESH_ACCESSTOKEN: "/auth/refresh",
  GETUSERS: "/user",
  GETUSER: (id: number) => `/user/${id}`,
  CREATEUSER: "/user",
  DELETEUSER: (id: number) => `/user/${id}`,
  UPDATEUSER: (id: number) => `/user/${id}`,

  GETCOURSES: "/course",
  GETCOURSE: (id: number) => `/course/${id}`,
  CREATECOURSE: "/course",
  DELETECOURSE: (id: number) => `/course/${id}`,
  UPDATECOURSE: (id: number) => `/course/${id}`,

  GETLESSONS: "/lesson",
  
  GETEXAMS:"/exam",
  GETEXAM: (id: number) => `/exam/${id}`,

  CREATEEXAM:"/exam"
};
