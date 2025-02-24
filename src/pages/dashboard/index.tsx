import { AuthApi } from "@/lib/api";
import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Dashboard = (props: Props) => {
  React.useEffect(() => {
    (async function(){
      const res = await AuthApi.Login({email:"hoangodac2805@gmail.com",password:"00000000"})
      console.log(res)
    })()
    return () => {};
  });

  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/dashboard/settings">Setting</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/asdasd">unknown</Link>
        </li>
        <li>{import.meta.env.VITE_API_URL}</li>
      </ul>
    </div>
  );
};

export default Dashboard;
