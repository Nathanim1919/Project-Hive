import React from 'react'
import '../styles/report.css'

export default function ReportingPage() {
  return (
    <div className="reportPage">
      <h2>Project Compeletion Report</h2>
      <div className="report_summary">
        <p>Project Title: E-commerce development</p>
        <div className="teaminfo">
          <div className="totalteam">
            <h2>10</h2>
            <p>Total Team participated</p>
          </div>
          <div className="totaltasks">
            <h2>10</h2>
            <p>Total tasks created</p>
          </div>
          <div className="totaltasks">
            <h2>10000</h2>
            <p>Total Budget</p>
          </div>
          <div className="totaltasks">
            <h2>10000</h2>
            <p>Total Budget</p>
          </div>
        </div>
        <p>Project StartDate: 13 June 2023</p>
        <p>Project DueDate: 23 june 2023</p>
        <p>Project lead by: Nathanim Tadele</p>
      </div>
      <div className="buttons">
        <button>Approved</button>
        <button>Roll Back</button>
      </div>
    </div>
  );
}