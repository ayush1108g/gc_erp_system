import React, { useState, useEffect, useContext } from "react";
import classes from "./assignmentpage.module.css"
import { FaPlus } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import axios from 'axios';
import { backendUrl } from "../constant";
import LoginContext from "../store/context/loginContext";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { useAlert } from "../store/context/Alert-context";


const Assignment_page = () => {

  const alertCtx = useAlert();
  const Loginctx = useContext(LoginContext);
  const navigate = useNavigate();
  const [assignmentData, setAssignmentData] = useState([]);
  let isadmin = Loginctx.role === 'admin';
  const { courseId } = useParams();
  const [cookie] = useCookies(["AccessToken", "RefreshToken"]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(backendUrl + '/api/v1/courses/' + courseId, {
          headers: {
            Authorization: `Bearer ${cookie.AccessToken}`
          }
        });
        const assignmentInfo = response.data.data.data[0].assignments;
        setAssignmentData(assignmentInfo);
      } catch (err) {
        console.log(err);
        if (err?.response?.data?.message) {
          alertCtx.showAlert("Error loading assignments", "error");
          return;
        }
        alertCtx.showAlert("Error loading assignments", "error");
      }
    };
    setTimeout(() => {
      fetchdata();
    }, 100);
  }, [courseId]);

  const formatDate = dateString => {
    // Create a Date object from the dateString
    const date = new Date(dateString);

    // Options for formatting the date
    const options = { day: 'numeric', month: 'long', year: 'numeric' };

    // Format the date to a string in "24th March 2024" format
    const formattedDate = date.toLocaleDateString('en-US', options);

    // Extract the day from the date object to determine the ordinal suffix
    const day = date.getDate();
    let suffix;
    if (day >= 11 && day <= 13) {
      suffix = 'th';
    } else {
      switch (day % 10) {
        case 1:
          suffix = 'st';
          break;
        case 2:
          suffix = 'nd';
          break;
        case 3:
          suffix = 'rd';
          break;
        default:
          suffix = 'th';
      }
    }

    // Add the ordinal suffix to the formatted date
    const ordinalDate = formattedDate.replace(/\b\d{1,2}\b/, match => match + suffix);

    return ordinalDate;
  };

  const openSpecificAssignmentPage = (assignmentId) => {
    navigate(`/my_courses/${courseId}/assignments/${assignmentId}`)
  }

  return (<div className={classes.Body}>
    <h2 className={classes.title}><div>Your Assignments</div></h2>
    {isadmin && <h5 style={{ margin: '30px', display: 'flex' }}> <div><FaPlus color="blue" /></div><div>Add Assignments/Comments </div></h5>}
    {assignmentData.map((ele, ind) => {
      return (<>
        <div className={classes.a} onClick={() => openSpecificAssignmentPage(ele.assignment_id)}>
          <div>
            <MdAssignment color="blue" size={"25px"} />  {ele.name}
          </div>
          <div className={classes.date}>
            Due date : {formatDate(ele.due_date)}
          </div>
        </div>
      </>)
    })
    }
  </div>)
}

export default Assignment_page 