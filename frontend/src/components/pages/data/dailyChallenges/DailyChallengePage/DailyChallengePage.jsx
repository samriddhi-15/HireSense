import React, { useState } from "react";
import "./DailyChallengePage.css";
import DiffBadge from "../DiffBadge/DiffBadge";
import DailyProgress from "../DailyProgress/DailyProgress";
import DailyMotivation from "../DailyMotivation/DailyMotivation";
import DailyRelatedTopics from "../DailyRelatedTopics/DailyRelatedTopics";

export default function DailyChallengePage({ challenge, onBack }) {
  const [started, setStarted] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);

  return (
    <div className="cp-page">
      <button className="back-btn" onClick={onBack}>← Back to Challenges</button>

      <section className="cp-hero">
        <div className="cp-hero-blobs"><div className="cpb1"/><div className="cpb2"/></div>
        <div className="cp-hero-content">
          <div className="cp-hero-badge"><span className="cp-dot"/>Daily Challenge · {new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}</div>
          <h1 className="cp-hero-title">Daily Coding<br/><span className="cp-accent">Challenge</span></h1>
          <p className="cp-hero-sub">Solve one interview-level problem daily to build consistency and improve your problem-solving skills.</p>
          <div className="cp-hero-meta">
            <div className="cp-meta-chip">🔥 <strong>28</strong> Day Streak</div>
            <DiffBadge d={challenge.difficulty} large />
            <div className="cp-meta-chip">⏱ {challenge.time}</div>
            <div className="cp-meta-chip">📚 {challenge.topic}</div>
          </div>
        </div>
      </section>

      <section className="cp-card-section">
        <div className="cp-card glass-card">
          <div className="cp-card-header">
            <div className="cp-card-left">
              <div className="cp-problem-num">Problem of the Day</div>
              <h2 className="cp-problem-title">{challenge.title}</h2>
              <div className="cp-tags">
                <DiffBadge d={challenge.difficulty} />
                {challenge.tags.map(t => <span key={t} className="cp-tag">{t}</span>)}
              </div>
            </div>
            <div className="cp-card-right">
              <div className="cp-time-ring">
                <div className="ctr-label">Est.</div>
                <div className="ctr-val">{challenge.time.replace(" mins","")}</div>
                <div className="ctr-unit">mins</div>
              </div>
            </div>
          </div>

          <div className="cp-desc">{challenge.desc}</div>

          <div className="cp-example">
            <div className="cp-ex-title">Example</div>
            <div className="cp-ex-block">
              <div className="cp-ex-row"><span className="cp-ex-label">Input</span><code className="cp-ex-code">{challenge.example.input}</code></div>
              <div className="cp-ex-row"><span className="cp-ex-label">Output</span><code className="cp-ex-code">{challenge.example.output}</code></div>
              <div className="cp-ex-explain">💡 {challenge.example.explain}</div>
            </div>
          </div>

          <div className="cp-constraints">
            <div className="cp-ex-title">Constraints</div>
            <ul className="cp-constraint-list">
              {challenge.constraints.map((c,i) => <li key={i}>{c}</li>)}
            </ul>
          </div>

          <div className="cp-card-actions">
            {!started ? (
              <button className="btn-primary" onClick={() => setStarted(true)}>🚀 Start Challenge</button>
            ) : (
              <div className="cp-started">
                <span className="cp-started-icon">✓</span>
                <span className="cp-started-text">Challenge Accepted! Open your editor and solve it.</span>
              </div>
            )}
            <button className="btn-outline" onClick={() => setHintOpen(!hintOpen)}>💡 {hintOpen ? "Hide" : "Show"} Hint</button>
            <button className="btn-outline">🔖 Bookmark</button>
          </div>

          {hintOpen && (
            <div className="cp-hint">
              <div className="cp-hint-head">💡 Hint</div>
              <p>Think about how you can use a hash map for O(1) lookups, or consider a single-pass dynamic programming approach.</p>
            </div>
          )}
        </div>
      </section>

      <DailyProgress />
      <DailyMotivation />
      <DailyRelatedTopics />
    </div>
  );
}