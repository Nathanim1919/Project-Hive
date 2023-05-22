import React, { useState } from "react";
import '../styles/register.css';
import '../styles/global.css';
import WarningPage from "../components/warning/warning";



export default function RegistrationPage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [sex, setSex] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [employmentDate, setEmploymentDate] = useState("");

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
      <h1>Registration</h1>
      <form onSubmit={handleRegistration} className="registration-form">
        <div className="form-group">
          
          <input
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
            type="text"
            placeholder="role in the company"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            readOnly
          />
          <ul className="role">
            <li>Project executive</li>
            <li>Project manager</li>
            <li>Front-end developer</li>
            <li>Back-end developer</li>
            <li>Full-stack developer</li>
            <li>UI/UX</li>
            <li>Other</li>
          </ul>
        </div>

        <div className="form-group form-sex">         
           <input
            placeholder="Sex"
            type="text"
            id="sex"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            required
            readOnly
          />
          <ul className="sex">
            <li>male</li>
            <li>female</li>
          </ul>
        </div>

        <div className="form-group">
          <input
            type="date"
            id="dob"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            id="employment-date"
            value={employmentDate}
            onChange={(e) => setEmploymentDate(e.target.value)}
            required
          />
        </div>
      </form>
    </div>
    <WarningPage/>
    </>
  );
}
