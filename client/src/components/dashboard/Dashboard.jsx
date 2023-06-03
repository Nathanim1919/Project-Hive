import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import ProjectForm from "../project/ProjectForm";
import axios from "axios";
import {changeDate,howMuchDaysLeft} from '../../functions.js'

export default function Dashboarddata() {
  const [openForm, setOpenform] = useState(false);
  const [projects, setProjects] = useState([]);
  const [filterProjects, setFilterProjects] = useState("");
  // get the current month name with the year
  const currentDate = new Date();
  const options = { month: "long", year: "numeric" };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  const { id } = useParams();

  // PROJECT STATUS COUNT
  const upCommingProjects = projects.filter(
    (project) => project.status === "Planning"
  );
  const inprogressProjects = projects.filter(
    (project) => project.status === "In progress"
  );
  const completedProjects = projects.filter(
    (project) => project.status === "Completed"
  );
  const OnHoldProjects = projects.filter(
    (project) => project.status === "On Hold"
  );
  const cancelledProjects = projects.filter(
    (project) => project.status === "Cancelled"
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
  }, [id, openForm]);

  return (
    <div className="userdatas">
      {openForm && <ProjectForm setOpenform={setOpenform} />}
      <div className="projects">
        <div className="pro-header">
          <div className="current-year">
            <h3>Projects</h3>
            <h4>{formattedDate}</h4>
          </div>

          <div className="projects-status">
            <div
              onClick={() => setFilterProjects("Planning")}
              style={{
                color:
                  filterProjects === "Planning"
                    ? "rgba(0,0,0,1)"
                    : "rgba(0,0,0,.21)",
                backgroundColor:
                  filterProjects === "Planning"
                    ? "#f1eded"
                    : "rgba(0, 0, 0, 0)",
              }}
            >
              <h3>{upCommingProjects.length}</h3>
              <p>Planning</p>
            </div>
            <div
              onClick={() => setFilterProjects("In Progress")}
              style={{
                color:
                  filterProjects === "In Progress"
                    ? "rgba(0,0,0,1)"
                    : "rgba(0,0,0,.21)",
                backgroundColor:
                  filterProjects === "In Progress"
                    ? "#f1eded"
                    : "rgba(0, 0, 0, 0)",
              }}
            >
              <h3>{inprogressProjects.length}</h3>
              <p>In progress</p>
            </div>
            <div
              onClick={() => setFilterProjects("Completed")}
              style={{
                color:
                  filterProjects === "Completed"
                    ? "rgba(0,0,0,1)"
                    : "rgba(0,0,0,.21)",
                backgroundColor:
                  filterProjects === "Completed"
                    ? "#f1eded"
                    : "rgba(0, 0, 0, 0)",
              }}
            >
              <h3>{completedProjects.length}</h3>
              <p>Completed</p>
            </div>
            <div
              onClick={() => setFilterProjects("On Hold")}
              style={{
                color:
                  filterProjects === "On Hold"
                    ? "rgba(0,0,0,1)"
                    : "rgba(0,0,0,.21)",
                backgroundColor:
                  filterProjects === "On Hold" ? "#f1eded" : "rgba(0, 0, 0, 0)",
              }}
            >
              <h3>{OnHoldProjects.length}</h3>
              <p>On Hold</p>
            </div>
            <div
              onClick={() => setFilterProjects("Cancelled")}
              style={{
                color:
                  filterProjects === "Cancelled"
                    ? "rgba(0,0,0,1)"
                    : "rgba(0,0,0,.21)",
                backgroundColor:
                  filterProjects === "Cancelled"
                    ? "#f1eded"
                    : "rgba(0, 0, 0, 0)",
              }}
            >
              <h3>{cancelledProjects.length}</h3>
              <p>Cancelled</p>
            </div>
            <div
              onClick={() => setFilterProjects("")}
              style={{
                color:
                  filterProjects === "" ? "rgba(0,0,0,1)" : "rgba(0,0,0,.21)",
                backgroundColor:
                  filterProjects === "" ? "#f1eded" : "rgba(0, 0, 0, 0)",
              }}
            >
              <h3>
                {inprogressProjects.length +
                  upCommingProjects.length +
                  cancelledProjects.length +
                  OnHoldProjects.length +
                  completedProjects.length}
              </h3>
              <p>Total projects</p>
            </div>

            <div
              className="createProjecticon"
              onClick={() => setOpenform(true)}
            >
              <AiOutlinePlus />
            </div>
          </div>
        </div>

        <div className="project-list">
          {projects &&
            projects.map((project) => (
              <NavLink to={`/user/${id}/projects/${project._id}`}>
                {(project.status === filterProjects ||
                  filterProjects === "") && (
                  <div
                    className="p-project pro1"
                    style={{
                      backgroundColor:
                        project.priority === "Low"
                          ? "rgba(152, 230, 152, 0.7)" // Green with reduced opacity
                          : project.priority === "Medium"
                          ? "rgb(255, 247, 129)" // Orange with reduced opacity
                          : project.priority === "High"
                          ? "rgb(255, 123, 119)" // Red with reduced opacity
                          : "transparent",
                    }}
                  >
                    <div className="pro-head">
                      <p>{changeDate(project.startDate)}</p>
                      <p>{project.priority}</p>
                    </div>
                    <div className="pro-title">
                      <h2>{project.title.slice(0, 20)}</h2>
                    </div>

                    <div className="progress">
                      <p>Progress</p>
                      <div className="upperProgressBar">
                        <div
                          className="innerProgressBar"
                          style={{
                            width: `${project.completionPercentage}%`,
                            backgroundColor:
                              project.priority === "High"
                                ? "yellow"
                                : "#67b2f8",
                          }}
                        ></div>
                      </div>
                      <p className="percent">{project.completionPercentage}%</p>
                    </div>

                    <div className="footer-detail">
                      <div className="members">
                        <div className="m1"></div>
                        <div className="m2"></div>
                        <div className="m2">
                          <AiOutlinePlus />
                        </div>
                      </div>

                      <div
                        className="deadline"
                        style={{
                          backgroundColor:
                            project.priority === "High" ? "#c3f16d" : "#67b2f8",
                        }}
                      >
                        <p>
                          {howMuchDaysLeft(project.startDate, project.dueDate)}{" "}
                          days left
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </NavLink>
            ))}
        </div>
      </div>

      <div className="mes-not">
        <div className="notifications">
          <p>notification</p>
          <div className="notification-list">
            <div className="notify">
              <div className="logo">
                <IoMdNotificationsOutline />
              </div>
              <div className="message">
                <p>Task completed request</p>
                <p>2:43 AM may 12, 2023</p>
              </div>
            </div>
            <div className="notify">
              <div className="logo">
                <IoMdNotificationsOutline />
              </div>
              <div className="message">
                <p>Task completed request and progress</p>
                <p>2:43 AM may 12, 2023</p>
              </div>
            </div>
            <div className="notify">
              <div className="logo">
                <IoMdNotificationsOutline />
              </div>
              <div className="message">
                <p>Task completed request</p>
                <p>2:43 AM may 12, 2023</p>
              </div>
            </div>
            <div className="notify">
              <div className="logo">
                <IoMdNotificationsOutline />
              </div>
              <div className="message">
                <p>Task completed request and progress</p>
                <p>2:43 AM may 12, 2023</p>
              </div>
            </div>
            <div className="notify">
              <div className="logo">
                <IoMdNotificationsOutline />
              </div>
              <div className="message">
                <p>Task completed request</p>
                <p>2:43 AM may 12, 2023</p>
              </div>
            </div>
            <div className="notify">
              <div className="logo">
                <IoMdNotificationsOutline />
              </div>
              <div className="message">
                <p>Task completed request and progress</p>
                <p>2:43 AM may 12, 2023</p>
              </div>
            </div>
            <div className="notify">
              <div className="logo">
                <IoMdNotificationsOutline />
              </div>
              <div className="message">
                <p>Task completed request</p>
                <p>2:43 AM may 12, 2023</p>
              </div>
            </div>
            <div className="notify">
              <div className="logo">
                <IoMdNotificationsOutline />
              </div>
              <div className="message">
                <p>Task completed request</p>
                <p>2:43 AM may 12, 2023</p>
              </div>
            </div>
            <div className="notify">
              <div className="logo">
                <IoMdNotificationsOutline />
              </div>
              <div className="message">
                <p>Task completed request</p>
                <p>2:43 AM may 12, 2023</p>
              </div>
            </div>
            <div className="notify">
              <div className="logo">
                <IoMdNotificationsOutline />
              </div>
              <div className="message">
                <p>Task completed request</p>
                <p>2:43 AM may 12, 2023</p>
              </div>
            </div>
            <div className="notify">
              <div className="logo">
                <IoMdNotificationsOutline />
              </div>
              <div className="message">
                <p>Task completed request</p>
                <p>2:43 AM may 12, 2023</p>
              </div>
            </div>
            <div className="notify">
              <div className="logo">
                <IoMdNotificationsOutline />
              </div>
              <div className="message">
                <p>Task completed request</p>
                <p>2:43 AM may 12, 2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
