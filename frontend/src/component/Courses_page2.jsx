import React, { useState, useEffect, useContext } from 'react'
import classes from './coursespage2.module.css'
import axios from 'axios';
import { backendUrl } from "../constant";
import LoginContext from "../store/context/loginContext";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router";
import { useAlert } from '../store/context/Alert-context';

import image10 from '../assets/10.jpg'
import image11 from '../assets/11.jpg'
import image12 from '../assets/12.jpg'

const Courses_page2 = () => {
    const alertCtx = useAlert();
    const Loginctx = useContext(LoginContext);
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState(null);
    let isadmin = Loginctx.role === 'admin';
    const { courseId } = useParams();

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(backendUrl + '/api/v1/courses/' + courseId, {
                    headers: {
                        Authorization: `Bearer ${Loginctx.AccessToken}`
                    }
                });
                const courseInfo = response.data.data.data[0];
                setCourseData(courseInfo);
            } catch (err) {
                if (err?.response?.data?.message) {
                    alertCtx.showAlert("danger", err.response.data.message);
                    return
                }
                console.log(err);
            }
        };
        fetchdata();
    }, [courseId]);

    const assignmentPage = (courseId) => {
        navigate(`/my_courses/${courseId}/assignments`);
        console.log(courseId);
    }

    const giveFeedback = (courseId) => {
        navigate(`/my_courses/${courseId}/feedback`);
    }

    const attendanceHandler = () => {
        const role = Loginctx?.role;
        if (!role) {
            navigate('/login');
            return;
        }
        if (role === 'student') {
            navigate('/attendance');
        } else {
            navigate(`/attendance/admin/${courseId}`);
        }

    }
    return (

        <>
            {courseData && (
                <div>
                    <h1 className={classes.title}>{courseData.name}</h1>
                    <div className={classes.gridContainer}>
                        <div className={classes.gridItem}>
                            <div>Professor : </div>
                            <div className={classes.yoyo}>{courseData.professor.join(', ')}</div>
                        </div>
                        <div className={classes.gridItem}>
                            <div>Department : </div>
                            <div className={classes.yoyo}>{courseData.department.join(', ')}</div>
                        </div>
                        <div className={classes.gridItem}>
                            <div>Semester : </div>
                            <div className={classes.yoyo}>{courseData.semester.join(', ')}</div>
                        </div>
                        <div className={classes.gridItem}>
                            <div>Students Enrolled : </div>
                            <div className={classes.yoyo}>
                                {courseData.students_enrolled.length}
                            </div>
                        </div>
                    </div>
                    <div className={classes.b}>
                        <div onClick={() => { assignmentPage(courseData._id) }} className={classes.a}>
                            <img src={image10} alt="" className={classes.img} />
                            <div className={classes.c}>
                                Assignments
                            </div>
                        </div>
                        <div className={classes.a}>
                            <img src={image11} alt="" className={classes.img} />
                            <div className={classes.c} onClick={attendanceHandler}>
                                Attendance
                            </div>
                        </div>
                        {!isadmin && <div onClick={() => { giveFeedback(courseData._id) }} className={classes.a}>
                            <img src={image12} alt="" className={classes.img} />
                            <div className={classes.c}>
                                FeedBack
                            </div>
                        </div>
                        }
                    </div>
                </div>
            )}
        </>
    );
};

export default Courses_page2;
