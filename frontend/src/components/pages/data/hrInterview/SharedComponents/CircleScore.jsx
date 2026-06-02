import React from "react";

const CircleScore = ({ val, size = 100, stroke = 8, color = "#f5a623" }) => {
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    const offset = circ - (circ * val) / 100;

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth={stroke} />
            <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={color}
                strokeWidth={stroke}
                strokeDasharray={circ}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{
                    transform: "rotate(-90deg)",
                    transformOrigin: "50% 50%",
                    transition: "stroke-dashoffset 1.2s ease"
                }}
            />
            <text
                x="50%"
                y="46%"
                textAnchor="middle"
                dominantBaseline="central"
                style={{ fontSize: size * 0.18, fontWeight: 700, fill: color, fontFamily: "JetBrains Mono, monospace" }}
            >
                {val}
            </text>
            <text
                x="50%"
                y="62%"
                textAnchor="middle"
                dominantBaseline="central"
                style={{ fontSize: size * 0.1, fill: "#aaa", fontFamily: "DM Sans, sans-serif" }}
            >
                score
            </text>
        </svg>
    );
};

export default CircleScore;