import React, { useState, useEffect, useRef } from "react";
import "./DSAstats.css";

const statsData = [
  { icon: "📋", label: "Total Problems",  value: "500+",    sub: "Across all topics",  color: "#f5a623" },
  { icon: "✅", label: "Problems Solved", value: "247",     sub: "Keep going!",         color: "#4a9fd5" },
  { icon: "🔥", label: "Current Streak",  value: "28 days", sub: "Personal best!",      color: "#e8920f" },
  { icon: "🎯", label: "Accuracy",        value: "84.3%",   sub: "Above average",       color: "#f5a623" },
];

function DSAstats() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className={`stats-row ${visible ? "stats-visible" : ""}`} ref={ref}>
      {statsData.map((s, i) => (
        <div
          key={i}
          className="stat-card"
          style={{ "--si": i, "--accent": s.color }}
        >
          <div className="stat-icon">{s.icon}</div>
          <div className="stat-val">{s.value}</div>
          <div className="stat-label">{s.label}</div>
          <div className="stat-sub">{s.sub}</div>
          <div className="stat-bar-track">
            <div className="stat-bar-fill" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default  DSAstats;