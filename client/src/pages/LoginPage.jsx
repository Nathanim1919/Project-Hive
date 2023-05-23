import React, { useState } from "react";
import "../styles/login.css";
import { NavLink } from "react-router-dom";
import '../styles/global.css'
import WarningPage from "../components/warning/warning";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Perform login logic, such as verifying credentials with a server or database
    // You can access the login data in the state variables (email and password)

    // Redirect to the appropriate page after successful login
    // history.push("/dashboard");
  };

  return (
    <>
      {/* <WarningPage/> */}

      <div className="login-page">
        <div className="image-background">
          <h1>Welcome to BlueNile Software Development!</h1>
          <p>
            Please enter your login credentials to access your account. As an
            employee of our company, you can securely access our platform. We
            prioritize the confidentiality of your information. Unauthorized
            access is strictly prohibited.
          </p>
        </div>
        <div className="login-form">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit" className="login-button">
                Login
              </button>
            </div>
            <NavLink className="account" to={"/register"}>
              don't you have an account?
            </NavLink>
          </form>
        </div>
      </div>
    </>
  );
}
