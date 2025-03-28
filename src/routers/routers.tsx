import { Routes, Route } from "react-router-dom";
import Home from "@/pages/home";
import NotFound from "@/pages/notfound";
import { ROUTER } from "@/config/";
import Login from "@/pages/login";
import UserPage from "@/pages/user";
import UserCreatePage from "@/pages/user/add";
import Test from "@/pages/test";
import CoursePage from "@/pages/course";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTER.HOME} element={<Home />}>
        <Route path={ROUTER.USER} element={<UserPage />} />
        <Route path={ROUTER.USER_CREATE} element={<UserCreatePage />} />
        <Route path={ROUTER.COURSE} element={<CoursePage />} />
      </Route>
      <Route path={ROUTER.LOGIN} element={<Login />}></Route>
      <Route path={ROUTER.TEST} element={<Test />}></Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
