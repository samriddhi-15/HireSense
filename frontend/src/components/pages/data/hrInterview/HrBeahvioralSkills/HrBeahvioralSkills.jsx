import React, { useState, useEffect, useRef } from "react";
import "./HrBeahvioralSkills.css";

const BEHAVIORAL_SKILLS = [
  { icon: "💬", name: "Communication Skills", pct: 82, count: 24, level: "Advanced" },
  { icon: "🏆", name: "Leadership", pct: 68, count: 18, level: "Intermediate" },
  { icon: "🤝", name: "Teamwork", pct: 91, count: 30, level: "Expert" },
  { icon: "⚔️", name: "Conflict Resolution", pct: 55, count: 12, level: "Beginner" },
  { icon: "⏰", name: "Time Management", pct: 75, count: 20, level: "Intermediate" },
  { icon: "🔄", name: "Adaptability", pct: 88, count: 26, level: "Advanced" },
  { icon: "🧩", name: "Problem Solving", pct: 79, count: 22, level: "Intermediate" },
  { icon: "⚡", name: "Decision Making", pct: 63, count: 15, level: "Intermediate" },
];

const HrBeahvioralSkills = () => {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVis(true);
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bs-section" ref={ref}>
      <div className="sh"><span className="eyebrow">✦ Skill Assessment</span><h2 className="stitle">Behavioral <span className="acc">Skills</span></h2></div>
      <div className={`bs-grid ${vis ? "bs-visible" : ""}`}>
        {BEHAVIORAL_SKILLS.map((sk, i) => (
          <div key={sk.name} className="bs-card" style={{ "--bsi": i }}>
            <div className="bsc-shimmer" />
            <div className="bsc-top">
              <span className="bsc-icon">{sk.icon}</span>
              <span className="bsc-level">{sk.level}</span>
            </div>
            <div className="bsc-name">{sk.name}</div>
            <div className="bsc-pct-row">
              <span className="bsc-pct-val">{sk.pct}%</span>
              <span className="bsc-practice">{sk.count} sessions</span>
            </div>
            <div className="bsc-bar">
              <div className="bsc-bar-fill" style={{ width: vis ? `${sk.pct}%` : "0%", transitionDelay: `${i * 0.08 + 0.3}s` }} />
            </div>
            <button className="bsc-btn">Practice Now →</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HrBeahvioralSkills;