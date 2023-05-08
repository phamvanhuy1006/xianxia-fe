export const BASE_URL = `${import.meta.env.S_BASE_URL}`;

export const API_URLS = {
  // AUTH APIs
  LOGIN: "/TimeSheetDev/login",
  LOGOUT: "/TimeSheetDev/logout",
  FORGOT_PWD: "/forgot-password",
  RESET_PWD: "/resset-password",
  CHANGE_PWD: "/change-password",
  // USER APIs
  CREATE_USER: "/User/CreateUser",
  UPDATE_USER: "/User/UpdateUser",
  GET_ALL_USER: "/User/GetAllUser",
  GET_CURRENT_USER: "/TimeSheetDev/public/employee/getDetailByCurrentUser",
  GET_USER_BY_ID: "/User/GetUserById",
  GET_USER_AVATAR: "/User/GetUserAvatar/avatar",
};
