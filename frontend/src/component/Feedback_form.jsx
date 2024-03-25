import React, { useState, useEffect, useContext } from 'react';
import classes from './feedbackform.module.css';
import axios from 'axios';
import { backendUrl } from '../constant';
import LoginContext from '../store/context/loginContext';
import { useParams } from 'react-router-dom';
import { RiStarSFill, RiStarSLine } from 'react-icons/ri';
import { useNavigate } from "react-router"
import { useAlert } from '../store/context/Alert-context';


const Feedback_form = () => {
  const alertCtx = useAlert();
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
        if (err?.response?.data?.message) {
          alertCtx.showAlert("danger", err.response.data.message);
          return
        }
        console.log(err);
        alertCtx.showAlert("danger", "Error fetching data");
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

    if (rating === 0 || comment === '') {
      alertCtx.showAlert("danger", "Please fill all the fields");
      return;
    }
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

      alertCtx.showAlert("success", "Feedback submitted successfully");
      // Optionally, you can navigate to a different page or show a success message
      navigate(`/my_courses/${courseId}`);
    } catch (error) {
      if (error?.response?.data?.message) {
        alertCtx.showAlert("danger", error.response.data.message);
        return
      }
      // Handle error
      console.error('Error submitting feedback:', error);
      alertCtx.showAlert("danger", "Error submitting feedback");
    }

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
