import React from "react";
import classes from "./assignmentpage.module.css"
import { FaPlus } from "react-icons/fa";
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
    return(<>
         <h1 className={classes.title}><div>Course Name</div></h1>
         {isadmin&&<h5 style={{margin:'30px'}}> <FaPlus color="blue" /> Add Assignments/Comments</h5>}
          {data.map((ele,ind)=>{
            return (<>
        <div className={classes.a}>
            <div>
                {ele.name}
            </div>
            <div className={classes.date}>
                Due date : {ele.due_date}
            </div>
        </div>
            </>)
          })
           }
    </>)
}

export default Assignment_page 