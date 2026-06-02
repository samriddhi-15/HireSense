import React, { useState, useEffect, useRef } from "react";
import "./HrAiSuggestions.css";

const recs = [
  { icon: "🎯", title: "Weak Areas", desc: "Your conflict resolution score is 55%. Focus on STAR-based conflict examples.", tag: "Priority", color: "#e8920f" },
  { icon: "📚", title: "Recommended Topics", desc: "Practice 'Leadership under pressure' and 'Team disagreement' HR scenarios.", tag: "Suggested", color: "#4a9fd5" },
  { icon: "💪", title: "Confidence Boost", desc: "Record yourself answering questions and review posture, pace, and eye contact.", tag: "Exercise", color: "#f5a623" },
  { icon: "📝", title: "Resume Tips", desc: "Align your resume stories with the behavioral questions you practice most.", tag: "Career", color: "#f5a623" },
];

const HrAiSuggestions = () => {
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
    <section className="sug-section" ref={ref}>
      <div className="sh"><span className="eyebrow">✦ Personalized for You</span><h2 className="stitle">AI <span className="acc">Suggestions</span></h2></div>
      <div className={`sug-grid ${vis ? "sug-visible" : ""}`}>
        {recs.map((r, i) => (
          <div key={r.title} className="sug-card" style={{ "--ri": i, "--rc": r.color }}>
            <div className="sug-shimmer" />
            <div className="sug-icon">{r.icon}</div>
            <div className="sug-tag" style={{ background: `${r.color}20`, color: r.color }}>{r.tag}</div>
            <div className="sug-title">{r.title}</div>
            <div className="sug-desc">{r.desc}</div>
            <button className="sug-btn">Explore →</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HrAiSuggestions;