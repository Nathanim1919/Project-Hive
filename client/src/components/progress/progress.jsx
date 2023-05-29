import React from "react";
import "../../styles/progress.css";

export default function Progress({ progress }) {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="circular-progress">
      <svg className="progress-circle" width="120" height="120">
        <circle
          className="progress-bar"
          cx="60"
          cy="60"
          r={radius}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="progress-text">{progress}%</div>
    </div>
  );
}
