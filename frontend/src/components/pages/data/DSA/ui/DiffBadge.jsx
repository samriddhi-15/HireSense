import React from "react";
import "./ui-elements.css";

const DiffBadge = ({ difficulty }) => {
  const map = { Easy: "diff-easy", Medium: "diff-medium", Hard: "diff-hard" };
  return <span className={`diff-badge ${map[difficulty] || ""}`}>{difficulty}</span>;
};

export default DiffBadge;