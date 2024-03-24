import React, { useState, useContext, useEffect } from "react";
import classes from "./assignmentpage2.module.css";
import { FaBookOpen } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { MdAssignment } from "react-icons/md";
import { SlPeople } from "react-icons/sl";
import { IoSend } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { backendUrl } from "../constant";
import LoginContext from "../store/context/loginContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";

const data = [
  { name: "John", comment: "This is a great product!" },
  { name: "Alice", comment: "I love the design!" },
  { name: "Bob", comment: "Works perfectly for me." },
  { name: "Emma", comment: "Could use some improvements." },
  { name: "Michael", comment: "Very satisfied with the quality." },
  { name: "Sarah", comment: "Fast shipping, thank you!" },
  { name: "David", comment: "Excellent customer service." },
  { name: "Emily", comment: "Affordable price, great value." },
  { name: "James", comment: "Highly recommend to others." },
  { name: "Olivia", comment: "Easy to use and setup." }
];



const Assignment_page2 = () => {
  const Loginctx = useContext(LoginContext);
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  const [assignmentData, setAssignmentData] = useState(null);
  const { courseId, assignmentId } = useParams();
  const [message, setMessage] = useState("");
  console.log("Hi from assignment_page2", courseId, assignmentId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseResponse = await axios.get(
          backendUrl + "/api/v1/courses/" + courseId,
          {
            headers: {
              Authorization: `Bearer ${Loginctx.AccessToken}`,
            },
          }
        );
        const assignmentResponse = await axios.get(
          backendUrl + "/api/v1/assignments/" + assignmentId,
          {
            headers: {
              Authorization: `Bearer ${Loginctx.AccessToken}`,
            },
          }
        );
        const courseInfo = courseResponse.data.data.data[0];
        const assignmentInfo = assignmentResponse.data.assignment;
        setCourseData(courseInfo);
        setAssignmentData(assignmentInfo);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [courseId, assignmentId, Loginctx.AccessToken]);

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

  const askDoubt = async () => {
    try {
        const requestBody = {
        assignmentId: assignmentId,
        studentId: Loginctx?.user?._id, // Assuming you have the userId in LoginContext
        message: message,
        };

        const response = await axios.post(
        `${backendUrl}/api/v1/assignments/askDoubts`,
        requestBody,
        {
            headers: {
            Authorization: `Bearer ${Loginctx.AccessToken}`,
            },
        }
        );

        console.log("Doubt posted successfully:", response.data);
        setMessage("");
        // Optionally, you can update the UI or show a success message upon successful posting of doubt
    } catch (error) {
        console.error("Error posting doubt:", error);
        // Handle errors or show an error message to the user
    }
    };

  return (
    <>
      <div className={classes.title}>
        <div className={classes.icons}>
          <FaBookOpen color="Purple" />
          <IoIosArrowForward />
        </div>
        <div><p>Assignment</p></div>
      </div>
      <div className={classes.grandParent}>
        <div className={classes.parent}>
          {courseData && assignmentData && (
            <>
              <div className={classes.assDetails}>
                <div style={{ display: "flex" }}>
                  <MdAssignment
                    color="blue"
                    size={"25px"}
                    className={classes.icon2}
                  />
                  <h3>{assignmentData.name}</h3>
                </div>
                <div className={classes.assdet2}>
                  <p>
                    {courseData.professor[0]}
                  </p>
                  <p>
                    Due Date: {formatDate(assignmentData.due_date)}
                  </p>
                  <p>{assignmentData.total_marks} points</p>
                </div>
              </div>
              <div className={classes.desc}>
                <div>{assignmentData.description}</div>
                <a href={assignmentData.questionFile}>View Assignment</a>
              </div>
              <div className={classes.classComment}>
                <div>
                  <div className={classes.icon3}>
                    <SlPeople />
                  </div>
                  <div>Add class comment</div>
                </div>
                <input
                  type="text"
                  placeholder="  Add Class Comment"
                  className={classes.input1}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <IoSend
                  color="blue"
                  size={"30px"}
                  style={{ marginBottom: "4px", marginLeft: "5px" }}
                  onClick = {askDoubt}
                />
              </div>
            </>
          )}
          {
            data.map((ele,ind)=>{
                 return(<div className={classes.classComments}>
                    <div>
                      {ele.name}
                    </div>
                    <div >
                        {ele.comment}
                    </div>
                 </div>)
            })
          }
        </div>
        <div className={classes.parent2}>
          <div className={classes.box1}>
            <div className={classes.smbx}>
              <div>Your Work</div>
              <div>Assigned</div>
            </div>
            <div className={`${classes.smbx} ${classes.smbx2}`}>
              <div>
                <FaPlus
                  color=" rgb(31, 130, 211)"
                  size={"13px"}
                  style={{ marginBottom: "5px" }}
                />
              </div>
              <div>Add or Create</div>
            </div>
            <div className={`${classes.smbx} ${classes.smbx3}`}>
              Mark as done
            </div>
          </div>
            {
                // Loginctx.role==='student' && 
          <div className={classes.box2}>
            <div>
              <div className={classes.icon5}>
                <SlPeople />
              </div>
              <div>Private comment</div>
            </div>
                <div>
                <input
                    type="text"
                    placeholder="  Add Private Comment"
                    className={classes.input2}
                />
                <IoSend
                    color="blue"
                    size={"25px"}
                    style={{
                    marginBottom: "4px",
                    marginLeft: "5px",
                    marginTop: "23px",
                    }}
                />
                </div>
          </div>
            }
        </div>
      </div>
    </>
  );
};

export default Assignment_page2;
