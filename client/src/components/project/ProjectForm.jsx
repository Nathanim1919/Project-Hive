import React, { useState } from "react";
import axios from "axios";
import "../../styles/createProject.css";
import { useParams } from "react-router-dom";
import Error from "../ShowError/error";
import { BsCheck2Square } from "react-icons/bs";
import { BiCheckbox } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

const ProjectForm = ({ setOpenform }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [budget, setBudget] = useState(0);
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
      <Error
        message={
          "Due date cannot be earlier than the start date. Please reset the due date."
        }
      />;
    } else {
      try {
        const projectData = {
          title,
          description,
          startDate: new Date(),
          dueDate,
          budget,
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
        setBudget("");
        setOpenform(false);
      } catch (error) {
        console.error("Error creating project:", error);
      }
    }
  };

  return (
    <div className="createProject">
      <div className="closeBtnicon" onClick={() => setOpenform(false)}>
        <AiOutlineClose />
      </div>
      <h1>create New Project</h1>
      <form onSubmit={handleSubmit}>
        <div className="upperForms">
          <div>
            <label htmlFor="name">project Title</label>
            <input
              placeholder="Project title"
              type="text"
              id="name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="dueDate">Project Due Date</label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="budget">Project Budget</label>
            <input
              type="number"
              id="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>
        </div>
        <div className="description">
          <label htmlFor="description">Project Description</label>
          <textarea
            id="description"
            rows={8}
            placeholder="Description Of the Project"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="moreinfo">
          <label className="priorityHead">set priority</label>
          <div className="priority">
            <div
              onClick={(e) => setPriority(e.target.textContent)}
              className="low"
            >
              {priority === "Low" ? <BsCheck2Square /> : <BiCheckbox />}
              Low
            </div>
            <div
              onClick={(e) => setPriority(e.target.textContent)}
              className="medium"
            >
              {priority === "Medium" ? <BsCheck2Square /> : <BiCheckbox />}
              Medium
            </div>
            <div
              onClick={(e) => setPriority(e.target.textContent)}
              className="high"
            >
              {priority === "High" ? <BsCheck2Square /> : <BiCheckbox />}
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
