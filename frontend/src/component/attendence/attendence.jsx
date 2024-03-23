import React, { useState, useEffect } from 'react';

const AttendanceButton = ({ courseId, attendanceLocation }) => {
    const [studentLocation, setStudentLocation] = useState(null);
    const [distance, setDistance] = useState(null);

    // Function to calculate distance between two coordinates using Haversine formula
    const calculateDistance = (coord1, coord2) => {
        const R = 6371e3; // Earth radius in meters
        const lat1 = coord1.latitude * Math.PI / 180; // Latitude of student
        const lat2 = coord2.latitude * Math.PI / 180; // Latitude of attendance location
        const deltaLat = (coord2.latitude - coord1.latitude) * Math.PI / 180;
        const deltaLon = (coord2.longitude - coord1.longitude) * Math.PI / 180;

        const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;

        return d; // Distance in meters
    };

    useEffect(() => {
        // Get student's current geolocation
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setStudentLocation({ latitude, longitude });
            },
            error => console.error(error)
        );
    }, []);

    useEffect(() => {
        if (studentLocation) {
            // Calculate distance between student's location and attendance location
            const dist = calculateDistance(studentLocation, attendanceLocation);
            setDistance(dist);
        }
    }, [studentLocation, attendanceLocation]);

    const handleAttendance = () => {
        if (distance <= 100) {
            // Student is within 100 meters, mark as present
            alert('You are marked as present.');
            // Logic to mark student as present in the database
        } else {
            // Student is not within 100 meters, show alert
            alert('You are not within the attendance location range.');
        }
    };

    return (
        <div>
            {distance !== null && (
                <button onClick={handleAttendance}>
                    Mark Attendance
                </button>
            )}
        </div>
    );
};

export default AttendanceButton;
