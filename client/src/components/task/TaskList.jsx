import React, { useState, useEffect } from "react";
import { BsListTask } from "react-icons/bs";
import {
  AiOutlineCheckCircle,
  AiFillPlusCircle,
  AiOutlineUnorderedList,
  AiOutlineClose,
  AiOutlineEdit,
} from "react-icons/ai";
import { MdOutlineDoneOutline } from "react-icons/md";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { changeDate, howMuchDaysLeft } from "../../functions.js";

export default function TaskList({ createTask, setCreateTask }) {
  const [tasks, setTasks] = useState([]);
  const { id, projectId } = useParams();
  const [selectedTask, setSelectedTask] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // task edit tools
  const [editTitle, setEditTitle] = useState(false);
  const [editdescription, setEditdescription] = useState(false);
  const [editpriority, setEditpriority] = useState(false);
  const [editstatus, setEditstatus] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/${id}/projects/${projectId}/getTasks`
        );
        setTasks(response.data.tasks);
      } catch (error) {
        console.log(error);
      }
    };
    getTasks();
  }, [createTask, projectId]);

  const findSingleTask = (id) => {
    const task = tasks.find((item) => item._id === id);
    setSelectedTask(task);
    setIsExpanded(true);
  };

  const closeTask = () => {
    setSelectedTask(null);
    setIsExpanded(false);
  };

  return (
    <section>
      <div className="task-list-header">
        <h1></h1>
        <div>
          <button>
            <AiOutlineUnorderedList />
            Filter Tasks
          </button>
          <button onClick={() => setCreateTask(true)}>
            <AiFillPlusCircle className="add" />
            Add new task
          </button>
        </div>
      </div>

      <div
        className={`task-container ${isExpanded ? "expanded" : "collapsed"}`}
      >
        <div className="tasklist">
          {tasks &&
            tasks.map((task) => (
              <NavLink
                key={task._id}
                onClick={() => findSingleTask(task._id)}
                className={
                  selectedTask && task._id === selectedTask._id
                    ? "selectedTask"
                    : ""
                }
              >
                <div className="task t1">
                  <div>
                    <BsListTask
                      className={
                        selectedTask && task._id === selectedTask._id
                          ? "taskSelected"
                          : ""
                      }
                    />
                    <p>{task.title}</p>
                  </div>
                  <div>
                    <p
                      className={
                        task.priority === "Low"
                          ? "priority green"
                          : task.priority === "Medium"
                          ? "priority orange"
                          : task.priority === "High"
                          ? "priority red"
                          : ""
                      }
                    >
                      {task.priority}
                    </p>
                    <div id="progress">
                      <AiOutlineCheckCircle />
                      <p>80%</p>
                    </div>
                    <p>In progress</p>
                    <div className="members-list" id="members">
                      <div></div>
                      <p>2+</p>
                      <AiFillPlusCircle className="add" />
                    </div>
                  </div>
                </div>
              </NavLink>
            ))}
        </div>

        {selectedTask && (
          <div id="taskinformation">
            <div className="info-header">
              <div>
                <p>{howMuchDaysLeft(selectedTask.dueDate)} days left</p>
              </div>
              <div className="close-icon" onClick={closeTask}>
                <AiOutlineClose />
              </div>
            </div>
            <div className="titledec">
              {!editTitle && (
                <div>
                  <h2>{selectedTask.title}</h2>
                  <AiOutlineEdit
                    className="edit-icon"
                    onClick={() => {
                      setEditTitle(true);
                      setEditdescription(false);
                    }}
                  />
                </div>
              )}
              {editTitle && (
                <div>
                  <input type="text" placeholder="edit task title" />
                  <MdOutlineDoneOutline
                    className="edit-icon done"
                    onClick={() => setEditTitle(false)}
                  />
                </div>
              )}
              {!editdescription && (
                <div className="description">
                  <p>{selectedTask.description}</p>
                  <AiOutlineEdit
                    className="edit-icon"
                    onClick={() => {
                      setEditdescription(true);
                      setEditTitle(false);
                    }}
                  />
                </div>
              )}

              {editdescription && (
                <div>
                  <textarea
                    placeholder="Edit Task description.."
                    name=""
                    id=""
                    cols="40"
                    rows="1"
                  ></textarea>
                  <MdOutlineDoneOutline
                    className="edit-icon done"
                    onClick={() => setEditdescription(false)}
                  />
                </div>
              )}
            </div>
            <div className="more-information">
              <p>
                Priority: <span>{selectedTask.priority}</span>{" "}
                <AiOutlineEdit className="edit-icon" />
              </p>
              <p>
                Progress: <span>{selectedTask.progress}%</span>{" "}
                <AiOutlineEdit className="edit-icon" />
              </p>
              <p>
                Assigned To:{" "}
                <span>
                  {selectedTask.assignedTo ? selectedTask.assignedTo : "Assign"}
                </span>{" "}
                <AiOutlineEdit className="edit-icon" />
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}