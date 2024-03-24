import React from "react";
import classes from "./coursespage.module.css"
import { FaBookOpen } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import { BsPersonRaisedHand } from "react-icons/bs";
import image1 from  "../assets/1.jpg"
import image2 from  "../assets/2.jpg"
import image3 from  "../assets/3.jpg"
import image4 from  "../assets/4.jpg"
import image0 from  "../assets/0.jpg"

const data = [
    { "courseName": "Mathematics", "professorName": "Dr. Smith" },
    { "courseName": "Physics", "professorName": "Prof. Johnson" },
    { "courseName": "Biology", "professorName": "Dr. Anderson" },
    { "courseName": "Chemistry", "professorName": "Prof. Wilson" },
    { "courseName": "English", "professorName": "Dr. Brown" },
    { "courseName": "History", "professorName": "Prof. Martinez" },
    { "courseName": "Computer Science", "professorName": "Dr. Thompson" },
    { "courseName": "Economics", "professorName": "Prof. Garcia" },
    { "courseName": "Psychology", "professorName": "Dr. Lee" },
    { "courseName": "Sociology", "professorName": "Prof. Davis" }
];

const linkarr = [image1,image2,image3,image4,image0]


const Courses_page = () => {
    return (<div className={classes.Body}>
        <h1 className={classes.title}><FaBookOpen color="Purple" /> &nbsp; Courses</h1>
        <div className={classes.eqp}>
            <ul  className={classes.list}>
                {data.map((ele, ind) => {
                    return (<li key={ind}
                    className={classes.listitem} >
                      <img src={linkarr[ind%5]} alt=""
                        style={{
                            minHeight:'150px'
                        }}
                      />
                        <div className={classes.details} >
                        <h4 className={classes.courceName}>{ele.courseName}</h4>
                        <p className={classes.profName}>{ele.professorName}</p>
                        </div>
                        <div className={classes.listfooter}>
                        <div className={classes.icons}>
                            <div><MdAssignment color="blue" size={"25px"}/></div>
                              <div><BsPersonRaisedHand color="Green" size={"25px"}/></div>
                              </div>
                              </div>
                      
                    </li>)
                })}
            </ul>
        </div>
    </div>)
}

export default Courses_page;