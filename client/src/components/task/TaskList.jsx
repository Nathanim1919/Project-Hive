import React, { useState, useEffect } from "react";
import { BsListTask } from "react-icons/bs";
import {
  AiOutlineCheckCircle,
  AiFillPlusCircle,
  AiOutlineUnorderedList,
  AiOutlineClose,
  AiOutlineEdit,
} from "react-icons/ai";
import {MdOutlineDoneOutline} from 'react-icons/md'
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

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
        <h1>Tasks</h1>
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
              <NavLink key={task._id} onClick={() => findSingleTask(task._id)}>
                <div className="task t1">
                  <div>
                    <BsListTask />
                    <p>{task.title}</p>
                  </div>
                  <div>
                    <p id="priority">{task.priority}</p>
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
            <div className="close-icon" onClick={closeTask}>
              <AiOutlineClose />
            </div>
            <div className="titledec">
              {!editTitle && (
                <div>
                  <h2>{selectedTask.title}</h2>
                  <AiOutlineEdit
                    className="edit"
                    onClick={() => {setEditTitle(true);setEditdescription(false);}}
                  />
                </div>
              )}
              {editTitle && (
                <div>
                  <input type="text" placeholder="edit task title" />
                  <MdOutlineDoneOutline
                    className="done"
                    onClick={() => setEditTitle(false)}
                  />
                </div>
              )}
              {!editdescription && (
                <div className="description">
                  <p>{selectedTask.description}</p>
                  <AiOutlineEdit
                    className="edit"
                    onClick={() =>{ setEditdescription(true);setEditTitle(false);}}
                  />
                </div>
              )}

              {editdescription && (
                <div>
                  <textarea placeholder="Edit Task description.." name="" id="" cols="40" rows="1"></textarea>
                  <MdOutlineDoneOutline
                    className="done"
                    onClick={() => setEditdescription(false)}
                  />
                </div>
              )}
            </div>
            <p>Priority: High</p>
            <p>Progress: 78%</p>
          </div>
        )}
      </div>
    </section>
  );
}
