import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import frontendimage from "../../assets/frontendimage.jpg"
import './PracticeGrid.css';

const categories = ['All', 'Quizzes', 'Projects', 'Live Sessions', 'Challenges', 'Flashcards'];

const cards = [
    {
        id: 1,
        cat: 'Live AI Feedback',
        title: 'AI MOCK INTERVIEW',
        desc: 'Practice with an AI interviewer in real-time.',
        img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=700&q=80&fit=crop',
        tag: '🔴 LIVE',
        accent: '#f5a623',
        path: "/MockInterviewsCompile"
    },
    {
        id: 2,
        cat: 'Solve Problems',
        title: 'DSA PRACTICE',
        desc: 'Master patterns used in coding interviews.',
        img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80&fit=crop',
        tag: '🏆 Popular',
        accent: '#1a1a1a',
        dark: true,
        path:"/DSAcompile"
    },
    {
        id: 3,
        cat: 'Beginner Friendly',
        title: 'HR INTERVIEW ROUND',
        desc: 'Practice behavioral and HR interview questions asked by top companies.',
        img: 'https://www.shutterstock.com/shutterstock/videos/3937697527/thumb/8.jpg?ip=x480',
        tag: '💬 Behavioral',
        accent: '#1a1a1a',
        dark: true,
        path:"/HrInterviewCompile"
    },
    {
        id: 4,
        cat: 'Updated Weekly',
        title: 'FRONTEND INTERVIEWS',
        desc: 'React, JavaScript, APIs, Performance, System Design and MERN concepts.',
        img: frontendimage,
        tag: '📊 Trending',
        accent: '#4a9fd5',
        path: "/FrontendCompile"
    },
    {
        id: 5,
        cat: 'AI Powered Review',
        title: 'AI RESUME ANALYZER',
        desc: 'Upload your resume and get ATS score, keyword suggestions and improvement tips.',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTVTJNOiEU_XpjQQsikUVeWzCKBN3KwD6t_A&s',
        tag: '✨ AI Powered',
        accent: '#e8920f',
    },
    {
        id: 6,
        cat: 'Continue Streak',
        title: 'DAILY CHALLENGE',
        desc: 'Solve one interview challenge every day to maintain your streak.',
        img: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=700&q=80&fit=crop',
        tag: '🔥 Daily',
        accent: '#f5a623',
        path: "/DailyChallengesCompile"
    },
];

const PracticeGrid = () => {
    const [visible, setVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('All');
    const [hovered, setHovered] = useState(null);
    const navigate = useNavigate();
    const ref = useRef(null);   
   

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true); },
            { threshold: 0.06 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const Card = ({ card, index, className = '' }) => (
        <div
            className={`pg__card ${card.dark ? 'pg__card--dark' : ''} ${hovered === card.id ? 'pg__card--hovered' : ''} ${visible ? 'pg__card--in' : ''} ${className}`}
            style={{ '--ci': index }}
            onMouseEnter={() => setHovered(card.id)}
            onMouseLeave={() => setHovered(null)}
        >
            <div className="pg__card-shimmer" />
            <img src={card.img} alt={card.title} className="pg__card-img" />
            <div className="pg__card-overlay" />

            {/* Corner dot */}
            <div className="pg__card-dot" style={{ '--cc': card.accent }} />

            <div className="pg__card-body">
                <div className="pg__card-top">
                    <span className="pg__cat">{card.cat}</span>
                    <span className="pg__tag" style={{ background: card.dark ? '#f5a623' : card.accent }}>
                        {card.tag}
                    </span>
                </div>
                <h3 className="pg__card-title">{card.title}</h3>
                {card.desc && <p className="pg__card-desc">{card.desc}</p>}
                <button className="pg__price-btn" onClick={() => navigate(card.path)}>
                    Get Started
                </button>
            </div>
        </div>
    );

    return (
        <section className={`pg ${visible ? 'pg--visible' : ''}`} ref={ref}>
            <div className="pg__noise" />
            <div className="pg__blob pg__blob--1" />
            <div className="pg__blob pg__blob--2" />
            <div className="pg__blob pg__blob--3" />

            {[
                { top: '8%', left: '4%' },
                { top: '75%', left: '2%' },
                { top: '12%', right: '5%' },
                { top: '85%', right: '7%' },
                { top: '50%', left: '49%' },
            ].map((s, i) => (
                <span key={i} className="pg__sparkle" style={{ ...s, '--si': i }} />
            ))}

            {/* ── Header ── */}
            <div className="pg__header">
                <div className="pg__header-left">
                    <span className="pg__eyebrow">✦ Practice Library</span>
                    <h2 className="pg__heading">
                        Practice.<span className="pg__heading-accent">Grow.</span>
                    </h2>
                    <p className="pg__sub">
                        Ready to test your interview skills? Dive into coding rounds, AI mock interviews and real-world challenges built to prepare you for top companies.
                    </p>
                </div>
                <div className="pg__header-right">
                    <div className="pg__tabs">
                        {categories.map(c => (
                            <button
                                key={c}
                                className={`pg__tab ${activeTab === c ? 'pg__tab--active' : ''}`}
                                onClick={() => setActiveTab(c)}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                    <button className="pg__view-all">View All →</button>
                </div>
            </div>

            {/* ── EXACT BENTO GRID ── */}
            <div className="pg__bento">

                {/* ── ROW 1 ── */}
                <div className="pg__row pg__row--1">

                    {/* Card 1: large left — tall, spans both rows */}
                    <Card card={cards[0]} index={0} className="pg__card--tall" />

                    {/* Middle column: 2 stacked */}
                    <div className="pg__stack">
                        <Card card={cards[1]} index={1} />
                        <Card card={cards[3]} index={2} />
                    </div>

                    {/* Right column: 1 card only (Architecture) */}
                    <div className="pg__stack pg__stack--single">
                        <Card card={cards[2]} index={3} />
                    </div>

                </div>

                {/* ── ROW 2: wide card + travel card ── */}
                <div className="pg__row pg__row--2">
                    <Card card={cards[5]} index={5} className="pg__card--wide" />
                    <Card card={cards[4]} index={4} className="pg__card--fill" />
                </div>


            </div>
        </section>
    );
};

export default PracticeGrid;