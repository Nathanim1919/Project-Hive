import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/header.css";
import { BsMicrosoftTeams } from "react-icons/bs";

export default function Header() {
  return (
    <div className="headerContainer">
      <nav>
        <div className="logo">
          <div className="icon">
            <BsMicrosoftTeams />
          </div>
        </div>

        <ul className="sign">
          <NavLink>Sign in</NavLink>
          <NavLink>Sign Up</NavLink>
        </ul>
      </nav>
    </div>
  );
}
