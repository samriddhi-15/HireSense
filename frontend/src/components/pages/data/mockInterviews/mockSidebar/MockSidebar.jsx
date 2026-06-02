import React, { useState } from "react";
import "./MockSidebar.css";
import CircularProgress from "../sharedComponents/CircularProgress";
import AnimatedBar from "../sharedComponents/AnimatedBar";

const MockSidebar = ({
    interview
}) => {

    const [expanded, setExpanded] = useState(true);

    const analytics =
        interview?.analytics || {};

    const overallScore =
        interview?.overallScore || 0;

    const METRICS = [
        {
            label: "Confidence",
            val: analytics.confidence || 0,
            color: "#f5a623"
        },
        {
            label: "Communication",
            val: analytics.communication || 0,
            color: "#4a9fd5"
        },
        {
            label: "Technical Accuracy",
            val: analytics.technicalAccuracy || 0,
            color: "#e8920f"
        },
        {
            label: "Problem Solving",
            val: analytics.problemSolving || 0,
            color: "#f5a623"
        },
        {
            label: "Fluency",
            val: analytics.fluency || 0,
            color: "#4a9fd5"
        }
    ];

    const grade =
        overallScore >= 90 ? "A+" :
            overallScore >= 80 ? "A" :
                overallScore >= 70 ? "B" :
                    overallScore >= 60 ? "C" :
                        overallScore >= 50 ? "D" :
                            "F";

    return (

        <div className={`feedback-sidebar ${expanded ? "fs-open" : ""}`}>
            <button className="fs-toggle" onClick={() => setExpanded(!expanded)}>
                {expanded ? "→" : "← Feedback"}
            </button>
            {expanded && (
                <div className="fs-content">
                    <div className="fs-score-wrap">
                        <div className="fs-score-label">Overall Score</div>
                        <CircularProgress val={overallScore} size={90} color="#f5a623" />
                        <div className="fs-score-grade">Grade: {grade}</div>
                    </div>
                    <div className="fs-metrics">
                        {METRICS.map((m, i) => (
                            <div key={m.label} className="fs-metric">
                                <div className="fs-metric-row">
                                    <span className="fs-metric-label">{m.label}</span>
                                    <span className="fs-metric-val" style={{ color: m.color }}>{m.val}%</span>
                                </div>
                                <AnimatedBar val={m.val} color={m.color} delay={i * 100} />
                            </div>
                        ))}
                    </div>
                    <div className="fs-suggestion">
                        <div className="fs-sug-head">💡 AI Suggestions</div>
                        <ul className="fs-sug-list">
                            <li>Use more specific examples with metrics</li>
                            <li>Structure answers with STAR method</li>
                            <li>Slow down speech for clarity</li>
                            <li>Elaborate on technical depth</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MockSidebar;