import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { refreshAccessToken, verifyToken } from "./store/utils/auth";

import { AnimatePresence } from "framer-motion";
import Errorpage from "./pages/Errorpage";
import FullAuthLoader from "./component/FullAuthLoader";
import HomePage from "./pages/HomePage.js/HomePage";
import LoginContext from "./store/context/loginContext";
import { LoginContextProvider } from "./store/context/loginContext";
import SignupPage from "./component/SignupPage";
import { useCookies } from "react-cookie";

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
        <Route
          path="/login/forgotpassword/:id"
          element={<ForgotPassIDPage />}
        />
        <Route
          path="/login/forgotpassword/:id/confirm"
          element={<ForgotPassConfirmPage />}
        /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
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
    <div>
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
