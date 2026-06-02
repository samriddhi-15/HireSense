import React, { useEffect, useRef, useState } from 'react';
import './PracticeCards.css';
import { Link } from 'react-router-dom';

const cards = [
  {
    id: 1,
    icon: '🔍',
    title: 'Strengthen Core Skills',
    desc: 'Sharpen aptitude, communication, coding, and problem-solving skills through guided practice sessions.',
    tag: 'SKILL BOOST',
    accent: '#f5a623',
    accentSoft: 'rgba(245,166,35,0.1)',
    highlighted: false,
    floatDelay: '0s',
    shapes: ['circle', 'ring'],
  },
  {
    id: 2,
    icon: '⭐',
    title: 'Ace Your Interviews',
    desc: 'Practice real interview scenarios, improve confidence, and get instant AI-driven feedback.',
    tag: 'TRENDING',
    accent: '#f5a623',
    accentSoft: 'rgba(245,166,35,0.18)',
    highlighted: true,
    floatDelay: '0.4s',
    shapes: ['blob', 'star'],
  },
  {
    id: 3,
    icon: '🔄',
    title: 'Track Your Progress',
    desc: 'Monitor your performance, identify weak areas, and improve consistently with smart analytics.',
    tag: 'SMART INSIGHTS',
    accent: '#4a9fd5',
    accentSoft: 'rgba(74,159,213,0.1)',
    highlighted: false,
    floatDelay: '0.8s',
    shapes: ['ring', 'dot'],
  },
];

const PracticeCards = () => {
  const [visible, setVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(1); // highlighted by default
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`pc ${visible ? 'pc--visible' : ''}`} ref={ref}>
      <div className="pc__noise" />
      <div className="pc__blob pc__blob--1" />
      <div className="pc__blob pc__blob--2" />
      <div className="pc__blob pc__blob--3" />

      {/* Scattered dots */}
      {[
        { top: '12%', left: '5%' },
        { top: '75%', left: '3%' },
        { top: '20%', right: '4%' },
        { top: '65%', right: '6%' },
        { top: '45%', left: '50%' },
      ].map((s, i) => (
        <span key={i} className="pc__sparkle" style={{ ...s, '--si': i }} />
      ))}

      {/* ── Left: header text ── */}
      <div className="pc__left">
        <span className="pc__eyebrow">✦ Practice Paths</span>

        <h2 className="pc__heading">
          Build Skills That<br />
          Actually Get You<span className="pc__heading-accent">Hired</span>
        </h2>

        <p className="pc__body">
          From aptitude practice to interview preparation, HireSense helps you improve step-by-step with guided learning paths built for real career success.
        </p>

        <div className="pc__meta">
          <div className="pc__meta-item" style={{ '--mi': 0 }}>
            <span className="pc__meta-val">340+</span>
            <span className="pc__meta-label">Practice Sets</span>
          </div>
          <div className="pc__meta-divider" />
          <div className="pc__meta-item" style={{ '--mi': 1 }}>
            <span className="pc__meta-val">98%</span>
            <span className="pc__meta-label">Student Satisfaction</span>
          </div>
          <div className="pc__meta-divider" />
          <div className="pc__meta-item" style={{ '--mi': 2 }}>
            <span className="pc__meta-val">12K+</span>
            <span className="pc__meta-label">Career Aspirants</span>
          </div>
        </div>

        <button className="pc__cta">
          <span><Link to = {'/practiceGrid'}>Practice Now</Link></span>
          <span className="pc__cta-arrow">→</span>
        </button>

        {/* Decorative orbital element */}
        <div className="pc__orbital">
          <div className="pc__orbital-ring" />
          <div className="pc__orbital-ring pc__orbital-ring--2" />
          <span className="pc__orbital-dot" />
        </div>
      </div>

      {/* ── Right: cards ── */}
      <div className="pc__cards">
        {cards.map((card, i) => (
          <div
            key={card.id}
            className={`
              pc__card
              ${card.highlighted ? 'pc__card--hl' : ''}
              ${activeCard === card.id ? 'pc__card--active' : ''}
              ${visible ? 'pc__card--in' : ''}
            `}
            style={{
              '--ci': i,
              '--accent': card.accent,
              '--accent-soft': card.accentSoft,
            }}
            onMouseEnter={() => setActiveCard(card.id)}
            onMouseLeave={() => setActiveCard(1)}
          >
            {/* Internal animated background shapes */}
            <div className="pc__card-bg">
              {card.shapes.includes('blob') && (
                <div className="pc__card-blob" />
              )}
              {card.shapes.includes('circle') && (
                <div className="pc__card-circle" />
              )}
              {card.shapes.includes('ring') && (
                <div className="pc__card-ring" />
              )}
              {card.shapes.includes('star') && (
                <span className="pc__card-star">✦</span>
              )}
              {card.shapes.includes('dot') && (
                <div className="pc__card-dot-pattern">
                  {[...Array(16)].map((_, di) => (
                    <span key={di} className="pc__card-micro-dot" style={{ '--ddi': di }} />
                  ))}
                </div>
              )}
            </div>

            {/* Shimmer */}
            <div className="pc__card-shimmer" />

            {/* Top row */}
            <div className="pc__card-top">
              <div className="pc__card-icon-wrap">
                <div className="pc__card-icon-ring" />
                <span className="pc__card-icon">{card.icon}</span>
              </div>
              <span className="pc__card-tag">{card.tag}</span>
            </div>

            {/* Content */}
            <div className="pc__card-content">
              <h3 className="pc__card-title">{card.title}</h3>
              <p className="pc__card-desc">{card.desc}</p>
            </div>

            {/* Bottom action */}
            <div className="pc__card-footer">
              <div className="pc__card-progress">
                <div className="pc__card-progress-bar" />
              </div>
              <button className="pc__card-btn">
                <span className="pc__card-plus">+</span>
              </button>
            </div>

            {/* Hover glow */}
            <div className="pc__card-glow" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PracticeCards;