import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import "../../styles/projectDetail.css";
import TaskList from "../task/TaskList";
import CreateTask from "../task/TaskForm";
import TeamMembers from "../teamMembers/TeamMembers";
import Progress from "../progress/progress";
const ProjectDetailPage = () => {
  const { id, projectId } = useParams();

  const [project, setProject] = useState(null);
  const [overviewPage, setOverviewPage] = useState(true);
  const [taskPage, setTaskPage] = useState(false);
  const [membersPage, setMembersPage] = useState(false);
  const [collaburationPage, setCollaburationPage] = useState(false);
  const [createTask, setCreateTask] = useState(false);
  const [activeLink, setActiveLink] = useState("Overview");

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/${id}/projects/${projectId}`
        );
        setProject(response.data.project); // Assuming the response data contains a 'project' property
        console.log(response.data.project);
      } catch (error) {
        console.log(error);
      }
    };
    getProject();
  }, [id, projectId]); // Include 'projectId' as a dependency

  if (!project) {
    return <div>Loading... {projectId}</div>;
  }

  return (
    <section className="projectDetailSection">
      {createTask && <CreateTask setCreateTask={setCreateTask} />}
      <div className="projectInfo">
        <div className="pro-title">
          <NavLink to={`/user/${id}`}>
            <BiArrowBack />
          </NavLink>
          <div className="title">
            <h1>Web Designing</h1>
            <p>project manager: Nathanim Tadele</p>
          </div>
          <div className="deadline">
            <p>deadline:</p>
            <p>june 3, 2023</p>
            <span>6 days left</span>
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
            Tasks
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
            Team Members
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
            <h1>23</h1>
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
            <h1>$456</h1>
          </div>
          <div className="internal-cost">
            <div>
              <p>Internal cost</p>
              <h1>$132</h1>
            </div>
            <div className="circle-progress">
              <Progress animates={1000} total={200} progress={100} />
            </div>
          </div>
          <div className="Budget-Left">
            <div>
              <p>Budget Left</p>
              <h1>$132</h1>
            </div>
            <div>
              <Progress animates={200} total={200} progress={60} />
            </div>
          </div>
        </div>
      )}
      {taskPage && (
        <TaskList createTask={createTask} setCreateTask={setCreateTask} />
      )}
      {membersPage && <TeamMembers />}
      {collaburationPage && (
        <section>
          <h1>chatting page</h1>
        </section>
      )}
    </section>
  );
};

export default ProjectDetailPage;
