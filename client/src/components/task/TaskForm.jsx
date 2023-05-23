import React, { useState } from "react";
import axios from "axios";

const CreateTaskPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const taskData = {
        title,
        description,
        priority,
        dueDate,
        assignedTo,
      };

      // Send the task data to the server
      const response = await axios.post("/tasks", taskData);

      // Handle the response and perform any necessary actions
      console.log("Task created successfully:", response.data);

      // Reset the form after successful task creation
      setTitle("");
      setDescription("");
      setPriority("");
      setDueDate("");
      setAssignedTo("");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label htmlFor="priority">Priority:</label>
      <select
        id="priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="">Select Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <label htmlFor="dueDate">Due Date:</label>
      <input
        type="date"
        id="dueDate"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <label htmlFor="assignedTo">Assigned To:</label>
      <input
        type="text"
        id="assignedTo"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
      />

      <button type="submit">Create Task</button>
    </form>
  );
};

export default CreateTaskPage;
