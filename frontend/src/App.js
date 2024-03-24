import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import Feedback_form from "./component/Feedback_form";
import FullAuthLoader from "./component/FullAuthLoader";
import Inventory_Page from "./component/Inventory_page";
import Courses_page from "./component/Courses_page";
import Courses_page2 from "./component/Courses_page2";
import Assignment_page from "./component/Assignment_page";
import Assignment_page2 from "./component/Assignment_page2";

import Inventory_form from "./component/Inventory_form";
import LoginContext from "./store/context/loginContext";
import { LoginContextProvider } from "./store/context/loginContext";

import Errorpage from "./pages/Errorpage";
import HomePage from "./pages/HomePage.js/HomePage";

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

const RoutesWithAnimation = () => {
  const location = useLocation();
  console.log(location);

  // const [cookie] = useCookies(["AccessToken", "RefreshToken"]);
  // const authCtx = useContext(LoginContext);

  // useEffect(() => {
  //   const asyncFunc = async (AccessToken) => {
  //     try {
  //       const token = AccessToken;
  //       const response = await verifyToken(token);
  //       if (response?.isLoggedin === true) {
  //         authCtx.login(token, cookie?.RefreshToken, response?.name);
  //       }
  //     } catch (err) {
  //       if (
  //         err.message === "jwt expired" ||
  //         err?.response?.data?.message === "jwt expired"
  //       ) {
  //         console.log("jwt expired");
  //         return refreshAccessToken(asyncFunc, authCtx);
  //       }
  //       console.log(err);
  //     }
  //   };
  //   asyncFunc(cookie.AccessToken);
  // }, []);

  return (
    <>
      <Routes location={location} key={location.key}>
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
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Errorpage />} />
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
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
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
