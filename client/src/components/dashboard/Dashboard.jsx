import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Dashboarddata({ projects }) {
  // get the current month name with the year
  const currentDate = new Date();
  const options = { month: "long", year: "numeric" };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  const { id } = useParams();

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
    <div className="userdatas">
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

            <div className="createProjecticon">
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

                    <div className="deadline">
                      <p>
                        {howMuchDaysLeft(project.startDate, project.dueDate)}{" "}
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
  );
}