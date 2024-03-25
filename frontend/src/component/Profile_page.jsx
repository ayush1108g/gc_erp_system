import React, { useContext } from "react";
import classes from "./profilepage.module.css"
import image0 from "../assets/0.jpg"
import LoginContext from "../store/context/loginContext";

const Profile_page = () => {
    const Loginctx = useContext(LoginContext);
    const user = Loginctx.user;
    console.log(Loginctx.user);
    const isStudent = Loginctx?.role === "student";
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: "numeric", month: "long", year: "numeric" };
        const formattedDate = date.toLocaleDateString("en-US", options);
        const day = date.getDate();
        let suffix;
        if (day >= 11 && day <= 13) {
            suffix = "th";
        } else {
            switch (day % 10) {
                case 1:
                    suffix = "st";
                    break;
                case 2:
                    suffix = "nd";
                    break;
                case 3:
                    suffix = "rd";
                    break;
                default:
                    suffix = "th";
            }
        }
        const ordinalDate = formattedDate.replace(
            /\b\d{1,2}\b/,
            (match) => match + suffix
        );
        return ordinalDate;
    };

    return (<body className={classes.body}>

        <div className={classes.title}>
            <h2 className={classes.h2}> Your Profile </h2>
        </div>
        <div className={classes.grandParent}>
            <div className={classes.parent1}>
                <img class={classes.circularBox} src={user?.personal_info?.profile_picture}
                    alt="profile"
                />

                <div className={classes.details}>
                    <div>
                        {user?.personal_info.name}
                    </div>
                    <div>
                        Role : {user?.role}
                    </div>
                    {
                        isStudent && <div>{user?.personal_info?.rollNumber} </div>
                    }
                </div>
            </div>
            <div className={classes.parent2}>
                {isStudent && <div className={classes.lines}>
                    <div className={classes.c1}>
                        Semester
                    </div>
                    <div className={classes.c2}>
                        :  {Loginctx?.user?.academic_info?.semester || "Semester"}
                    </div>
                </div>
                }
                <div className={classes.lines}>
                    <div className={classes.c1}>
                        Email
                    </div>
                    <div className={classes.c2}>
                        : {Loginctx?.user?.email || "Email"}
                    </div>
                </div>
                <div className={classes.lines}>
                    <div className={classes.c1}>
                        Phone
                    </div>
                    <div className={classes.c2}>
                        : {Loginctx?.user?.personal_info?.phone || "998XXXXXXX"}
                    </div>
                </div>
                <div className={classes.lines}>
                    <div className={classes.c1}>
                        Gender
                    </div>
                    <div className={classes.c2}>
                        : {Loginctx?.user?.personal_info?.gender}
                    </div>
                </div>
                <div className={classes.lines}>
                    <div className={classes.c1}>
                        Date of Birth
                    </div>
                    <div className={classes.c2}>
                        : {Loginctx?.user?.personal_info?.date_of_birth?.slice(0, 10) || "DD-MM-YYYY"}
                    </div>
                </div>
                <div className={classes.lines}>
                    <div className={classes.c1}>
                        Department
                    </div>
                    <div className={classes.c2}>
                        : {Loginctx?.user?.academic_info?.department || "Department"}
                    </div>
                </div>

                <div className={classes.lines}>
                    <div className={classes.c1}>
                        Program
                    </div>
                    <div className={classes.c2}>
                        : {Loginctx?.user?.academic_info?.program || "Program"}
                    </div>
                </div>
                <div className={classes.lines}>
                    <div className={classes.c1}>
                        Address
                    </div>
                    <div className={classes.c2}>
                        : {Loginctx?.user?.personal_info?.address || "Address"}
                    </div>
                </div>

            </div>
        </div>

    </body>)
}

export default Profile_page 