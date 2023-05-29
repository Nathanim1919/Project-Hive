import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/profile.css";
import {
  AiFillLinkedin,
  AiFillFacebook,
  AiFillInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";
import Progress from "../components/progress/progress";

export default function ProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState({});

  // get active user
  useEffect(() => {
    const getUser = async () => {
      const user = await axios.get(`http://localhost:5000/user/${id}`);
      setUser(user.data.user);
    };
    getUser();
  }, [id]);

  const changeDate = (date) => {
    const dt = new Date(date);

    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = dt.toLocaleDateString("en-US", options);
    return formattedDate; // Output: "May 25, 2023"
  };

  const totalTasks = 50; // Total number of tasks
  const completedTasks = 20; // Number of completed tasks
  const notStartedTasks = 2; // Number of tasks not yet started
  const inProgressTasks = totalTasks - completedTasks - notStartedTasks; // Number of tasks in progress

  const maxLimit = 472; // Maximum limit based on the strokeDasharray
  
  const completed= (completedTasks / totalTasks) * maxLimit;
  const inProgress= (inProgressTasks / totalTasks) * maxLimit;
  const notStarted= (notStartedTasks / totalTasks) * maxLimit;

  const completedPercentage = (completed / maxLimit) * 100;
  const inProgressPercentage = (inProgress / maxLimit) * 100;
  const notStartedPercentage = (notStarted / maxLimit) * 100;



  return (
    <section className="profile">
      <div className="profileinformation">
        <div className="profiliepic">
          <img src={user && user.profile} alt="" />
        </div>
        <div className="personal-info">
          <h3>{user.name}</h3>
          <p>{user.position}</p>
          <p>Since: {changeDate(user.employmentDate)}</p>
          <p>Salary: {user.salary} Birr</p>
          <p>Employee-Code: {user.Code}</p>
          <p>Employee-sex: {user.sex}</p>
        </div>

        <div className="contact-me">
          <h2>Contact me</h2>
          <p>Email: {user.email}</p>
          <p>Phone-Number: {user.phoneNumber}</p>

          <div className="social">
            <AiFillFacebook />
            <AiFillInstagram />
            <AiOutlineTwitter />
            <AiFillLinkedin />
          </div>
        </div>
      </div>

      <div className="employeementInfo">
        <div className="coverpic">
          <div className="bio">
            <p>
              "Success is not the key to happiness. Happiness is the key to
              success. If you love what you do, you will be successful." -
              Albert Schweitzer
            </p>
          </div>
        </div>

        <div className="userrating">
          <div>
            <h1>
              2<sup>+</sup> <span>years</span>
            </h1>
            <p>Experience at BlueNile</p>
          </div>

          <div>
            <h1>
              4<sup>+</sup> <span>projects</span>
            </h1>
            <p>Participated in</p>
          </div>
          <div>
            <h1>90%</h1>
            <p>Task completion rate</p>
          </div>
        </div>

        <div className="tasksprogress">
          <div>
            <h1>43</h1>
            <p>Total Tasks</p>
          </div>

          <div>
            {/* <h1>20</h1>
            <p>Completed Tasks</p> */}
            <Progress limit={completedPercentage} progress={40} />
            <p>Completed Tasks</p>
          </div>
          <div>
            {/* <h1>10</h1>
            <p>In Progress</p> */}
            <Progress limit={inProgressPercentage} progress={40} />
            <p>In Progress</p>
          </div>
          <div>
            {/* <h1>13</h1>
            <p>Not Yet Started</p> */}
            <Progress limit={notStartedPercentage} progress={20} />
            <p>Not Yet Started</p>
          </div>
        </div>
      </div>
    </section>
  );
}
