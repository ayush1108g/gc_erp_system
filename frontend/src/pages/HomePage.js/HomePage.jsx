import "./HomePage.css";

import Navbar from "../../component/Navbar/Navbar";
import React from "react";
import demopic from "../../assets/demo_profile_photo.png";

function HomePage() {
  return (
    <div>
      <div>
        <Navbar />
        <main className="main">
          <div className="container">
            <header className="header">
              <div className="header-text">
                <h1>Welcome,👋🏽</h1>
              </div>
              <div className="header-profile">
                <img src={demopic} alt="profile_photo" />
                <p>Meenal Nimje</p>
              </div>
            </header>
            <section className="today-timetable">
              <h2>Today's Timetable</h2>
              <div className="items">
                <div className="timetable-card">
                  <div className="time">9:00 AM - 10:00 AM</div>
                  <div className="subject">DBMS</div>
                  <div className="topic-name">FD's and Normalizations</div>
                </div>
                <div className="timetable-card">
                  <div className="time">9:00 AM - 10:00 AM</div>
                  <div className="subject">DBMS</div>
                  <div className="topic-name">FD's and Normalizations</div>
                </div>
                <div className="timetable-card">
                  <div className="time">9:00 AM - 10:00 AM</div>
                  <div className="subject">DBMS</div>
                  <div className="topic-name">FD's and Normalizations</div>
                </div>
                <div className="timetable-card">
                  <div className="time">9:00 AM - 10:00 AM</div>
                  <div className="subject">DBMS</div>
                  <div className="topic-name">FD's and Normalizations</div>
                </div>
              </div>
            </section>
            <main className="main">
              <section className="materiais">
                <h2>Materials</h2>
                <div className="materiais-grid">
                  <div className="materiais-card">
                    <h3>Courses</h3>
                    <p>This Semester</p>
                  </div>
                  <div className="materiais-card">
                    <h3>Attendance</h3>
                    <p>This Semester</p>
                  </div>
                  <div className="materiais-card">
                    <h3>Assignment Completion</h3>
                    <p>This Semester</p>
                  </div>
                  <div className="materiais-card">
                    <h3>Results</h3>
                    <p>Upto prev. semester</p>
                  </div>
                </div>
              </section>
              <section className="update">
                <h2>Recent Updates</h2>
                <div className="update-items">
                  <li>
                    Application for Summer Internship Programme at IIT
                    Bhubaneswar
                  </li>
                  <li>
                    Admission to the M.Tech. Programme for the Autumn Session
                    2024-25
                  </li>
                  <li>
                    Admission to Master of Science (by Research) Programme for
                    the Autumn Session 2024-25
                  </li>
                  <li>
                    Admission to the Ph.D. Programme for the Autumn Session
                    2024-25
                  </li>
                  <li>
                    10th Edition of E-Summit was Successfully Hosted at IIT
                    Bhubaneswar: Celebrates a decade of achievements in
                    Innovation
                  </li>
                </div>
              </section>
            </main>
          </div>
        </main>
      </div>
    </div>
  );
}

export default HomePage;
