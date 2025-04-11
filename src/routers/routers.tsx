import { Routes, Route } from "react-router-dom";
import Home from "@/pages/home";
import NotFound from "@/pages/notfound";
import { ROUTER } from "@/config/";
import Login from "@/pages/login";
import UserPage from "@/pages/user";
import Test from "@/pages/test";
import CoursePage from "@/pages/course";
import ExamPage from "@/pages/exam";
import ExamCreatePage from "@/pages/exam/create";
import ExamDetailPage from "@/pages/exam/detail";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTER.HOME} element={<Home />}>
        <Route path={ROUTER.USER} element={<UserPage />} />
        <Route path={ROUTER.COURSE} element={<CoursePage />} />
        <Route path={ROUTER.EXAM} element={<ExamPage />} />
        <Route path={ROUTER.EXAM_DETAIL} element={<ExamDetailPage />} />
        <Route path={ROUTER.EXAM_CREATE} element={<ExamCreatePage />} />
      </Route>
      <Route path={ROUTER.LOGIN} element={<Login />}></Route>
      <Route path={ROUTER.TEST} element={<Test />}></Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
