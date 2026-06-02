import React from "react";
import "./FrontendMockInterviews.css";

export default function FrontendMockInterviews() {
    return (
        <div className="fe-card fe-mock-sidebar-panel">
            <div className="fe-mock-avatar-row">
                <div className="fe-mock-ai-orb" />
                <div>
                    <h3 className="fe-mock-title">AI System Designer Pro</h3>
                    <span className="fe-mock-status-pill">● Audio-Vocal Link Ready</span>
                </div>
            </div>

            <p className="fe-mock-desc">Simulate realistic system design scenarios with runtime speech feedback mechanisms.</p>

            <div className="fe-mock-stats-box">
                <div className="fe-mstat-item"><span>Completed</span><strong>14 Sessions</strong></div>
                <div className="fe-mstat-item"><span>Target Accuracy</span><strong>82.4%</strong></div>
            </div>

            <button className="fe-mock-btn">Initialize Voice Stream</button>
        </div>
    );
}