import React, { useState, useEffect, useRef } from "react";
import "./DSATopicCards.css";

const TOPICS = [
  { id: "arrays",       icon: "🔢", name: "Arrays",               count: 120, solved: 87 },
  { id: "linked-list",  icon: "🔗", name: "Linked List",          count: 65,  solved: 40 },
  { id: "trees",        icon: "🌳", name: "Trees",                count: 80,  solved: 52 },
  { id: "graphs",       icon: "🕸️", name: "Graphs",               count: 55,  solved: 20 },
  { id: "dp",           icon: "🧠", name: "Dynamic Programming",  count: 90,  solved: 35 },
  { id: "backtracking", icon: "↩️", name: "Backtracking",         count: 40,  solved: 18 },
  { id: "greedy",       icon: "💰", name: "Greedy",               count: 48,  solved: 30 },
  { id: "recursion",    icon: "🔄", name: "Recursion",            count: 35,  solved: 28 },
];

function DSATopicCards() {
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
    <div className="section-wrap">
      <div className="section-head">
        <div>
          <span className="section-eyebrow">✦ Browse by Topic</span>
          <h2 className="section-title">
            Choose Your <span className="accent-text">Focus Area</span>
          </h2>
        </div>
        <button className="view-all-btn">View All Topics →</button>
      </div>

      <div className={`topic-grid ${visible ? "topic-grid--visible" : ""}`} ref={ref}>
        {TOPICS.map((t, i) => {
          const pct = Math.round((t.solved / t.count) * 100);
          return (
            <div key={t.id} className="topic-card" style={{ "--ti": i }}>
              <div className="topic-card-shimmer" />
              <div className="topic-card-icon">{t.icon}</div>
              <div className="topic-card-name">{t.name}</div>
              <div className="topic-card-count">{t.count} problems</div>
              <div className="topic-card-progress">
                <div className="topic-progress-bar">
                  <div
                    className="topic-progress-fill"
                    style={{
                      width: visible ? `${pct}%` : "0%",
                      transitionDelay: `${i * 0.08 + 0.4}s`,
                    }}
                  />
                </div>
                <span className="topic-progress-pct">{pct}%</span>
              </div>
              <div className="topic-card-footer">
                <span>{t.solved} solved</span>
                <button className="topic-start-btn">Start →</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DSATopicCards;