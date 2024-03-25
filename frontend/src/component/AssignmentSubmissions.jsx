import classes from "./assignmentpage2.module.css";
import React, { useState, useContext } from "react";
import axios from "axios";
import { backendUrl } from "../constant";
import LoginContext from "../store/context/loginContext";
import { useAlert } from "../store/context/Alert-context";

const AssignmentSubmissions = (props) => {

    const [studentGrade, setStudentGrade] = useState(null);
    const [messageOfTeacher, setMessageOfTeacher] = useState('');
    const alertCtx = useAlert();
    const Loginctx = useContext(LoginContext);

    const submitStudentGradeAndComment = async (studentId) => {
        try {
            const requestBody = {
                assignmentId: props.assignmentId,
                studentId: studentId,
                grade: studentGrade,
                comments: messageOfTeacher,
            };

            const response = await axios.patch(backendUrl + '/api/v1/assignments', requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Loginctx.AccessToken}`, // Include the bearer token in the headers
                },
            });

            console.log('Grade and comment submitted successfully:', response.data);
            setStudentGrade(null);
            setMessageOfTeacher('');
            alertCtx.showAlert('Grade and comment submitted successfully', 'success');
        } catch (error) {
            console.error('Error submitting grade and comment:', error);
            if (error.response?.data?.message) {
                return alertCtx.showAlert("error", error.response.data.message);
            }
            alertCtx.showAlert('Error submitting grade and comment', 'error');
        }
    };

    return (
        <div className={classes.student}>
            <div>
                {props.rollNumber}
            </div>
            <div >
                <a href={props.submissionFile}
                    target="_blank" rel="noopener noreferrer"
                >View Submission</a>
            </div>
            <input
                type="text"
                placeholder="Grade the Student"
                value={studentGrade}
                onChange={(e) => setStudentGrade(e.target.value)}
            />
            <input
                type="text"
                placeholder="Add Comment"
                style={{ width: '50vw' }}
                value={messageOfTeacher}
                onChange={(e) => setMessageOfTeacher(e.target.value)}
            />
            <button onClick={() => submitStudentGradeAndComment(props.studentId)}>Submit</button>
        </div>
    );
}

export default AssignmentSubmissions;