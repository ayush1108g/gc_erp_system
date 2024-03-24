// import React from 'react'
// import classes from "./feedbackform.module.css";
// import { RiStarSFill, RiStarSLine } from "react-icons/ri";
// import { useState, useEffect, useContext } from 'react';

// import axios from 'axios';
// import {backendUrl} from "../constant";
// import LoginContext from "../store/context/loginContext";
// import { useParams } from 'react-router-dom';
// import { useNavigate} from "react-router"


// const Feedback_form = () => {
//     const Loginctx = useContext(LoginContext);
//     const navigate = useNavigate();
//     const [courseData, setCourseData] = useState(null);
//     const [feedbackRating, setFeedbackRating] = useState(null);
//     const [comment, setComment] = useState("");
//     let isadmin = Loginctx.role === 'admin';
//     const { courseId } = useParams();
//     console.log("Hi from FeedbackForm", courseId);

//     useEffect(() => {
//         const fetchdata = async () => {
//             try {
//                 const response = await axios.get(backendUrl + '/api/v1/courses/' + courseId, {
//                   headers:{
//                       Authorization:`Bearer ${Loginctx.AccessToken}`
//                   }
//               });
//                 const courseInfo = response.data.data.data[0];
//                 setCourseData(courseInfo);
//                 return courseInfo;
//             } catch (err) {
//                 console.log(err);
//             }
//         };
//         fetchdata();
//     }, [courseId]);

//     const stars = [{ id: 1, fill: false }, { id: 2, fill: false }, { id: 3, fill: false }, { id: 4, fill: false }, { id: 5, fill: false }];

//     const [starFill, setStarFill] = useState(stars);

//     const starsfillHandler = (e, index) => {
//         let temp = starFill.map((item, i) => {
//             if (i <= index) {
//                 return { ...item, fill: true };
//             } else {
//                 return { ...item, fill: false };
//             }
//         });
//         setStarFill(temp);
//     }


//     return (<>
//         <h1 class={classes.title}>Provide Feedback</h1>
//         <h5 className={classes.title}>The feedback provided by you will remain anonymous</h5>
//         <div className={classes.gridContainer}>
//             <div class={classes.gridItem}>
//                 <div>Course : </div>
//                 <div className={classes.yoyo}>{courseData.name}</div>
//             </div>
//             <div class={classes.gridItem}>
//                 <div>Faculty : </div>
//                 <div className={classes.yoyo}>{courseData.professor.join(', ')}</div>
//             </div>
//             <div class={classes.gridItem}>
//                 <div>Semester : </div>
//                 <div className={courseData.semester.join(', ')}></div>
//             </div>
//             {/* <div class={classes.gridItem}>
//                 <div>Year : </div>
//                 <div className={classes.yoyo}>Lorem, ipsum.</div>
//             </div> */}
//         </div>
//         <form class={classes.form}>
//             <div class="mb-3">
//                 <label for="exampleInputEmail1" class="form-label">Provide your views about course and teacher</label>
//                 <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
//                 <div id="emailHelp" class="form-text"></div>
//             </div>
//             <div class="mb-3">
//                 <label for="exampleInputPassword1" class="form-label">Give Rating out of 5</label>
//                 <div class='col-4'>
//                     <div className='d-flex my-2'>
//                         {starFill.map((star, index) => {
//                             return (
//                                 <div key={index} onClick={(e) => starsfillHandler(e, index)}>
//                                     {star.fill ? <RiStarSFill color='orange' size='50' /> : <RiStarSLine color='orange' size='50' />}
//                                 </div>
//                             )
//                         })}
//                     </div>
//                 </div>

//             </div>
//             <div class="mb-3 form-check">
//                 <input type="checkbox" class="form-check-input" id="exampleCheck1" />
//                 <label class="form-check-label" for="exampleCheck1">Check me out</label>
//             </div>
//             <button type="submit" class="btn btn-primary">Submit</button>
//         </form>
//     </>)
// }

// export default Feedback_form;

import React, { useState, useEffect, useContext } from 'react';
import classes from './feedbackform.module.css';
import axios from 'axios';
import { backendUrl } from '../constant';
import LoginContext from '../store/context/loginContext';
import { useParams } from 'react-router-dom';
import { RiStarSFill, RiStarSLine } from 'react-icons/ri';
import { useNavigate} from "react-router"

const Feedback_form = () => {
  const Loginctx = useContext(LoginContext);
  const [courseData, setCourseData] = useState(null);
  const [starFill, setStarFill] = useState([
    { id: 1, fill: false },
    { id: 2, fill: false },
    { id: 3, fill: false },
    { id: 4, fill: false },
    { id: 5, fill: false }
  ]);
  const [comment, setComment] = useState('');
  const { courseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(backendUrl + '/api/v1/courses/' + courseId, {
          headers: {
            Authorization: `Bearer ${Loginctx.AccessToken}`
          }
        });
        const courseInfo = response.data.data.data[0];
        setCourseData(courseInfo);
      } catch (err) {
        console.log(err);
      }
    };
    fetchdata();
  }, [courseId, Loginctx.AccessToken]);

  const starsfillHandler = index => {
    const temp = starFill.map((item, i) => ({
      ...item,
      fill: i <= index
    }));
    setStarFill(temp);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // Implement your form submission logic here
    const rating = starFill.filter(item => item.fill).length;

    try {
    // Prepare the data to be sent in the request body
        const formData = {
        course_id: courseId,
        rating: starFill.filter(item => item.fill).length,
        comments: comment
        };
        
        // Make a POST request to the feedback endpoint
        const response = await axios.post(backendUrl + '/api/v1/feedback', formData, {
        headers: {
            Authorization: `Bearer ${Loginctx.AccessToken}`
        }
        });
        
        // Handle success response
        console.log('Feedback submitted successfully:', response.data);
        
        // Optionally, you can navigate to a different page or show a success message
        navigate(`/my_courses/${courseId}`);
    } catch (error) {
        // Handle error
        console.error('Error submitting feedback:', error);
    }

    console.log('Rating:', rating);
    console.log('Comment:', comment);
  };

  return (
    <>
      <h1 className={classes.title}>Provide Feedback</h1>
      <h5 className={classes.subtitle}>The feedback provided by you will remain anonymous</h5>
      <div className={classes.gridContainer}>
        <div className={classes.gridItem}>
          <div>Course:</div>
          <div className={classes.yoyo}>{courseData && courseData.name}</div>
        </div>
        <div className={classes.gridItem}>
          <div>Faculty:</div>
          <div className={classes.yoyo}>{courseData && courseData.professor.join(', ')}</div>
        </div>
        <div className={classes.gridItem}>
          <div>Semester:</div>
          <div className={classes.yoyo}>{courseData && courseData.semester.join(', ')}</div>
        </div>
      </div>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="commentInput" className="form-label">
            Provide your views about the course and teacher
          </label>
          <textarea
            className="form-control"
            id="commentInput"
            rows="3"
            value={comment}
            onChange={e => setComment(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Give Rating out of 5</label>
          <div className="col-4">
            <div className="d-flex my-2">
              {starFill.map((star, index) => (
                <div key={index} onClick={() => starsfillHandler(index)}>
                  {star.fill ? <RiStarSFill color="orange" size="50" /> : <RiStarSLine color="orange" size="50" />}
                </div>
              ))}
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary" >
          Submit
        </button>
      </form >
    </>
  );
};

export default Feedback_form;
