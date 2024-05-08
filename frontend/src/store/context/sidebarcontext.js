import React, { useState, createContext } from "react";
const SidebarContext = createContext();

const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setSidebar] = useState(true);

  const toggleSidebar = () => {
    console.log("toggleSidebar");
    setSidebar((prev) => !prev);
  };

  const context = {
    isSidebarOpen,
    toggleSidebar,
  };
  return (
    <SidebarContext.Provider value={context}>
      {children}
    </SidebarContext.Provider>
  );
};

const useSidebar = () => {
  return React.useContext(SidebarContext);
};
export { SidebarProvider, useSidebar };
