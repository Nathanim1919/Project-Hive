import React, { useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { AiFillCheckCircle, AiOutlinePlus } from "react-icons/ai";
import "../../styles/member.css";
import MiniProgress from "../progress/miniProgress";
import axios from "axios";
import { GrFormClose } from "react-icons/gr";
import { useParams } from "react-router-dom";

export default function TeamMembers() {
  const [employees, setEmployees] = useState([]);
  const [openUsersBox, setOpenusersBox] = useState(false);
  const { id, projectId } = useParams();
  const [project, setProject] = useState({});

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/${id}/projects/${projectId}`
        );
        setProject(response.data.project); // Assuming the response data contains a 'project' property
      } catch (error) {
        console.log(error);
      }
    };
    getProject();
  }, [id, projectId, openUsersBox]); // Include 'projectId' as a dependency

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await axios.get("http://localhost:5000/user");
        setEmployees(users.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const addUser = async (userId) => {
    try {
      const add = await axios.post(
        `http://localhost:5000/user/${id}/projects/${projectId}/addEmployee`,
        { userId }
      );
      console.log(add);
      setOpenusersBox(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="teammembers">
      <div className="add-icon" onClick={() => setOpenusersBox(true)}>
        <AiOutlinePlus />
      </div>

      {openUsersBox && (
        <div id="all-empolloyee">
          <div className="close-icon" onClick={() => setOpenusersBox(false)}>
            <GrFormClose />
          </div>
          {employees &&
            employees.map((user) => (
              <div className="employee" onClick={() => addUser(user._id)}>
                <div className="personal-info">
                  <div className="profilePic">
                    <img src={user.profile} alt="" />
                  </div>
                  <div>
                    <h5>{user.name}</h5>
                    <p>{user.position}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
      <div className="teammemberlist">
        {project.team &&
          project.team.map((user) => (
            <div className="member">
              <div className="header">
                <AiFillCheckCircle />
                <BsThreeDots />
              </div>

              <div className="profileinfo">
                <div className="image">
                  <img src={user.profile} alt="" />
                </div>
                <div className="userinfo">
                  <h3>{user.name}</h3>
                  <p>{user.position}</p>
                </div>
              </div>

              <div className="pro-footer">
                <div className="tasksprogress">
                  <p>{user.tasks.length} Tasks</p>
                  <div className="progressIndicator">
                    <MiniProgress animates={2000} total={100} progress={75} />
                  </div>
                </div>
                <button className="viewprofile">View profile</button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
