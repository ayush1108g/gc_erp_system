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

const dummydata= [
    {
      "rollnumber": "123456",
      "link": "https://example.com/page1"
    },
    {
      "rollnumber": "234567",
      "link": "https://example.com/page2"
    },
    {
      "rollnumber": "345678",
      "link": "https://example.com/page3"
    },
    {
      "rollnumber": "456789",
      "link": "https://example.com/page4"
    },
    {
      "rollnumber": "567890",
      "link": "https://example.com/page5"
    }
  ]
  

const Assignment_page2 = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [profile, setProfile] = useState(null);
    const [profileUrl, setProfileUrl] = useState("");
    const [fileuploading, setFileuploading] = useState(false);

  const Loginctx = useContext(LoginContext);
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  const [assignmentData, setAssignmentData] = useState(null);
  const [doubts, setDoubts] = useState([]);
  const { courseId, assignmentId } = useParams();
  const [message, setMessage] = useState("");
  const [messageOfTeacher, setMessageOfTeacher] = useState("");
  const [studentGrade, setStudentGrade] = useState();
  console.log("Hi from assignment_page2", courseId, assignmentId);
  let matchingSubmission;

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
        const doubtsInfo = assignmentInfo.doubts;
        setCourseData(courseInfo);
        setDoubts(doubtsInfo);
        setAssignmentData(assignmentInfo);
        console.log(Loginctx.user);

        const userStudentId = Loginctx.user._id; // Assuming this is the user's student ID

        const submissions = assignmentInfo.submissions;
        console.log(submissions);
        matchingSubmission = submissions.find(submission => submission.studentId === userStudentId);
        console.log("matchingSubmission",matchingSubmission);

        // if (matchingSubmission) {
        //     console.log("Comments:", matchingSubmission.comments);
        //     console.log("Grade:", matchingSubmission.grade);
        //     } else {
        //     console.log("User's student ID does not match any in the submissions array.");
        // }

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [courseId, assignmentId, Loginctx.AccessToken]);

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

        console.log("Doubt posted successfully:", response.data);
        setMessage("");
        // Optionally, you can update the UI or show a success message upon successful posting of doubt
    } catch (error) {
        console.error("Error posting doubt:", error);
        // Handle errors or show an error message to the user
    }
    };
    console.log(Loginctx);

    const submitStudentGradeAndComment = async () => {
  try {
    const requestBody = {
      assignmentId: assignmentId,
      studentId: "65ffb50f902555634db490e9",
      grade: studentGrade, 
      comments: messageOfTeacher, 
    };

    const response = await axios.patch(backendUrl+'/api/v1/assignments', requestBody, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Loginctx.AccessToken}`, // Include the bearer token in the headers
      },
    });

    console.log('Grade and comment submitted successfully:', response.data);
  } catch (error) {
    console.error('Error submitting grade and comment:', error);
  }
};

const submitAssignment = async() => {
    if(!profileUrl){
        alert("not ");
        return;
    }
    console.log("profileUrl", profileUrl);
    try{
        const response = await axios.post(backendUrl+'/api/v1/assignments/submitAssignment',{
        assignmentId,
        submissionFile: profileUrl
        },{
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
            doubts.map((ele,ind)=>{
                 return(<div className={classes.classComments}>
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
                // Loginctx.role==='teacher' && 
          <div className={classes.box2}>
            <div>
              <div className={classes.icon5}>
                <SlPeople />
              </div>
              <div>Private comment</div>
            </div>
                <div>
                <input
                    type="number"
                    placeholder="  Add Student Grade"
                    className={classes.input2}
                    value={studentGrade}
                    onChange={(e) => setStudentGrade(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="  Add Private Comment to Student"
                    className={classes.input2}
                    value={messageOfTeacher}
                    onChange={(e) => setMessageOfTeacher(e.target.value)}
                />
                <IoSend
                    color="blue"
                    size={"25px"}
                    style={{
                    marginBottom: "4px",
                    marginLeft: "5px",
                    marginTop: "23px",
                    }}
                    onClick = {submitStudentGradeAndComment}
                />
                </div>
          </div>
            }
            {
                Loginctx.role==='student' &&  
          <div className={classes.box2}>
            <div>
              <div className={classes.icon5}>
                <SlPeople />
              </div>
              <div>{matchingSubmission.grade}</div>
              <div>{matchingSubmission.comments}</div>
            </div>
          </div>
            }
        </div>
      </div>
      <div className={classes.studentwork}>
      {
            dummydata.map((ele,ind)=>{
                return(<div className={classes.student}>
                   <div>
                     {ele.rollnumber}
                   </div>
                   <div >
                       {ele.link}
                   </div>
                   <input type="text" placeholder="Grade the Student" />
                   <input type="text" placeholder="Add Comment" style={{width:'50vw'}}/>
                   <button>Submit</button>
                </div>)
           })
          }
          </div>
    </>
  );
};

export default Assignment_page2;
