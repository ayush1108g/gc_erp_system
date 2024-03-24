import React, { useState, useEffect, useContext } from 'react'
import classes from './viewattendance.module.css'
import { GiCheckMark } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { useParams } from 'react-router';
import axios from 'axios';
import { backendUrl } from "../constant";
import LoginContext from '../store/context/loginContext';

const View_attendance = () => {
    const Loginctx = useContext(LoginContext);
    const { courseId } = useParams();
    console.log(courseId);

    const [courseData, setCourseData] = useState(null);
    const [attendanceData, setAttendanceData] = useState([]);

    const [names, setNames] = useState([]);
    useEffect(() => {
        const fetchdata = async () => {
            if (!courseId) {
                return;
            }
            try {
                const response = await axios.get(backendUrl + '/api/v1/courses/' + courseId, {
                    headers: {
                        Authorization: `Bearer ${Loginctx.AccessToken}`
                    }
                });
                console.log(response.data.data.data[0]);
                setCourseData(response.data.data.data[0]);
            } catch (err) {
                console.log(err);
            }
        };

        const fetchdata2 = async () => {
            if (!courseId) {
                return;
            }
            try {
                const response = await axios.post(backendUrl + '/api/v1/attendance/getbycourse', {
                    course_id: courseId
                }, {
                    headers: {
                        Authorization: `Bearer ${Loginctx.AccessToken}`
                    }
                });
                console.log(response.data.data?.attendance);
                // setAttendanceData(response.data.data?.attendance);
                const data = response.data.data?.attendance;

                let attendance = [];

                data.forEach((ele) => {
                    let date = ele.date.split('T')[0];
                    let record = ele.attendance_records;
                    record.forEach((element) => {
                        attendance.push({
                            ...element,
                            date: date
                        })
                    })
                });
                console.log(attendance);
                setAttendanceData(attendance);

                let nameObj = attendance.reduce((obj, ele) => {
                    obj[ele.student_id] = obj[ele.student_id] || ele.name || ele.rollNumber || null;
                    return obj;
                }, {});
                console.log(nameObj);
                setNames(nameObj);

            } catch (err) {
                console.log(err);
            }
        };

        fetchdata();
        fetchdata2();


    }, [courseId, Loginctx.AccessToken]);


    const uniqueDates = Array.from(new Set(attendanceData?.map(item => item.date)));
    const uniqueNames = Array.from(new Set(attendanceData?.map(item => item.student_id)));


    const tableHeaderCells = uniqueDates.map(date => (
        <th key={date}>{date}</th>
    ));

    // Generate table rows for names

    const tableRows = uniqueNames.map(rollNumber => (
        <tr key={rollNumber}>
            <td style={{
                position: 'sticky',
                left: '0vw',
                backgroundColor: 'white'
            }}>{names[rollNumber] ? names[rollNumber] : rollNumber}</td>
            {uniqueDates.map(date => (
                <td key={date} className={attendanceData?.some(item => item.student_id === rollNumber && item.date === date) ? 'present' : ''}>{attendanceData?.some(item => item.student_id === rollNumber && item.date === date) ? <GiCheckMark color='blue' /> : <RxCross2 color='red' size={10} />}</td>
            ))}
        </tr>
    ));
    return (<>
        <div style={{
            maxWidth: '100vw'
        }}>

            <h1 className={classes.title}>Attendance Report</h1>
            <div className={classes.gridContainer}>
                <div class={classes.gridItem}>
                    <div>Course : </div>
                    <div className={classes.yoyo}>{courseData?.name}</div>
                </div>
                <div class={classes.gridItem}>
                    <div>Faculty : </div>
                    <div className={classes.yoyo}>{courseData?.professor.join(', ')}</div>
                </div>
                <div class={classes.gridItem}>
                    <div>Semester : </div>
                    <div className={classes.yoyo}>{courseData?.semester.join(', ')}</div>
                </div>

                <div class={classes.gridItem}>
                    <div>Students Enrolled : </div>
                    <div className={classes.yoyo}>{courseData?.students_enrolled.length}</div>
                </div>
            </div>

            <div className={classes.attendanceGrid}>
                <table>
                    <thead>
                        <tr>
                            <th style={{
                                position: 'sticky',
                                left: '0vw',
                                backgroundColor: 'white'
                            }}>RollNumber</th>
                            {tableHeaderCells}
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>
            </div>
        </div>
    </>)
}

export default View_attendance;