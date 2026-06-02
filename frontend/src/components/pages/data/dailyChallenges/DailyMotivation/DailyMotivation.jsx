import React, { useState, useEffect } from "react";
import "./DailyMotivation.css";

const QUOTES = [
    { text: "Small progress every day leads to big results.", author: "Anonymous" },
    { text: "Consistency is the key to mastering any skill.", author: "HireSense" },
    { text: "The expert was once a beginner who refused to quit.", author: "Anonymous" },
];

export default function DailyMotivation() {
    const [qi, setQi] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setQi(i => (i + 1) % QUOTES.length), 4000);
        return () => clearInterval(t);
    }, []);
    const q = QUOTES[qi];

    return (
        <section className="mot-section">
            <div className="mot-card" key={qi}>
                <div className="mot-glow" />
                <div className="mot-quote-mark">"</div>
                <div className="mot-text">{q.text}</div>
                <div className="mot-author">— {q.author}</div>
                <div className="mot-dots">
                    {QUOTES.map((_, i) => (
                        <div key={i} className={`mot-dot ${i === qi ? "mot-dot-active" : ""}`} onClick={() => setQi(i)} />
                    ))}
                </div>
            </div>
        </section>
    );
}