import React from "react";
import classes from "./assignmentpage2.module.css"
import { FaBookOpen } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { MdAssignment } from "react-icons/md";
import { SlPeople } from "react-icons/sl";
import { IoSend } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";

const Assignment_page2 = ()=>{
    return (<>
    <div className={classes.title}>
        <div className={classes.icons}>
    <FaBookOpen color="Purple" />
    <IoIosArrowForward />
    </div>
    <div>Cource Name</div>
    </div>
    <div className={classes.grandParent}>
    <div className={classes.parent}>
        <div className={classes.assDetails}>
        <div style={{display:'flex'}}>
        <MdAssignment color="blue" size={"25px"} className={classes.icon2}/>
        <h3 >Assignment name</h3>
       </div>
       <div className={classes.assdet2}>
       <p>VK Surya .March 20</p>
       <p >100 points</p>
       </div>
       </div>
       <div className={classes.desc}>
            <div>
                Description of the assignment 
            </div>
            <a href="https://www.youtube.com">Download Assignment</a>
       </div>
       <div className={classes.classComment}>
        <div >
        <div className={classes.icon3}>
       <SlPeople />
       </div>
       <div>
           Add class comment
       </div>
       </div>
        <input type="text" placeholder="Add Class Comment" className={classes.input1}/>
        <IoSend color="blue" size={'30px'} style={{marginBottom:"4px" ,marginLeft:"5px"}}/>
       </div>
       </div>
       <div className={classes.parent2}>
            <div className={classes.box1}>
                 <div className={classes.smbx}>
                      <div>
                       Your Work
                      </div>
                      <div>
                         Assigned
                      </div>
                 </div >
                 <div className={`${classes.smbx} ${classes.smbx2}`}>
                    <div>
                 <FaPlus color=" rgb(31, 130, 211)" size={'13px'} style={{marginBottom:'5px'}}/>
                 </div>
                 <div>
                    Add or Create
                 </div>
                 </div>
                 <div className={`${classes.smbx} ${classes.smbx3}`}>
                    Mark as done
                 </div>
            </div>
            <div className={classes.box2}>
            <div >
        <div className={classes.icon5}>
       <SlPeople />
       </div>
       <div>
           Private comment
       </div>
       </div>
         <div>
        <input type="text" placeholder="Add Private Comment" className={classes.input2}/>
        <IoSend color="blue" size={'25px'} style={{marginBottom:"4px" ,marginLeft:"5px",marginTop:"12px"}}/>
         </div>
         </div>
       </div>
       </div>
    </>)
}


export default Assignment_page2