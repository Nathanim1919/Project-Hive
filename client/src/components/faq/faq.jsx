import React, { useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";


function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleParagraph = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqData = [
    {
      question: "How do I create a new project?",
      answer:
        'As a Project Executive or Project Manager, you have the ability to create new projects. Navigate to the Projects section on the dashboard and click on the "Create Project" button. Fill in the necessary details such as project name, description, and assigned team members.',
    },
    {
      question: "How can I view the tasks assigned to me?",
      answer:
        "As a Team Member, you can view your assigned tasks in the Task Management section. The tasks assigned to you will be listed, along with their deadlines and priority levels.",
    },
    {
      question: "Can I track the overall progress of my team's projects?",
      answer:
        "Yes, as a Project Executive or Project Manager, you can track the progress of your team's projects on the dashboard. The progress bar and status indicators will provide a visual representation of each project's completion status.",
    },
    {
      question: "How can I update the status of a task?",
      answer:
        'As a Team Member, you can update the status of a task by navigating to the Task Management section. Select the task and mark it as "In Progress," "Completed," or any other relevant status.',
    },
    {
      question: "How do I schedule a meeting or event for my team?",
      answer:
        'Project Executives and Project Managers have the ability to schedule meetings or events. In the Event Countdown section, click on the "Add Event" button and provide the event details such as name, date, and time.',
    },
    {
      question:
        "How can I collaborate with my team members on a specific project?",
      answer:
        "Utilize the Collaboration section to engage in project-specific discussions and file sharing. Create discussion threads, comment on posts, and upload project-related files for seamless collaboration with your team members.",
    },
    {
      question: "How do I update my profile information or contact details?",
      answer:
        'In the Profile section, click on the "Edit Profile" button. Update your personal information, contact details, and preferences. Click "Save" to apply the changes.',
    },
    {
      question:
        "What should I do if I encounter technical issues or need support?",
      answer:
        "If you experience technical issues or require support, reach out to the designated support team by submitting a support ticket or contacting the IT department. They will assist you in resolving any issues or answering your questions.",
    },
  ];

  return (
    <section className="faq">
      <h1>FAQ</h1>
      <div className="faq-list">

        {faqData.map((item, index) => (
          <div key={index} onClick={() => toggleParagraph(index)}>
            <h2>
              {item.question}{" "}
              {index === activeIndex ? <AiOutlineDown /> : <AiOutlineUp />}
            </h2>
            {index === activeIndex && <p>{item.answer}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQ;
