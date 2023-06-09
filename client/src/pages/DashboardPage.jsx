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
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import ProfilePage from "./ProfilePage";
import Dashboarddata from "../components/dashboard/Dashboard";

export default function DashboardPage() {
  // states
  const [activeUser, setActiveUser] = useState({});
  // const [projects, setProjects] = useState([]);
  const [openDashBoardPage, setOpenDashBoardPage] = useState(true);
  const [openProfilePage, setOpenProfilePage] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();

  // get the current month name with the year
  const currentDate = new Date();
  const options = { month: "long", year: "numeric" };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  // Client-side code
  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming you store the token in the browser's local storage
        const config = {
          headers: {
            authorization: `Bearer ${token}`,
          },
        };

        console.log(config.headers.authorization);

        const response = await axios.get(
          `http://localhost:5000/user/${id}`
        );
        setActiveUser(response.data.user);
      } catch (error) {
        console.error("Error getting user:", error);
        // Handle the error appropriately (e.g., show an error message to the user)
      }
    };

    getUser();
  }, [id]);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000");

      // Clear the token from local storage
      localStorage.removeItem("token");

      // Redirect the user to the logout page or home page
      //  navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      // Handle error
      // Display an error message to the user
      // ...
    }
  };

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
            <h6>{`${(activeUser.name || "").slice(0, 3)} ${(
              activeUser.name || ""
            )
              .split(" ")[1]
              ?.charAt(0)}`}</h6>
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
              }}
            >
              <AiOutlineHome />
            </div>
            <div className="project">
              <AiOutlineProject />
            </div>
            <div className="event">
              <SiGotomeeting />
            </div>
            <div className="task">
              <BiTask />
            </div>
          </div>

          <div className="lowericon">
            <div className="gotoprofile">
              <NavLink
                onClick={() => {
                  setOpenDashBoardPage(false);
                  setOpenProfilePage(true);
                }}
              >
                <CgProfile />
              </NavLink>
            </div>
            <div className="logout">
              <NavLink onClick={handleLogout}>
                <AiOutlineLogout />
              </NavLink>
            </div>
          </div>
        </div>
        {openDashBoardPage && <Dashboarddata />}
        {openProfilePage && <ProfilePage />}
      </main>
    </section>
  );
}
