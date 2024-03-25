import React from "react";
import classes from "./addcourses.module.css"


const Add_courses = ()=>{
    return (<>
    <h3 className={classes.title}>Add Courses</h3>
        <form className={classes.inputform}>
            <div class="mb-3">
                <label for="1" class="form-label">Course Name</label>
                <input type="text" class="form-control" id="1" aria-describedby="emailHelp" />
            </div>
            <div class="mb-3">
                <label for="2" class="form-label">Faculty Name</label>
                <input type="text" class="form-control" id="2" />
            </div>
         
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </>)
}

export default Add_courses 