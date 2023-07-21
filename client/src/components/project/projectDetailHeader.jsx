import react, { useState, useEffect } from "react";
import { changeDate, howMuchDaysLeft } from "../../functions.js";
import { AiFillEdit } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { NavLink, useParams } from "react-router-dom";
import ProjectUpdateForm from "../updateForms/ProjectUpdateForm";
import ReportForm from './projectReport'

const ProjectDetailHeader = ({
  project,
  setOverviewPage,
  setTaskPage,
  setMembersPage,
  setCollaburationPage,
}) => {
  const [activeLink, setActiveLink] = useState("Overview");
  const [updateProjct, setUpdateProjct] = useState(false);
  const [openReportPage, setOpenReportPage] = useState(true);
  const { id, projectId } = useParams();

  return (
    <div className="projectInfo">
      <div className="pro-title">
        <div>
          <NavLink to={`/user/${id}`}>
            <BiArrowBack />
          </NavLink>
          <div className="title">
            <h1>{project.title}</h1>
            <p>
              Lead By:{" "}
              <span className="projectManagerName">
                {project.projectManager
                  ? project.projectManager.name
                  : "please assign a project manager"}
              </span>
            </p>
          </div>
          <div className="deadline">
            <h5>Start-Date:</h5>
            <p>{changeDate(project.startDate)}</p>
            <h5>Due-Date:</h5>
            <p>{changeDate(project.dueDate)}</p>
            <span>
              {howMuchDaysLeft(Date.now(), project.dueDate)} days left
            </span>
          </div>
          <div className="editProject">
            <AiFillEdit onClick={() => setUpdateProjct(true)} />
            {updateProjct && (
              <ProjectUpdateForm
                setUpdateProjct={setUpdateProjct}
                project={project}
              />
            )}
          </div>
          {project.status === "Completed" && openReportPage && (
            <ReportForm
              setOpenReportPage={setOpenReportPage}
              project={project}
            />
          )}
        </div>
        <div className="pro-description_navigation">
          <p>{project.description}</p>
          <div className="project-navbar">
            <li
              onClick={() => {
                setOverviewPage(true);
                setTaskPage(false);
                setMembersPage(false);
                setCollaburationPage(false);
                setActiveLink("Overview");
              }}
              className={activeLink === "Overview" ? "active" : "not-active"}
            >
              Overview
            </li>
            <li
              onClick={() => {
                setOverviewPage(false);
                setTaskPage(true);
                setMembersPage(false);
                setCollaburationPage(false);
                setActiveLink("Tasks");
              }}
              className={activeLink === "Tasks" ? "active" : "not-active"}
            >
              Tasks: ({project.tasks && project.tasks.length})
            </li>
            <li
              onClick={() => {
                setOverviewPage(false);
                setTaskPage(false);
                setMembersPage(true);
                setCollaburationPage(false);
                setActiveLink("Members");
              }}
              className={activeLink === "Members" ? "active" : "not-active"}
            >
              Team Members: ({project.team && project.team.length})
            </li>
            <li
              onClick={() => {
                setOverviewPage(false);
                setTaskPage(false);
                setMembersPage(false);
                setCollaburationPage(true);
                setActiveLink("Collaburate");
              }}
              className={activeLink === "Collaburate" ? "active" : "not-active"}
            >
              Collaburate
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailHeader;
