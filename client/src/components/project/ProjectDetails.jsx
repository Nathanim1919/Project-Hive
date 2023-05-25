import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProjectDetailPage = () => {
  const { id,projectId } = useParams();
  console.log(projectId);
  const [project, setProject] = useState(null);

  useEffect(() => {
    // Fetch project details from the server
    axios
      .get(`http://localhost:5000/user/${id}/projects/${projectId}`)
      .then((response) => {
        setProject(response.data);
        console.log(project)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [projectId]);

  if (!project) {
    return <div>Loading... {projectId}</div>;
  }

  return (
    <div>
        hi
      {/* <h1>{project.title}</h1>
      <p>{project.description}</p>
      <p>Start Date: {project.startDate}</p>
      <p>End Date: {project.endDate}</p>
      <h2>Team Members</h2>
      <ul>
        {project.team.map((member) => (
          <li key={member.id}>
            {member.name} - {member.role}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default ProjectDetailPage;
