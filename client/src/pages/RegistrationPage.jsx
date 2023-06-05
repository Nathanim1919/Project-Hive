import React, { useState } from "react";
import "../styles/register.css";
import "../styles/global.css";
import WarningPage from "../components/warning/warning";
import { NavLink,useNavigate } from "react-router-dom";
import axios from "axios";
import {RxAvatar} from 'react-icons/rx'
import Loading from "../components/Loading/Loading";


export default function RegistrationPage() {
  // user registration states

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);



  // react hooks
  const navigate = useNavigate()




  // change image file into binary inorder to store it on database
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

  // handle registration form submit
  const handleRegistration = async (e) => {
     setIsLoading(true);
    e.preventDefault();

    try {
      const profile = await toBase64(avatar);
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        {
          email,
          password,
          profile,
          code,
        },
        {
          withCredentials: true,
        }
      );

      // Reset the form after successful registration
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setCode("");

      // navigate to login page
      if (response.data.message === "User registered successfully"){
        navigate("/login");
      }
    } catch (error) {
      // Handle any errors that occur during the registration process
      console.log(error);
      // You can display an error message or perform other error handling actions
    }
      setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="registration-page">
        <div className="image-background">
          <h1>Welcome to BlueNile Software Development!</h1>
          <p>
            Please provide the necessary information to register your account.
            By registering, you confirm your employment with our company. We are
            delighted to have you join our team. Access to our platform is
            exclusively for employees, ensuring a private and efficient
            collaboration space.
          </p>
        </div>

        <div className="registration-form">
          <h1>Registration</h1>
          <form onSubmit={handleRegistration}>
            <div className="form-group">
              <input
                placeholder="Email"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Password"
                type="password"
                id="pasword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <input
                placeholder="confirm Password"
                type="password"
                id="pasword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Employeement code"
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>

            <div className="form-group profile">
              <label for="profile">
                <RxAvatar /> <p>set profile picture</p>
              </label>
              <input
                type="file"
                id="profile"
                hidden
                onChange={(e) => setAvatar(e.target.files[0])}
              />
            </div>

            <button type="submit">Sign up</button>
          </form>
          <NavLink className="account" to={"/login"}>
            Already have an account?
          </NavLink>
        </div>
      </div>
      <WarningPage />
    </>
  );
}
