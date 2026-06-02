import React from "react";
import "./FrontendPerformance.css";

export default function FrontendPerformance() {
    const telemetry = [
        { label: "Queries Resolved", val: "184 / 500", accent: "var(--accent-amber)" },
        { label: "Precision Rate", val: "88.2%", accent: "var(--accent-blue)" },
        { label: "Active Momentum", val: "18 Days", accent: "#22c55e" }
    ];

    return (
        <section className="fe-analytics-panel">
            {telemetry.map((t, idx) => (
                <div key={idx} className="fe-card fe-analytics-card" style={{ "--accent-bar": t.accent }}>
                    <span className="fe-an-label">{t.label}</span>
                    <h3 className="fe-an-value">{t.val}</h3>
                    <div className="fe-an-track"><div className="fe-an-fill" /></div>
                </div>
            ))}
        </section>
    );
}