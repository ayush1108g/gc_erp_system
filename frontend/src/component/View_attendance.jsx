import React from 'react'
import classes from './viewattendance.module.css'
import { GiCheckMark } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

const View_attendance=()=>{
    const data = [
        { rollNumber: '101', date: "2024-03-20T08:00:00Z" },
        { rollNumber: '102', date: "2024-03-20T08:30:00Z" },
        { rollNumber: '103', date: "2024-03-20T09:15:00Z" },
        { rollNumber: '104', date: "2024-03-20T10:00:00Z" },
        { rollNumber: '105', date: "2024-03-20T11:00:00Z" },
        { rollNumber: '106', date: "2024-03-21T08:00:00Z" },
        { rollNumber: '107', date: "2024-03-21T08:30:00Z" },
        { rollNumber: '108', date: "2024-03-21T09:00:00Z" },
        { rollNumber: '109', date: "2024-03-21T09:30:00Z" },
        { rollNumber: '110', date: "2024-03-21T10:00:00Z" },
        { rollNumber: '111', date: "2024-03-22T08:00:00Z" },
        { rollNumber: '112', date: "2024-03-22T08:30:00Z" },
        { rollNumber: '113', date: "2024-03-22T09:00:00Z" },
        { rollNumber: '114', date: "2024-03-22T10:00:00Z" },
        { rollNumber: '115', date: "2024-03-22T11:00:00Z" },
        { rollNumber: 101, date: "2024-01-01T08:00:00Z" },
        { rollNumber: 102, date: "2024-01-01T08:30:00Z" },
        { rollNumber: 103, date: "2024-01-01T09:15:00Z" },
        { rollNumber: 104, date: "2024-01-01T10:00:00Z" },
        // Data for January 1st...
    
        { rollNumber: 105, date: "2024-01-02T08:00:00Z" },
        { rollNumber: 106, date: "2024-01-02T08:30:00Z" },
        { rollNumber: 107, date: "2024-01-02T09:15:00Z" },
        { rollNumber: 108, date: "2024-01-02T10:00:00Z" },
        // Data for January 2nd...
    
        // Continue adding data for each date from January 1st to January 15th...
    
        { rollNumber: 206, date: "2024-01-15T08:00:00Z" },
        { rollNumber: 207, date: "2024-01-15T08:30:00Z" },
        { rollNumber: 208, date: "2024-01-15T09:15:00Z" },
        { rollNumber: 101, date: "2024-12-01T08:00:00Z" },
        { rollNumber: 102, date: "2024-12-01T08:30:00Z" },
        { rollNumber: 103, date: "2024-12-01T09:15:00Z" },
        { rollNumber: 104, date: "2024-12-01T10:00:00Z" },
        // Data for December 1st...
    
        { rollNumber: 105, date: "2024-12-02T08:00:00Z" },
        { rollNumber: 106, date: "2024-12-02T08:30:00Z" },
        { rollNumber: 107, date: "2024-12-02T09:15:00Z" },
        { rollNumber: 108, date: "2024-12-02T10:00:00Z" },
        // Data for December 2nd...
    
        // Continue adding data for each date from December 1st to December 10th...
    
        { rollNumber: 206, date: "2024-12-10T08:00:00Z" },
        { rollNumber: 207, date: "2024-12-10T08:30:00Z" },
        { rollNumber: 208, date: "2024-12-10T09:15:00Z" },
        { rollNumber: 209, date: "2024-12-10T10:00:00Z" },
        { rollNumber: 101, date: "2024-06-01T08:00:00Z" },
        { rollNumber: 102, date: "2024-06-01T08:30:00Z" },
        { rollNumber: 103, date: "2024-06-01T09:15:00Z" },
        { rollNumber: 104, date: "2024-06-01T10:00:00Z" },
        // Data for June 1st...
    
        { rollNumber: 105, date: "2024-06-02T08:00:00Z" },
        { rollNumber: 106, date: "2024-06-02T08:30:00Z" },
        { rollNumber: 107, date: "2024-06-02T09:15:00Z" },
        { rollNumber: 108, date: "2024-06-02T10:00:00Z" },
        // Data for June 2nd...
    
        // Continue adding data for each date from June 1st to June 5th...
    
        { rollNumber: 206, date: "2024-06-05T08:00:00Z" },
        { rollNumber: 207, date: "2024-06-05T08:30:00Z" },
        { rollNumber: 208, date: "2024-06-05T09:15:00Z" },
        { rollNumber: 209, date: "2024-06-05T10:00:00Z" }
        // Data for June 5th...
      
    ];
   
    
    console.log(data);
    
    
    const uniqueDates = Array.from(new Set(data.map(item => item.date.split('T')[0])));
    const uniqueNames = Array.from(new Set(data.map(item => item.rollNumber)));

    
    const tableHeaderCells = uniqueDates.map(date => (
        <th key={date}>{date}</th>
    ));

    // Generate table rows for names

    const tableRows = uniqueNames.map(rollNumber => (
        <tr key={rollNumber}>
            <td style={{
                position:'sticky',
                left:'0vw',
                backgroundColor:'white'
            }}>{rollNumber}</td>
            {uniqueDates.map(date => (
                <td key={date} className={data.some(item => item.rollNumber === rollNumber && item.date.split('T')[0] === date) ? 'present' : ''}>{data.some(item => item.rollNumber === rollNumber && item.date.split('T')[0] === date) ? <GiCheckMark color='blue' /> : <RxCross2 color='red' size={10}/>}</td>
            ))}
        </tr>
    ));
    return(<>
    <div style={{
        maxWidth:'100vw'
    }}>

    <h1 className={classes.title}>Attendance Report</h1>
    <div className= {classes.gridContainer}>
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
        <div class={classes.gridItem}>
            <div>Students Enrolled : </div>
            <div className={classes.yoyo}>Lorem, ipsum.</div>
        </div>
    </div>

    <div className={classes.attendanceGrid}>
    <table>
                <thead>
                    <tr>
                        <th style={{
                position:'sticky',
                left:'0vw',
                backgroundColor:'white'
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

export default View_attendance ;