import React from "react";
import classes from "./assignmentupload.module.css"


const Assignment_upload = () => {
    return (<>
    <h3 className={classes.title}>Upload the Assignment </h3>
        <form className={classes.inputform}>
            <div class="mb-3">
                <label for="1" class="form-label">Assignment Name</label>
                <input type="email" class="form-control" id="1" aria-describedby="emailHelp" />
            </div>
            <div class="mb-3">
                <label for="2" class="form-label">Description</label>
                <input type="password" class="form-control" id="2" />
            </div>
            <div class="mb-3">
                <label for="3" class="form-label">Question File</label>
                <input type="password" class="form-control" id="3" />
            </div>
            <div class="mb-3">
                <label for="4" class="form-label">Due date</label>
                <input type="password" class="form-control" id="4" />
            </div>
            <div class="mb-3">
                <label for="4" class="form-label">Total Marks</label>
                <input type="password" class="form-control" id="4" />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </>)
}

export default Assignment_upload 