import React from "react"
import {BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

export default function CreateTask({setCreateTask}) {

  return (
    <div id="createTaskBox">
      <div id="taskform">
        <AiOutlineClose
          onClick={() => setCreateTask(false)}
          className="close-icon"
        />
        <h1>Create Task</h1>
        <div>
          <form>
            <input type="text" placeholder="Title" />
            <textarea
              name=""
              id=""
              cols="30"
              rows="4"
              placeholder="Description"
            ></textarea>
            <input type="date" />
            <div className="setpriority">
              <p>set priority</p>
              <div>
                <li>
                  <BsFillCheckCircleFill />
                  Low
                </li>
                <li>
                  <BsFillCheckCircleFill />
                  Medium
                </li>
                <li>
                  <BsFillCheckCircleFill />
                  High
                </li>
              </div>
            </div>
            <div className="assignmember">
              <p>Assign to member</p>
              <div>
                        members
                      </div>
            </div>
            <button type="submit">create</button>
          </form>
        </div>
      </div>
    </div>
  );
}
