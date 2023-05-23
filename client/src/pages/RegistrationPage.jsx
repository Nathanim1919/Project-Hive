import React, { useState } from "react";
import "../styles/register.css";
import "../styles/global.css";
import WarningPage from "../components/warning/warning";
import { NavLink } from "react-router-dom";

export default function RegistrationPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [sex, setSex] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [employmentDate, setEmploymentDate] = useState("");

  // open boxes
  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)

  const handleRegistration = (e) => {
    e.preventDefault();

    // Perform registration logic, such as sending data to a server or storing in a database
    // You can access the registration data in the state variables (name, email, phoneNumber, role, sex, dateOfBirth, employmentDate)

    // Reset the form after successful registration
    setName("");
    setEmail("");
    setPhoneNumber("");
    setRole("");
    setSex("");
    setDateOfBirth("");
    setEmploymentDate("");
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
               onFocus={() => {setOpen1(false);setOpen(false)}}
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
               onFocus={() => {setOpen1(false);setOpen(false)}}
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
               onFocus={() => {setOpen1(false);setOpen(false)}}
                placeholder="Phone-Number"
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <input
                onFocus={() => {setOpen(true);setOpen1(false)}}
                type="text"
                placeholder="role in the company"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                readOnly
              />
              {open && (
                <ul className="role">
                  <li onClick={(e)=>{setRole(e.target.textContent);setOpen(false)}}>Project executive</li>
                  <li onClick={(e)=>{setRole(e.target.textContent);setOpen(false)}}>Project manager</li>
                  <li onClick={(e)=>{setRole(e.target.textContent);setOpen(false)}}>Front-end developer</li>
                  <li onClick={(e)=>{setRole(e.target.textContent);setOpen(false)}}>Back-end developer</li>
                  <li onClick={(e)=>{setRole(e.target.textContent);setOpen(false)}}>Full-stack developer</li>
                  <li onClick={(e)=>{setRole(e.target.textContent);setOpen(false)}}>UI/UX</li>
                  <li onClick={(e)=>{setRole(e.target.textContent);setOpen(false)}}>Other</li>
                </ul>
              )}
            </div>

            <div className="form-group form-sex">
              <input
                onFocus={() => {setOpen1(true);setOpen(false)}}
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
                  <li onClick={(e)=>{setSex(e.target.textContent);setOpen1(false)}}>male</li>
                  <li onClick={(e)=>{setSex(e.target.textContent);setOpen1(false)}}>female</li>
                </ul>
              )}
            </div>

            <div className="form-group">
              <input
               onFocus={() => {setOpen1(false);setOpen(false)}}
                type="date"
                id="dob"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
               onFocus={() => {setOpen1(false);setOpen(false)}}
                type="date"
                id="employment-date"
                value={employmentDate}
                onChange={(e) => setEmploymentDate(e.target.value)}
                required
              />
            </div>
          </form>
          <NavLink className="account" to={"/login"}>
            Already have an account?
          </NavLink>
        </div>
      </div>
      <WarningPage/>
    </>
  );
}
