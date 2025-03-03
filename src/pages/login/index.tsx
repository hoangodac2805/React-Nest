import { LoginInputType } from "@/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { login } from "@/features/auth";
import LoginForm from "@/components/login-form";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleLogin = (values: LoginInputType) => {
    dispatch(login(values));
  };
  return (
    <div className="min-h-screen min-w-full flex justify-center items-center">
      <div className="min-w-[350px] md:min-w-[500px]">
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
};

export default Login;
