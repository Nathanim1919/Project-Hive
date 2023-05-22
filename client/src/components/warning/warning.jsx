import React from "react";
// import { useHistory } from "react-router-dom";
import "../../styles/warning.css";
import "../../styles/global.css"

export default function WarningPage() {
//   const history = useHistory();

  const handleEmployeeClick = () => {
    // Handle logic when employee is confident about their employment
    // Redirect them to the appropriate page
  };

  const handleGoBackClick = () => {
    // Handle logic when user wants to go back or cancel registration/login
    // Redirect them to the homepage or the previous page
    // history.push("/");
  };

  return (
    <div className="backdrop">
    <div className="warning-page">
      <h1>Access Warning</h1>
      <p>
        If you are not an employee of the company or have no legitimate
        affiliation with the company, please refrain from attempting to register
        or login. Our system verifies user information against our employee
        database, and unauthorized access is strictly prohibited. Unauthorized
        access attempts will be tracked, and repeated unsuccessful attempts will
        result in the blocking of your email address, preventing further access.
        Please consider these factors before attempting to gain unauthorized
        access.
      </p>
      <div className="button-container">
        <button className="employee-button" onClick={handleEmployeeClick}>
          I am an employee
        </button>
        <button className="go-back-button" onClick={handleGoBackClick}>
          Go back / Cancel
        </button>
      </div>
    </div>
    </div>
  );
}
