import React from "react";
import "./ui-elements.css";

const StatusIcon = ({ status }) => {
  if (status === "solved") return <span className="status-icon status-solved" title="Solved">✓</span>;
  if (status === "attempted") return <span className="status-icon status-attempted" title="Attempted">◔</span>;
  return <span className="status-icon status-none" title="Not attempted">○</span>;
};

export default StatusIcon;