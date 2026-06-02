import React from "react";
import "./DailyRelatedTopics.css";

const TOPICS = [
    { icon: "🔢", label: "Arrays", count: 120 },
    { icon: "🔤", label: "Strings", count: 85 },
    { icon: "🌳", label: "Trees", count: 75 },
    { icon: "🧠", label: "Dynamic Programming", count: 90 },
    { icon: "🕸️", label: "Graphs", count: 60 },
];

export default function DailyRelatedTopics() {
    return (
        <section className="topics-section">
            <div className="prog-header">
                <span className="eyebrow">✦ Browse by Topic</span>
                <h2 className="section-title">Related <span className="acc">Topics</span></h2>
            </div>
            <div className="topics-grid">
                {TOPICS.map((t, i) => (
                    <div key={t.label} className="topic-chip" style={{ "--ti": i }}>
                        <div className="tc-shimmer" />
                        <span className="tc-icon">{t.icon}</span>
                        <div className="tc-info">
                            <div className="tc-label">{t.label}</div>
                            <div className="tc-count">{t.count} problems</div>
                        </div>
                        <span className="tc-arrow">→</span>
                    </div>
                ))}
            </div>
        </section>
    );
}