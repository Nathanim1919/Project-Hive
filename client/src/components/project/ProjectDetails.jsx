import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import "../../styles/projectDetail.css";

const ProjectDetailPage = () => {
  const { id, projectId } = useParams();
  const [project, setProject] = useState(null);

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
      <div className="projectInfo">
        <div className="pro-title">
          <NavLink to={`/user/${id}`}>
            <BiArrowBack />
          </NavLink>
          <h1>Web Designing</h1>
          <div className="deadline">
            <p>deadline:</p>
            <p>june 3, 2023</p>
            <span>6 days left</span>
          </div>
        </div>
      </div>

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
          <h1>90%</h1>
          <p>overall progress</p>
        </div>
      </div>
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
          <div className="circle-progress">45%</div>
        </div>
        <div className="Budget-Left">
          <div>
            <p>Budget Left</p>
            <h1>$132</h1>
          </div>
          <div>55%</div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetailPage;
