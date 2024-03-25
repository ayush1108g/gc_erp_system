import React, { useState, useEffect, useContext } from "react";
import classes from "./admindashboard.module.css"
import Navbar from "./Navbar/Navbar"
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../store/context/Alert-context";
import axios from "axios";
import { backendUrl } from "../constant";
import LoginContext from "../store/context/loginContext";
import { useCookies } from "react-cookie";
import { PieChart } from 'react-minimal-pie-chart';

import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";

const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


const AdminDashBoard = () => {
    const [cookies] = useCookies(["AccessToken", "RefreshToken"]);
    const LoginCtx = useContext(LoginContext);
    const [todayTimetable, setTodayTimetable] = useState([]);
    const [announcement, setAnnouncement] = useState([]);
    const alertCtx = useAlert();
    const [isSidebarOpen, setIsSideBarOpen] = useState(true);
    const [courses, setCourses] = useState([]);
    const [modalisOpen, setModalisOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const navigate = useNavigate();
    const date = new Date();
    const today = date.getDay();

    useEffect(() => {
        const asyncFunc1 = async () => {
            if (LoginCtx.user === null) {
                return;
            }
            let courseEnrolled;
            if (LoginCtx.role === "student") {
                courseEnrolled = LoginCtx.user?.courses_enrolled;
                courseEnrolled = courseEnrolled?.map((course) => {
                    return course.course_id;
                });
            } else if (LoginCtx.role === "teacher" || LoginCtx.role === "admin") {
                courseEnrolled = LoginCtx?.user?.courses_taught;
            }
            courseEnrolled = Array.from(new Set(courseEnrolled));

            let data = await Promise.all(
                courseEnrolled.map(async (course) => {
                    try {
                        const response = await axios.get(
                            `${backendUrl}/api/v1/courses/${course}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${cookies.AccessToken}`,
                                },
                            }
                        );
                        return response.data.data.data[0];
                    } catch (err) {

                        console.log(err);
                        if (err?.response?.data?.message) {
                            alertCtx.showAlert("danger", err.response.data.message);
                            return;
                        }
                        alertCtx.showAlert("danger", "Something went wrong");
                    }
                })
            );
            // console.log(data);

            data = Array.from(new Set(data));
            setCourses(data);
            let todayTimetable = data.map((course) => {
                let schedule = course.schedule;
                schedule = Array.from(new Set(schedule));
                if (schedule.length === 0) {
                    return null;
                }
                let ifToday = schedule.map((obj) => {
                    if (obj.day === day[today]) {
                        return obj;
                    }
                    else
                        return null;
                })
                ifToday = ifToday.filter((obj) => obj !== null);

                // console.log(ifToday);
                if (ifToday.length !== 0) {
                    course.schedule = ifToday;
                    return course;
                }
                else
                    return null;
            });
            // console.log(todayTimetable);

            // remove null values from the array
            todayTimetable = todayTimetable.filter((course) => course !== null);
            console.log(todayTimetable);
            setTodayTimetable(Array.from(new Set(todayTimetable)));

        }


        asyncFunc1();
    }, [LoginCtx]);



    useEffect(() => {
        const asyncFunc = async () => {
            try {
                const resp = await axios.get(`${backendUrl}/api/v1/announcements`, {
                    headers: {
                        Authorization: `Bearer ${cookies.AccessToken}`,
                    },
                });
                console.log(resp.data.announcements);
                const data = resp.data.announcements;
                data.sort((a, b) => {
                    return new Date(b.date) - new Date(a.date);
                }) // sort by date in descending order

                setAnnouncement(data);
            }
            catch (err) {
                console.log(err);
                if (err?.response?.data?.message) {
                    alertCtx.showAlert("danger", err.response.data.message);
                    return;
                }
            }
        }
        asyncFunc();
    }, []);

    const handleSidebar = () => {
        setIsSideBarOpen(!isSidebarOpen);
    }

    const handleAttendance = () => {
        if (LoginCtx.role === 'student') {
            navigate('/attendance');
        }
        else {
            openModal("attendance");
        }
    }

    const openModal = (route) => {
        setModalData(route);
        setModalisOpen(true);
    };

    const openMyCoursesPage = () => {
        navigate('/my_courses');
    };

    const closeModal = () => {
        setModalisOpen(false);
        setModalData(null);
    }

    const openProfilePage = () => {
        navigate('/profile');
    }

    const openAddCourse = () => {
        navigate('/add_courses');
    }

    const openAddAnnouncements = () => {
        navigate('/add_announcement');
    }

    const openAddEquipment = () => {
        navigate('/add_inventory_item')
    }

    const openAllCourses = () => {
        navigate('/registration')
    }

    const openApproveUser = () => {
        navigate('/approve')
    }

    return (<>
        <Modal
            isOpen={modalisOpen}
            close={closeModal}
            courses={courses}
            data={modalData}
        />
        <div className={classes.body}>
            <div className={classes.navbar}
                style={{
                    width: isSidebarOpen ? '200px' : '20px'
                }}
            >
                <Navbar className={classes.navbar2}
                    style={{
                        width: isSidebarOpen ? '200px' : '0px',
                        display: isSidebarOpen ? 'block' : 'none'
                    }}
                    handleAttendance={handleAttendance}
                    openModal={openModal}
                />
                <div className={classes.icon}
                    style={{
                        left: isSidebarOpen ? '203px' : '5px'
                    }}
                    onClick={handleSidebar}
                >
                    {isSidebarOpen && <MdArrowBackIosNew />}
                    {!isSidebarOpen && <MdArrowForwardIos />}
                </div>
            </div>
            <div className={classes.content}
                style={{
                    width: isSidebarOpen ? '87vw' : '100vw'
                }}
            >
                <header className="header">
                    <div className="header-text">
                        <h1>Welcome,👋🏽</h1>
                    </div>
                    <div className="header-profile" onClick={openProfilePage}>
                        <p>{LoginCtx.role}</p>
                        <img src={LoginCtx?.user?.personal_info?.profile_picture} alt="profile_photo" />
                        <p>{LoginCtx.name}</p>
                    </div>
                </header>
                <h1 className={classes.title}>Admin Dashboard</h1>
                <div className={classes.grandParent}>
                    <div className={classes.parent}>

                        <div className={classes.recent}>
                            <h3 className={classes.recenttitle}>Recent Updates</h3>
                            <ul>
                                {
                                    announcement.map((item, index) => {
                                        return (
                                            <li key={index}>{item.time}
                                                <p>

                                                    {item.message}
                                                </p>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                        <div className={classes.box1}>
                                
                        </div>
                        <div className={classes.box1} onClick={()=>openApproveUser()}>
                                Approve Users
                        </div>

                    </div>
                    <div className={classes.parent1}>
                        <div onClick={()=>openAddCourse()}>
                            Add Courses
                        </div>
                        <div onClick={()=>openAddAnnouncements()}>
                            Add Anouncements
                        </div>
                        <div onClick={()=>openAddEquipment()}>
                            Add SAC Items
                        </div>
                        <div onClick={()=>openAllCourses()}>
                            View All Courses 
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>

    )
}


export default AdminDashBoard 