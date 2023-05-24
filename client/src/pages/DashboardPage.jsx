import React, { useEffect, useState } from "react";
import ProjectForm from "../components/project/ProjectForm";
import "../styles/dashboard.css";
import { RiBarChartLine } from "react-icons/ri";
import { BiSearch, BiTask } from "react-icons/bi";
import { AiOutlineHome, AiOutlinePlus, AiOutlineProject } from "react-icons/ai";
import { SiGotomeeting } from "react-icons/si";
import { FiMoreHorizontal } from "react-icons/fi";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function DashboardPage() {

  // states
  const [activeUser, setActiveUser] = useState({});
  const {id} = useParams()


  // get the current month name with the year
  const currentDate = new Date();
  const options = { month: "long", year: "numeric" };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);


  // get active user
  useEffect(() => {
    const getUser = async ()=>{
        const user = await axios.get(`http://localhost:5000/user/${id}`);
        setActiveUser(user.data.user);
        console.log(activeUser);
    }

    getUser();
  },[id])


  return (
    <section className="dashboard">
      <header className="header-section">
        <div className="contents">
          <RiBarChartLine />
          <h2>Blue-Nile</h2>
          <div className="search">
            <input type="text" placeholder="Search" />
            <BiSearch />
          </div>
        </div>

        <div className="profile">
          <div className="pic">
            <img src="" alt="" />
          </div>
          <div>
          <h6>{`${(activeUser.name || "").slice(0, 3)} ${(activeUser.name || "")
            .split(" ")[1]
            ?.charAt(0)}`}</h6>
          <p>{activeUser && activeUser.position}</p>
          </div>
        </div>
      </header>
      <main className="main-section">
        <div className="sidbar">
          <div className="homepage">
            <AiOutlineHome />
          </div>
          <div className="project">
            <AiOutlineProject />
          </div>
          <div className="event">
            <SiGotomeeting />
          </div>
          <div className="task">
            <BiTask />
          </div>
        </div>
        <div className="userdatas">
          {/* projects section */}
          <div className="projects">
            <div className="pro-header">
              <div className="current-year">
                <h3>Projects</h3>
                <h4>{formattedDate}</h4>
              </div>

              <div className="projects-status">
                <div>
                  <h3>12</h3>
                  <p>In progress</p>
                </div>
                <div>
                  <h3>22</h3>
                  <p>Completed</p>
                </div>
                <div>
                  <h3>2</h3>
                  <p>Upcoming</p>
                </div>
                <div>
                  <h3>52</h3>
                  <p>Total projects</p>
                </div>
              </div>
            </div>

            <div className="project-list">
              <div className="p-project pro1">
                <div className="pro-head">
                  <p>may 2 2023</p>
                  <FiMoreHorizontal />
                </div>
                <div className="pro-title">
                  <h2>Web designing</h2>
                </div>

                <div className="progress">
                  <p>Progress</p>
                  <div className="upperProgressBar">
                    <div className="innerProgressBar"></div>
                  </div>
                  <p className="percent">80%</p>
                </div>

                <div className="footer-detail">
                  <div className="members">
                    <div className="m1"></div>
                    <div className="m2"></div>
                    <div className="m2">
                      <AiOutlinePlus />
                    </div>
                  </div>

                  <div className="deadline">
                    <p>2 days left</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mes-not">
            <div className="notifications">notification</div>
            <div className="messages">message</div>
          </div>
        </div>
      </main>
    </section>
  );
}
