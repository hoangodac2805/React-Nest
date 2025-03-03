import { AppDispatch, RootState } from "@/app/store";
import { REFRESH_TOKEN_NAME, ROUTER } from "@/config";
import { loginByToken } from "@/features/auth";
import { cookies } from "@/lib/cookie";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const AuthCheck = ({ children }: Props) => {
  const { isAuthed, isLoading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();
  const checkLogin = async () => {
    let refreshToken = cookies.get(REFRESH_TOKEN_NAME);
    if (refreshToken) {
      dispatch(loginByToken(refreshToken));
    }
  };
  useEffect(() => {
    checkLogin();
  }, []);

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

export default AuthCheck;
