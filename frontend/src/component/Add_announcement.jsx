import React from "react";
import classes from "./addannouncement.module.css"


const Add_announcement = ()=>{
    return (<>
    <h3 className={classes.title}>Add Announcement</h3>
        <form className={classes.inputform}>
            <div class="mb-3">
                <label for="2" class="form-label">Write the announcement</label>
                <input type="text" class="form-control" id="2" />
            </div>
         
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </>)
}


export default Add_announcement  