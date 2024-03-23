import React from "react"
import classes from "./signup.module.css";

const sign_up_page = () => {
    return (<>
        <h1 className={classes.h1}>Sign Up</h1><br /><br />
        <div class={classes.gridContainer}>
            <div className={`${classes.gridItem} input-group mb-3`}>
                <span class="input-group-text" id="1">Name</span>
                <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="1" />
            </div>
            <div className={`${classes.gridItem} input-group mb-3`}>
                <span class="input-group-text" id="2">Roll Number</span>
                <input type="text" class="form-control" placeholder="Roll number" aria-label="Roll number" aria-describedby="2" />
            </div>
            <div className={`${classes.gridItem} input-group mb-3`}>
                <span class="input-group-text" id="3">Email</span>
                <input type="text" class="form-control" placeholder="xyz@gmail.com" aria-label="xyz@gmail.com" aria-describedby="3" />
            </div>
            <div className={`${classes.gridItem} input-group mb-3`}>
                <span className="input-group-text">
                    <label for="exampleDataList" class="form-label">Branch</label>
                </span>
                <input type="text" class="form-control " list="datalistOptions" id="4" />
                <datalist id="datalistOptions">
                    <option value="Computer Science" />
                    <option value="Electronics and Communication" />
                    <option value="Electrical" />
                    <option value="Mechanical" />
                    <option value="Civil" />
                    <option value="Metullurgy" />
                </datalist>
            </div>
            <div className={`${classes.gridItem} input-group mb-3`}>
                <span class="input-group-text" id="5">Phone</span>
                <input type="text" class="form-control" aria-label="xyz@gmail.com" aria-describedby="5" />
            </div>
            <div className={`${classes.gridItem} input-group mb-3`}>
                <span class="input-group-text" id="6">High School percentage</span>
                <input type="text" class="form-control" />
            </div>
            <div className={`${classes.gridItem} input-group mb-3`}>
                <span class="input-group-text" id="7">Intermediate percentage</span>
                <input type="text" class="form-control" />
            </div>
            <div className={`${classes.gridItem} input-group mb-3`}>
                <span class="input-group-text" id="8">Year of Passout</span>
                <select class="form-control " aria-label="Large select example">
                    <option selected>Only For Students</option>
                    <option value="0">2024</option>
                    <option value="1">2025</option>
                    <option value="2">2026</option>
                    <option value="3">2027</option>
                    <option value="4">2028</option>
                    <option value="5">2029</option>
                    <option value="6">2030</option>
                    <option value="7">2031</option>
                    <option value="8">2032</option>
                    <option value="9">2033</option>
                    <option value="10">2034</option>
                </select>
            </div>
            <div className={`${classes.gridItem} input-group mb-3`}>
                <span class="input-group-text" id="5">Current Semester</span>
                <select class="form-control " aria-label="Large select example">
                    <option selected>Select Semester</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">4</option>
                    <option value="3">5</option>
                    <option value="3">6</option>
                    <option value="3">7</option>
                    <option value="3">8</option>
                    <option value="3">9</option>
                    <option value="3">10</option>
                </select>

            </div>
            <div className={`${classes.gridItem} input-group mb-3`}>
                <span class="input-group-text" id="9">Gender</span>
                <select class="form-control " aria-label="Large select example">
                    <option selected>Select Gender</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="3">Others</option>
                </select>
            </div>
            <div className={`${classes.gridItem} input-group mb-3`}>
                <span class="input-group-text" id="10">Role</span>
                <select class="form-control " aria-label="Large select example">
                    <option selected>Select Role</option>
                    <option value="1">Student</option>
                    <option value="2">Teacher</option>
                    <option value="3">Alumni</option>
                </select>
            </div>
        </div>
        <div class={`${classes.gridContainer} ${classes.Container2}`}>
            <div className={`${classes.gridItem} input-group mb-3`}>
                <span class="input-group-text" id="10">Address</span>
                <input type="text" className="form-control w-75" />
                <span class="input-group-text" id="11">PinCode</span>
                <input type="text" class="form-control" width />
            </div>

        </div>
        <div className={classes.photo}>
            <h2>Upload Your Passport size Photo</h2>
            <form action="#" method="post" enctype="multipart/form-data">
                <label for="photo">Choose a photo:</label><br />
                <input type="file" id="photo" name="photo" accept="image/*" /><br /><br />
                <input type="submit" value="Upload" />
            </form>
        </div>
        <div className={classes.button}>
        <button type="button" class={` btn btn-success`}>Submit</button>
        </div>

        {/* <form action="#" method="post">
            
            <row className="line">
              
          
            <label for="name">Roll Number:</label>
            <input type="text" id="rollnumber" name="rollnumber"/>
            </row>
          </form> */}
    </>)
}

export default sign_up_page

