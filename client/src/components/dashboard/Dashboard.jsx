import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useParams } from "react-router-dom";
import ProjectForm from "../project/ProjectForm";
import axios from "axios";
import Error from "../ShowError/error";
import ProjectList from "../project/projectList";
import Notification from "../notification/Notification";
import { getCurrentDateFormat } from "../../functions.js";
import Loading from '../Loading/Loading'

export default function Dashboarddata() {
  const [openForm, setOpenform] = useState(false);
  const [projects, setProjects] = useState([]);
  const [filterProjects, setFilterProjects] = useState("");

  // get the current month name with the year

  const [errorMessage, setErrorMessage] = useState("");

  const { id } = useParams();

  // PROJECT STATUS COUNT
  const upCommingProjects = projects.filter(
    (project) => project.status === "Planning"
  );
  const inprogressProjects = projects.filter(
    (project) => project.status === "In Progress"
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

useEffect(() => {
  const getProjects = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/user/${id}/projects`
      );
      setProjects(response.data.projects);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Unable to fetch projects, please try again later.");
    }
  };

  getProjects();
}, [id, openForm]);


  return (
    <div className="userdatas">
      {errorMessage != "" && (
        <Error message={errorMessage} setErrorMessage={setErrorMessage} />
      )}
      {openForm && <ProjectForm setOpenform={setOpenform} />}
      <div className="projects">
        <div className="pro-header">
          <div className="current-year">
            <h3>Projects</h3>
            <h4>{getCurrentDateFormat()}</h4>
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
        {projects?<ProjectList filterProjects={filterProjects} projects={projects}/>:<Loading/>}
      </div>
      <Notification />
    </div>
  );
}
