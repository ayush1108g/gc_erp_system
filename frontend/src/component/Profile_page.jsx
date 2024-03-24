import React from "react";
import classes from "./profilepage.module.css"
import image0 from "../assets/0.jpg"

let isStudent = true ;
const Profile_page = () => {
    return (<body className={classes.body}>
          
        <div className={classes.title}>
            <h2 className={classes.h2}> Profile Page </h2>
        </div>
        <div className={classes.grandParent}>
            <div className={classes.parent1}>
                <img class={classes.circularBox}  src={image0}/>
           
            <div className={classes.details}>
             <div>
                Phunsuk Wanguru
             </div>
             <div>
                Role : Student
             </div>
             {
               isStudent&&<div>Roll number : 29RR01099 </div>
             }
            </div>
            </div>
            <div className={classes.parent2}>
                {isStudent&&<div className={classes.lines}>
                    <div className={classes.c1}>
                       Semester
                    </div>
                    <div className={classes.c2}>
                      :  4
                    </div>
                </div>
                }
                <div className={classes.lines}>
                    <div className={classes.c1}>
                        Email
                    </div>
                    <div className={classes.c2}>
                       : xyz@gmail.com
                    </div>
                </div>
                <div className={classes.lines}>
                    <div className={classes.c1}>
                        Phone
                    </div>
                    <div className={classes.c2}>
                         : 99999999999
                    </div>
                </div>
                <div className={classes.lines}>
                    <div className={classes.c1}>
                            Gender
                    </div>
                    <div className={classes.c2}>
                          : Male
                    </div>
                </div>
                <div className={classes.lines}>
                    <div className={classes.c1}>
                             Date of Birth
                    </div>
                    <div className={classes.c2}>
                            : 19-04-2099
                    </div>
                </div>
                <div className={classes.lines}>
                    <div className={classes.c1}>
                               Department
                    </div>
                    <div className={classes.c2}>
                            : Science
                    </div>
                </div>
               
                <div className={classes.lines}>
                    <div className={classes.c1}>
                               Program
                    </div>
                    <div className={classes.c2}>
                            : Engineering
                    </div>
                </div>
                <div className={classes.lines}>
                    <div className={classes.c1}>
                               Address
                    </div>
                    <div className={classes.c2}>
                            : Yasnaya Polyana , Erangel
                    </div>
                </div>
               
            </div>
        </div>
        
    </body>)
}

export default Profile_page 