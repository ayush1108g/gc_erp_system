import React , {useState, useContext, useEffect} from "react";
import classes from "./addcourses.module.css";
import { useNavigate } from "react-router";
import axios from "axios";
import { backendUrl } from "../constant";
import LoginContext from "../store/context/loginContext";

const Add_courses = ()=>{
    const navigate = useNavigate();
    const Loginctx = useContext(LoginContext);
    const [courseName, setCourseName] = useState("");
    const [facultyName, setFacultyName] = useState("");

      const addCourse = async (e) => {
        e.preventDefault();

        try {
            const requestBody = {
                name: courseName,
                professor: [facultyName]
            };
            console.log(requestBody);
            const response = await axios.post(
                `${backendUrl}/api/v1/courses`,
                requestBody,
                {
                    headers: {
                    Authorization: `Bearer ${Loginctx.AccessToken}`,
                    },
                }
            );

            console.log("Course Added successfully:", response.data);
            setCourseName("");
            setFacultyName("");
            alert("Course Added!");
            navigate('/');
            
        } catch (error) {
            console.error("Error adding Course:", error);
        }
    };

    return (<>
    <h3 className={classes.title}>Add Courses</h3>
        <form className={classes.inputform}>
            <div class="mb-3">
                <label for="1" class="form-label">Course Name</label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="1" 
                    aria-describedby="emailHelp" 
                    value={courseName}
                    onChange={(e)=>setCourseName(e.target.value)}/>
            </div>
            <div class="mb-3">
                <label for="2" class="form-label">Faculty Name</label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="2" 
                    value={facultyName}
                    onChange={(e)=>setFacultyName(e.target.value)}
                />
            </div>
         
            <button type="submit" class="btn btn-primary" onClick={(e)=>addCourse(e)}>Submit</button>
        </form>
    </>)
}

export default Add_courses 