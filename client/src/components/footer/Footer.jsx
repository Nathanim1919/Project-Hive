import React from "react";
import "../../styles/footer.css";
import {
  AiFillLinkedin,
  AiFillFacebook,
  AiFillInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";

export default function Footer() {
  return (
    <section className="footer">
      <div className="footer__content">
        <div className="footer__section">
          <h3>Contact HR</h3>
          <p>Email: Nathan@BlueNile.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>

        <div className="footer__section">
          <h2>Follow Us </h2>
          <div className="icons">
            <AiFillFacebook />
            <AiFillInstagram />
            <AiOutlineTwitter />
            <AiFillLinkedin />
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} BlueNile. All rights reserved.</p>
        <ul>
          <li>Privacy Policy</li>
          <li>Terms of Service</li>
        </ul>
      </div>
    </section>
  );
}
