import React, { useState, useEffect } from "react";
import "./MockInterviewInterface.css";



const MockInterviewInterface = ({
    onContinue,
    interviewStage
}) => {
    const [aiState, setAiState] = useState("speaking");
    const [seconds, setSeconds] = useState(0);
    const states = ["speaking", "thinking", "listening"];
    const timelineStages = ["Introduction", "Technical Round", "Coding Round", "HR Round", "Final Evaluation"];
    const currentStageIndex = {
        intro: 0,
        questions: 1,
        coding: 2,
        hr: 3,
        evaluation: 4
    }[interviewStage];

    useEffect(() => {
        const t = setInterval(() => setAiState(s => states[(states.indexOf(s) + 1) % 3]), 3000);
        return () => clearInterval(t);
    }, []);

    useEffect(() => {
        const t = setInterval(() => setSeconds(s => s + 1), 1000);
        return () => clearInterval(t);
    }, []);

    const fmt = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

    return (
        <section className="interview-interface">
            <div className="section-header">
                <span className="section-eyebrow">✦ Live Session</span>
                <h2 className="section-title">Interview <span className="accent">In Progress</span></h2>
            </div>
            <div className="ii-grid">
                <div className="ii-ai-card">
                    <div className="ai-avatar-wrap">
                        <div className="ai-pulse-ring ai-pulse-ring-1" />
                        <div className="ai-pulse-ring ai-pulse-ring-2" />
                        <div className="ai-pulse-ring ai-pulse-ring-3" />
                        <div className="ai-avatar-circle">
                            <span style={{ fontSize: 48 }}>🤖</span>
                        </div>
                    </div>
                    <div className="ai-state-badge">
                        <span className={`state-dot state-${aiState}`} />
                        <span className="state-text">{aiState.charAt(0).toUpperCase() + aiState.slice(1)}…</span>
                    </div>
                    {aiState === "speaking" && (
                        <div className="wave-visualizer">
                            {[...Array(9)].map((_, i) => (
                                <div key={i} className="wave-bar" style={{ "--wi": i }} />
                            ))}
                        </div>
                    )}
                    <div className="ai-info">
                        <div className="ai-info-name">HireSense AI Interviewer</div>
                        <div className="ai-info-title">Senior Engineering Coach · FAANG Specialist</div>
                    </div>
                    <div className="ai-info-pills">
                        {["10+ Years Exp", "5K+ Interviews", "4.9★ Rating"].map(p => (<span key={p} className="info-pill">{p}</span>))}
                    </div>
                </div>

                <div className="ii-center">
                    <div className="timer-card">
                        <div className="timer-label">Session Time</div>
                        <div className="timer-val">{fmt(seconds)}</div>
                        <div className="timer-sub">/ 60:00 remaining</div>
                    </div>
                    <div className="progress-tracker">
                        <div className="pt-label">Interview Progress</div>
                        {timelineStages.map((stage, i) => {

                            const isDone = i < currentStageIndex;
                            const isActive = i === currentStageIndex;

                            return (
                                <div
                                    key={i}
                                    className={`pt-item ${isDone ? "pt-done" : ""} ${isActive ? "pt-active" : ""}`}
                                >
                                    <div className="pt-dot">
                                        {isDone ? "✓" : i + 1}
                                    </div>

                                    <div className="pt-label-text">
                                        {stage}
                                    </div>

                                    {i < timelineStages.length - 1 && (
                                        <div className="pt-line" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="ii-candidate-card">
                    <div className="cam-feed">
                        <div className="cam-feed-inner">
                            <span style={{ fontSize: 52 }}>👤</span>
                            <div className="cam-rec"><span className="cam-rec-dot" />REC</div>
                        </div>
                    </div>
                    <div className="candidate-info">
                        <div className="candidate-name">You · Candidate</div>
                        <div className="candidate-sub">Frontend Engineer · Mid-Level</div>
                    </div>
                    <div className="candidate-stats">
                        <div className="cs-item"><div className="cs-val">Q3/5</div><div className="cs-label">Progress</div></div>
                        <div className="cs-item"><div className="cs-val">82%</div><div className="cs-label">Score</div></div>
                        <div className="cs-item"><div className="cs-val">High</div><div className="cs-label">Confidence</div></div>
                    </div>
                </div>
            </div>
            <div className="ii-actions">
                <button
                    className="btn-primary"
                    onClick={onContinue}
                >
                    Continue Interview →
                </button>
            </div>
        </section>
    );
};

export default MockInterviewInterface;