import React from "react";
import "./FrontendHero.css";

export default function FrontendHero() {
  const tags = ["React", "JavaScript", "HTML & CSS", "Web APIs", "Performance", "System Design", "MERN Stack"];
  
  return (
    <header className="fe-hero">
      <div className="fe-hero-bg-blobs">
        <div className="fe-blob fe-blob-1" />
        <div className="fe-blob fe-blob-2" />
      </div>
      
      <div className="fe-hero-container">
        <div className="fe-hero-info">
          <div className="fe-hero-tagline">✦ Premium Frontend Track</div>
          <h1 className="fe-hero-heading">Frontend Interview Preparation</h1>
          <p className="fe-hero-sub">
            Master runtime engineering, deeply understand UI architectures, optimize rendering pipelines, and ace tough technical mock evaluation matrices.
          </p>
          
          <div className="fe-hero-tags">
            {tags.map((tag, i) => (
              <span key={i} className="fe-hero-tag">{tag}</span>
            ))}
          </div>

          <div className="fe-hero-readiness">
            <div className="fe-readiness-label">
              <span>Interview Readiness Score</span>
              <strong>74%</strong>
            </div>
            <div className="fe-readiness-bar"><div className="fe-readiness-fill" style={{width: "74%"}} /></div>
          </div>

          <div className="fe-hero-actions">
            <button className="fe-btn-primary">Start Learning →</button>
            <button className="fe-btn-secondary">Take Mock Interview</button>
          </div>
        </div>

        <div className="fe-hero-visual">
          <div className="fe-hero-code-box">
            <div className="fe-code-box-header">
              <span className="fe-dot fe-dot-r" /><span className="fe-dot fe-dot-y" /><span className="fe-dot fe-dot-g" />
              <span className="fe-code-filename">useFiberRoot.ts</span>
            </div>
            <pre className="fe-code-text">
{`const reconcileChildren = (current, workInProgress, nextChildren) => {
  if (current === null) {
    workInProgress.child = mountChildFibers(workInProgress, null, nextChildren);
  } else {
    workInProgress.child = reconcileChildFibers(workInProgress, current.child, nextChildren);
  }
};`}
            </pre>
          </div>
          <div className="fe-float-badge fe-fb-1">🚀 Virtual DOM</div>
          <div className="fe-float-badge fe-fb-2">⚡ Event Loop</div>
        </div>
      </div>
    </header>
  );
}