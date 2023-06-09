import React from "react";
import Header from "../components/header/header";
import "../styles/homepage.css";
import { NavLink } from "react-router-dom";
import {TbForbid2} from 'react-icons/tb'
import FAQ from "../components/faq/faq";
import Testimonial from "../components/testimonial/testimonial";
import Footer from "../components/footer/Footer";
import '../styles/global.css'
import {BiRun} from 'react-icons/bi';
import {motion} from 'framer-motion';


export default function HomePage() {
  return (
    <div>
      <Header />
      <section className="hero">
        <div className="hero-content">
          <h1>
            Welcome, <span>BlueNile</span> Team
            <br />
            <article>
              Ignite <span>Success</span> with <span>BlueNile's</span>{" "}
              Employee-Exclusive Platform.
            </article>
          </h1>
          <NavLink to={'/login'}>Get Started <BiRun/></NavLink>
        </div>

        <motion.div className="hero-ill">
          <img src="images/hero1.jpg" alt="" />
        </motion.div>
      </section>

      <section className="key-features">
        <h1>
          Our <span>Powerful</span> Features
        </h1>
        <div className="features">
          <div className="feature f1">
            <div className="feature-icon">
              <img src="images/features/project.png" alt="" />
            </div>
            <div className="content">
              <h3>Project Management</h3>
              <p>
                Easily create projects, assign team members, and track progress.
              </p>
            </div>
          </div>
          <div className="feature f4">
            <div className="feature-icon">
              <img src="images/features/profile.png" alt="" />
            </div>
            <div className="content">
              <h3>Profile Management</h3>
              <p>Customize your user profile and preferences.</p>
            </div>
          </div>

          <div className="feature f3">
            <div className="feature-icon">
              <img src="images/features/event.png" alt="" />
            </div>
            <div className="content">
              <h3>Event Countdown</h3>
              <p>
                Stay organized with a countdown timer for important meetings and
                events.
              </p>
            </div>
          </div>
          <div className="feature f4">
            <div className="feature-icon">
              <img src="images/features/report.png" alt="" />
            </div>
            <div className="content">
              <h3>Reporting and Analytics</h3>
              <p>Generate insightful reports and track project performance.</p>
            </div>
          </div>
          <div className="feature f2">
            <div className="feature-icon">
              <img src="images/features/task.png" alt="" />
            </div>
            <div className="content">
              <h3>Task Management</h3>
              <p>Streamline task assignment, deadlines, and collaboration.</p>
            </div>
          </div>
          <div className="feature f4">
            <div className="feature-icon">
              <img src="images/features/chat.png" alt="" />
            </div>
            <div className="content">
              <h3>Collaboration Tools</h3>
              <p>
                Foster teamwork and communication through discussion boards and
                document sharing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="house-rules">
        <h1>
          Our House <span>Rules</span>
        </h1>

        <div className="rules">
          <div className="rule-image">
            <img src="images/rule.jpg" alt="" />
          </div>
          <div className="rule-content">
            <ul>
              <li>
                <TbForbid2 />
                Avoid any form of harassment, discrimination, or offensive
                language.
              </li>
              <li>
                <TbForbid2 />
                Treat fellow team members with courtesy and consideration.
              </li>
              <li>
                <TbForbid2 />
                Protect sensitive information and maintain the confidentiality
                of project-related data.
              </li>
              <li>
                <TbForbid2 />
                Adhere to company data security policies and guidelines.
              </li>
              <li>
                <TbForbid2 />
                Do not share confidential or proprietary information with
                unauthorized individuals.
              </li>
              <li>
                <TbForbid2 />
                Use the platform solely for work-related purposes and avoid any
                unauthorized or personal use.
              </li>
            </ul>
          </div>
        </div>
      </section>
      <Testimonial/>
      <FAQ/>
      <Footer/>
    </div>
  );
}
