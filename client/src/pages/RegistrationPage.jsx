import React, { useState } from "react";
import "../styles/register.css";
import "../styles/global.css";
import WarningPage from "../components/warning/warning";
import { NavLink,useNavigate } from "react-router-dom";
import axios from "axios";


export default function RegistrationPage() {
  // user registration states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [position, setPosition] = useState("");
  const [sex, setSex] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [employmentDate, setEmploymentDate] = useState("");

  // react hooks
  const navigate = useNavigate()

  // open boxes
  const [open1, setOpen1] = useState(false);

  // handle registration form submit
  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        {
          name,
          email,
          password,
          phoneNumber,
          position,
          sex,
          dateOfBirth,
          employmentDate,
        },
        {
          withCredentials: true,
        }
      );

      // Handle the response from the server
      console.log(response);

      // Reset the form after successful registration
      setName("");
      setEmail("");
      setPassword("");
      setPhoneNumber("");
      setSex("");
      setDateOfBirth("");
      setEmploymentDate("");

      // navigate to login page
   console.log()
      if (response.data.message === "User registered successfully"){
        navigate("/login");
      }
    } catch (error) {
      // Handle any errors that occur during the registration process
      console.log(error);
      // You can display an error message or perform other error handling actions
    }
  };

  return (
    <>
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
                onFocus={() => {
                  setOpen1(false);
                }}
                type="text"
                placeholder="Name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                onFocus={() => {
                  setOpen1(false);
                }}
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
                onFocus={() => {
                  setOpen1(false);
                }}
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
                onFocus={() => {
                  setOpen1(false);
                }}
                placeholder="Phone-Number"
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            <div className="form-group form-sex">
              <input
                onFocus={() => {
                  setOpen1(true);
                }}
                placeholder="Sex"
                type="text"
                id="sex"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                required
                readOnly
              />
              {open1 && (
                <ul className="sex">
                  <li
                    onClick={(e) => {
                      setSex(e.target.textContent);
                      setOpen1(false);
                    }}
                  >
                    male
                  </li>
                  <li
                    onClick={(e) => {
                      setSex(e.target.textContent);
                      setOpen1(false);
                    }}
                  >
                    female
                  </li>
                </ul>
              )}
            </div>

            <div className="form-group">
              <input
                onFocus={() => {
                  setOpen1(false);
                }}
                type="date"
                id="employment-date"
                value={employmentDate}
                onChange={(e) => setEmploymentDate(e.target.value)}
                required
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
