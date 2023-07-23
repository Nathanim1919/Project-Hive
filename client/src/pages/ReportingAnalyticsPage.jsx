import React from "react";
import "../styles/report.css";
import { changeDate } from "../functions";
import { AiOutlineClose } from "react-icons/ai";

export default function ReportingPage({ report, setShowDetail }) {
  return (
    <div className="back-drop">
      <div className="close-page" onClick={() => setShowDetail(false)}>
        <AiOutlineClose />
      </div>
      <div className="reportPage">
        <div id="header">
          <h1>Project Completion Report</h1>
        </div>
        <div className="pro-information">
          <h1>project information</h1>
          <div>
            <p>
              <span>Project Title: </span>
              {report.project.title}
            </p>
            <p>
              <span>Project Manager: {report.projectManager.name}</span>
            </p>
            <p>
              <span>Project Description:</span> {report.project.description}
            </p>
          </div>
        </div>

        <div className="pro-detail-info">
          <div className="timeline">
            <h1>Project Timeline</h1>
            <p>
              <span>Project Start Date: </span>
              {changeDate(report.project.startDate)}
            </p>
            <p>
              <span>Project Due Date: </span>
              {changeDate(report.project.dueDate)}
            </p>
            <p>
              <span>Actual Completion Date: </span>
              {changeDate(report.project.dueDate)}
            </p>
          </div>

          <div className="overall-info">
            <h1>Task and budget information</h1>
            <div className="info-list">
              <div className="totaltaks">
                <h1>{report.project.tasks.length}</h1>
                <p>Total tasks created</p>
              </div>
              <div className="totalteam">
                <h1>{report.project.team.length}</h1>
                <p>team participated</p>
              </div>
              <div className="totalbudget">
                <h1>{report.project.budget}</h1>
                <p>Total Budget</p>
              </div>
              <div className="budgetleft">
                <h1>100</h1>
                <p>Budget Left</p>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-buttons">
          <button id="approve-btn">Approved</button>
          <button id="roll-back-btn">Roll back</button>
        </div>
      </div>
    </div>
  );
}
