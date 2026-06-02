import React, { useState } from "react";
import "./HrStarMethod.css";

const STAR_STEPS = [
  { key: "S", label: "Situation", color: "#f5a623", desc: "Set the context. Describe the specific situation or challenge you were in.", example: "'During my internship at XYZ, our team was given a critical project deadline that was suddenly moved up by 2 weeks...'" },
  { key: "T", label: "Task", color: "#4a9fd5", desc: "Explain the task or responsibility you had in that situation.", example: "'As the lead developer, I was responsible for coordinating the backend team and ensuring all modules were delivered on time...'" },
  { key: "A", label: "Action", color: "#e8920f", desc: "Describe the specific actions you took to handle the situation.", example: "'I immediately organized daily standups, broke the project into smaller sprints, and personally took on the most complex module...'" },
  { key: "R", label: "Result", color: "#f5a623", desc: "Share the measurable outcomes and what you learned.", example: "'We delivered the project 3 days ahead of the new deadline with zero bugs in production. My manager praised the team approach...'" },
];

const HrStarMethod = () => {
  const [open, setOpen] = useState(null);
  return (
    <section className="star-section">
      <div className="sh">
        <span className="eyebrow">✦ Answer Framework</span>
        <h2 className="stitle">STAR Method <span className="acc">Training</span></h2>
        <p className="ssub">Structure every behavioral answer using the proven STAR framework</p>
      </div>
      <div className="star-grid">
        {STAR_STEPS.map((s, i) => (
          <div 
            key={s.key} 
            className={`star-card ${open === i ? "star-open" : ""}`} 
            onClick={() => setOpen(open === i ? null : i)} 
            style={{ "--sc": s.color }}
          >
            <div className="star-card-shimmer" />
            <div className="star-key" style={{ color: s.color }}>{s.key}</div>
            <div className="star-label">{s.label}</div>
            <div className="star-desc">{s.desc}</div>
            {open === i && (
              <div className="star-example">
                <div className="se-label">Example</div>
                <div className="se-text">{s.example}</div>
              </div>
            )}
            <div className="star-expand">{open === i ? "▲ Less" : "▼ Example"}</div>
          </div>
        ))}
      </div>
      <div className="glass-card" style={{ marginTop: 24 }}>
        <div className="gc-head">📝 Response Template</div>
        <div className="template-text">
          <span style={{ color: "#f5a623" }}>In [Situation],</span> I was responsible for <span style={{ color: "#4a9fd5" }}>[Task].</span> I took action by <span style={{ color: "#e8920f" }}>[Action — be specific with steps].</span> As a result, <span style={{ color: "#f5a623" }}>[Result — include measurable outcomes].</span>
        </div>
      </div>
    </section>
  );
};

export default HrStarMethod;