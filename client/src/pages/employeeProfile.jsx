import React, { useState } from "react";
import "../styles/employee.css";
import { NavLink } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function EmployeeProfile({ user }) {
  const [status,setStatus] = useState("");
  const [accountStatus,setAccountStatus] = useState(false);
  const navigate = useNavigate();

  const id = user._id;


   const activate = async () => {
     try {
       const activateaccount = await axios.post(`http://localhost:5000/user/${id}/activateAccount`);
     } catch (error) {
       console.log(error);
     }
   }

     const deactivate = async () => {
       try {
         const deactivateaccount = await axios.post(`http://localhost:5000/user/${id}/deactivate`);
       } catch (error) {
         console.log(error);
       }
     }

  return (
    <div className="employee-info-page">
      < div onClick={()=>navigate(-1)} className = "back-icon" >
        <BiArrowBack/>
      </div>
      <div className="coverpic">
        <h1>Blue-Nile Employee Profile</h1>
        <p>{user.name}</p>
      </div>
      <div className="main-info">
        <div id="profile-info">
          <div className="pro-image">
            <img src={user.profile} alt="" />
          </div>

          <div className="information">
            <div>
              <h2>{user.name}</h2>
              <p>{user.position}</p>
            </div>

            <div className="account-status">
              <p>
                account status:{" "}
                <NavLink onClick={() => setAccountStatus(true)}>
                  {user.account}
                </NavLink>
              </p>

              {accountStatus && (
                <div className="setAccountStatus">
                  <p
                    onClick={() => {
                      activate();
                      setStatus("active");
                      setAccountStatus(false);
                    }}
                  >
                    set active
                  </p>
                  <p
                    onClick={() => {
                      deactivate();
                      setStatus("not active");
                      setAccountStatus(false);
                    }}
                  >
                    deactivate
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="employee-status">
         
            <div className="projects">
              <h1>
                {
                  user.projects.filter(
                    (project) => project.status === "Completed"
                  ).length
                }
                /{user.projects.length}
              </h1>
              <p>Projects participated In</p>
            </div>
            <div className="tasks">
              <h1>
                {
                  user.tasks.filter((task) => task.status === "Completed")
                    .length
                }
                /{user.tasks.length}
              </h1>
              <p>Tasks assigned to</p>
            </div>
            <div className="leads">
              <h1>{user.assignedProjects.length}</h1>
              <p>Projects lead</p>
            </div>
            <div className="more-info">
              <h1>
                {
                  user.tasks.filter((task) => task.status === "Completed")
                    .length
                }
                /{user.tasks.length}
              </h1>
              <p>Tasks assigned to</p>
            </div>
        </div>
      </div>
    </div>
  );
}
