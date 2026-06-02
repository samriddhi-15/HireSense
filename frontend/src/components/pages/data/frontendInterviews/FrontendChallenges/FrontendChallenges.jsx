import React from "react";
import "./FrontendChallenges.css";

export default function FrontendChallenges() {
    const challenges = [
        { title: "Infinite Scrolling Hub", time: "45 mins", diff: "Medium", tech: ["IntersectionObserver", "DOM Matrix"] },
        { title: "Nested Drag-Drop List Nodes", time: "60 mins", diff: "Hard", tech: ["HTML5 Drag API", "State Trees"] },
        { title: "Debounced Multi-Source Search", time: "30 mins", diff: "Easy", tech: ["Async Hooks", "Caching Map"] },
        { title: "Atomic Design Dashboard", time: "90 mins", diff: "Hard", tech: ["CSS Grid", "Container Queries"] }
    ];

    return (
        <section>
            <h2 className="fe-section-title">Asynchronous Feature Mock Laboratories</h2>
            <p className="fe-section-subtitle">Hands-on layout construction assignments evaluating UI state consistency under pressure.</p>

            <div className="fe-chall-grid">
                {challenges.map((ch, idx) => (
                    <div key={idx} className="fe-card fe-chall-card">
                        <div className="fe-ch-top">
                            <span className="fe-ch-time">⏱ {ch.time}</span>
                            <span className={`fe-ch-diff fe-ch-${ch.diff.toLowerCase()}`}>{ch.diff}</span>
                        </div>

                        <h3 className="fe-ch-title">{ch.title}</h3>

                        <div className="fe-ch-techs">
                            {ch.tech.map((t, i) => <span key={i} className="fe-ch-tech">{t}</span>)}
                        </div>

                        <button className="fe-ch-btn">Launch Simulator →</button>
                    </div>
                ))}
            </div>
        </section>
    );
}