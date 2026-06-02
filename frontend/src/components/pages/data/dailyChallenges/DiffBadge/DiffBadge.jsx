import React from "react";
import "./DiffBadge.css";

const DIFF_COLOR = { Easy: "#22c55e", Medium: "#f5a623", Hard: "#ef4444" };
const DIFF_BG = { Easy: "rgba(34,197,94,.13)", Medium: "rgba(245,166,35,.13)", Hard: "rgba(239,68,68,.12)" };

export default function DiffBadge({ d, large }) {
  return (
    <span 
      className={`diff-badge ${large ? "badge-large" : "badge-small"}`}
      style={{
        background: DIFF_BG[d] || DIFF_BG.Medium,
        color: DIFF_COLOR[d] || DIFF_COLOR.Medium,
      }}
    >
      {d}
    </span>
  );
}