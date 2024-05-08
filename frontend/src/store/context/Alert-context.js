import React, { createContext, useContext, useState } from "react";
import Alert from "./../../component/alert.jsx";
const AlertContext = createContext();

const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  // function to show alert
  const showAlert = (type, message) => {
    setAlert({ type, message });
  };

  // function to hide alert
  const hideAlert = () => {
    setAlert(null);
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      {alert && <Alert type={alert.type} message={alert.message} />}
    </AlertContext.Provider>
  );
};

const useAlert = () => {
  return useContext(AlertContext);
};

export { AlertProvider, useAlert };
