import React , {useState, useContext, useEffect} from "react";
import classes from "./addannouncement.module.css"
import { useNavigate } from "react-router";
import axios from "axios";
import { backendUrl } from "../constant";
import LoginContext from "../store/context/loginContext";

const Add_announcement = ()=>{
    const navigate = useNavigate();
    const Loginctx = useContext(LoginContext);
    const [announcement, setAnnouncement] = useState("");

    const addAnnouncement = async (e) => {
        e.preventDefault();

        try {
            const requestBody = {
                message: announcement
            };
            console.log(requestBody);
            const response = await axios.post(
                `${backendUrl}/api/v1/announcements`,
                requestBody,
                {
                    headers: {
                    Authorization: `Bearer ${Loginctx.AccessToken}`,
                    },
                }
            );

            console.log("Announcement Added successfully:", response.data);
            setAnnouncement("");
            alert("Announcement Added!");
            navigate('/');
            
        } catch (error) {
            console.error("Error adding Announcement:", error);
        }
    };

    return (<>
    <h3 className={classes.title}>Add Announcement</h3>
        <form className={classes.inputform}>
            <div class="mb-3">
                <label for="2" class="form-label">Write the announcement</label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="2" 
                    aria-describedby="emailHelp" 
                    value={announcement}
                    onChange={(e)=>setAnnouncement(e.target.value)}/>
            </div>
         
            <button type="submit" class="btn btn-primary" onClick={(e)=>addAnnouncement(e)}>Submit</button>
        </form>
    </>)
}


export default Add_announcement  