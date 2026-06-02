import React, { useState, useEffect } from "react";
import "./HrInterviewSimulator.css";

const HrInterviewSimulator = () => {
  const [aiState, setAiState] = useState("speaking");
  const [secs, setSecs] = useState(0);
  const states = ["speaking", "thinking", "listening"];

  useEffect(() => {
    const t = setInterval(() => setAiState((s) => states[(states.indexOf(s) + 1) % 3]), 3000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const progress = [
    { label: "Introduction", done: true },
    { label: "HR Round", done: true, active: false },
    { label: "Behavioral", done: false, active: true },
    { label: "Communication", done: false },
    { label: "Wrap Up", done: false },
  ];

  return (
    <section className="sim-section">
      <div className="sh">
        <span className="eyebrow">✦ Live Session</span>
        <h2 className="stitle">Interview <span className="acc">In Progress</span></h2>
      </div>
      <div className="sim-grid">
        <div className="sim-ai glass-card dark-card">
          <div className="sim-ai-top">
            <div className="ai-avatar-wrap">
              <div className="apr1" />
              <div className="apr2" />
              <div className="apr3" />
              <div className="ai-face-circle"><span style={{ fontSize: 44 }}>🤖</span></div>
            </div>
            <div className={`state-badge sb-${aiState}`}>
              <span className={`sdot sd-${aiState}`} />
              {aiState.charAt(0).toUpperCase() + aiState.slice(1)}…
            </div>
            {aiState === "speaking" && (
              <div className="wave-viz">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="wvbar" style={{ "--wi": i }} />
                ))}
              </div>
            )}
          </div>
          <div className="ai-card-info">
            <div className="aci-name">HireSense AI Interviewer</div>
            <div className="aci-title">Senior HR Coach · 50K+ Interviews</div>
            <div className="aci-pills">
              {["Behavioral Expert", "HR Specialist", "Top Rated"].map((p) => (
                <span key={p} className="ipill">{p}</span>
              ))}
            </div>
          </div>
          <div className="ai-question-preview">
            <div className="aqp-label">Current Question</div>
            <div className="aqp-text">"Describe a challenging situation you faced. How did you handle it?"</div>
          </div>
        </div>

        <div className="sim-center">
          <div className="timer-card">
            <div className="tc-label">Time Elapsed</div>
            <div className="tc-val">{fmt(secs)}</div>
            <div className="tc-sub">45:00 session</div>
          </div>
          <div className="prog-card">
            <div className="tc-label" style={{ marginBottom: 12 }}>Progress</div>
            {progress.map((p, i) => (
              <div 
                key={i} 
                className={`prog-item ${p.done ? "pi-done" : ""} ${p.active ? "pi-active" : ""}`}
              >
                <div className="pi-dot">{p.done ? "✓" : i + 1}</div>
                <div className="pi-label">{p.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="sim-cand glass-card">
          <div className="cand-cam">
            <span style={{ fontSize: 52 }}>👤</span>
            <div className="cand-rec"><span className="rec-dot" />REC</div>
          </div>
          <div className="cand-name">You · Candidate</div>
          <div className="cand-sub">HR Interview · Intermediate</div>
          <div className="cand-stats-row">
            {[["Q3/6", "Progress"], ["78%", "Score"], ["High", "Confidence"]].map(([v, l]) => (
              <div key={l} className="csr-item">
                <div className="csr-val">{v}</div>
                <div className="csr-label">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HrInterviewSimulator;