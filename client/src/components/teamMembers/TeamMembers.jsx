import React, { useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import {
  AiFillCheckCircle,
  AiOutlinePlus,
  AiOutlineUserDelete,
} from "react-icons/ai";
import "../../styles/member.css";
import MiniProgress from "../progress/miniProgress";
import axios from "axios";
import { GrFormClose } from "react-icons/gr";
import { useParams } from "react-router-dom";
import Error from "../ShowError/error";
import Confirmation from "../warning/confirmation";
import Loading from "../Loading/Loading";

export default function TeamMembers({ project }) {
  const [employees, setEmployees] = useState([]);
  const [openUsersBox, setOpenusersBox] = useState(false);
  const { id, projectId } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [openConfirmationBox, setOpenConfirmationBox] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getUsers = async () => {
      try {
        const users = await axios.get("http://localhost:5000/user");
        setEmployees(users.data.user);
      } catch (error) {
        console.log(error);
      }
        setLoading(false);
    };
    getUsers();
  }, []);

  const addUser = async (userId) => {
    try {
      const add = await axios.post(
        `http://localhost:5000/user/${id}/projects/${projectId}/addEmployee`,
        { userId }
      );
      setOpenusersBox(false);
      // setEmployeeorRemovedAdded(true);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Failed to add employee to the project");
      }
    }
  };

  const removeUser = async (userId) => {
    setOpenConfirmationBox(true);
    setUserId(userId);
  };

  useEffect(() => {
    const removeEmployee = async () => {
      try {
        await axios.post(
          `http://localhost:5000/user/${id}/projects/${projectId}/removeEmployee`,
          { userId }
        );
        setOpenusersBox(false);

        // Update the project state with the updated team members
        const updatedProject = { ...project };
        updatedProject.team = updatedProject.team.filter(
          (user) => user._id !== userId
        );
        project = updatedProject;
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Failed to remove employee from this project");
        }
      }
      setConfirmed(false);
    };

    if (confirmed) {
      removeEmployee();
    }
  }, [confirmed, openConfirmationBox]);

    if (!project) {
      return <Loading />;
    }

  return (
    <section className="teammembers">
      {errorMessage !== "" && (
        <Error message={errorMessage} setErrorMessage={setErrorMessage} />
      )}
      {openConfirmationBox && (
        <Confirmation
          setConfirmed={(value) => {
            setConfirmed(value);
            setOpenConfirmationBox(false);
          }}
        />
      )}

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
            <div
              className="member"
              style={{
                border:
                  project.projectManager &&
                  project.projectManager._id === user._id
                    ? "2px solid #c2baba"
                    : "0px solid",
              }}
            >
              <div className="header">
                <AiFillCheckCircle />
                <AiOutlineUserDelete onClick={() => removeUser(user._id)} />
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
                  <p className="tasks">{user.tasks.length} Tasks</p>
                  <div className="progressIndicator">
                    <MiniProgress animates={2000} total={100} progress={75}/>
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
