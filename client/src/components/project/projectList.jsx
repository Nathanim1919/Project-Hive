import React from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { changeDate, howMuchDaysLeft } from "../../functions.js";
import { AiOutlineCheck, AiOutlinePause, AiOutlineClose } from "react-icons/ai";
import Loading from "../Loading/Loading";

export default function ProjectList({ projects, filterProjects }) {
  const { id } = useParams();

  if (!projects) {
    return <Loading />;
  } else {
    return (
      <div className="project-list">
        {projects &&
          projects.map((project) => (
            <NavLink to={`/user/${id}/projects/${project._id}`}>
              {(project.status === filterProjects || filterProjects === "") && (
                <div
                  className={
                    project.status === "On Hold"
                      ? "p-project pro1 onHold"
                      : project.status === "Cancelled"
                      ? "p-project pro1 cancelled"
                      : project.status === "Completed"
                      ? "p-project pro1 Completed"
                      : "p-project pro1"
                  }
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
                  <div className="pro-status-show">
                    <span>
                      {project.status === "On Hold" ? (
                        <p>
                          <AiOutlinePause className="icon" />
                          <p>On Hold</p>
                        </p>
                      ) : project.status === "Cancelled" ? (
                        <p>
                          <AiOutlineClose className="icon" />
                          <p>Cancelled</p>
                        </p>
                      ) : project.status === "Completed" ? (
                        <p>
                          <AiOutlineCheck className="icon" />
                          <p>Completed</p>
                        </p>
                      ) : project.status === "In Progress" ? (
                        <p>
                          <p>{project.progress}%</p>
                          <p>In progress</p>
                        </p>
                      ) : (
                        <p>
                          <p>{project.progress}%</p>
                          <p>Planning</p>
                        </p>
                      )}
                    </span>
                  </div>
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
                          width: `${project.progress}%`,
                          backgroundColor:
                            project.priority === "High" ? "yellow" : "#67b2f8",
                        }}
                      ></div>
                    </div>
                    <p className="percent">{project.progress}%</p>
                  </div>

                  <div className="footer-detail">
                    <div className="members">
                      {project.projectManager && (
                        <div className="m1">
                          <img src={project.projectManager.profile} alt="" />
                        </div>
                      )}
                      {project.team.length >= 2 && (
                        <div className="m2">
                          {<span>{project.team.length}+</span>}
                        </div>
                      )}
                      {/* <div className="add-icon">
                          <AiOutlinePlus />
                        </div> */}
                    </div>

                    <div
                      className="deadline"
                      style={{
                        backgroundColor:
                          project.priority === "High" ? "#c3f16d" : "#67b2f8",
                      }}
                    >
                      <p>
                        {howMuchDaysLeft(Date.now(), project.dueDate)} days left
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </NavLink>
          ))}
      </div>
    );
  }
}
