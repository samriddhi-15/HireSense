import React, { useState } from "react";
import "./FrontendRoadmap.css";

export default function FrontendRoadmap() {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const steps = [
        { name: "HTML Fundamentals", progress: 100, level: "Easy", desc: "Semantic tags, accessibility guidelines (WCAG), SEO metadata mechanisms." },
        { name: "CSS & Responsive Layouts", progress: 90, level: "Medium", desc: "Flexbox structures, CSS Grids, custom property containment, container queries." },
        { name: "JavaScript Engine Core & ES6+", progress: 75, level: "Hard", desc: "Prototypal inheritances, closures lifecycle, Event Loop microtask alignment." },
        { name: "DOM & Native Browser APIs", progress: 60, level: "Medium", desc: "Bubbling routing, mutation observers, intersection management layers." },
        { name: "React Dynamic Lifecycles", progress: 40, level: "Hard", desc: "Fiber tree diffing, state scheduling, custom hook engine construction." },
        { name: "Frontend System Design", progress: 0, level: "Hard", desc: "Micro-frontends, caching strategies, static vs server composition pipelines." }
    ];

    return (
        <section className="fe-card">
            <h2 className="fe-section-title">Engineering Learning Roadmap</h2>
            <p className="fe-section-subtitle">Follow this step-by-step master path to map structural frontend execution layers.</p>

            <div className="fe-roadmap-timeline">
                {steps.map((step, idx) => (
                    <div
                        key={idx}
                        className={`fe-roadmap-item ${step.progress === 100 ? "fe-rm-completed" : step.progress > 0 ? "fe-rm-active" : ""}`}
                        onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                    >
                        <div className="fe-roadmap-node">
                            <div className="fe-node-circle">{step.progress === 100 ? "✓" : idx + 1}</div>
                            {idx < steps.length - 1 && <div className="fe-node-line" />}
                        </div>

                        <div className="fe-roadmap-content">
                            <div className="fe-rm-header">
                                <h4 className="fe-rm-name">{step.name}</h4>
                                <div className="fe-rm-meta">
                                    <span className={`fe-rm-badge fe-rm-${step.level.toLowerCase()}`}>{step.level}</span>
                                    <span className="fe-rm-pct">{step.progress}% Complete</span>
                                </div>
                            </div>

                            {expandedIndex === idx && (
                                <div className="fe-rm-details">
                                    <p>{step.desc}</p>
                                    <div className="fe-rm-skeleton">
                                        <div className="fe-skeleton-line" style={{ width: '90%' }} />
                                        <div className="fe-skeleton-line" style={{ width: '60%' }} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}