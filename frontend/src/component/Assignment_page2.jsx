import React, { useState, useContext, useEffect } from "react";
import classes from "./assignmentpage2.module.css";
import { FaBookOpen } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { MdAssignment } from "react-icons/md";
import { SlPeople } from "react-icons/sl";
import { IoSend } from "react-icons/io5";
// import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { backendUrl } from "../constant";
import LoginContext from "../store/context/loginContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import AssignmentSubmissions from './AssignmentSubmissions';
import { useAlert } from "../store/context/Alert-context";

const Assignment_page2 = () => {
  const alertCtx = useAlert();
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [profile, setProfile] = useState(null);
  const [profileUrl, setProfileUrl] = useState("");
  const [fileuploading, setFileuploading] = useState(false);

  const Loginctx = useContext(LoginContext);
  // const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  const [assignmentData, setAssignmentData] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [yourSubmission, setYourSubmission] = useState(null);
  const [doubts, setDoubts] = useState([]);
  const { courseId, assignmentId } = useParams();
  const [message, setMessage] = useState("");
  const [loadupdate, setLoadupdate] = useState(false);

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
        console.log(courseResponse.data.data.data[0]);
        console.log(assignmentResponse.data);

        const courseInfo = courseResponse.data.data.data[0];
        const assignmentInfo = assignmentResponse.data.assignment;

        const doubtsInfo = assignmentInfo.doubts;
        const submissionInfo = assignmentInfo.submissions;

        setCourseData(courseInfo);
        setDoubts(doubtsInfo.reverse());
        setAssignmentData(assignmentInfo);
        setSubmissions(submissionInfo);
        console.log(Loginctx.user);
      } catch (err) {
        console.log(err);
        if (err?.response?.data?.message) {
          alertCtx.showAlert("danger", err.response.data.message);
          return;
        }
        alertCtx.showAlert("danger", "Error Fetching Data");
      }
    };
    fetchData();
  }, [courseId, assignmentId, Loginctx, loadupdate]);//, doubts, submissions]);

  useEffect(() => {
    if (submissions.length > 0) {
      if (Loginctx?.user?._id) {
        const submission = submissions.find(ele => ele.studentId === Loginctx?.user?._id);
        setYourSubmission(submission);
        console.log(submission);
      }
    }
    console.log(Loginctx);
  }, [submissions, Loginctx?.user?._id, loadupdate]);

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
      alertCtx.showAlert("success", "File uploaded successfully");
    } catch (err) {
      console.log(err);
      setError("Error uploading file");
      alertCtx.showAlert("danger", "Error uploading file");
    } finally {
      setFileuploading(false);
      setLoadupdate(!loadupdate);
    }
  }

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
      alertCtx.showAlert("success", "Doubt posted successfully");
      console.log("Doubt posted successfully:", response.data);
      setMessage("");
      setLoadupdate(!loadupdate);
    } catch (error) {
      console.error("Error posting doubt:", error);
      if (error.response?.data?.message) {
        alertCtx.showAlert("danger", error.response.data.message);
        return;
      }

      alertCtx.showAlert("danger", "Error posting doubt");
    }
  };

  const submitAssignment = async () => {
    if (!profileUrl) {
      alert("not ");
      return;
    }
    console.log("profileUrl", profileUrl);
    try {
      const response = await axios.post(backendUrl + '/api/v1/assignments/submitAssignment', {
        assignmentId,
        submissionFile: profileUrl
      }, {
        headers: {
          Authorization: `Bearer ${Loginctx.AccessToken}`,
        },
      });
      console.log(response);
      setLoadupdate(!loadupdate);
      alertCtx.showAlert("success", "Assignment Submitted Successfully");
    } catch (err) {
      console.log(err);
      if (err.response?.data?.message) {
        alertCtx.showAlert("danger", err.response.data.message);
        return;
      }
      alertCtx.showAlert("danger", "Error Submitting Assignment");
    }

  }

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
                <a href={assignmentData.questionFile}
                  target="_blank" rel="noopener noreferrer"
                >View Assignment</a>
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
                  onClick={askDoubt}
                />
              </div>
            </>
          )}
          {
            doubts.map((ele, ind) => {
              return (<div className={classes.classComments}>
                <div>
                  {ele.student_name}
                </div>
                <div >
                  {ele.message}
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
            <div class={`${classes.gridContainer} ${classes.Container2}`}>

              <div className={`${classes.gridItem} input-group mb-3`}>
                <input type="file" class="form-control shadow-none " id="inputGroupFile02"
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
            <div className={`${classes.smbx} ${classes.smbx3}`} onClick={submitAssignment}>
              Mark as done
            </div>
          </div>
          {
            Loginctx?.role === 'student' &&
            <div className={classes.box2}>
              <div>
                <div className={classes.icon5}>
                  <SlPeople />
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flexWrap: 'wrap',
                }}>

                  <div>Your Submission</div>
                  <a href={yourSubmission?.submissionFile}
                    target="_blank" rel="noopener noreferrer"
                  >Submitted File</a>
                  <div>Grade: {yourSubmission?.grade}</div>
                  <div>Teacher's comment: {yourSubmission?.comments}</div>
                  {/* <div>yourSubmission.comments</div> */}
                </div>
              </div>
            </div>
          }
        </div>
      </div>
      <div className={classes.studentwork}>
        {
          Loginctx?.role === 'teacher' &&
          submissions.map((ele, ind) => {
            return (
              <AssignmentSubmissions rollNumber={ele.rollNumber} submissionFile={ele.submissionFile} studentId={ele.studentId} assignmentId={assignmentId} />
            )
          })
        }
      </div>
    </>
  );
};

export default Assignment_page2;
