import React from 'react'
import classes from './coursespage2.module.css'
import image0 from '../assets/0.jpg'
import image1 from '../assets/1.jpg'
import image2 from '../assets/2.jpg'
const Courses_page2 = ()=>{
    let isadmin = false ;
 return (<>
<h1 className={classes.title}>Course Name</h1>
        <div className={classes.gridContainer}>
            <div class={classes.gridItem}>
                <div>Professor : </div>
                <div className={classes.yoyo}>Dr Jason</div>
            </div>
            <div class={classes.gridItem}>
                <div>Department : </div>
                <div className={classes.yoyo}>Lorem</div>
            </div>
            <div class={classes.gridItem}>
                <div>Semester : </div>
                <div className={classes.yoyo}>Lorem</div>
            </div>
            <div class={classes.gridItem}>
                <div>Students Enrolled : </div>
                <div className={classes.yoyo}>Lorem</div>
            </div>
        </div>
        <div className={classes.a}>Assignments</div>
       
        <div className={classes.a}>Attendance record</div>
        { (!isadmin) &&
        <div className={classes.a}>Give Feedback</div>
        }
        
 </>)
}

export default Courses_page2 ;