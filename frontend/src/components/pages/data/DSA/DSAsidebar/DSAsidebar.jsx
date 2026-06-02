import React from "react";
import DiffBadge from "../ui/DiffBadge";
import "./DSAsidebar.css";

const DSASidebar = () => (
  <aside className="sidebar">
    <div className="sidebar-card daily-card">
      <div className="sidebar-card-title">Daily Challenge</div>
      <div className="daily-problem-name">Minimum Window Substring</div>
      <DiffBadge difficulty="Hard" />
      <button className="sidebar-btn sidebar-btn--primary">Solve Now</button>
    </div>

    <div className="sidebar-card progress-card">
      <div className="sidebar-card-title">Your Progress</div>
      <div className="progress-stats">
        <div className="ps-item"><span>Streak</span><strong>🔥 28d</strong></div>
        <div className="ps-item"><span>Points</span><strong>⭐ 3,840</strong></div>
      </div>
    </div>
  </aside>
);

export default DSASidebar;