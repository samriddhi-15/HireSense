import React from "react";
import StatusIcon from "../ui/StatusIcon";
import DiffBadge from "../ui/DiffBadge";
import "./DSAproblems.css";

const ProblemRow = ({ problem, onClick }) => (
  <tr className="problem-row" onClick={() => onClick(problem)}>
    <td><StatusIcon status={problem.status} /></td>
    <td className="problem-name-cell">
      <span className="problem-name">{problem.name}</span>
    </td>
    <td><DiffBadge difficulty={problem.difficulty} /></td>
    <td className="tags-cell">
      {problem.tags.map(t => <span key={t} className="tag-chip">{t}</span>)}
    </td>
    <td className="acceptance-cell">{problem.acceptance}</td>
  </tr>
);

export default ProblemRow;