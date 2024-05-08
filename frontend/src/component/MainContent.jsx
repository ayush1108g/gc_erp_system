import React, { useContext } from "react";
import classes from "../App.module.css";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { useLocation } from "react-router";

import Navbar from "../component/Navbar/Navbar";
import RoutesWithAnimation from "./RoutesWithAnimation.jsx";
import FullAuthLoader from "./FullAuthLoader.js";
import LoginContext from "../store/context/loginContext";
import { useSidebar } from "../store/context/sidebarcontext";

// Main content with All routes
const MainContent = () => {
    const loginCtx = useContext(LoginContext);
    const location = useLocation();
    const sidebarCtx = useSidebar();
    const isSidebarOpen = sidebarCtx.isSidebarOpen;
    const handleSidebar = sidebarCtx.toggleSidebar;
    const sidebarNotRequired = [
        "/login",
        "/signup",
        "/forgotpassword",
        "/",
        "/admin",
    ];
    return (
        <div style={{ width: "98vw", height: "100vh" }}>
            {loginCtx.loading && <FullAuthLoader />}

            {!sidebarNotRequired.includes(location.pathname) &&
                !location.pathname.includes("/login") && (
                    <div className={classes.navbar} style={{ maxWidth: isSidebarOpen ? "210px" : "20px" }}>
                        <Navbar className={classes.navbar2} style={{ maxWidth: isSidebarOpen ? "200px" : "10px", display: isSidebarOpen ? "block" : "none", }} />
                        <div className={classes.icon} style={{ position: "fixed", left: isSidebarOpen ? "203px" : "5px", zIndex: 10, top: "48vh", }} onClick={handleSidebar}>
                            {!isSidebarOpen ? (<div style={{ display: "flex", alignItems: "center" }}>
                                <MdArrowForwardIos style={{ boxShadow: "0 0 10px #00ff00" }} />
                                <MdArrowForwardIos style={{ boxShadow: "0 0 10px #00ff00" }} />
                            </div>) : (<MdArrowBackIosNew />)}
                        </div>
                    </div>
                )}
            <RoutesWithAnimation />
        </div>
    );
};

export default MainContent;
