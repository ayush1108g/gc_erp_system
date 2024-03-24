import React , { useState , useEffect , useContext }from "react";
import classes from "./assignmentpage.module.css"
import { FaPlus } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";

const data = [
    {
      "name": "Assignment 1",
      "due_date": "2024-04-01"
    },
    {
      "name": "Lab Report",
      "due_date": "2024-03-28"
    },
    {
      "name": "Project Proposal",
      "due_date": "2024-04-10"
    },
    {
      "name": "Homework 2",
      "due_date": "2024-04-03"
    },
    {
      "name": "Research Paper",
      "due_date": "2024-04-15"
    }
  ]
  
const Assignment_page= ()=>{
    let isadmin=true ;
    return(<div className={classes.Body}>
         <h2 className={classes.title}><div>Course Name</div></h2>
         {isadmin&&<h5 style={{margin:'30px' ,display:'flex'}}> <div><FaPlus color="blue" /></div><div>Add Assignments/Comments </div></h5>}
          {data.map((ele,ind)=>{
            return (<>
        <div className={classes.a}>
            <div>
             <MdAssignment color="blue" size={"25px"}/>  {ele.name}
            </div>
            <div className={classes.date}>
                Due date : {formattedDate}
            </div>
        </div>
            </>)
          })
           }
    </div>)
}

export default Assignment_page 