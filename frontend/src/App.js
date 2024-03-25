import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import React, { useContext, useEffect } from "react";
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
import AssignmentUpload from "./component/Assignment_upload";
import AddInventoryItem from "./component/Add_inventory_item";

import { AlertProvider } from "./store/context/Alert-context";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

import ForgotPassPage from "./pages/ForgotPass/ForgotPassPage";
import ForgotPassIDPage from "./pages/ForgotPass/ForgotPassIDPage";
import ForgotPassConfirmPage from "./pages/ForgotPass/ForgotPassConfirmPage";
import Attendance from "./pages/Attendance";
import AddCourses from "./component/Add_courses";
import AddAnnouncement from "./component/Add_announcement";

import { useNavigate } from "react-router-dom";
import Add_courses from "./component/Add_courses";
import Add_announcement from "./component/Add_announcement";
import AdminDashBoard from "./component/AdminDashboard";

const RoutesWithAnimation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);

  const [cookie] = useCookies(["AccessToken", "RefreshToken"]);
  const authCtx = useContext(LoginContext);

  useEffect(() => {
    const asyncFunc = async (AccessToken) => {
      try {
        const token = AccessToken;
        const response = await verifyToken(token);
        console.log(response);
        if (response?.isLoggedin === true) {
          // authCtx.login(token, cookie?.RefreshToken, response?.name);
          authCtx.setAccessToken(token);
          authCtx.setRefreshToken(cookie?.RefreshToken);
          authCtx.setIsLoggedIn(true);
          authCtx.setName(response?.name);
          authCtx.setLoading(false);
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
    setTimeout(() => {
      if (authCtx.isLoggedIn === false) {
        navigate("/login");
      }
    }, 1000);
  }, [authCtx.isLoggedIn]);

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
  }, [authCtx, cookie.AccessToken]);

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

        <Route path="/registration" element={<CourseRegistration />} />
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
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/assignment_upload" element={<AssignmentUpload />} />

        {authCtx.role === "admin" && (
          <>
            <Route path="/add_inventory_item" element={<AddInventoryItem />} />
            <Route path="/add_courses" element={<AddCourses />} />
            <Route path="/add_announcement" element={<AddAnnouncement />} />
          </>
        )}
        <Route
          path="/:courseId/assignment_upload"
          element={<AssignmentUpload />}
        />

        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Errorpage />} />
        <Route path="/admin" element={<AdminDashBoard />} />
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
