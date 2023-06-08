import React, { useState } from "react";
import "../styles/login.css";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/global.css";
import axios from "axios";
import Loading from "../components/Loading/Loading";
import Error from "../components/ShowError/error";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      const { token, message } = response.data;

      // Store the token in local storage for subsequent requests
      localStorage.setItem("token", token);

     

      if (message === "Logged in successfully") {
        // Redirect to the appropriate page after successful login
        navigate(`/user/${response.data.userId}`);
      } else {
        // Handle login error
        console.error("Login error:", message);
        // Display an error message to the user
        // ...
        setErrorMessage(message);
      }
      
    } catch (error) {
      setErrorMessage("Internal server error");
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loading />}
      {errorMessage !== "" && (
        <Error message={errorMessage} setErrorMessage={setErrorMessage} />
      )}
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
