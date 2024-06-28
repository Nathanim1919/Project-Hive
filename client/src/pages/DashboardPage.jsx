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
import AnnouncmentPage from "./announcmentPage";
import CompletedProjects from "../components/project/CompletedProjects";
import {
  useNavigate
} from "react-router-dom";
import Loading from "../components/Loading/Loading";


export default function DashboardPage() {

  // states
  const [activeUser, setActiveUser] = useState({});
  const [openTaskPage, setOpenTaskPage] = useState(false);
  const [openannouncementPage, setOpenannouncementPage] = useState(false);
  const [openDashBoardPage, setOpenDashBoardPage] = useState(true);
  const [openProfilePage, setOpenProfilePage] = useState(false);
  const [opencompletedProjectsPage, setOpencompletedProjectsPage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [projects, setProjects] = useState([]);
  const [openForm, setOpenform] = useState(false);
  const [searchedProjects, setSearchedProjects] = useState([]);
  const [searching, setSearching] = useState(false);
  const [search, setSearch] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();


  // get the current month name with the year
  const currentDate = new Date();
  const options = { month: "long", year: "numeric" };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);


  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      // Fetch user
      try {
        const userResponse = await axios.get(`http://localhost:5000/user/${id}`);
        setActiveUser(userResponse.data.user);
        // Based on the user's position, decide whether to fetch projects
        const projectsResponse = await axios.get(`http://localhost:5000/user/${id}/projects`);
        if (userResponse.data.user && userResponse.data.user.position !== "Project Executive") {
          try {
            const filteredProjects = projectsResponse.data.projects.filter((project) =>
              project.team.some((member) => member._id === userResponse.data.user._id)
            );
            setProjects(filteredProjects);
          } catch (error) {
            console.error("Error fetching projects:", error);
            setErrorMessage("Unable to fetch projects, please try again later.");
          }
        } else {
          // Fetch all projects if the user is a Project Executive
          try {
            setProjects(projectsResponse.data.projects);
          } catch (error) {
            console.error("Error fetching projects:", error);
            setErrorMessage("Unable to fetch projects, please try again later.");
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
  
    fetchData();
  }, [id, openForm]); // Depend on id and openForm


  const searchProjects = () => {
    const filteredProjects = projects.filter((project) => project.subTitle.startsWith(search))
    setSearchedProjects(filteredProjects);
  };



  return (
    <section className="dashboard">
      <header className="header-section">
        <div className="contents">
          <RiBarChartLine />
          <h2>Project-Hive</h2>
          <div className="search">
            <input
              type="text"
              placeholder="Search"
              onChange={(e) =>{ setSearch(e.target.value);searchProjects();setSearching(true)}}
            />
            <BiSearch />

            {search && (
              <div className="serachedProjects">
                {searchedProjects.length > 0 ? (
                  searchedProjects.map((project) => (
                    <NavLink to={`/user/${id}/projects/${project._id}`} key={project._id}>
                      <div className="project">
                        <AiOutlineProject />
                        <p className="title">{project.subTitle.slice(0, 10) + ".."}</p>
                        <p className="status">{project.status}</p>
                        <p className="progress">{project.progress}%</p>
                      </div>
                    </NavLink>
                  ))
                ) : (
                  <Loading />
                )}
              </div>
            )}

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
              className={openDashBoardPage ? "homepage active" : "homepage"}
              onClick={() => {
                setOpenDashBoardPage(true);
                setOpenProfilePage(false);
                setOpenTaskPage(false);
                setOpenannouncementPage(false);
                setOpencompletedProjectsPage(false);
              }}
            >
              <AiOutlineHome />
              <span>Dashboard</span>
            </div>
            {activeUser.position !== "Project Executive" && (
              <div
                className={
                  openTaskPage ? "project active" : "project"
                }
                onClick={() => {
                  setOpenTaskPage(true);
                  setOpenDashBoardPage(false);
                  setOpenProfilePage(false);
                  setOpenannouncementPage(false);
                  setOpencompletedProjectsPage(false);
                }}
              >
                <AiOutlineProject />
                <span>Tasks</span>
              </div>
            )}
            <div
              className={
                openannouncementPage ? "event active" : "event"
              }
              onClick={() => {
                setOpenannouncementPage(true);
                setOpenTaskPage(false);
                setOpenDashBoardPage(false);
                setOpenProfilePage(false);
                setOpencompletedProjectsPage(false);
              }}
            >
              <SiGotomeeting />
              <span>Announcement</span>
            </div>
            {
              activeUser.position === "Project Executive" &&
              <div div onClick={
                () => {
                  setOpencompletedProjectsPage(true);
                  setOpenannouncementPage(false);
                  setOpenTaskPage(false);
                  setOpenDashBoardPage(false);
                  setOpenProfilePage(false);
                }
              }
                className={
                  opencompletedProjectsPage ? "event active" : "event"
                } >
                <BiTask />
                < span > Approved </span>
              </div>}
          </div>

          <div className="lowericon">
            <div className={
              openProfilePage ? "active gotoprofile" : "gotoprofile"
            }
              onClick={() => {
                setOpenDashBoardPage(false);
                setOpenProfilePage(true);
                setOpenTaskPage(false);
                setOpenannouncementPage(false);
                setOpencompletedProjectsPage(false);
              }}
            >
              <CgProfile />

              <span>Profile</span>
            </div>
            <div onClick={() => navigate('/')} className="logout">
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
        {openannouncementPage && <AnnouncmentPage />}
        {openDashBoardPage && (
          <Dashboarddata
            activeUser={activeUser}
            projects={projects}
            openForm={openForm}
            setOpenform={setOpenform}
          />
        )}

        {
          opencompletedProjectsPage && < CompletedProjects opencompletedProjectsPage={opencompletedProjectsPage} />
        }
        {openProfilePage && <ProfilePage />}
      </main>
    </section>
  );
}