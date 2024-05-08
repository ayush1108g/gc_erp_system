import React, { useState, useEffect, useContext } from "react";
import classes from "./CourseRegistration.module.css"

import { FaBookOpen } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from "react-router"

import { backendUrl } from "../constant";
import LoginContext from "../store/context/loginContext";
import { useAlert } from "../store/context/Alert-context";
import { useSidebar } from "../store/context/sidebarcontext";

import image1 from "../assets/1.jpg"
import image2 from "../assets/2.jpg"
import image3 from "../assets/3.jpg"
import image4 from "../assets/4.jpg"
import image0 from "../assets/0.jpg"

const linkarr = [image1, image2, image3, image4, image0]

const Courses_Registration = () => {
    const alertCtx = useAlert();
    const navigate = useNavigate();
    const Loginctx = useContext(LoginContext);
    const { isSidebarOpen } = useSidebar();


    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // Fetch course data
        const fetchdata = async () => {
            try {
                const resp = await axios.get(backendUrl + '/api/v1/courses', { headers: { Authorization: `Bearer ${Loginctx.AccessToken}` } });
                console.log(resp.data);
                const allCourses = resp.data.data.data;
                setCourses(allCourses);
                return allCourses;
            } catch (err) {
                if (err?.response?.data?.message) {
                    return alertCtx.showAlert("danger", err.response.data.message);
                }
                console.log(err);
                alertCtx.showAlert("danger", "Error fetching data");
            }
        };
        fetchdata();
    }, []);

    // Function to register for a course
    const registerCourseHandler = async (courseId) => {
        try {
            const response = await axios.post(backendUrl + `/api/v1/courses/${courseId}`, {}, { headers: { Authorization: `Bearer ${Loginctx.AccessToken}`, }, });
            alertCtx.showAlert("success", "Registration success!");
            console.log(response.data);
            // Alert.alert("Registration success!");
            navigate('/my_courses');
        } catch (error) {
            if (error?.response?.data?.message) {
                alertCtx.showAlert("danger", error.response.data.message);
            } else {
                console.error('Error registering for the course:', error);
                alertCtx.showAlert("danger", "Error registering for the course");
            }
        }
    };

    return (<div className={classes.Body} style={{ marginLeft: isSidebarOpen ? '210px' : '10px' }}>
        <h1 className={classes.title}><FaBookOpen color="Purple" /> &nbsp; Registration</h1>
        <div className={classes.eqp}>
            <ul className={classes.list}>
                {courses.map((ele, ind) => {
                    return (<li key={ind} className={classes.listitem}                    >
                        <img src={linkarr[ind % 5]} alt="" style={{ minHeight: '150px' }} />
                        <div className={classes.details} >
                            <h4 className={classes.courceName}>{ele.name}</h4>
                            <p className={classes.profName}>{ele.professor[0]}</p>
                        </div>
                        <div className={classes.listfooter}>
                            <div className={classes.icons}>
                                <button className={classes.btn} onClick={() => registerCourseHandler(ele._id)}>Register</button>
                            </div>
                        </div>
                    </li>)
                })}
            </ul>
        </div>
    </div>)
}

export default Courses_Registration;