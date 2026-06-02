import React from "react";
import "./FrontendTopicCategories.css";

export default function FrontendTopicCategories() {
    const categories = [
        { title: "HTML Dom Matrix", icon: "🌐", questions: 45, level: "Easy", progress: 85 },
        { title: "Advanced CSS Layouts", icon: "🎨", questions: 60, level: "Medium", progress: 60 },
        { title: "Core JavaScript Engine", icon: "⚙️", questions: 120, level: "Hard", progress: 40 },
        { title: "React Architecture", icon: "⚛️", questions: 95, level: "Hard", progress: 30 },
        { title: "State Machinery", icon: "📦", questions: 40, level: "Medium", progress: 15 },
        { title: "Web Performance Opt", icon: "⚡", questions: 55, level: "Hard", progress: 10 },
    ];

    return (
        <section>
            <h2 className="fe-section-title">Topic Classification Focus Blocks</h2>
            <p className="fe-section-subtitle">Deep dive target modules built around specialized functional topics.</p>

            <div className="fe-topic-grid">
                {categories.map((cat, idx) => (
                    <div key={idx} className="fe-card fe-topic-card">
                        <div className="fe-tc-icon-row">
                            <span className="fe-tc-icon">{cat.icon}</span>
                            <span className={`fe-tc-level fe-tc-${cat.level.toLowerCase()}`}>{cat.level}</span>
                        </div>

                        <h3 className="fe-tc-title">{cat.title}</h3>
                        <div className="fe-tc-qcount">{cat.questions} Dedicated Questions</div>

                        <div className="fe-tc-progress-wrap">
                            <div className="fe-tc-progress-bar"><div className="fe-tc-progress-fill" style={{ width: `${cat.progress}%` }} /></div>
                            <span className="fe-tc-progress-txt">{cat.progress}%</span>
                        </div>

                        <button className="fe-tc-btn">Start Practice →</button>
                    </div>
                ))}
            </div>
        </section>
    );
}