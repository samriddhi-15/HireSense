import React from "react";
import "./DSAfeatured.css";


function DSAfeatured() {
  return (
    <div className="featured-section">

      {/* Weekly Challenge */}
      <div className="featured-card featured-weekly">
        <div className="feat-badge">📅 Weekly Challenge</div>
        <h3>Graph Traversal Marathon</h3>
        <p>7 problems · 5 days remaining</p>
        <div className="feat-progress-track">
          <div className="feat-progress-fill" style={{ width: "43%" }} />
        </div>
        <span className="feat-pct">43% completed</span>
        <button className="feat-btn">Join Challenge →</button>
      </div>

      {/* Streak */}
      <div className="featured-card featured-streak">
        <div className="feat-badge">🔥 Your Streak</div>
        <h3>28-Day Solving Streak</h3>
        <p>You're in the top 5% this month!</p>
        <div className="streak-dots">
          {[...Array(14)].map((_, i) => (
            <div
              key={i}
              className={`streak-dot ${
                i < 12 ? "streak-done" : i === 12 ? "streak-today" : ""
              }`}
            />
          ))}
        </div>
        <button className="feat-btn feat-btn--outline">View History →</button>
      </div>

      {/* Contest */}
      <div className="featured-card featured-contest">
        <div className="feat-badge">🏆 Mock Contest</div>
        <h3>Bi-Weekly Contest #47</h3>
        <p>Starts in 2d 14h 22m</p>
        <div className="contest-tags">
          <span>90 mins</span>
          <span>4 problems</span>
          <span>All levels</span>
        </div>
        <button className="feat-btn feat-btn--dark">Register Now →</button>
      </div>

    </div>
  );
}

export default DSAfeatured;