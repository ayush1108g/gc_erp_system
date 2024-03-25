import React, { useState, useEffect, useContext } from "react";
import { PieChart } from 'react-minimal-pie-chart';
import LoginContext from "../store/context/loginContext";
import axios from 'axios';
import { backendUrl } from "../constant";

import { useCookies } from "react-cookie";
import { useAlert } from "../store/context/Alert-context";


const Attendance = () => {
    const alertCtx = useAlert();
    const [cookie] = useCookies(["AccessToken", "RefreshToken"]);
    const loginCtx = useContext(LoginContext);
    console.log(loginCtx);
    const [courseData, setCourseData] = useState([]);
    const courses = loginCtx?.user?.courses_enrolled;
    const [load, setLoad] = useState(false);
    const [isActiveAttendance, setIsActiveAttendance] = useState([]);
    console.log(loginCtx)
    console.log(courses);
    useEffect(() => {
        const fetchData = async () => {
            if (courses) {
                try {
                    console.log(loginCtx.AccessToken);
                    const resp = await Promise.all(courses.map(async (course) => {
                        const body = {
                            course_id: course.course_id
                        };
                        const response = await axios.post(
                            backendUrl + '/api/v1/attendance/getbycourse',
                            body,
                            {
                                headers: {
                                    Authorization: `Bearer ${cookie.AccessToken}`
                                }
                            }
                        );
                        console.log(response.data);
                        return response.data?.data?.attendance;
                    }));
                    console.log(resp);
                    const userid = loginCtx.user._id;

                    let datax = [];
                    resp.forEach((item, index) => {
                        let total = item.length;
                        let present = 0;
                        item?.forEach((ele) => {
                            const record = ele?.attendance_records;
                            let prnt = false;
                            record?.forEach((rec) => {
                                if (!prnt && rec?.student_id === userid) {
                                    present++;
                                    prnt = true;
                                    return;
                                }
                            });
                        });
                        let absent = total - present;
                        const obj = {
                            total,
                            present,
                            absent,
                            course_id: courses[index].course_id
                        };
                        datax.push(obj);
                    });

                    const promises = await datax.map(async (course) => {
                        const response = await axios.get(
                            backendUrl + '/api/v1/courses/' + course.course_id,
                            {
                                headers: {
                                    Authorization: `Bearer ${cookie.AccessToken}`
                                }
                            }
                        );
                        return {
                            ...course,
                            course: response.data.data?.data[0]
                        }
                    });

                    const results = await Promise.all(promises);
                    // console.log(datax);
                    console.log(results);
                    setCourseData(results);
                } catch (err) {
                    // Handle error
                    console.error('Error fetching data:', err);
                    if (err?.response?.data?.message) {
                        alertCtx.showAlert("danger", err.response.data.message);
                        return;
                    }
                    alertCtx.showAlert("danger", "Error fetching data");
                }
            }
        };


        const fetchData1 = async () => {
            if (!courses) return;
            try {
                const promises = courses?.map(async (course) => {
                    const response = await axios.post(
                        backendUrl + '/api/v1/attendance/isActive', { course_id: course.course_id },
                        {

                            headers: {
                                Authorization: `Bearer ${cookie.AccessToken}`
                            }
                        }
                    );
                    return response?.data?.data;
                });
                const results = await Promise?.all(promises);
                console.log(results);

                setIsActiveAttendance(results);
            } catch (err) {
                console.error('Error fetching data:', err);
                if (err?.response?.data?.message) {
                    alertCtx.showAlert("danger", err.response.data.message);
                    return;
                }
                alertCtx.showAlert("danger", "Error fetching data");
            }
        };

        fetchData();
        fetchData1();

    }, [courses, load, loginCtx]);

    const handleMark = async (index) => {
        const attendanceid = isActiveAttendance[index]?.attendance?._id;
        const location = isActiveAttendance[index]?.attendance?.location;

        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords.latitude);
            console.log(position.coords.longitude);
            console.log(location.lat);
            console.log(location.long);
            const distance = Math.sqrt((position.coords.latitude - location.lat) ** 2 + (position.coords.longitude - location.long) ** 2);
            console.log(distance);
            //distance in km
            if (distance > 0.1) { // 100 m check
                console.log("You are not in the location");
                alertCtx.showAlert("danger", "You are not in the location");
                return;
            }
        });

        if (!navigator.geolocation) {
            console.log("Geolocation is not supported by your browser");
            alertCtx.showAlert("danger", "Geolocation is not supported by your browser");
            return;
        }
        // if not permission of location
        if (!navigator.permissions) {
            console.log("Permissions API not supported by browser");
            alertCtx.showAlert("danger", "Permissions API not supported by browser");
            return;
        }

        // if not permission of location show alert
        navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
            if (result.state === 'granted') {
                console.log(result.state);
            } else if (result.state === 'prompt') {
                console.log(result.state);
            } else if (result.state === 'denied') {
                console.log(result.state);
                alertCtx.showAlert("danger", "Please allow location permission");
                return;
            }
            result.onchange = function () {
                console.log(result.state);
            };
        });

        try {
            const body = {
                attendance_id: attendanceid,
                status: 'present'
            };
            console.log(body);
            const response = await axios.post(
                backendUrl + '/api/v1/attendance/mark',
                body,
                {
                    headers: {
                        Authorization: `Bearer ${loginCtx.AccessToken}`
                    }
                }
            );
            console.log(response.data);
            console.log("Attendance Marked");
            alertCtx.showAlert("success", "Attendance Marked");
        } catch (err) {
            console.error('Error marking attendance:', err);
            if (err?.response?.data?.message) {
                alertCtx.showAlert("danger", err.response.data.message);
                return;
            }
            alertCtx.showAlert("danger", "Error marking attendance");
        } finally {
            setLoad(!load);
        }
    }


    return (
        <div style={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <h1>Attendance</h1>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '20px',
                flexWrap: 'wrap'
            }}>
                {courseData.map((item, index) => {
                    return <div
                        key={index}
                        style={{
                            width: '250px',
                            height: '350px',
                            padding: '10px',
                            // border: '1px solid black',
                            borderRadius: '10px',
                            boxShadow: '2px 2px 5px 2px #888888',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',


                        }}>
                        <h3>{item?.course?.name}</h3>
                        <div style={{
                            maxWidth: '150px',
                            maxHeight: '200px',
                        }}>

                            <PieChart

                                startAngle={-90}
                                lengthAngle={-360}
                                lineWidth={50}
                                label={({ dataEntry }) => {
                                    if (dataEntry.value === 0 || dataEntry.value === 0.1) {
                                        return null;
                                    }

                                    return `${dataEntry.title}: ${dataEntry.value}`
                                }}
                                labelStyle={{
                                    fontSize: '8px',
                                    fontFamily: 'sans-serif',
                                    fill: '#121212',
                                    // color: 'cyan'
                                }}
                                labelPosition={50}
                                data={[
                                    {
                                        title: 'Present',
                                        value: item.present,
                                        color: '#D2DAFF'
                                    },
                                    {
                                        title: 'Absent',
                                        value: item.total === 0 ? 0.1 : item.absent, color: '#B1B2FF'
                                    },
                                ]}
                            />
                        </div>

                        <p>Attendence Percent: {item.total === 0 ? 0 : (item.present * 100 / item.total).toFixed(2)}
                        </p>

                        <hr style={{
                            width: '90%',
                            color: 'black'
                        }} />
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '10px'
                        }}>

                            <p>{isActiveAttendance[index]?.isActive === false ? "Attendance not active yet" : "MARK ATTENDANCE"}</p>
                            {isActiveAttendance[index]?.isActive !== false && <button
                                onClick={() => { handleMark(index) }}                            >MARK</button>}
                        </div>
                    </div>




                })}
            </div>
        </div >
    )
}

export default Attendance;