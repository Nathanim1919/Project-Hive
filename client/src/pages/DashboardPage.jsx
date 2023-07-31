import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import { RiBarChartLine } from "react-icons/ri";
import { BiSearch, BiTask } from "react-icons/bi";
import {
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineProject,
} from "react-icons/ai";
import { SiGotomeeting } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
import { useParams } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";
import ProfilePage from "./ProfilePage";
import Dashboarddata from "../components/dashboard/Dashboard";
import Alltasks from "../components/task/alltasks";

export default function DashboardPage() {
  // states
  const [activeUser, setActiveUser] = useState({});
  const [openTaskPage, setOpenTaskPage] = useState(false);
  const [openDashBoardPage, setOpenDashBoardPage] = useState(true);
  const [openProfilePage, setOpenProfilePage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [projects, setProjects] = useState([]);
  const [openForm, setOpenform] = useState(false);
  const { id } = useParams();

  // get the current month name with the year
  const currentDate = new Date();
  const options = { month: "long", year: "numeric" };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`http://localhost:5000/user/${id}`);
        setActiveUser(response.data.user);
      } catch (error) {
        console.error("Error getting user:", error);
      }
    };

    getUser();
  }, [id]);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/${id}/projects`
        );

        if (activeUser && activeUser.position !== "Project Executive") {
          setProjects(
            response.data.projects.filter((project) =>
              project.team.some((member) => member.id === activeUser.id)
            )
          );
        } else {
          setProjects(response.data.projects);
        }

        setErrorMessage("");
      } catch (error) {
        setErrorMessage("Unable to fetch projects, please try again later.");
      }
    };

    if (activeUser) {
      getProjects();
    }
  }, [id, openForm, activeUser]);

  return (
    <section className="dashboard">
      <header className="header-section">
        <div className="contents">
          <RiBarChartLine />
          <h2>Blue-Nile</h2>
          <div className="search">
            <input type="text" placeholder="Search" />
            <BiSearch />
          </div>
        </div>

        <div className="profile">
          <div className="pic">
            <img src={activeUser.profile} alt="" />
          </div>
          <div className="user-info">
            <h6>{(activeUser.name || "").slice(0, 15)}</h6>
            <p>{activeUser.position && activeUser.position.slice(0, 21)}</p>
          </div>
        </div>
      </header>
      <main className="main-section">
        <div className="sidbar">
          <div className="uppericon">
            <div
              className="homepage"
              onClick={() => {
                setOpenDashBoardPage(true);
                setOpenProfilePage(false);
                setOpenTaskPage(false);
              }}
            >
              <AiOutlineHome />
              <span>Dashboard</span>
            </div>
            {activeUser.position !== "Project Executive" && (
              <div
                className="project"
                onClick={() => {
                  setOpenTaskPage(true);
                  setOpenDashBoardPage(false);
                  setOpenProfilePage(false);
                }}
              >
                <AiOutlineProject />
                <span>Tasks</span>
              </div>
            )}
            <div className="event">
              <SiGotomeeting />
              <span>Announcement</span>
            </div>
            {/* <div className="task">
              <BiTask />
            </div> */}
          </div>

          <div className="lowericon">
            <div className="gotoprofile">
              <NavLink
                onClick={() => {
                  setOpenDashBoardPage(false);
                  setOpenProfilePage(true);
                  setOpenTaskPage(false);
                }}
              >
                <CgProfile />
              </NavLink>
              <span>Profile</span>
            </div>
            <div className="logout">
              <NavLink>
                <AiOutlineLogout />
              </NavLink>
              <span>Logout</span>
            </div>
          </div>
        </div>
        {openTaskPage && (
          <Alltasks activeUser={activeUser} projects={projects} />
        )}
        {openDashBoardPage && (
          <Dashboarddata
            activeUser={activeUser}
            projects={projects}
            openForm={openForm}
            setOpenform={setOpenform}
          />
        )}
        {openProfilePage && <ProfilePage />}
      </main>
    </section>
  );
}
