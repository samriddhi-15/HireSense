import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Stats.css"

const stats = [
    {
        id: 1,
        icon: '🎯',
        value: 95,
        suffix: '%',
        label: 'Interview Readiness',
        sub: 'Students gain confidence through regular mock interview practice',
        highlighted: false,
    },
    {
        id: 2,
        icon: '⚡',
        value: 3,
        suffix: 'x',
        label: 'Better Communication',
        sub: 'Improved confidence and speaking skills after practice sessions',
        highlighted: false,
    },
    {
        id: 3,
        icon: '🚀',
        value: 500,
        suffix: '+',
        label: 'Interview Questions',
        sub: 'Curated HR and technical questions for placement preparation',
        highlighted: true,
    },
];
// Animated counter hook
function useCounter(target, duration = 1800, start = false) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [start, target, duration]);
    return count;
}

const StatCard = ({ stat, index, visible }) => {
    const count = useCounter(stat.value, 1800 + index * 200, visible);

    return (
        <div
            className={`stats__card ${stat.highlighted ? 'stats__card--hl' : ''}`}
            style={{ '--i': index }}
        >
            {/* Glow backdrop */}
            <div className="stats__card-glow" />
            {/* Shimmer */}
            <div className="stats__card-shimmer" />

            {/* Icon */}
            <div className="stats__icon-wrap">
                <div className="stats__icon-ring" />
                <span className="stats__icon">{stat.icon}</span>
            </div>

            {/* Number */}
            <div className="stats__number-row">
                <span className="stats__number">{count}</span>
                <span className="stats__suffix">{stat.suffix}</span>
            </div>

            {/* Label */}
            <h3 className="stats__label">{stat.label}</h3>
            <p className="stats__sub">{stat.sub}</p>

            {/* Bottom accent bar */}
            <div className="stats__bar">
                <div className="stats__bar-fill" style={{ '--delay': `${index * 0.18 + 0.4}s` }} />
            </div>

            {/* Corner dot */}
            <div className="stats__corner-dot" />
        </div>
    );
};


function Stats() {
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);

       const navigate = useNavigate();
    
    const handleChange = () =>{
        const token = localStorage.getItem("token");
    if (token) {
        navigate("/practice")
    } else {
        navigate("/login")
    }
    }


    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.15 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className={`stats ${visible ? 'stats--visible' : ''}`} ref={ref}>
            {/* Background blobs */}
            <div className="stats__blob stats__blob--1" />
            <div className="stats__blob stats__blob--2" />
            <div className="stats__blob stats__blob--3" />
            <div className="stats__noise" />

            {/* Left: text column */}
            <div className="stats__left">
                <span className="stats__eyebrow">✦ By The Numbers</span>
                <h2 className="stats__heading">
                    Boost Interview Skills<br />
                    <span className="stats__heading-accent">With Smart Practice</span>
                </h2>
                <p className="stats__body">
                    Every mock session brings you closer to placement success with structured practice, analytics, and AI-powered interview preparation.
                </p>

                <ul className="stats__bullets">
                    {['Timed interview simulations', 'Performance tracking dashboard', 'Curated interview question sets'].map((item, i) => (
                    <li key={i} className="stats__bullet" style={{ '--bi': i }}>
                        <span className="stats__bullet-dot" />
                        {item}
                    </li>
                    ))}
                </ul>

                <button className="stats__cta" onClick={handleChange}>Start Practicing →</button>
            </div>

            {/* Right: cards column */}
            <div className="stats__right">
                {stats.map((stat, i) => (
                    <StatCard key={stat.id} stat={stat} index={i} visible={visible} />
                ))}
            </div>
        </section>
    );

}

export default Stats;