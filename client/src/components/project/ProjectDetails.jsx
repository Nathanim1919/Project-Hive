import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import "../../styles/projectDetail.css";
import TaskList from "../task/TaskList";
import CreateTask from "../task/TaskForm";
import TeamMembers from "../teamMembers/TeamMembers";
import Progress from "../progress/progress";
import { changeDate, howMuchDaysLeft } from "../../functions.js";
import { AiFillEdit } from "react-icons/ai";
import Loading from "../Loading/Loading";
import ProjectUpdateForm from "../updateForms/ProjectUpdateForm";

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
  const [user, setUser] = useState({});

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/${id}/projects/${projectId}`
        );
        setProject(response.data.project); // Assuming the response data contains a 'project' property
        console.log(project);
      } catch (error) {
        console.log(error);
      }
    };
    getProject();
  }, [id, projectId, updateProjct]); // Include 'projectId' as a dependency

  if (!project) {
    return <Loading />;
  }

  return (
    <section className="projectDetailSection">
      {createTask && <CreateTask setCreateTask={setCreateTask} />}
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
          <div>
            <p>{project.description}</p>
          </div>
        </div>

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
      {overviewPage && (
        <div className="project-progress">
          <div className="tasks">
            <h1>{project.tasks.length}</h1>
            <p>Total tasks</p>
          </div>
          <div className="started">
            <h1>13</h1>
            <p>Not started</p>
          </div>
          <div className="inprogress">
            <h1>7</h1>
            <p>In progress</p>
          </div>
          <div className="completed">
            <h1>3</h1>
            <p>Completed</p>
          </div>

          <div className="overallProgress">
            <Progress animates={1000} total={200} progress={100} />
            <p>overall progress</p>
          </div>
        </div>
      )}
      {overviewPage && (
        <div className="project-budget">
          <div className="total-budget">
            <p>Total Budget</p>
            <h1>{project.budget} BIrr</h1>
          </div>
          <div className="internal-cost">
            <div>
              <p>Internal cost</p>
              <h1>{project.internalCost} Birr</h1>
            </div>
            <div className="circle-progress">
              <Progress
                animates={1000}
                total={project.budget}
                progress={project.internalCost}
              />
            </div>
          </div>
          <div className="Budget-Left">
            <div>
              <p>Budget Left</p>
              <h1>{project.budgetLeft} Birr</h1>
            </div>
            <div>
              <Progress
                animates={1000}
                total={project.budget}
                progress={project.budgetLeft}
              />
            </div>
          </div>
        </div>
      )}
      {taskPage && (
        <TaskList createTask={createTask} setCreateTask={setCreateTask} />
      )}
      {membersPage && <TeamMembers project={project} />}
      {collaburationPage && (
        <section>
          <h1>chatting page</h1>
        </section>
      )}
    </section>
  );
};

export default ProjectDetailPage;
