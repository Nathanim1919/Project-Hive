import React, { useState, useEffect } from "react";
import { BsListTask } from "react-icons/bs";
import {
  AiOutlineCheckCircle,
  AiFillPlusCircle,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import {GiProgression} from 'react-icons/gi'
import { FcPlanner } from "react-icons/fc";

import { NavLink } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import TaskInfo from "./TaskInfo.jsx";
import TaskProgress from "./taskProgress";
import '../../styles/task/taskList.css'

export default function TaskList({ createTask, setCreateTask }) {
  const [tasks, setTasks] = useState([]);
  const { id, projectId } = useParams();
  const [selectedTask, setSelectedTask] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isupdated, setIsupdated] = useState(false);

  // task edit tools
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/${id}/projects/${projectId}/getTasks`
        );
        setTasks(response.data.tasks);
        console.log(tasks)
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getTasks();
  }, [createTask, projectId, isupdated, selectedTask]);

  const findSingleTask = (id) => {
    const task = tasks.find((item) => item._id === id);
    setSelectedTask(task);
    setIsExpanded(true);
  };

  return (
    <section>
      {loading && <Loading />}
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
                    <p>{task.title.slice(0, 13)}</p>
                  </div>
                  <div>
                    <TaskProgress project={task} />
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
                      {task.status === "Inprogress" && <GiProgression />}
                      {task.status === "Completed" && <AiOutlineCheckCircle />}
                      {task.status === "Planning" && <FcPlanner />}
                    </div>
                    <p>{task.status}</p>
                    <div className="members-list" id="members">
                      <div>
                        <img
                          src={task.assignedTo ? task.assignedTo.profile : ""}
                          alt=""
                        />
                      </div>
                      <AiFillPlusCircle className="add" />
                    </div>
                  </div>
                </div>
              </NavLink>
            ))}
        </div>
        <TaskInfo
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          setIsupdated={setIsupdated}
          setIsExpanded={setIsExpanded}
          tasks={tasks}
        />
      </div>
    </section>
  );
}
