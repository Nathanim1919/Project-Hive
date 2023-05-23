import React, { useState } from "react";
import axios from "axios";
import "../../styles/createProject.css";

const ProjectForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const projectData = {
        name,
        description,
        startDate,
        dueDate,
        priority,
      };

      // Send the project data to the server
      const response = await axios.post("/projects", projectData);

      // Handle the response and perform any necessary actions
      console.log("Project created successfully:", response.data);

      // Reset the form after successful project creation
      setName("");
      setDescription("");
      setStartDate("");
      setDueDate("");
      setPriority("");
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div className="createProject">
      <form onSubmit={handleSubmit}>
        <h1>create New Project</h1>
        <input
          placeholder="Title of the project"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <textarea
          id="description"
          rows={4}
          placeholder="Write a detailed Introduction of this Project...."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div>
            <p className="priorityHead">set priority</p>
        <div className="priority">
          <div className="low">
            <p>Low</p>
          </div>
          <div className="medium">
            <p>Medium</p>
          </div>
          <div className="high">
            <p>High</p>
          </div>
        </div>
        </div>
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default ProjectForm;
