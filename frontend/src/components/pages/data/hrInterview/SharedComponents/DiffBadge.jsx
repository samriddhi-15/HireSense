import React from "react";
import "./SharedComponents.css";

const DiffBadge = ({ d }) => {
  const m = { Easy: "be", Medium: "bm", Hard: "bh" };
  return <span className={`badge ${m[d] || "bm"}`}>{d}</span>;
};

export default DiffBadge;