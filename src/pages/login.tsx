import { useAuth } from "@/contexts/auth";
import React, { useEffect } from "react";

type Props = {};

const Login = (props: Props) => {
  const { login } = useAuth();
  useEffect(() => {
    login({ email: "hoangodac2805@gmail.com", password: "00000000" });
  },[]);
  return <div>login</div>;
};

export default Login;
