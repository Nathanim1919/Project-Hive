import React, { useState } from "react";
import axios from "axios";
import '../../styles/createEvent.css'

const CreateEventPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const eventData = {
        title,
        description,
        startDate,
        endDate,
        location,
      };

      // Send the event data to the server
      const response = await axios.post("/events", eventData);

      // Handle the response and perform any necessary actions
      console.log("Event created successfully:", response.data);

      // Reset the form after successful event creation
      setTitle("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setLocation("");
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="createEvent">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Event Title"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />


        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="time"
          id="startTime"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <input
          placeholder="Where"
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <textarea
        placeholder="About The Event"
           rows={3}
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEventPage;
