import React, { useState } from "react";
import "./HrSidebar.css";
import CircleScore from "../SharedComponents/CircleScore";
import AnimationBar from "../SharedComponents/AnimationBar";

const FEEDBACK_METRICS = [
    { label: "Confidence", val: 76, color: "#f5a623" },
    { label: "Communication", val: 83, color: "#4a9fd5" },
    { label: "Fluency", val: 88, color: "#e8920f" },
    { label: "Leadership", val: 65, color: "#f5a623" },
    { label: "Body Language", val: 70, color: "#4a9fd5" },
];

const HrSidebar = ({ show }) => {
    const [open, setOpen] = useState(true);
    if (!show) return null;

    return (
        <div className={`fsb ${open ? "fsb-open" : ""}`}>
            <button className="fsb-toggle" onClick={() => setOpen(!open)}>
                {open ? "→" : "← Feedback"}
            </button>
            {open && (
                <div className="fsb-inner">
                    <div className="fsb-score">
                        <div className="fsb-slabel">HR Performance</div>
                        <CircleScore val={78} size={88} color="#f5a623" />
                        <div className="fsb-grade">Grade: B+</div>
                    </div>
                    <div className="fsb-metrics">
                        {FEEDBACK_METRICS.map((m, i) => (
                            <div key={m.label} className="fsb-met">
                                <div className="fsb-met-row">
                                    <span className="fsb-ml">{m.label}</span>
                                    <span className="fsb-mv" style={{ color: m.color }}>{m.val}%</span>
                                </div>
                                <AnimationBar val={m.val} color={m.color} delay={i * 80} />
                            </div>
                        ))}
                    </div>
                    <div className="fsb-sug">
                        <div className="fsb-sug-head">💡 AI Tips</div>
                        {["Maintain better eye contact", "Use more structured STAR examples", "Reduce filler words (um, like)", "Speak at a measured pace"].map((t) => (
                            <div key={t} className="fsb-tip">• {t}</div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HrSidebar;