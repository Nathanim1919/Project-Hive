import react, { useState, useEffect } from "react";
import "../../styles/reportform.css";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { useParams } from "react-router-dom";

const ReportForm = ({ project, setOpenReportPage }) => {
  const [report, setReport] = useState("");
  const { id, projectId } = useParams();

  const handleReport = async () => {
    try {
      const newReport = await axios.post(
        `http://localhost:5000/user/${id}/projects/${projectId}/createReport`,
        {
          report: report, // or simply 'report' if you're using ES6 shorthand
          project: project, // or simply 'project' if you're using ES6 shorthand
        }
      );
      setOpenReportPage(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="backdrop">
      <div className="close-icon" onClick={() => setOpenReportPage(false)}>
        <AiOutlineClose />
      </div>
      <div className="container">
        <h3>
          This Project have been completed, Please write a Report or just tap
          send button to send the default report
        </h3>
        <div>
          <textarea
            name=""
            id=""
            cols="30"
            rows="5"
            onChange={(e) => setReport(e.target.value)}
            placeholder="Write report or send as default"
          ></textarea>
          <input type="submit" onClick={handleReport} value="send" />
        </div>
      </div>
    </div>
  );
};
export default ReportForm;