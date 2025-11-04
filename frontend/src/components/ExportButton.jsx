import React from "react";
import { exportEmployeesToCSV } from "../api/employeeAPI";
import "../styles/employeeDirectory.css";

const ExportButton = ({ filters }) => {
  const handleExport = async () => {
    try {
      await exportEmployeesToCSV(filters);
    } catch (error) {
      alert("Failed to export employees. Please try again.");
      console.error("Export error:", error);
    }
  };

  return (
    <button className="export-btn" onClick={handleExport}>
      Export CSV
    </button>
  );
};

export default ExportButton;
