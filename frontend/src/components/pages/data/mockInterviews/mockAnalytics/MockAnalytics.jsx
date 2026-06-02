import React, { useState, useEffect, useRef } from "react";
import "./MockAnalytics.css";
import CircularProgress from "../sharedComponents/CircularProgress";
import AnimatedBar from "../sharedComponents/AnimatedBar";

const MockAnalytics = ({
    onNext,
    interview
}) => {
    console.log("INTERVIEW RECEIVED:", interview);
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);

    const analytics =
        interview?.analytics || {};


    const topicPerformance = [

        {
            topic: "Confidence",
            pct: analytics.confidence || 0,
            color: "#f5a623"
        },

        {
            topic: "Communication",
            pct: analytics.communication || 0,
            color: "#4a9fd5"
        },

        {
            topic: "Technical Accuracy",
            pct:
                analytics.technicalAccuracy || 0,
            color: "#e8920f"
        },

        {
            topic: "Fluency",
            pct: analytics.fluency || 0,
            color: "#f5a623"
        },

        {
            topic: "Problem Solving",
            pct:
                analytics.problemSolving || 0,
            color: "#4a9fd5"
        }

    ];
    const overallScore =
        interview?.overallScore || 0;

    const answeredQuestions =
        interview?.questions?.filter(
            q => q.answer?.trim()
        ).length || 0;

    const totalQuestions =
        interview?.questions?.length || 0;

    const completionPercentage =
        totalQuestions
            ? Math.round(
                (answeredQuestions / totalQuestions) * 100
            )
            : 0;

    const interviewCompleted =
        answeredQuestions === totalQuestions;

    const grade =
        !interviewCompleted
            ? "Pending"
            : overallScore >= 90 ? "A+"
                : overallScore >= 80 ? "A"
                    : overallScore >= 70 ? "B"
                        : overallScore >= 60 ? "C"
                            : overallScore >= 40 ? "D"
                                : "F";

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) setVisible(true);
        }, { threshold: 0.1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section className="analytics-section" ref={ref}>
            <div className="section-header">
                <span className="section-eyebrow">✦ Performance Analytics</span>
                <h2 className="section-title">Interview <span className="accent">Dashboard</span></h2>
            </div>

            <div className="analytics-top">
                {[
                    [overallScore, "Overall Score", "📊"],

                    [
                        `${completionPercentage}%`,
                        "Completed",
                        "📋"
                    ],

                    [
                        grade,
                        "Grade",
                        "🏆"
                    ],

                    [
                        `${answeredQuestions}/${totalQuestions}`,
                        "Answered",
                        "🥇"
                    ]
                ].map(([v, l, icon], i) => (
                    <div key={l} className="a-stat-card" style={{ "--ai": i }}>
                        <div className="asc-icon">{icon}</div>
                        <div className="asc-val">{v}</div>
                        <div className="asc-label">{l}</div>
                    </div>
                ))}
            </div>

            <div className="analytics-mid">
                <div className="an-card">
                    <div className="an-card-title">Topic Performance</div>
                    {topicPerformance.map((tp, i) => (
                        <div key={tp.topic} className="tp-row" style={{ "--tpi": i }}>
                            <span className="tp-topic">{tp.topic}</span>
                            <div className="tp-bar-wrap">
                                <div className="tp-bar">
                                    <div className="tp-bar-fill" style={{ width: visible ? `${tp.pct}%` : "0%", background: `linear-gradient(90deg,${tp.color},#4a9fd5)`, transitionDelay: `${i * 0.12}s` }} />
                                </div>
                                <span className="tp-pct" style={{ color: tp.color }}>{tp.pct}%</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="an-card">
                    <div className="an-card-title">Overall Score Breakdown</div>
                    <div style={{ display: "flex", justifyBox: "center", justifyContent: "center", padding: "16px 0" }}>
                        <CircularProgress val={overallScore} size={120} color="#f5a623" />
                    </div>
                    <div className="skill-breakdown">
                        {[
                            ["Confidence",
                                analytics.confidence || 0],

                            ["Communication",
                                analytics.communication || 0],

                            ["Technical Accuracy",
                                analytics.technicalAccuracy || 0],

                            ["Fluency",
                                analytics.fluency || 0],

                            ["Problem Solving",
                                analytics.problemSolving || 0]
                        ].map(([s, v]) => (
                            <div key={s} className="sb-item">
                                <div className="sb-label">{s}</div>
                                <AnimatedBar val={v} color="#f5a623" />
                                <div className="sb-val">{v}%</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="analytics-actions">
                <button
                    className="btn-primary"
                    onClick={onNext}
                >
                    View Recommendations →
                </button>
            </div>
        </section>
    );
};

export default MockAnalytics;