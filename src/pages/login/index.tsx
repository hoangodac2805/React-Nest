import { LoginInputType } from "@/types";
import { useAuth } from "@/contexts/auth";
import LoginForm from "@/components/login-form";

const Login = () => {
  const { login } = useAuth();
  const handleLogin = (values: LoginInputType) => {
    login(values);
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
