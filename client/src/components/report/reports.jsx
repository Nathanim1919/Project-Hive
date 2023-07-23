import react, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/reportList.css";
import {changeDate} from '../../functions'
import ReportingPage from "../../pages/ReportingAnalyticsPage";

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const [proDetail, setProDetail] = useState(null);
  const [showDetails, setShowDetail] = useState(false);
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
    <div className="reportList">
      <h4>Project Completion Reports</h4>
      {showDetails && (
        <ReportingPage report={proDetail} setShowDetail={setShowDetail} />
      )}
      {reports &&
        reports.map((report) => (
          <div
            className="report"
            onClick={() => {
              setProDetail(report);
              setShowDetail(true);
            }}
          >
            <h3>{report.project.title.slice(0, 25) + ".."}</h3>
            <p>{changeDate(report.reportSendat)}</p>
          </div>
        ))}
    </div>
  );
};

export default ReportList;
