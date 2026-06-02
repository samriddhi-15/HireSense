import React, { useState } from "react";
import "./HrQuesPanel.css";
import DiffBadge from "../SharedComponents/DiffBadge";

const HR_QUESTIONS = [
  { id: 1, num: "Q1", cat: "Introduction", diff: "Easy", text: "Tell me about yourself. Walk me through your background, experiences, and what makes you a strong candidate for this role." },
  { id: 2, num: "Q2", cat: "Motivation", diff: "Easy", text: "Why should we hire you? What unique value do you bring to this team that other candidates may not?" },
  { id: 3, num: "Q3", cat: "Behavioral", diff: "Medium", text: "Describe a challenging situation you faced at work or college. How did you handle it, and what was the outcome?" },
  { id: 4, num: "Q4", cat: "Self-Awareness", diff: "Medium", text: "What are your greatest strengths and your biggest weakness? How are you actively working to improve your weakness?" },
  { id: 5, num: "Q5", cat: "Company Fit", diff: "Medium", text: "Why do you want to join this company specifically? What excites you about our mission and culture?" },
  { id: 6, num: "Q6", cat: "Conflict", diff: "Hard", text: "Describe a conflict you faced within a team. How did you navigate the disagreement while maintaining professionalism?" },
];

const STAR_STEPS = [
  { key: "S", label: "Situation", color: "#f5a623", desc: "Set the context. Describe the specific situation or challenge you were in." },
  { key: "T", label: "Task", color: "#4a9fd5", desc: "Explain the task or responsibility you had in that situation." },
  { key: "A", label: "Action", color: "#e8920f", desc: "Describe the specific actions you took to handle the situation." },
  { key: "R", label: "Result", color: "#f5a623", desc: "Share the measurable outcomes and what you learned." },
];

const HrQuesPanel = () => {
  const [qi, setQi] = useState(2);
  const [bookmarked, setBookmarked] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);
  const [starOpen, setStarOpen] = useState(false);
  const q = HR_QUESTIONS[qi];

  return (
    <section className="qs-section">
      <div className="qs-card glass-card">
        <div className="qs-top">
          <div className="qs-left-meta">
            <span className="qs-num">{q.num}</span>
            <DiffBadge d={q.diff} />
            <span className="qs-cat-chip">{q.cat}</span>
          </div>
          <div className="qs-right-meta">
            <button className={`icon-btn ${bookmarked ? "bookmarked" : ""}`} onClick={() => setBookmarked(!bookmarked)}>🔖</button>
            <button className="icon-btn" onClick={() => setHintOpen(!hintOpen)}>💡</button>
            <button className="icon-btn" onClick={() => setStarOpen(!starOpen)}>⭐</button>
            <button className="icon-btn">🔁</button>
          </div>
        </div>
        <div className="qs-text">{q.text}</div>

        {hintOpen && (
          <div className="hint-box">
            <div className="hb-head">💡 AI Hint</div>
            <p>Use the <strong>STAR method</strong> — Situation, Task, Action, Result. Be specific with metrics and outcomes. Keep your answer between 90–120 seconds.</p>
          </div>
        )}
        {starOpen && (
          <div className="star-mini">
            {STAR_STEPS.map((s) => (
              <div key={s.key} className="star-mini-item" style={{ borderLeft: `3px solid ${s.color}` }}>
                <div className="smi-key" style={{ color: s.color }}>{s.key}</div>
                <div>
                  <div className="smi-label">{s.label}</div>
                  <div className="smi-desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="qs-nav">
          <button className="btn-outline" onClick={() => setQi(Math.max(0, qi - 1))} disabled={qi === 0}>← Previous</button>
          <div className="qs-dots">
            {HR_QUESTIONS.map((_, i) => (
              <div key={i} className={`qdot ${i === qi ? "qd-active" : ""} ${i < qi ? "qd-done" : ""}`} onClick={() => setQi(i)} />
            ))}
          </div>
          <button className="btn-primary" onClick={() => setQi(Math.min(HR_QUESTIONS.length - 1, qi + 1))} disabled={qi === HR_QUESTIONS.length - 1}>Next →</button>
        </div>
      </div>
    </section>
  );
};

export default HrQuesPanel;