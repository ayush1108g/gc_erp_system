import React, { useState, useEffect, useContext } from 'react'
import classes from './MySpecificCourse.module.css'

import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router";

import { backendUrl } from "../../constant";
import LoginContext from "../../store/context/loginContext";
import { useAlert } from '../../store/context/Alert-context';
import { useSidebar } from '../../store/context/sidebarcontext';

import image10 from '../../assets/10.jpg'
import image11 from '../../assets/11.jpg'
import image12 from '../../assets/12.jpg'

const MySpecificCourse = () => {
    const alertCtx = useAlert();
    const Loginctx = useContext(LoginContext);
    const navigate = useNavigate();
    const { courseId } = useParams();
    const isSidebarOpen = useSidebar().isSidebarOpen;

    const [courseData, setCourseData] = useState(null);
    const [feedback, setFeedback] = useState(null);
    let isadmin = Loginctx.role === 'admin';

    useEffect(() => {
        // Fetch the course data from the backend
        const fetchdata = async () => {
            try {
                const response = await axios.get(backendUrl + '/api/v1/courses/' + courseId, { headers: { Authorization: `Bearer ${Loginctx.AccessToken}` } });
                const courseInfo = response.data.data.data[0];
                setCourseData(courseInfo);
                setFeedback(courseInfo.feedback);
            } catch (err) {
                if (err?.response?.data?.message) {
                    return alertCtx.showAlert("danger", err.response.data.message);
                }
                console.log(err);
            }
        };
        fetchdata();
    }, [courseId]);

    // Function to navigate to the assignment page
    const assignmentPage = (courseId) => {
        navigate(`/my_courses/${courseId}/assignments`);
        console.log(courseId);
    }

    // Function to navigate to the feedback page
    const giveFeedback = (courseId) => {
        navigate(`/my_courses/${courseId}/feedback`);
    }

    // Function to navigate to the attendance page
    const attendanceHandler = () => {
        const role = Loginctx?.role;
        if (!role) {
            return navigate('/login');
        }
        if (role === 'student') {
            navigate('/attendance');
        } else {
            navigate(`/attendance/admin/${courseId}`);
        }
    }

    return (<>
        {courseData && (<div style={{ marginLeft: isSidebarOpen ? '210px' : '10px' }}>
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
            {isadmin &&
                <><h1 className={classes.title}>FeedBacks</h1>
                    <div className={classes.gridContainer}>
                        {feedback.map((ele, ind) => { return (<div className={classes.gridItem}>Comments: {ele.comments}  ;  Ratings: {ele.rating}</div>); })}
                    </div>
                </>}
        </div>
        )}
    </>
    );
};

export default MySpecificCourse;
