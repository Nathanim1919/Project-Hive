import React, { useState } from "react";
import "../../styles/updateForms/projectUpdateForm.css";
import {AiOutlineClose} from 'react-icons/ai';

export default function ProjectUpdateForm({setUpdateProjct}) {
  const [openManager, setOpenManager] = useState(false);
  const [statusBox, setStatusBox] = useState(false);
  const [priorityBox, setPriorityBox] = useState(false);
  const [progressBox, setProgressBox] = useState(false);

  return (
    <div className="editOptions">
      <div className="close-icns" onClick={() => setUpdateProjct(false)}>
        <AiOutlineClose />
      </div>
      <form>
        <div className="basicInfo">
          <div>
            <label htmlFor="title">Project Title</label>
            <input type="text" id="title" />
          </div>

          <div>
            <label htmlFor="dueDate">Project dueDate</label>
            <input type="Date" id="dueDate" />
          </div>
          <div>
            <label htmlFor="budget">Project budget</label>
            <input type="Number" id="budget" />
          </div>
        </div>

        <div>
          <label htmlFor="description">Project Description</label>
          <textarea name="description" id="" cols="28" rows="4"></textarea>
        </div>

        <div className="dropdowns">
          <div className="setProjectManager">
            <p
              onClick={() => {
                setOpenManager(true);
                setStatusBox(false);
                setPriorityBox(false);
                setProgressBox(false);
              }}
            >
              Set projectManager
            </p>
            {openManager && <ul className="projectManagers">managers</ul>}
          </div>
          <div className="projectStatus">
            <p
              onClick={() => {
                setOpenManager(false);
                setStatusBox(true);
                setPriorityBox(false);
                setProgressBox(false);
              }}
            >
              Update Status
            </p>
            {statusBox && (
              <ul>
                <li>Planning</li>
                <li>In Progress</li>
                <li>Completed</li>
                <li>On Hold</li>
                <li>Cancelled</li>
              </ul>
            )}
          </div>
          <div className="projectPriority">
            <p
              onClick={() => {
                setOpenManager(false);
                setStatusBox(false);
                setPriorityBox(true);
                setProgressBox(false);
              }}
            >
              Update Priority
            </p>
            {priorityBox && (
              <ul>
                <li>Low</li>
                <li>Medium</li>
                <li>High</li>
              </ul>
            )}
          </div>

          <div className="projectProgress">
            <p
              onClick={() => {
                setOpenManager(false);
                setStatusBox(false);
                setPriorityBox(false);
                setProgressBox(true);
              }}
            >
              Update Progress
            </p>
            {progressBox && (
              <ul>
                <li>30</li>
                <li>60</li>
                <li>90</li>
              </ul>
            )}
          </div>
        </div>
        <input type="submit" value="Update" />
      </form>
    </div>
  );
}
