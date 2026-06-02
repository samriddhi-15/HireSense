import React from "react";
import { Link } from "react-router-dom";
import "./MockRecommendation.css";

const MockRecommendation = ({
    interview
}) => {

    if (!interview) return null;

    const analytics =
        interview.analytics || {};

    const recommendations = [];

    if (
        analytics.problemSolving < 70
    ) {

        recommendations.push({

            icon: "🔢",

            title: "DSA Fundamentals",

            desc:
                "Practice arrays, trees, recursion and problem solving patterns.",

            tag: "Weak Area",

            color: "#f5a623"

        });

    }

    if (
        analytics.technicalAccuracy < 70
    ) {

        recommendations.push({

            icon: "⚛️",

            title: "Frontend Concepts",

            desc:
                "Improve React, APIs, hooks and architecture fundamentals.",

            tag: "Needs Improvement",

            color: "#4a9fd5"

        });

    }

    if (
        analytics.communication < 70
    ) {

        recommendations.push({

            icon: "🗣️",

            title: "Communication Skills",

            desc:
                "Practice concise speaking and structured responses.",

            tag: "Practice More",

            color: "#e8920f"

        });

    }

    if (
        analytics.confidence < 70
    ) {

        recommendations.push({

            icon: "🤝",

            title: "Behavioral Practice",

            desc:
                "Build confidence with HR and behavioral interview rounds.",

            tag: "High Priority",

            color: "#f54291"

        });

    }

    // fallback
    if (recommendations.length === 0) {

        recommendations.push({

            icon: "🏆",

            title: "Excellent Performance",

            desc:
                "You performed well across all interview dimensions.",

            tag: "Great Job",

            color: "#00b894"

        });

    }

    return (

        <section className="recs-section">

            <div className="section-header">

                <span className="section-eyebrow">
                    ✦ Personalized For You
                </span>

                <h2 className="section-title">

                    Recommended
                    <span className="accent">
                        {" "}Practice
                    </span>

                </h2>

                <p className="section-sub">
                    AI-curated recommendations based on your interview performance
                </p>

            </div>

            <div className="recs-grid">

                {recommendations.map((r) => (

                    <div
                        key={r.title}
                        className="rec-card"
                        style={{
                            borderColor: r.color
                        }}
                    >

                        <div className="rec-icon">
                            {r.icon}
                        </div>

                        <div
                            className="rec-tag"
                            style={{
                                background:
                                    `${r.color}20`,
                                color: r.color
                            }}
                        >
                            {r.tag}
                        </div>

                        <div className="rec-title">
                            {r.title}
                        </div>

                        <div className="rec-desc">
                            {r.desc}
                        </div>

                        <button className="rec-btn">
                            Start Practice →
                        </button>

                    </div>

                ))}

            </div>

            <div className="Recommendation_actions">

                <button className="btn-primary">

                    <Link to="/frontendCompile">
                        Next →
                    </Link>

                </button>

            </div>

        </section>

    );

};

export default MockRecommendation;