import React from 'react'
import classes from "./feedbackform.module.css";
import { RiStarSFill, RiStarSLine } from "react-icons/ri";
import { useState } from 'react';


const Feedback_form = () => {
    const stars = [{ id: 1, fill: false }, { id: 2, fill: false }, { id: 3, fill: false }, { id: 4, fill: false }, { id: 5, fill: false }];

    const [starFill, setStarFill] = useState(stars);

    const starsfillHandler = (e, index) => {
        let temp = starFill.map((item, i) => {
            if (i <= index) {
                return { ...item, fill: true };
            } else {
                return { ...item, fill: false };
            }
        });
        setStarFill(temp);
    }


    return (<>
        <h1 class={classes.title}>Provide Feedback</h1>
        <h5 className={classes.title}>The feedback provided by you will remain anonymous</h5>
        <div className={classes.gridContainer}>
            <div class={classes.gridItem}>
                <div>Course : </div>
                <div className={classes.yoyo}>Lorem, ipsum.</div>
            </div>
            <div class={classes.gridItem}>
                <div>Faculty : </div>
                <div className={classes.yoyo}>Lorem, ipsum.</div>
            </div>
            <div class={classes.gridItem}>
                <div>Semester : </div>
                <div className={classes.yoyo}>Lorem, ipsum.</div>
            </div>
            <div class={classes.gridItem}>
                <div>Year : </div>
                <div className={classes.yoyo}>Lorem, ipsum.</div>
            </div>
        </div>
        <form class={classes.form}>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Provide your views about course and teacher</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                <div id="emailHelp" class="form-text"></div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Give Rating out of 5</label>
                <div class='col-4'>
                    <div className='d-flex my-2'>
                        {starFill.map((star, index) => {
                            return (
                                <div key={index} onClick={(e) => starsfillHandler(e, index)}>
                                    {star.fill ? <RiStarSFill color='orange' size='50' /> : <RiStarSLine color='orange' size='50' />}
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </>)
}

export default Feedback_form;

