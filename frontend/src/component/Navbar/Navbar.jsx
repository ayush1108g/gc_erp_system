import "./Navbar.css";

import {
  MdAdminPanelSettings,
  MdBarChart,
  MdFeedback,
  MdHome,
  MdInfo,
  MdInventory,
} from "react-icons/md";

import { HiAcademicCap } from "react-icons/hi2";
import { IoMdDoneAll } from "react-icons/io";
import React from "react";
import iitbbslogo from "../../assets/iitbbs_logo.jpeg";
import { useNavigate } from "react-router";

function Navbar() {
  const navigate = useNavigate();
  const navItems = [
    {
      name: "home",
      path: "/",
      icon: <MdHome />,
    },
    {
      name: "attendence",
      path: "/attendence",
      icon: <MdBarChart />,
    },
    {
      name: "courses",
      path: "/courses",
      icon: <HiAcademicCap />,
    },
    {
      name: "feedback",
      path: "/feedback",
      icon: <MdFeedback />,
    },
    {
      name: "inventory",
      path: "/inventory",
      icon: <MdInventory />,
    },
    {
      name: "results",
      path: "/results",
      icon: <IoMdDoneAll />,
    },
    {
      name: "profile",
      path: "/profile",
      icon: <MdInfo />,
    },
    {
      name: "admin",
      path: "/admin",
      icon: <MdAdminPanelSettings />,
    },
  ];
  return (
    <div>
      <div className="navbar">
        <div className="iitbbs" onClick={() => navigate("/")}>
          <img src={iitbbslogo} alt="" />
          <h3>IIT BBS</h3>
        </div>
        {navItems.map((item, index) => {
          return (
            <div
              className="navbar-item"
              key={index}
              onClick={() => navigate(`${item.path}`)}
            >
              <div className="icon">{item.icon}</div>
              <div className="name">{item.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Navbar;
