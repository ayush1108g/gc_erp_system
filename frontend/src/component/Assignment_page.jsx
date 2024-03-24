import React , { useState , useEffect , useContext }from "react";
import classes from "./assignmentpage.module.css"
import { FaPlus } from "react-icons/fa";
import axios from 'axios';
import {backendUrl} from "../constant";
import LoginContext from "../store/context/loginContext";
import { useParams } from 'react-router-dom';

// const data = [
//     {
//       "name": "Assignment 1",
//       "due_date": "2024-04-01"
//     },
//     {
//       "name": "Lab Report",
//       "due_date": "2024-03-28"
//     },
//     {
//       "name": "Project Proposal",
//       "due_date": "2024-04-10"
//     },
//     {
//       "name": "Homework 2",
//       "due_date": "2024-04-03"
//     },
//     {
//       "name": "Research Paper",
//       "due_date": "2024-04-15"
//     }
//   ]
  
const Assignment_page = ()=>{
    
    const Loginctx = useContext(LoginContext);
    const [assignments,setAssignments] = useState([]);
    let isadmin = Loginctx.role === 'admin';
    const { courseId } = useParams();
    console.log(courseId);
    console.log("Hello from Assignment Page");
    useEffect(()=>{

        const fetchdata = async () => {
          try {
              const resp = await axios.get(backendUrl + '/api/v1/courses/' + courseId + '/assignments',{
                  headers:{
                      Authorization:`Bearer ${Loginctx.AccessToken}`
                  }
              });
              console.log(resp.data);
              const data = resp.data;
              const assignmentArray = data.assignments;
              console.log(assignmentArray);
              setAssignments(assignmentArray);
              return assignmentArray;
          } catch(err) {
              console.log(err);
          }
      };
      fetchdata();
      },[])

    return(<>

         <h1 className={classes.title}><div>Course Name</div></h1>
         {isadmin&&<h5 style={{margin:'30px'}}> <FaPlus color="blue" /> Add Assignments/Comments</h5>}
          {assignments.map((ele,ind)=>{
            const dueDate = new Date(ele.due_date);
            const day = dueDate.getDate();
            const monthIndex = dueDate.getMonth();
            const year = dueDate.getFullYear();
            const suffixes = ["th", "st", "nd", "rd"];
            const suffix = suffixes[day % 10] || "th";
            const formattedDay = `${day}${suffix}`;
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const monthName = months[monthIndex];
            const formattedDate = `${formattedDay} ${monthName} ${year}`;
            return (<>
        <div className={classes.a}>
            <div>
                {ele.name}
            </div>
            <div className={classes.date}>
                Due date : {formattedDate}
            </div>
        </div>
            </>)
          })
           }
    </>)
}

export default Assignment_page 