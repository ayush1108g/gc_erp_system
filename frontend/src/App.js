import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { LoginContextProvider } from "./store/context/loginContext";
import { AlertProvider } from "./store/context/Alert-context";
import { SidebarProvider } from "./store/context/sidebarcontext";
import MainContent from "./component/MainContent";

// Main App component with all providers
function App() {
  return (
    <div>
      <HashRouter>
        <AnimatePresence>
          <SidebarProvider>
            <AlertProvider>
              <LoginContextProvider>
                <MainContent />
              </LoginContextProvider>
            </AlertProvider>
          </SidebarProvider>
        </AnimatePresence>
      </HashRouter>
    </div>
  );
}

export default App;
