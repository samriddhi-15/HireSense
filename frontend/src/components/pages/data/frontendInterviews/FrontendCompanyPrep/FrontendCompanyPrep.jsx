import React from "react";
import "./FrontendCompanyPrep.css";

export default function FrontendCompanyPrep() {
  const companies = [
    { name: "Google", tags: ["V8 Heap Internals", "Service Workers Matrix"], slots: "3 Rounds", level: "Ultra Hard" },
    { name: "Meta", tags: ["Dynamic Context trees", "Batch Commit Pipelines"], slots: "2 Rounds", level: "Hard" },
    { name: "Netflix", tags: ["Dynamic Stream Shifting", "CSS Repaint Profiles"], slots: "3 Rounds", level: "Hard" },
    { name: "Amazon", tags: ["Event Loop Prioritizations", "Hydration Scaffolds"], slots: "2 Rounds", level: "Medium" }
  ];

  return (
    <section>
      <h2 className="fe-section-title">Corporate Targeted Prep Portals</h2>
      <p className="fe-section-subtitle">Examine customized question catalogs prioritized inside specific organizational tracks.</p>

      <div className="fe-comp-grid">
        {companies.map((co, idx) => (
          <div key={idx} className="fe-card fe-comp-card">
            <div className="fe-co-head">
              <h3 className="fe-co-name">{co.name}</h3>
              <span className="fe-co-level">{co.level}</span>
            </div>
            
            <div className="fe-co-meta">{co.slots} Allocation Matrix</div>
            
            <div className="fe-co-topics">
              {co.tags.map((t, i) => <span key={i} className="fe-co-topic-pill">🎯 {t}</span>)}
            </div>

            <button className="fe-co-btn">Browse Corporate Matrix</button>
          </div>
        ))}
      </div>
    </section>
  );
}