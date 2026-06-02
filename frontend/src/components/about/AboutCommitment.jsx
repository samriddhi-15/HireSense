import React, { useEffect, useRef, useState } from 'react';
import './AboutCommitment.css';

const cards = [
  {
    id: 1,
    title: 'Career-Focused Learning',
    desc: 'Practice technical, aptitude, and interview questions designed to help candidates prepare for real hiring challenges.',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
    highlighted: false,
    tag: 'SKILL BUILDING',
  },
  {
    id: 2,
    title: 'Smart Practice Experience',
    desc: 'HireSense delivers personalized practice experiences, interview preparation, and skill-focused learning paths to help users improve faster.',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80',
    highlighted: true,
    tag: 'AI Powered',
  },
  {
    id: 3,
    title: 'Interview Ready Preparation',
    desc: 'Our platform is designed to help users strengthen their problem-solving abilities, improve interview confidence, and become job ready.',
    img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80',
    highlighted: false,
    tag: 'CAREER READY',
  },
];

const AboutCommitment = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`ac ${visible ? 'ac--visible' : ''}`} ref={ref}>
      <div className="ac__noise" />
      <div className="ac__blob ac__blob--1" />
      <div className="ac__blob ac__blob--2" />

      {/* Header row — mirrors the reference image exactly */}
      <div className="ac__header">
        <div className="ac__header-left">
          <span className="ac__eyebrow">✦ Why Choose Us</span>
          <h2 className="ac__heading">
            Your Career,<br />Our <span className="ac__heading-accent">Commitment</span>
          </h2>
        </div>
        <p className="ac__header-right">
          We don't just prepare candidates — we empower them. Every feature, practice session, and learning experience at HireSense is designed to help users build real-world skills, gain confidence, and succeed.
        </p>
      </div>

      {/* Cards row */}
      <div className="ac__grid">
        {cards.map((card, i) => (
          <div
            key={card.id}
            className={`ac__card ${card.highlighted ? 'ac__card--hl' : ''} ${visible ? 'ac__card--in' : ''}`}
            style={{ '--ci': i }}
          >
            <div className="ac__card-shimmer" />
            <div className="ac__card-glow" />

            {/* Top section */}
            <div className="ac__card-top">
              <div className="ac__card-title-row">
                <h3 className="ac__card-title">{card.title}</h3>
                <div className="ac__card-arrow">↗</div>
              </div>
              <span className="ac__card-tag">{card.tag}</span>
              <p className="ac__card-desc">{card.desc}</p>
            </div>

            {/* Image */}
            <div className="ac__card-img-wrap">
              <img src={card.img} alt={card.title} className="ac__card-img" />
              <div className="ac__card-img-overlay" />
            </div>

            <div className="ac__card-corner" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutCommitment;