import React, { useEffect, useRef, useState } from 'react';
import "./WhyChooseUs.css"
import { Link, useNavigate } from 'react-router-dom';

function WhyChooseUs() {

    const cards = [
        {
            id: 1,
            icon: '📋',
            title: 'Real Interview Experience',
            desc: 'Practice in a realistic interview environment with timed sessions that simulate actual placement and job interviews.',
            highlighted: true,
        },
        {
            id: 2,
            icon: '🎯',
            title: 'Personalized Practice',
            desc: "Everyone's learning journey is unique. Choose interview categories based on your goals and improve with curated HR and technical question sets. ",
            highlighted: false,
        },
        {
            id: 3,
            icon: '👨‍🏫',
            title: 'Smart Performance Insights',
            desc: 'Track your progress, analyze your responses, and identify areas that need improvement after every session.',
            highlighted: false,
        },
        {
            id: 4,
            icon: '🌐',
            title: 'AI-Powered Feedback',
            desc: 'Receive intelligent feedback and actionable suggestions to improve confidence, clarity, and interview performance.',
            highlighted: false,
        },
    ];

    const [visible, setVisible] = useState(false);
    const sectionRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.15 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const handleGetStarted = () =>{
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/practiceGrid")
        } else {
            navigate("/practice")
        }
    }

    return (
        <>
            <section className={`wcu ${visible ? 'wcu--visible' : ''}`} ref={sectionRef}>
                {/* Decorative blobs */}
                <div className="wcu__blob wcu__blob--1" />
                <div className="wcu__blob wcu__blob--2" />

                {/* Header Row */}
                <div className="wcu__header">
                    <div className="wcu__header-left">
                        <p className="wcu__eyebrow">✦ Our Strengths</p>
                        <h2 className="wcu__heading">Why Choose HireSense??</h2>
                        <p className="wcu__subtext">
                            HireSense combines realistic mock interviews, AI-powered feedback, and performance analytics to help students and job seekers build confidence and succeed in real interview environments.
                        </p>
                    </div>
                    <button className="wcu__btn-header"><Link to = {'/login'}>Join Now →</Link></button>
                </div>

                {/* Cards Grid */}
                <div className="wcu__grid">
                    {cards.map((card, i) => (
                        <div
                            key={card.id}
                            className={`wcu__card ${card.highlighted ? 'wcu__card--dark' : ''}`}
                            style={{ '--i': i }}
                        >
                            {/* Shimmer sweep on hover */}
                            <div className="wcu__card-shimmer" />

                            <div className="wcu__card-icon">{card.icon}</div>

                            <h3 className="wcu__card-title">{card.title}</h3>
                            <p className="wcu__card-desc">{card.desc}</p>

                            <button className={`wcu__card-btn ${card.highlighted ? 'wcu__card-btn--light' : ''}`} onClick={handleGetStarted}>
                                Start Practicing
                            </button>

                            {/* Decorative corner dot */}
                            <div className="wcu__card-dot" />
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default WhyChooseUs;