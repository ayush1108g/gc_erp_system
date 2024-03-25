import React, {useState,useEffect,useContext} from "react";
import classes from "./courseregistration.module.css"
import { FaBookOpen } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import { BsPersonRaisedHand } from "react-icons/bs";
import axios from 'axios';
import {backendUrl} from "../constant";
import { useNavigate} from "react-router"
import LoginContext from "../store/context/loginContext";

import image1 from  "../assets/1.jpg"
import image2 from  "../assets/2.jpg"
import image3 from  "../assets/3.jpg"
import image4 from  "../assets/4.jpg"
import image0 from  "../assets/0.jpg"

const linkarr = [image1,image2,image3,image4,image0]


const Courses_Registration = () => {
    const navigate = useNavigate();
    const Loginctx = useContext(LoginContext);
    const [coursesIds,setCoursesIds] = useState([]);
    const [courses,setCourses] = useState([]);

    useEffect(()=>{

        const fetchdata = async () => {
            try {
                const resp = await axios.get(backendUrl + '/api/v1/courses',{
                    headers:{
                        Authorization:`Bearer ${Loginctx.AccessToken}`
                    }
                });
                console.log(resp.data);
                const allCourses = resp.data.data.data;
                setCourses(allCourses);
                return allCourses;
            } catch(err) {
                console.log(err);
            }
        };
        fetchdata();
        },[]);

        const registerCourseHandler = async (courseId) => {
            try {
                const response = await axios.post(
                    backendUrl+`/api/v1/courses/${courseId}`,
                {},
                {
                    headers: {
                    Authorization: `Bearer ${Loginctx.AccessToken}`,
                    },
                }
                );

                console.log(response.data);
                // Alert.alert("Registration success!");
                navigate('/my_courses');
            } catch (error) {
                console.error('Error registering for the course:', error);
            }
            };

    
    return (<div className={classes.Body}>
        <h1 className={classes.title}><FaBookOpen color="Purple" /> &nbsp; Registration</h1>
        <div className={classes.eqp}>
            <ul  className={classes.list}>
                {courses.map((ele, ind) => {
                    return (<li key={ind}
                    className={classes.listitem} 
                    >
                      <img src={linkarr[ind%5]} alt=""
                        style={{
                            minHeight:'150px'
                        }}
                      />
                        <div className={classes.details} >
                        <h4 className={classes.courceName}>{ele.name}</h4>
                        <p className={classes.profName}>{ele.professor[0]}</p>
                        </div>
                        <div className={classes.listfooter}>
                            <div className={classes.icons}>
                                <button className={classes.btn} onClick={()=>registerCourseHandler(ele._id)}>Register</button>
                            </div>
                        </div>
                    </li>)
                })}
            </ul>
        </div>
    </div>)
}

export default Courses_Registration;