import React, { useState, useEffect } from "react";
import "./HrInterviewHero.css";
import AnimationBar from "../SharedComponents/AnimationBar";

const HrInterviewHero = ({ onSetup }) => {
  const [typed, setTyped] = useState(0);
  const words = ["Master Behavioral Interviews.", "Ace HR Rounds.", "Build Real Confidence.", "Land Your Dream Role."];
  const [wi, setWi] = useState(0);

  useEffect(() => {
    const w = words[wi];
    if (typed < w.length) {
      const t = setTimeout(() => setTyped(typed + 1), 65);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setTyped(0);
      setWi((wi + 1) % words.length);
    }, 2200);
    return () => clearTimeout(t);
  }, [typed, wi]);

  const quotes = [
    { text: "Tell me about yourself", from: "Classic HR" },
    { text: "Why should we hire you?", from: "Motivation" },
    { text: "Describe a challenge you faced", from: "Behavioral" },
  ];
  const [qIdx, setQIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setQIdx((i) => (i + 1) % quotes.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero">
      <div className="hero-blobs">
        <div className="hb1" />
        <div className="hb2" />
        <div className="hb3" />
      </div>
      <div className="hero-left">
        <div className="ai-badge">
          <span className="ai-dot" />AI-Powered HR Interview Coach
        </div>
        <h1 className="hero-title">HR Interview<br /><span className="hero-accent">Preparation</span></h1>
        <div className="hero-typewriter">
          {words[wi].slice(0, typed)}
          <span className="cursor">|</span>
        </div>
        <p className="hero-sub">
          Master behavioral interviews, HR rounds, and communication assessments with our intelligent AI interviewer. Real questions, real feedback, real results.
        </p>

        <div className="hero-score-row">
          <div className="hs-card">
            <div className="hs-card-label">HR Readiness Score</div>
            <div className="hs-card-val">78<span className="hs-card-unit">%</span></div>
            <AnimationBar val={78} color="#f5a623" />
            <div className="hs-card-sub">+12% from last week</div>
          </div>
          <div className="hs-card">
            <div className="hs-card-label">Sessions Completed</div>
            <div className="hs-card-val">24</div>
            <AnimationBar val={65} color="#4a9fd5" />
            <div className="hs-card-sub">Goal: 40 sessions</div>
          </div>
        </div>

        <div className="hero-status">
          <span className="live-dot pulse" />AI Interviewer Ready · Mic Detected · Camera Active
        </div>
        <div className="hero-actions">
          <button className="btn-primary" onClick={onSetup}>🚀 Start HR Interview</button>
          <button className="btn-outline">📋 Practice Questions</button>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-visual">
          <div className="hv-avatar">
            <div className="hv-ring r1" />
            <div className="hv-ring r2" />
            <div className="hv-ring r3" />
            <div className="hv-face">🤖</div>
          </div>
          <div className="hv-name">HireSense AI</div>
          <div className="hv-title">Senior HR Interview Coach</div>
          <div className="hv-stats-row">
            {[["50K+", "Interviews"], ["96%", "Success Rate"], ["4.9★", "Rating"]].map(([v, l]) => (
              <div key={l} className="hv-stat">
                <div className="hv-sv">{v}</div>
                <div className="hv-sl">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="quote-bubble" key={qIdx}>
          <div className="qb-label">❓ {quotes[qIdx].from}</div>
          <div className="qb-text">"{quotes[qIdx].text}"</div>
        </div>

        <div className="float-chip fc1">🔥 28-Day Streak</div>
        <div className="float-chip fc2">⭐ Top 8% This Week</div>
      </div>
    </section>
  );
};

export default HrInterviewHero;