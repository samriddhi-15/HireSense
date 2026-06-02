import React, { useState, useEffect, useRef } from "react";
import "./HrAnalytics.css";
import CircleScore from "../SharedComponents/CircleScore";
import AnimationBar from "../SharedComponents/AnimationBar";

const MOCK_HISTORY = [
  { date: "May 14, 2025", type: "HR Round", company: "Product Based", score: 84, duration: "42 min", level: "Advanced" },
  { date: "May 11, 2025", type: "Behavioral", company: "FAANG", score: 78, duration: "38 min", level: "Intermediate" },
  { date: "May 8, 2025", type: "Managerial", company: "Startup", score: 71, duration: "35 min", level: "Intermediate" },
  { date: "May 5, 2025", type: "Leadership", company: "Service Based", score: 88, duration: "50 min", level: "Expert" },
];

const HrAnalytics = () => {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVis(true);
    }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const topStats = [["84", "HR Score 🏆"], ["74%", "Completion"], ["A-", "Grade"], ["#1,247", "Ranking 🥇"]];
  const topicPerf = [["Communication", 88, "#f5a623"], ["Leadership", 65, "#4a9fd5"], ["Behavioral", 79, "#e8920f"], ["Team Skills", 91, "#f5a623"], ["Conflict Res.", 58, "#4a9fd5"]];

  return (
    <section className="an-section" ref={ref}>
      <div className="sh"><span className="eyebrow">✦ Performance Analytics</span><h2 className="stitle">HR Interview <span className="acc">Dashboard</span></h2></div>
      <div className={`an-top ${vis ? "an-visible" : ""}`}>
        {topStats.map(([v, l], i) => (
          <div key={l} className="an-stat" style={{ "--ani": i }}>
            <div className="ans-val">{v}</div>
            <div className="ans-label">{l}</div>
          </div>
        ))}
      </div>
      <div className="an-mid">
        <div className="glass-card">
          <div className="gc-head">Topic Performance</div>
          {topicPerf.map(([t, p, c], i) => (
            <div key={t} className="an-bar-row" style={{ "--anbi": i }}>
              <span className="an-bar-topic">{t}</span>
              <div className="an-bar-wrap">
                <div className="an-bar">
                  <div className="an-bar-fill" style={{ width: vis ? `${p}%` : "0%", background: `linear-gradient(90deg, ${c}, #4a9fd5)`, transitionDelay: `${i * 0.1}s` }} />
                </div>
                <span className="an-bar-pct" style={{ color: c }}>{p}%</span>
              </div>
            </div>
          ))}
        </div>
        <div className="glass-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <div className="gc-head" style={{ alignSelf: "flex-start" }}>Overall Score</div>
          <CircleScore val={84} size={130} color="#f5a623" />
          <div className="an-grade-row">
            {[["Communication", 83], ["Leadership", 68], ["Behavioral", 81]].map(([s, v]) => (
              <div key={s} className="agr-item">
                <div className="agr-label">{s}</div>
                <AnimationBar val={v} color="#f5a623" />
                <div className="agr-val">{v}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="glass-card" style={{ marginTop: 18 }}>
        <div className="gc-head">Mock Interview History</div>
        <table className="hist-table">
          <thead><tr>{["Date", "Type", "Company", "Score", "Duration", "Level"].map((h) => <th key={h}>{h}</th>)}</tr></thead>
          <tbody>
            {MOCK_HISTORY.map((h, i) => (
              <tr key={i} className="ht-row">
                <td>{h.date}</td>
                <td className="htd-type">{h.type}</td>
                <td className="htd-co">{h.company}</td>
                <td><span className="htd-score">{h.score}</span></td>
                <td className="htd-dur">{h.duration}</td>
                <td><span className="htd-level">{h.level}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default HrAnalytics;