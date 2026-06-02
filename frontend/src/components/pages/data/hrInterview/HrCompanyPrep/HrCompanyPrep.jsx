import React, { useState, useEffect, useRef } from "react";
import "./HrCompanyPrep.css";

const COMPANIES = [
    { name: "Google", emoji: "🔍", style: "Product-focused culture fit", principle: "10x thinking & innovation", expect: "Clear structured communication" },
    { name: "Amazon", emoji: "📦", style: "Leadership Principles deep dive", principle: "Customer obsession", expect: "Data-driven STAR stories" },
    { name: "Microsoft", emoji: "🪟", style: "Growth mindset evaluation", principle: "Empowerment & collaboration", expect: "Inclusive thinking examples" },
    { name: "Netflix", emoji: "🎬", style: "Culture fit over process", principle: "Freedom & responsibility", expect: "Radical candor & context" },
    { name: "Flipkart", emoji: "🛒", style: "Problem-first approach", principle: "Scale & execution", expect: "Ownership mindset" },
    { name: "TCS", emoji: "💻", style: "Process & compliance focus", principle: "Integrity & delivery", expect: "Team coordination skills" },
    { name: "Infosys", emoji: "🏢", style: "Communication & adaptability", principle: "Client satisfaction", expect: "Cross-cultural awareness" },
    { name: "Adobe", emoji: "🎨", style: "Creativity & collaboration", principle: "Genuine curiosity", expect: "Passion for the craft" },
];

const HrCompanyPrep = () => {
    const [vis, setVis] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) setVis(true);
        }, { threshold: 0.08 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section className="comp-section" ref={ref}>
            <div className="sh"><span className="eyebrow">✦ Targeted Prep</span><h2 className="stitle">Company-Specific <span className="acc">Preparation</span></h2></div>
            <div className={`comp-grid ${vis ? "comp-visible" : ""}`}>
                {COMPANIES.map((c, i) => (
                    <div key={c.name} className="comp-card" style={{ "--ci": i }}>
                        <div className="comp-shimmer" />
                        <div className="comp-top"><span className="comp-emoji">{c.emoji}</span><div className="comp-name">{c.name}</div></div>
                        <div className="comp-row"><span className="comp-lbl">Style</span><span className="comp-val">{c.style}</span></div>
                        <div className="comp-row"><span className="comp-lbl">Principle</span><span className="comp-val">{c.principle}</span></div>
                        <div className="comp-row"><span className="comp-lbl">Expects</span><span className="comp-val">{c.expect}</span></div>
                        <button className="comp-btn">Start Practice →</button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HrCompanyPrep;