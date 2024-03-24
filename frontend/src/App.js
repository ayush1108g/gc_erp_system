import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Sign_up_page from "./component/Sign_up_Page";
import React, { useEffect, useState, useContext } from "react";
import { Route, Routes, useLocation, HashRouter } from "react-router-dom";

import { useCookies } from "react-cookie";
import { AnimatePresence } from "framer-motion";
import { LoginContextProvider } from "./store/context/loginContext";
import { verifyToken, refreshAccessToken } from "./store/utils/auth";
import LoginContext from "./store/context/loginContext";

import Errorpage from "./pages/Errorpage";
import FullAuthLoader from "./component/FullAuthLoader";
import SignupPage from "./component/Sign_up_Page";
import View_attendance from "./component/View_attendance";
import Feedback_form from "./component/Feedback_form";
import Inventory_form from "./component/Inventory_form";
import Inventory_Page from "./component/Inventory_page";
import Courses_page from "./component/Courses_page";
import Courses_page2 from "./component/Courses_page2";
import Assignment_page from "./component/Assignment_page";
import Assignment_page2 from "./component/Assignment_page2";


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
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/login/forgotpassword" element={<ForgotPassPage />} />
        <Route path="/login/forgotpassword/:id" element={<ForgotPassIDPage />} />
        <Route path="/login/forgotpassword/:id/confirm" element={<ForgotPassConfirmPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<Homepage />} /> */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<Assignment_page/>} />
        
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
    <div style={{
    }}>
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
          <LoginContextProvider>
            <MainContent />
          </LoginContextProvider>
        </AnimatePresence>
      </HashRouter>
    </div>
  );
}

export default App;
