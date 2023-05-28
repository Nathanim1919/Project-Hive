import React from "react";
import { BsListTask } from "react-icons/bs";
import {
  AiOutlineCheckCircle,
  AiFillPlusCircle,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { NavLink} from "react-router-dom";
export default function TaskList({setCreateTask}) {
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
      <div className="tasklist">
        <NavLink>
          <div className="task t1">
            <div>
              <BsListTask />
              <p>create the company logo in three different style</p>
            </div>
            <div>
              <p id="priority">high</p>
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
      </div>
    </section>
  );
}
