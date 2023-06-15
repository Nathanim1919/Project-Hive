import React from "react";
import "../../styles/testimonial.css";

export default function Testimonial() {
  const testimonials = [
    {
      name: "Ephrem Tekle",
      position: "Former Project Manager",
      message:
        "The platform provided by this company was exceptional. It streamlined project management, allowing for efficient collaboration and task tracking. I greatly appreciated the user-friendly interface and powerful features.",
      profilePicture: "images/user.jpg",
    },
    {
      name: "Yodit Haile",
      position: "Former Software Engineer",
      message:
        "I found the platform to be highly effective for software development. It facilitated seamless code sharing, version control, and communication within the team. The integration with various tools made the development process smoother.",
      profilePicture: "images/user.jpg",
    },
    {
      name: "Helina Bekele",
      position: "Former Marketing Specialist",
      message:
        "Using the platform for marketing campaigns was a game-changer. It provided comprehensive analytics, easy content collaboration, and simplified campaign tracking. It significantly improved the efficiency and effectiveness of our marketing efforts.",
      profilePicture: "images/user.jpg",
    },
  ];

  return (
    <section className="testimonials">
      <h1 id="t-head">
        Thoughts from our <span>former</span> employees
      </h1>
      <div className="testimonial-list">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial">
            <img
              src={testimonial.profilePicture}
              alt={testimonial.name}
              className="profile-picture"
            />
            <h2>{testimonial.name}</h2>
            <p className="position">{testimonial.position}</p>
            <p className="message">{testimonial.message}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
