import React from "react";
import "./FrontendRecommended.css";

export default function FrontendRecommended() {
    const docs = [
        { title: "React Fiber Architecture Internal Spec", type: "Technical Sheet", scope: "Advanced" },
        { title: "V8 Engine Memory Lifecycle & GC Handlers", type: "Core Guide", scope: "Deep Dive" },
        { title: "WAI-ARIA Accessibility Integration Guidelines", type: "Compliance Doc", scope: "Standard" }
    ];

    return (
        <section>
            <h2 className="fe-section-title">Essential Architecture Blueprints</h2>
            <p className="fe-section-subtitle">Curated baseline operational reference material for code compilation validation metrics.</p>

            <div className="fe-res-list">
                {docs.map((d, idx) => (
                    <div key={idx} className="fe-card fe-res-row">
                        <div className="fe-res-info">
                            <span className="fe-res-icon">📁</span>
                            <div>
                                <h4 className="fe-res-title">{d.title}</h4>
                                <span className="fe-res-meta">{d.type} · Scope: {d.scope}</span>
                            </div>
                        </div>
                        <button className="fe-res-action-btn">Fetch Source</button>
                    </div>
                ))}
            </div>
        </section>
    );
}