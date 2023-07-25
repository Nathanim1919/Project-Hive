import React from "react";
import '../../styles/chat/teammember.css'

export default function TeamMembers({ project }) {
  return (
    <div className="teammembersSec">
      <h1>Teams</h1>
      {project.team.map((member) => (
        <div id="member">
          <div className="profileSec">
            <img src={member.profile} alt="" />
          </div>
          <div className="member-info">
            <h4>{member.name}</h4>
            <p>{member.position}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
