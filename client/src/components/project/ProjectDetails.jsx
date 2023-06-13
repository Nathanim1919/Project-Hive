import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import "../../styles/projectDetail.css";
import TaskList from "../task/TaskList";
import CreateTask from "../task/TaskForm";
import TeamMembers from "../teamMembers/TeamMembers";
import { changeDate, howMuchDaysLeft } from "../../functions.js";
import { AiFillEdit } from "react-icons/ai";
import Loading from "../Loading/Loading";
import ProjectUpdateForm from "../updateForms/ProjectUpdateForm";
import Overview from "../projectDetails/Overview";
import DiscussionBoard from "../collaboration/DiscussionBoard";

const ProjectDetailPage = () => {
  const { id, projectId } = useParams();

  const [project, setProject] = useState(null);
  const [overviewPage, setOverviewPage] = useState(true);
  const [taskPage, setTaskPage] = useState(false);
  const [membersPage, setMembersPage] = useState(false);
  const [collaburationPage, setCollaburationPage] = useState(false);
  const [createTask, setCreateTask] = useState(false);
  const [activeLink, setActiveLink] = useState("Overview");
  const [updateProjct, setUpdateProjct] = useState(false);

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/${id}/projects/${projectId}`
        );
        setProject(response.data.project); // Assuming the response data contains a 'project' property
      } catch (error) {
        console.log(error);
      }
    };
    getProject();
  }, [project]); // Include 'projectId' as a dependency

  if (!project) {
    return <Loading />;
  }

  return (
    <section className="projectDetailSection">
      {createTask && (
        <CreateTask project={project} setCreateTask={setCreateTask} />
      )}
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
                className={
                  activeLink === "Collaburate" ? "active" : "not-active"
                }
              >
                Collaburate
              </li>
            </div>
          </div>
        </div>
      </div>
      {overviewPage && <Overview project={project} />}
      {taskPage && (
        <TaskList createTask={createTask} setCreateTask={setCreateTask} />
      )}
      {membersPage && (
        <TeamMembers project={project} />
      )}
      {collaburationPage && <DiscussionBoard />}
    </section>
  );
};
export default ProjectDetailPage;