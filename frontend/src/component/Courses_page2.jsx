import React , { useState , useEffect , useContext } from 'react'
import classes from './coursespage2.module.css'
import axios from 'axios';
import {backendUrl} from "../constant";
import LoginContext from "../store/context/loginContext";
import { useParams } from 'react-router-dom';
import { useNavigate} from "react-router"

import image0 from '../assets/0.jpg'
import image1 from '../assets/1.jpg'
import image2 from '../assets/2.jpg'

const Courses_page2 = () => {
    const Loginctx = useContext(LoginContext);
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState(null);
    let isadmin = Loginctx.role === 'admin';
    const { courseId } = useParams();

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(backendUrl + '/api/v1/courses/' + courseId, {
                  headers:{
                      Authorization:`Bearer ${Loginctx.AccessToken}`
                  }
              });
                const courseInfo = response.data.data.data[0];
                setCourseData(courseInfo);
            } catch (err) {
                console.log(err);
            }
        };
        fetchdata();
    }, [courseId]);

    const assignmentPage = (courseId) => { 
        navigate(`/my_courses/${courseId}/assignment`);
        console.log(courseId);
    }

    const giveFeedback = (courseId) => {
        navigate(`/my_courses/${courseId}/feedback`);
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
                    <div onClick={()=>{assignmentPage(courseData._id)}} className={classes.a}>Assignments</div>
                    <div className={classes.a}>Attendance record</div>
                    {!isadmin && <div onClick={()=>{giveFeedback(courseData._id)}} className={classes.a}>Give Feedback</div>}
                </div>
            )}
        </>
    );
};

export default Courses_page2;
