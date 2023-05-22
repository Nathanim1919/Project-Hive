import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../styles/login.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();

    // Perform login logic, such as verifying credentials with a server or database
    // You can access the login data in the state variables (email and password)

    // Redirect to the appropriate page after successful login
    history.push("/dashboard");
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="login-form">
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
      </form>
    </div>
  );
}
