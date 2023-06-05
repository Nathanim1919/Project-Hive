import React from "react";
import "../../styles/Loading.css"; // Import the CSS file for styling

export default function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      {/* <div className="loading-text">Loading</div> */}
    </div>
  );
}
