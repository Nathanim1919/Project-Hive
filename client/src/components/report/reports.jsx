import react, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/reportList.css";

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const { id, projectId } = useParams();

  useEffect(() => {
    const handleReports = async () => {
      try {
        const reports = await axios.get(
          `http://localhost:5000/user/${id}/projects/reports`
        );
        setReports(reports.data.reports);
      } catch (error) {
        console.log(error);
      }
    };
    handleReports();
  }, []);

  return (
    <div className="ReportList">
      <h4>Project Completion Reports</h4>
      {reports &&
        reports.map((report) => (
          <div>
            <p>{report.project.title}</p>
            <p>{report.reportSendat}</p>
          </div>
        ))}
    </div>
  );
};

export default ReportList;
