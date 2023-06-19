import React, { useState,useEffect } from "react";
import { MdOutlineDoneOutline } from "react-icons/md";
import { howMuchDaysLeft } from "../../functions.js";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import Error from "../ShowError/error";

export default function TaskInfo({
  selectedTask,
  setIsupdated,
  setSelectedTask,
  setIsExpanded,
  tasks
}) {
  const [editTitle, setEditTitle] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editPriority, setEditPriority] = useState(false);
  const { id, projectId } = useParams();

  const [title, setUpdatedTitle] = useState("");
  const [description, setUpdatedDescription] = useState("");

  let currentPriority = selectedTask && selectedTask.priority;
  let currentProgress = selectedTask && selectedTask.progress;

  const [priority, setPriority] = useState(currentPriority);
  const [progress, setProgress] = useState(currentProgress);

  const closeTask = () => {
    setSelectedTask(null);
    setIsExpanded(false);
  };

   useEffect(() => {
    
   }, [tasks]);

  

  const handleUpdate = async (key, value) => {
    const taskid = selectedTask._id;
    try {
      if (value == "") {
        <Error />;
        return;
      }
      const update = await axios.post(
        `http://localhost:5000/user/${id}/projects/${projectId}/tasks/${taskid}`,
        { [key]: value }
      );
      console.log(update);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="taskinformation">
      {!selectedTask && <Loading />}
      {selectedTask && (
        <>
          <div className="info-header">
            <div>
              <p>{howMuchDaysLeft(selectedTask.dueDate)} days left</p>
            </div>
            <div className="close-icon" onClick={closeTask}>
              <AiOutlineClose />
            </div>
          </div>
          <div className="titledec">
            {!editTitle ? (
              <div>
                <h2>{selectedTask.title}</h2>
                <AiOutlineEdit
                  className="edit-icon"
                  onClick={() => {
                    setEditTitle(true);
                    setEditDescription(false);
                    setIsupdated(true);
                  }}
                />
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  placeholder="edit task title"
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                  value={title}
                />
                <MdOutlineDoneOutline
                  className="edit-icon done"
                  onClick={() => {
                    handleUpdate("title", title);
                    setEditTitle(false);
                    setIsupdated(false);
                    closeTask();
                  }}
                />
              </div>
            )}
            {!editDescription ? (
              <div className="description">
                <p>{selectedTask.description}</p>
                <AiOutlineEdit
                  className="edit-icon"
                  onClick={() => {
                    setEditDescription(true);
                    setEditTitle(false);
                    setIsupdated(true);
                  }}
                />
              </div>
            ) : (
              <div>
                <textarea
                  placeholder="Edit Task description.."
                  value={description}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                  cols="40"
                  rows="1"
                ></textarea>
                <MdOutlineDoneOutline
                  className="edit-icon done"
                  onClick={() => {
                    setEditDescription(false);
                    handleUpdate("description", description);
                    setIsupdated(false);
                    closeTask();
                  }}
                />
              </div>
            )}
          </div>
          <div className="more-information">
            <div>
              <p>
                Priority: <span>{selectedTask.priority}</span>{" "}
                <MdOutlineDoneOutline
                  className="edit-icon"
                  onClick={() =>  {handleUpdate("priority", priority);closeTask();}}
                  
                />
              </p>
              <div>
                <p
                  onClick={() => {
                    setPriority("Low");
                     
                  }}
                  className={'Low' === selectedTask.priority?'selectedPriorty':'priority'}
                >
                  Low
                </p>
                <p
                  onClick={() => {
                    setPriority("Medium");
                    
                  }}
                   className={'Medium' === selectedTask.priority?'selectedPriorty':'priority'}
                >
                  Medium
                </p>
                <p
                  onClick={() => {
                    setPriority("High");
                    
                  }}
                   className={'High' === selectedTask.priority?'selectedPriorty':'priority'}
                >
                  High
                </p>
              </div>
            </div>

            <div>
              <p>
                Progress: <span>{selectedTask.progress}%</span>{" "}
                <MdOutlineDoneOutline onClick={()=>{handleUpdate("progress", progress);closeTask();}} className="edit-icon" />
              </p>
              <div>
                  <p className={
                    0 === selectedTask.progress
                      ? "selectedProgress"
                      : "progress"
                  } onClick={()=>{setProgress(0)}}>0%</p>
                  <p className={
                    10 === selectedTask.progress
                      ? "selectedProgress"
                      : "progress"
                  } onClick={()=>{setProgress(10)}}>10%</p>
                  <p className={
                    20 === selectedTask.progress
                      ? "selectedProgress"
                      : "progress"
                  } onClick={()=>{setProgress(20)}}>20%</p>
                  <p className={
                    30 === selectedTask.progress
                      ? "selectedProgress"
                      : "progress"
                  } onClick={()=>{setProgress(30)}}>30%</p>
                  <p className={
                    40 === selectedTask.progress
                      ? "selectedProgress"
                      : "progress"
                  } onClick={()=>{setProgress(40)}}>40%</p>
                  <p className={
                    50 === selectedTask.progress
                      ? "selectedProgress"
                      : "progress"
                  } onClick={()=>{setProgress(50)}}>50%</p>
                  <p className={
                    60 === selectedTask.progress
                      ? "selectedProgress"
                      : "progress"
                  } onClick={()=>{setProgress(60)}}>60%</p>
                  <p className={
                    70 === selectedTask.progress
                      ? "selectedProgress"
                      : "progress"
                  } onClick={()=>{setProgress(70)}}>70%</p>
                  <p className={
                    80 === selectedTask.progress
                      ? "selectedProgress"
                      : "progress"
                  } onClick={()=>{setProgress(80)}}>80%</p>
                  <p className={
                    90 === selectedTask.progress
                      ? "selectedProgress"
                      : "progress"
                  } onClick={()=>{setProgress(90)}}>90%</p>
                  <p className={
                    100 === selectedTask.progress
                      ? "selectedProgress"
                      : "progress"
                  } onClick={()=>{setProgress(100)}}>100%</p>
              </div>
            </div>
            <p>
              Assigned To:{" "}
              {selectedTask.assignedTo
                ? selectedTask.assignedTo.name
                : "Assign"}
              <span></span>
              <AiOutlineEdit className="edit-icon" />
            </p>
          </div>
        </>
      )}
    </div>
  );
}
