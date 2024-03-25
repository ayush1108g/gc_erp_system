import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { useCookies } from "react-cookie";
import { verifyToken, refreshAccessToken } from "./store/utils/auth";
import axios from "axios";
import { backendUrl } from "./constant";

import FeedbackForm from "./component/Feedback_form";
import FullAuthLoader from "./component/FullAuthLoader";
import InventoryPage from "./component/Inventory_page";
import CoursesPage from "./component/Courses_page";
import CoursesPage2 from "./component/Courses_page2";
import AssignmentPage from "./component/Assignment_page";
import AssignmentPage2 from "./component/Assignment_page2";
import AttendanceAdmin from "./component/View_attendance";
import CourseRegistration from "./component/Course_Registration";

import InventoryForm from "./component/Inventory_form";
import LoginContext from "./store/context/loginContext";
import { LoginContextProvider } from "./store/context/loginContext";
import ProfilePage from "./component/Profile_page";
import Errorpage from "./pages/Errorpage";
import HomePage from "./pages/HomePage.js/HomePage";
import Assignment_upload from "./component/Assignment_upload";
import Add_inventory_item from "./component/Add_inventory_item";

// import Feedback_form from "./component/Feedback_form";
// import Inventory_Page from "./component/Inventory_page";
// import Inventory_form from "./component/Inventory_form";
// import View_attendance from "./component/View_attendance";

import { AlertProvider } from "./store/context/Alert-context";
// import { verifyToken, refreshAccessToken } from "./store/utils/auth";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

import ForgotPassPage from "./pages/ForgotPass/ForgotPassPage";
import ForgotPassIDPage from "./pages/ForgotPass/ForgotPassIDPage";
import ForgotPassConfirmPage from "./pages/ForgotPass/ForgotPassConfirmPage";
import Attendance from "./pages/Attendance";
import Add_courses from "./component/Add_courses";
import Add_announcement from "./component/Add_announcement";

const RoutesWithAnimation = () => {
  const location = useLocation();
  console.log(location);

  const [cookie] = useCookies(["AccessToken", "RefreshToken"]);
  const authCtx = useContext(LoginContext);

  useEffect(() => {
    const asyncFunc = async (AccessToken) => {
      try {
        const token = AccessToken;
        const response = await verifyToken(token);
        if (response?.isLoggedin === true) {
          authCtx.login(token, cookie?.RefreshToken, response?.name);
        }
      } catch (err) {
        if (
          err.message === "jwt expired" ||
          err?.response?.data?.message === "jwt expired"
        ) {
          console.log("jwt expired");
          return refreshAccessToken(asyncFunc, authCtx);
        }
        console.log(err);
      }
    };
    console.log(cookie.AccessToken);
    asyncFunc(cookie.AccessToken);
  }, []);

  useEffect(() => {
    const asyncFunc0 = async () => {
      if (!authCtx.user) {
        try {
          const resp = await axios.get(`${backendUrl}/api/v1/users/update`, {
            headers: {
              Authorization: `Bearer ${cookie.AccessToken}`,
            },
          });
          console.log(resp.data.data);
          authCtx.setUser(resp.data.data);
          console.log(resp);
        } catch (err) {
          console.log(err);
        }
      }
    };
    asyncFunc0();
  }, []);

  return (
    <>
      <Routes location={location} key={location.key}>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/forgotpassword" element={<ForgotPassPage />} />
        <Route
          path="/login/forgotpassword/:id"
          element={<ForgotPassIDPage />}
        />
        <Route
          path="/login/forgotpassword/:id/confirm"
          element={<ForgotPassConfirmPage />}
        />

        <Route
          path="/login/forgotpassword/:id"
          element={<ForgotPassIDPage />}
        />
        <Route
          path="/login/forgotpassword/:id/confirm"
          element={<ForgotPassConfirmPage />}
        />

        <Route path="/my_courses" element={<CoursesPage />} />
        <Route path="/my_courses/:courseId" element={<CoursesPage2 />} />

        <Route
          path="/my_courses/:courseId/feedback"
          element={<FeedbackForm />}
        />

        <Route path="/inventory/:equipmentId" element={<InventoryForm />} />
        <Route path="/inventory/:equipmentId" element={<InventoryForm />} />

        <Route
          path="/my_courses/:courseId/assignments"
          element={<AssignmentPage />}
        />
        <Route
          path="/my_courses/:courseId/assignments/:assignmentId"
          element={<AssignmentPage2 />}
        />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route
          path="/attendance/admin/:courseId"
          element={<AttendanceAdmin />}
        />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Errorpage />} />
        <Route path="/registration" element={<CourseRegistration />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/assignment_upload" element={<Assignment_upload/>} />
        <Route path="/add_inventory_item" element={<Add_inventory_item/>} />
        <Route path="/add_courses" element={<Add_courses/>} />
        <Route path="/add_announcement" element={<Add_announcement/>} />
        <Route path="/:courseId/assignment_upload" element={<Assignment_upload/>} />
      </Routes>
    </>
  );
};

const MainContent = () => {
  const loginCtx = useContext(LoginContext);
  // const [isScrolled, setIsScrolled] = useState < boolean > false;

  // const handleScroll = (): void => {
  //   if (window.scrollY > 50) {
  //     setIsScrolled(true);
  //   } else {
  //     setIsScrolled(false);
  //   }
  // };
  // const navStyle: navStyle = {
  //   backgroundColor: isScrolled ? "" : color.navbg,
  //   backdropFilter: isScrolled ? "blur(10px)" : "",
  //   transition: "0.5s",
  // };
  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <div
      style={{
        width: "98vw",
        height: "100vh",
      }}
    >
      {loginCtx.loading && <FullAuthLoader />}
      <RoutesWithAnimation />
    </div>
  );
};

function App() {
  return (
    <div>
      <HashRouter>
        <AnimatePresence>
          <AlertProvider>
            <LoginContextProvider>
              <MainContent />
            </LoginContextProvider>
          </AlertProvider>
        </AnimatePresence>
      </HashRouter>
    </div>
  );
}

export default App;
