import React, { useState, useEffect } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { useParams } from "react-router-dom";
import axios from "axios";
import Error from "../ShowError/error";
import Loading from '../Loading/Loading'

export default function CreateTask({ setCreateTask,project }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState(null);
  const [createdBy, setCreatedBy] = useState(null);

  const { id, projectId } = useParams();

  const handleCreateTask = async (e) => {
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
        const taskData = {
          title,
          description,
          priority,
          dueDate,
          assignedTo,
          createdBy: id,
          project: projectId,
        };

        const responce = await axios.post(
          `http://localhost:5000/user/${id}/projects/${projectId}/createTask`,
          taskData
        );
      } catch (error) {
        console.log(error);
      }

      setTitle("");
      setDescription('');
      setPriority('');
      setDueDate('');
      setCreateTask(false);
    }
  };

  return (
    <div id="createTaskBox">
      <div id="taskform">
        <AiOutlineClose
          onClick={() => setCreateTask(false)}
          className="close-icon"
        />
        <h1>Create Task</h1>
        <div>
          <form onSubmit={handleCreateTask}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              name=""
              id=""
              value={description}
              cols="30"
              rows="4"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <div className="setpriority">
              <p>set priority</p>
              <div>
                <li
                  onClick={() => setPriority("Low")}
                  style={{
                    color: priority === "Low" ? "Black" : "",
                  }}
                >
                  <BsFillCheckCircleFill />
                  Low
                </li>
                <li
                  onClick={() => setPriority("Medium")}
                  style={{
                    color: priority === "Medium" ? "Black" : "",
                  }}
                >
                  <BsFillCheckCircleFill />
                  Medium
                </li>
                <li
                  onClick={() => setPriority("High")}
                  style={{
                    color: priority === "High" ? "Black" : "",
                  }}
                >
                  <BsFillCheckCircleFill />
                  High
                </li>
              </div>
            </div>
            <div className="assignmember">
              <p>Assign to: {assignedTo}</p>
              <div className="team-members">
                {!project.team && <Loading />}
                {project.team.map((member) => (
                  <div onClick={() => setAssignedTo(member._id)}>
                    <p>{member.name}</p>
                    <p>{member.position}</p>
                  </div>
                ))}
              </div>
            </div>
            <button type="submit">create</button>
          </form>
        </div>
      </div>
    </div>
  );
}