export * from "./router";
export * from "./api-endpoints";

export const API_URL = import.meta.env.VITE_API_URL;
export const ACCESS_TOKEN_NAME = "access_token";
export const REFRESH_TOKEN_NAME = "refresh_token";
export const ACCESS_TOKEN_TIME = 15 * 60 * 1000;
export const REFRESH_TOKEN_TIME = 7 * 24 * 60 * 60 * 1000;


export const TAG_TYPES = {
  USER: "User",
};


export const ALERT_CONFIRM_ACTION = {
  CLOSE_CREATE_USER_DRAWER: "Close_Create_User_Drawer",
}