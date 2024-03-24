import React, { useState } from "react";
import { useCookies } from "react-cookie";

const LoginContext = React.createContext({
  AccessToken: null,
  RefreshToken: null,
  loading: false,
  isLoggedIn: false,
  name: null,
  role: null,
  setRole: () => {},
  login: () => {},
  logout: () => {},
  setAccessToken: () => {},
  setRefreshToken: () => {},
  setLoading: () => {},
});

const LoginContextProvider = (props) => {
  const [cookie, setCookie] = useCookies(["AccessToken", "RefreshToken"]);
  const [loading, setLoading] = useState(false);
  const [AccessToken, setAccessToken] = useState(null);
  const [RefreshToken, setRefreshToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState(null);
  const [role, setRole] = useState(null);

  const loginHandler = (AccessToken, RefreshToken, name, role) => {
    setAccessToken(AccessToken);
    setRefreshToken(RefreshToken);
    setIsLoggedIn(true);
    setName(name);
    setRole(role);
  };
  const logoutHandler = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setIsLoggedIn(false);
    setName(null);
    setCookie("AccessToken", null, {
      path: "/",
      maxAge: 0,
    });
    setCookie("RefreshToken", null, {
      path: "/",
      maxAge: 0,
    });
    setRole(null);
  };
  const updateAccessToken = (newAccessToken) => {
    console.log(newAccessToken);
    setCookie("AccessToken", newAccessToken, {
      path: "/",
      maxAge: 60 * 60 * 24 * 1 * 0.2,
    });
    setAccessToken(newAccessToken);
  };
  const updateRefreshToken = (newRefreshToken) => {
    console.log(newRefreshToken);
    setCookie("RefreshToken", newRefreshToken, {
      path: "/",
      maxAge: 60 * 60 * 24 * 1 * 0.6,
    });
    setRefreshToken(newRefreshToken);
  };

  const context = {
    name: name,
    isLoggedIn: isLoggedIn,
    loading: loading,
    AccessToken: AccessToken,
    RefreshToken: RefreshToken,
    role: role,
    setRole: setRole,
    setLoading: setLoading,
    setAccessToken: updateAccessToken,
    setRefreshToken: updateRefreshToken,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <LoginContext.Provider value={context}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
export { LoginContextProvider };
