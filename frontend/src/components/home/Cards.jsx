import React, { useEffect, useRef, useState } from 'react';
import "./Cards.css"
import cards from "../../assets/cards.jpg"


const leftFeatures = [
    {
        id: 1,
        icon: '📊',
        title: 'Performance Tracking',
        desc: 'Monitor your interview scores, response quality, and improvement over time through detailed analytics.',
    },
    {
        id: 2,
        icon: '✏️',
        title: 'Timed Mock Interviews',
        desc: 'Practice under real interview pressure with timed HR and technical interview sessions.',
    },
];

const rightFeatures = [
    {
        id: 3,
        icon: '📱',
        title: 'HR & Technical Rounds',
        desc: 'Prepare for both behavioral and technical interviews using curated question sets.',
    },
    {
        id: 4,
        icon: '🔒',
        title: 'AI-Based Feedback',
        desc: 'Receive intelligent feedback and insights to improve your communication and interview performance.',
    },
];

function Cards() {

    const [visible, setVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.12 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);


    return (
        <>
            <section className={`cf ${visible ? 'cf--visible' : ''}`} ref={sectionRef}>
                {/* Atmospheric blobs */}
                <div className="cf__blob cf__blob--1" />
                <div className="cf__blob cf__blob--2" />
                <div className="cf__blob cf__blob--3" />

                {/* Header */}
                <div className="cf__header">
                    <span className="cf__eyebrow">✦ Platform Highlights</span>
                    <h2 className="cf__heading">
                        Everything You Need to Crack <br />
                        <span className="cf__heading-accent">Your Next Interview</span>
                    </h2>
                    <p className="cf__subtext">
                        Practice smarter with realistic mock interviews, timed sessions, and detailed performance insights.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="cf__grid">

                    {/* Left feature cards */}
                    <div className="cf__col cf__col--left">
                        {leftFeatures.map((f, i) => (
                            <div
                                key={f.id}
                                className="cf__card"
                                style={{ '--i': i }}
                            >
                                <div className="cf__card-shimmer" />
                                <div className="cf__card-icon">{f.icon}</div>
                                <p className="cf__card-text">
                                    <span className="cf__card-title">{f.title}</span>{' '}
                                    {f.desc}
                                </p>
                                <div className="cf__card-glow" />
                            </div>
                        ))}
                    </div>

                    {/* Center image */}
                    <div className="cf__center">
                        <div className="cf__img-wrap">
                            <img
                                src={cards}
                                alt="Student learning"
                                className="cf__img"
                            />
                            <div className="cf__img-overlay" />
                            {/* Floating badge */}
                            <div className="cf__badge cf__badge--top">
                                <span className="cf__badge-dot" />
                                500+ Interview Questions
                            </div>
                            <div className="cf__badge cf__badge--bottom">
                                🏆 &nbsp;Top Rated Platform
                            </div>
                        </div>
                    </div>

                    {/* Right feature cards */}
                    <div className="cf__col cf__col--right">
                        {rightFeatures.map((f, i) => (
                            <div
                                key={f.id}
                                className="cf__card"
                                style={{ '--i': i + 2 }}
                            >
                                <div className="cf__card-shimmer" />
                                <div className="cf__card-icon">{f.icon}</div>
                                <p className="cf__card-text">
                                    <span className="cf__card-title">{f.title}</span>{' '}
                                    {f.desc}
                                </p>
                                <div className="cf__card-glow" />
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </>
    )
}

export default Cards;