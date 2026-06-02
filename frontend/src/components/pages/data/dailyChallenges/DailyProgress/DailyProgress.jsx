import React, { useState, useEffect, useRef } from "react";
import "./DailyProgress.css";

function useCounter(target, start = false, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let s = null;
    const step = (ts) => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(e * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return val;
}

export default function DailyProgress() {
  const [go, setGo] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setGo(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const c1 = useCounter(147, go, 1400);
  const c2 = useCounter(28, go, 1200);
  const c3 = useCounter(84, go, 1600);

  const stats = [
    { icon: "✅", label: "Completed", val: c1, suffix: "", color: "#4a9fd5", sub: "problems solved" },
    { icon: "🔥", label: "Current Streak", val: c2, suffix: " days", color: "#f5a623", sub: "personal best!" },
    { icon: "🎯", label: "Accuracy", val: c3, suffix: "%", color: "#e8920f", sub: "above average" },
  ];

  return (
    <section className="prog-section" ref={ref}>
      <div className="prog-header">
        <span className="eyebrow">✦ Your Progress</span>
        <h2 className="section-title">Keep the <span className="acc">Momentum</span></h2>
      </div>
      <div className="prog-grid">
        {stats.map((s, i) => (
          <div key={s.label} className="prog-card glass-card" style={{ "--pi": i, "--pc": s.color }}>
            <div className="prog-card-shimmer" />
            <div className="prog-icon">{s.icon}</div>
            <div className="prog-val" style={{ color: s.color }}>{s.val}{s.suffix}</div>
            <div className="prog-label">{s.label}</div>
            <div className="prog-sub">{s.sub}</div>
            <div className="prog-bar-track">
              <div className="prog-bar-fill" style={{ background: s.color, width: go ? `${s.val}%` : '0%' }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}