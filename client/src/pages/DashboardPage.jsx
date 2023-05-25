import React, { useEffect, useState } from "react";
import ProjectForm from "../components/project/ProjectForm";
import "../styles/dashboard.css";
import { RiBarChartLine } from "react-icons/ri";
import { BiSearch, BiTask } from "react-icons/bi";
import {
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlinePlus,
  AiOutlineProject,
} from "react-icons/ai";
import { SiGotomeeting } from "react-icons/si";
import { BsArrowRight } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaBan } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function DashboardPage() {
  // states
  const [activeUser, setActiveUser] = useState({});
  const [projects, setProjects] = useState([]);
  const [openOption, setOpenOption] = useState(false);
  const [openProjectForm, setOpenProjectForm] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();

  // get the current month name with the year
  const currentDate = new Date();
  const options = { month: "long", year: "numeric" };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  // get active user
  useEffect(() => {
    const getUser = async () => {
      const user = await axios.get(`http://localhost:5000/user/${id}`);
      setActiveUser(user.data.user);
      console.log(activeUser);
    };

    getUser();
  }, [id]);

  // PROJECT STATUS COUNT
  const upCommingProjects = projects.filter(
    (project) => project.status === "Not Started"
  );
  const inprogressProjects = projects.filter(
    (project) => project.status === "In progress"
  );
  const completedProjects = projects.filter(
    (project) => project.status === "completed"
  );

  // get projects associated with the active user
  useEffect(() => {
    const getProjects = async () => {
      const response = await axios.get(
        `http://localhost:5000/user/${id}/projects`
      );
      setProjects(response.data.projects);
      console.log(response.data.projects);
    };
    getProjects();
  }, [id, openProjectForm]);

  const changeDate = (date) => {
    const dt = new Date(date);

    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = dt.toLocaleDateString("en-US", options);
    return formattedDate; // Output: "May 25, 2023"
  };

  const howMuchDaysLeft = (startDateStr, dueDateStr) => {
    const startDate = new Date(startDateStr);
    const dueDate = new Date(dueDateStr);

    // Calculate the difference in milliseconds between the two dates
    const timeDiff = dueDate.getTime() - startDate.getTime();

    // Calculate the number of days left
    let daysLeft;
    if (timeDiff > 0) {
      daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    } else {
      daysLeft = 0; // Due date has already passed
    }

    return daysLeft;
  };

  return (
    <section className="dashboard">
      {openProjectForm && (
        <ProjectForm setOpenProjectForm={setOpenProjectForm} />
      )}
      <header className="header-section">
        <div className="contents">
          <RiBarChartLine />
          <h2>Blue-Nile</h2>
          <div className="search">
            <input type="text" placeholder="Search" />
            <BiSearch />
          </div>
        </div>

        <div className="profile" onClick={() => setOpenOption(!openOption)}>
          <div className="pic">
            <img src={activeUser.profile} alt="" />
          </div>
          <div className="user-info">
            <h6>{`${(activeUser.name || "").slice(0, 3)} ${(
              activeUser.name || ""
            )
              .split(" ")[1]
              ?.charAt(0)}`}</h6>
            <p>{activeUser && activeUser.position}</p>
          </div>
        </div>
        {openOption && (
          <div className="profile-option">
            <li onClick={() => setOpenOption(!openOption)}>
              <CgProfile />
              Profile
            </li>
            <li onClick={() => setOpenOption(!openOption)}>
              <FaBan />
              deactivate
            </li>
            <li
              onClick={() => {
                setOpenOption(!openOption);
                navigate("/login");
              }}
            >
              <AiOutlineLogout />
              logout
            </li>
          </div>
        )}
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
                  <h3>{inprogressProjects.length}</h3>
                  <p>In progress</p>
                </div>
                <div>
                  <h3>{completedProjects.length}</h3>
                  <p>Completed</p>
                </div>
                <div>
                  <h3>{upCommingProjects.length}</h3>
                  <p>Not Started</p>
                </div>
                <div>
                  <h3>
                    {inprogressProjects.length +
                      upCommingProjects.length +
                      completedProjects.length}
                  </h3>
                  <p>Total projects</p>
                </div>

                <div
                  className="createProjecticon"
                  onClick={() => setOpenProjectForm(true)}
                >
                  <AiOutlinePlus />
                </div>
              </div>
            </div>

            <div className="project-list">
              {projects &&
                projects.map((project) => (
                  <NavLink to={`/user/${id}/projects/${project._id}`}>
                    <div
                      className="p-project pro1"
                      style={{
                        backgroundColor:
                          project.priority === "Low"
                            ? "rgba(60, 250, 21, 0.658)"
                            : project.priority === "Medium"
                            ? "rgba(238, 255, 4, 0.863)"
                            : project.priority === "High"
                            ? "rgba(255, 0, 0, 0.438)"
                            : "transparent",
                      }}
                    >
                      <div className="pro-head">
                        <p>{changeDate(project.startDate)}</p>
                        <p>{project.priority}</p>
                      </div>
                      <div className="pro-title">
                        <h2>{project.title}</h2>
                      </div>

                      <div className="progress">
                        <p>Progress</p>
                        <div className="upperProgressBar">
                          <div
                            className="innerProgressBar"
                            style={{
                              width: `${project.completionPercentage}%`,
                            }}
                          ></div>
                        </div>
                        <p className="percent">
                          {project.completionPercentage}%
                        </p>
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
                          <p>
                            {howMuchDaysLeft(
                              project.startDate,
                              project.dueDate
                            )}{" "}
                            days left
                          </p>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                ))}
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
