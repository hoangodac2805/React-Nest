import React, { createContext, useContext, useEffect, useState } from "react";
import { LoginInputType, LoginResponseType } from "@/types";
import { AuthApi } from "@/lib/api";
import { HttpStatusCode } from "axios";
import { cookies } from "@/lib/cookie";
import {
  ACCESS_TOKEN_NAME,
  ACCESS_TOKEN_TIME,
  REFRESH_TOKEN_NAME,
  REFRESH_TOKEN_TIME,
  ROUTER,
} from "@/config";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "@/features/loading/loadingSlice";
import { toast } from "sonner";
import { AppDispatch } from "@/app/store";

type UserType = Omit<LoginResponseType, "accessToken" | "refreshToken">;
interface AuthContextInterface {
  isAuthed: boolean;
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const login = async (input: LoginInputType) => {
    try {
      const { data, status } = await AuthApi.Login(input);
      if (
        data &&
        [HttpStatusCode.Ok, HttpStatusCode.Created].includes(status)
      ) {
        const { accessToken, refreshToken, ...userInfo } = data;
        cookies.set(ACCESS_TOKEN_NAME, data.accessToken, {
          expires: new Date(Date.now() + ACCESS_TOKEN_TIME),
        });
        cookies.set(REFRESH_TOKEN_NAME, data.refreshToken, {
          expires: new Date(Date.now() + REFRESH_TOKEN_TIME),
        });
        setIsAuthed(true);
        setUser(userInfo);
        toast.success("Login successfully !");
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthed) {
      setIsLoading(false);
      return;
    }
    checkLogin();
  }, []);

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading]);

  return (
    <AuthContext.Provider value={{ isAuthed, user, login, logout, isLoading }}>
      <AuthCheck>{children}</AuthCheck>
    </AuthContext.Provider>
  );
};
export const useAuth = (): AuthContextInterface => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthCheck = ({ children }: { children: React.ReactNode }) => {
  const { isAuthed, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthed && ![ROUTER.LOGIN].includes(location.pathname)) {
      navigate(ROUTER.LOGIN, { replace: true });
    }
    if (isAuthed && [ROUTER.LOGIN].includes(location.pathname)) {
      navigate(ROUTER.HOME);
    }
  }, [isAuthed, isLoading, location.pathname, navigate]);

  if (isLoading || (!isAuthed && location.pathname === ROUTER.HOME)) {
    return null;
  }

  return <>{children}</>;
};
