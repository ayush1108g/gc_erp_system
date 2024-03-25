import React, { useState, useRef, useContext, useEffect } from "react";
import classes from "./assignmentupload.module.css"

import axios from "axios";
import { backendUrl } from "../constant";
import LoginContext from "../store/context/loginContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";

const Assignment_upload = () => {

    const datepickerRef = useRef('');
    const Loginctx = useContext(LoginContext);
    const { courseId } = useParams();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [profile, setProfile] = useState(null);
    const [profileUrl, setProfileUrl] = useState("");
    const [fileuploading, setFileuploading] = useState(false);

    const [assignmentName, setAssignmentName] = useState("");
    const [assignmentDesc, setAssignmentDesc] = useState("");
    const [assignmentDate, setAssignmentDate] = useState("");
    const [totalMarks, setTotalMarks] = useState(null);

    const uploadHandler = async () => {

        if (fileuploading) {
            alert("File is uploading, please wait");
            return;
        }
        if (!profile) {
            alert("Please select a file");
            return;
        }
        console.log('Selected file:', profile);

        const formData = new FormData();
        formData.append("file", profile);

        console.log(formData);
        setFileuploading(true);
        try {
            const res = await axios.post(`${backendUrl}/api/v1/submitAssignment/upload-file`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(res);
            const id = res.data.data.id;
            const url = `https://drive.google.com/file/d/${id}/view?usp=sharing`;
            setProfileUrl(url);
            alert('uploaded sucusfully')
        } catch (err) {
            console.log(err);
            setError("Error uploading file");
        } finally {
            setFileuploading(false);
        }
    };

    const addtAssignment = async (e) => {
        e.preventDefault();
       
        console.log("Hi from add assignment");
        const due_date = datepickerRef.current.value;

        if(!profileUrl){
            alert("Fail");
            return;
        }
        const body = {
            "courseId": courseId,
            "due_date": due_date,
            "description": assignmentDesc,
            "name": assignmentName,
            "total_marks": totalMarks,
            "questionFile": profileUrl
        }

        console.log("body", body);
        console.log("profileUrl", profileUrl);

        try{
            const response = await axios.post(backendUrl+'/api/v1/assignments',body,{
                headers: {
                Authorization: `Bearer ${Loginctx.AccessToken}`,
                },
            });
            console.log(response);
            return response;
            
        } catch(err) {
            console.log(err);
        }
    }

    return (<>
    <h3 className={classes.title}>Upload the Assignment </h3>
        <form className={classes.inputform}>
            <div class="mb-3">
                <label for="1" class="form-label">Assignment Name</label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="1" 
                    aria-describedby="emailHelp" 
                    value={assignmentName}
                    onChange={(e) => setAssignmentName(e.target.value)}
                />
            </div>
            <div class="mb-3">
                <label for="2" class="form-label">Description</label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="2" 
                    input={assignmentDesc}
                    onChange={(e) => setAssignmentDesc(e.target.value)}
                />
            </div>
            <div class={`${classes.gridContainer} ${classes.Container2}`}>
                <label for="3" class="form-label">Question File</label>
                <div className={`${classes.gridItem} input-group mb-3`}>
                    <input 
                        type="file" 
                        class="form-control shadow-none " 
                        id="inputGroupFile02"
                        // value={profile}
                        onChange={(e) => setProfile(e.target.files[0])}
                    />
                    <span class="input-group-text" for="inputGroupFile02" onClick={uploadHandler}>

                        {!fileuploading && 'Upload'}
                        {fileuploading && (
                            <div className="spinner-border text-danger" role="status">
                            </div>
                        )}
                    </span>
                </div>
            </div>
            <div className={`${classes.gridItem} input-group mb-3`}>
                <span class="input-group-text" id="5">Due Date</span>
                <input ref={datepickerRef} type="text" class="form-control shadow-none "
                    placeholder="DD-MM-YYYY"
                    aria-label="01-01-2000" aria-describedby="5" />
            </div>
            <div class="mb-3">
                <label for="4" class="form-label">Total Marks</label>
                <input 
                    type="number" 
                    class="form-control" 
                    id="4" 
                    value={totalMarks}
                    onChange={(e) => setTotalMarks(e.target.value)}
                />
            </div>
            <button 
                type="submit" 
                class="btn btn-primary" 
                onClick={(e)=>addtAssignment(e)}
            >Submit</button>
        </form>
    </>)
}

export default Assignment_upload 