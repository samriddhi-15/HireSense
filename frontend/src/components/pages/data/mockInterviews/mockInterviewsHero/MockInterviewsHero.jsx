import React, { useState, useEffect } from "react";
import "./MockInterviewsHero.css";
import DiffBadge from "../sharedComponents/DiffBadge";

const MockInterviewsHero = ({ onSetup }) => {
  const [typed, setTyped] = useState(0);
  const words = ["Master Technical Interviews.", "Ace System Design.", "Build Interview Confidence.", "Get Your Dream Job."];
  const [wi, setWi] = useState(0);

  useEffect(() => {
    const word = words[wi];
    if (typed < word.length) {
      const t = setTimeout(() => setTyped(typed + 1), 60);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setTyped(0);
      setWi((wi + 1) % words.length);
    }, 2000);
    return () => clearTimeout(t);
  }, [typed, wi]);

  return (
    <section className="hs">
      <div className="hs-blobs"><div className="hs-b1" /><div className="hs-b2" /><div className="hs-b3" /></div>
      <div className="hs-left">
        <div className="hs-aibadge">
          <span className="ai-dot" />AI-Powered Interview Coach
        </div>
        <h1 className="hs-title">AI Mock<br /><span className="hs-accent">Interview</span></h1>
        <div className="hs-typewriter">
          <span>{words[wi].slice(0, typed)}</span><span className="hs-cursor">|</span>
        </div>
        <p className="hs-sub">Experience a real interview simulation powered by advanced AI. Get real-time feedback, performance analytics, and personalized coaching to land your dream job.</p>
        <div className="hs-meta">
          <div className="hs-meta-item"><span className="hs-meta-icon">💼</span><div><div className="hs-meta-label">Role</div><div className="hs-meta-val">Frontend Engineer</div></div></div>
          <div className="hs-meta-item"><span className="hs-meta-icon">⏱</span><div><div className="hs-meta-label">Duration</div><div className="hs-meta-val">60 Minutes</div></div></div>
          <div className="hs-meta-item"><span className="hs-meta-icon">🎯</span><div><div className="hs-meta-label">Difficulty</div><div className="hs-meta-val"><DiffBadge d="Medium" /></div></div></div>
        </div>
        <div className="hs-status">
          <span className="status-dot pulse" />
          <span className="status-text">AI Ready · Systems initialized · Camera detected</span>
        </div>
        <div className="hs-actions">
          <button className="btn-primary" onClick={onSetup}>🚀 Start Interview</button>
          <button className="btn-outline">📋 View Sample Questions</button>
        </div>
      </div>
      <div className="hs-right">
        <div className="hs-visual-card">
          <div className="hs-vc-head">
            <div className="ai-avatar-small">🤖</div>
            <div><div className="hs-vc-name">HireSense AI</div><div className="hs-vc-sub">Senior Interview Coach</div></div>
            <div className="live-badge">● LIVE</div>
          </div>
          <div className="hs-vc-stats">
            {[["12K+", "Interviews Conducted"], ["94%", "Placement Rate"], ["4.9★", "Average Rating"]].map(([v, l]) => (
              <div key={l} className="hs-vc-stat"><div className="hs-vc-stat-val">{v}</div><div className="hs-vc-stat-label">{l}</div></div>
            ))}
          </div>
          <div className="hs-vc-features">
            {["Real-time speech analysis", "AI-generated follow-ups", "Instant scoring & feedback", "Industry-specific questions"].map(f => (
              <div key={f} className="hs-feature-row"><span className="check-icon">✓</span>{f}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MockInterviewsHero;