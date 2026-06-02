import React from "react";
import "./SharedElements.css";

const DiffBadge = ({ d }) => {
  const map = { 
    Easy: "badge-easy", 
    Medium: "badge-medium", 
    Hard: "badge-hard", 
    Expert: "badge-expert" 
  };
  return <span className={`badge ${map[d] || ""}`}>{d}</span>;
};

export default DiffBadge;