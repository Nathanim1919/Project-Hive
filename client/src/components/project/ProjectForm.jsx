import React, { useState } from "react";
import axios from "axios";
import "../../styles/createProject.css";
import { useParams } from "react-router-dom";

const ProjectForm = ({ setOpenProjectForm }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");

  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the due date is less than the start date

    const start = new Date(); // Use current date/time as the start date
    const due = new Date(dueDate);

    const timeDiff = due.getTime() - start.getTime();
    const diffInDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (diffInDays < 0) {
      alert(
        "Due date cannot be earlier than the start date. Please reset the due date."
      );
      return;
    }


    try {
      const projectData = {
        title,
        description,
        startDate: new Date(),
        dueDate,
        priority,
      };

      // Send the project data to the server
      const response = await axios.post(
        `http://localhost:5000/user/${id}/projects/createProject`,
        projectData
      );

      // Handle the response and perform any necessary actions
      console.log("Project created successfully:", response.data);

      // Reset the form after successful project creation
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("");
      setOpenProjectForm(false);
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
            <div
              onClick={(e) => setPriority(e.target.textContent)}
              className="low"
            >
              Low
            </div>
            <div
              onClick={(e) => setPriority(e.target.textContent)}
              className="medium"
            >
              Medium
            </div>
            <div
              onClick={(e) => setPriority(e.target.textContent)}
              className="high"
            >
              High
            </div>
          </div>
        </div>
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default ProjectForm;
