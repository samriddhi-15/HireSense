import React from "react";
import "./FrontendStreak.css";

export default function FrontendStreak() {
  const milestones = ["🔥 18D Active Log", "🏆 Fiber Master", "⚡ Event Loop Elite"];

  return (
    <div className="fe-card fe-streak-sidebar-panel">
      <div className="fe-st-metric-row">
        <div className="fe-st-metric-block">
          <span className="fe-st-label">Active Streak</span>
          <h4 className="fe-st-value">18 Days</h4>
        </div>
        <div className="fe-st-metric-block">
          <span className="fe-st-label">Accrued XP</span>
          <h4 className="fe-st-value">4,250</h4>
        </div>
      </div>

      <div className="fe-st-achievements">
        <div className="fe-st-ach-title">Unlocked Validation Badges</div>
        <div className="fe-st-badges-cluster">
          {milestones.map((m, i) => (
            <span key={i} className="fe-st-badge-pill">{m}</span>
          ))}
        </div>
      </div>
    </div>
  );
}