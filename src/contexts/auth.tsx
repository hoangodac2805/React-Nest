import React, { createContext, useEffect, useState } from "react";
import { LoginInputType, LoginResponseType } from "@/types";
import { AuthApi } from "@/lib/api";
import { HttpStatusCode } from "axios";
import { cookies } from "@/lib/cookie";
import {
  ACCESS_TOKEN_NAME,
  ACCESS_TOKEN_TIME,
  REFRESH_TOKEN_NAME,
  REFRESH_TOKEN_TIME,
} from "@/config";

type UserType = Omit<LoginResponseType, "accessToken" | "refreshToken">;
interface AuthContextInterface {
  isAuthed: boolean;
  loading: boolean;
  user?: UserType;
  login: (input: LoginInputType) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextInterface | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthed, setIsAuthed] = useState(false);
  const [user, setUser] = useState<UserType | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const login = async (input: LoginInputType) => {
    try {
      const { data, status } = await AuthApi.Login(input);
      if ((data && status === HttpStatusCode.Ok) || HttpStatusCode.Created) {
        const { accessToken, refreshToken, ...rest } = data;
        cookies.set(ACCESS_TOKEN_NAME, data.accessToken, {
          expires: new Date(Date.now() + ACCESS_TOKEN_TIME),
        });
        cookies.set(REFRESH_TOKEN_NAME, data.refreshToken, {
          expires: new Date(Date.now() + REFRESH_TOKEN_TIME),
        });
        setIsAuthed(true);
        setUser(rest);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const logout = () => {
    setUser(undefined);
    setIsAuthed(false);
    cookies.remove(ACCESS_TOKEN_NAME);
    cookies.remove(REFRESH_TOKEN_NAME);
  };
  const checkLogin = async () => {
    try {
      let refreshToken = cookies.get(REFRESH_TOKEN_NAME);
      if (refreshToken) {
        const { data, status } = await AuthApi.LoginByToken(refreshToken);
        if ((data && status === HttpStatusCode.Ok) || HttpStatusCode.Created) {
          const { accessToken, refreshToken, ...rest } = data;
          cookies.set(ACCESS_TOKEN_NAME, data.accessToken, {
            expires: new Date(Date.now() + ACCESS_TOKEN_TIME),
          });
          cookies.set(REFRESH_TOKEN_NAME, data.refreshToken, {
            expires: new Date(Date.now() + REFRESH_TOKEN_TIME),
          });
          setIsAuthed(true);
          setUser(rest);
        }
      }
    } catch (error) {
      console.log(error);
    }finally {
     setLoading(false)
    }
  };

  useEffect(() => {
    if (isAuthed) {
      setLoading(false);
      return;
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthed, user, login, logout, loading }}
    ></AuthContext.Provider>
  );
};
