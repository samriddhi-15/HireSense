import React from "react";
import "./HrHistoryAchievements.css";

const ACHIEVEMENTS = [
  { icon: "🔥", label: "7-Day Streak", desc: "Practiced 7 days in a row", earned: true },
  { icon: "🎯", label: "Perfect Answer", desc: "Score 100% on a question", earned: true },
  { icon: "💎", label: "Elite Performer", desc: "Top 5% this week", earned: false },
  { icon: "🚀", label: "Fast Learner", desc: "Improve 20% in a week", earned: true },
  { icon: "🏆", label: "Interview Champion", desc: "Complete 50 mock sessions", earned: false },
  { icon: "⭐", label: "Star Communicator", desc: "Score 90+ in communication", earned: false },
];

const HrHistoryAchievements = () => {
  const streak = [true, true, true, true, true, true, false, true, true, true, true, true, false, true];
  return (
    <section className="ha-section">
      <div className="ha-grid">
        <div className="glass-card">
          <div className="gc-head">🔥 Daily Practice Streak</div>
          <div className="streak-big">28<span className="streak-unit">days</span></div>
          <div className="streak-sub">Personal best! Keep going 🚀</div>
          <div className="streak-dots">
            {streak.map((d, i) => <div key={i} className={`sdot-sq ${d ? "sd-done" : ""}`} />)}
          </div>
          <div className="goal-row">
            <div className="goal-item"><div className="goal-label">Daily Goal</div><div className="goal-val">3/5 questions</div></div>
            <div className="goal-item"><div className="goal-label">XP Today</div><div className="goal-val">240 ⭐</div></div>
            <div className="goal-item"><div className="goal-label">Total XP</div><div className="goal-val">3,840 ⭐</div></div>
          </div>
        </div>

        <div className="glass-card">
          <div className="gc-head">🏆 Achievements</div>
          <div className="ach-grid">
            {ACHIEVEMENTS.map((a) => (
              <div key={a.label} className={`ach-item ${a.earned ? "ach-earned" : ""}`}>
                <div className="ach-icon">{a.icon}</div>
                <div className="ach-label">{a.label}</div>
                <div className="ach-desc">{a.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card">
          <div className="gc-head">🥇 Leaderboard</div>
          {[["Priya N.", "3,420 XP", "🥇"], ["James O.", "3,200 XP", "🥈"], ["Sarah M.", "3,040 XP", "🥉"], ["You", "3,840 XP", "⭐"]].map(([n, x, m]) => (
            <div key={n} className={`lb-row ${n === "You" ? "lb-you" : ""}`}>
              <span className="lb-medal">{m}</span>
              <span className="lb-name">{n}</span>
              <span className="lb-xp">{x}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HrHistoryAchievements;