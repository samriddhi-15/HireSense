import React, { useEffect, useState, useRef } from 'react';
import './PracticeHero.css';
import { Link, useNavigate } from "react-router-dom";

const features = [
  { icon: '⚡', label: 'AI Mock Interviews' },
  { icon: '🎯', label: 'Real Hiring Challenges' },
  { icon: '🌍', label: 'Practice Anywhere' },
];

const bottomFeatures = [
  { icon: '📚', label: '20k+ Practice Questions' },
  { icon: '♾️', label: 'Learn At Your Pace' },
  { icon: '💰', label: 'AI-Powered Learning' },
  { icon: '🎧', label: 'Mock Interview Support' },
  { icon: '🤝', label: 'Student Community' },
];

// Dot grid generator
const DotGrid = () => (
  <div className="ph__dotgrid" aria-hidden="true">
    {[...Array(80)].map((_, i) => (
      <span key={i} className="ph__dot" style={{ '--di': i }} />
    ))}
  </div>
);

// Animated background shapes
const BgShapes = () => (
  <div className="ph__shapes" aria-hidden="true">
    <div className="ph__shape ph__shape--ring1" />
    <div className="ph__shape ph__shape--ring2" />
    <div className="ph__shape ph__shape--ring3" />
    <div className="ph__shape ph__shape--blob1" />
    <div className="ph__shape ph__shape--blob2" />
    <div className="ph__shape ph__shape--blob3" />
    <div className="ph__shape ph__shape--chevron1">›</div>
    <div className="ph__shape ph__shape--chevron2">›</div>
    <div className="ph__shape ph__shape--line1" />
    <div className="ph__shape ph__shape--line2" />
    <div className="ph__shape ph__shape--line3" />
    {/* Floating sparkle dots */}
    {[
      { top: '15%', left: '18%' },
      { top: '70%', left: '12%' },
      { top: '25%', left: '60%' },
      { top: '80%', left: '55%' },
      { top: '40%', left: '88%' },
      { top: '10%', left: '82%' },
      { top: '60%', left: '78%' },
    ].map((s, i) => (
      <span key={i} className="ph__sparkle" style={{ ...s, '--si': i }} />
    ))}
  </div>
);

const PracticeHero = () => {
  const [visible, setVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleGetStarted = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/practiceGrid")
    } else {
      navigate("/login")
    }
  }

  return (
    <div className={`ph__wrapper ${visible ? 'ph--visible' : ''}`}>
      <section className="ph" ref={ref}>

        <div className="ph__noise" />
        <BgShapes />

        {/* ── LEFT: text content ── */}
        <div className="ph__left">

          {/* Eyebrow line */}
          <div className="ph__eyebrow">
            <span className="ph__eyebrow-line" />
            <span className="ph__eyebrow-text">Online Learning Platform</span>
          </div>

          {/* Heading */}
          <h1 className="ph__heading">
            <span className="ph__heading-line ph__heading-line--1">
              <span className="ph__heading-accent">Don't</span> just Apply- 
            </span>
            <span className="ph__heading-line ph__heading-line--2">
              but <span className="ph__heading-dark">Stand Out</span>
            </span>
          </h1>

          {/* Feature chips */}
          <div className="ph__features">
            {features.map((f, i) => (
              <div key={i} className="ph__feature" style={{ '--fi': i }}>
                <span className="ph__feature-dot" />
                <span className="ph__feature-icon">{f.icon}</span>
                <span className="ph__feature-label">{f.label}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          <p className="ph__desc">
            Your complete placement preparation hub — built to help students practice smarter, improve faster, and get career-ready.
          </p>

          {/* CTA buttons */}
          <div className="ph__btns">
            <button className="ph__btn ph__btn--primary" onClick={handleGetStarted}>
              <span>Get Started</span>
              <span className="ph__btn-arrow">→</span>
            </button>
            <button className="ph__btn ph__btn--outline">
             <Link to={'/'}>Explore Platform →</Link> 
            </button>
          </div>

          {/* Social proof avatars */}
          <div className="ph__proof">
            <div className="ph__proof-avatars">
              {[
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face',
              ].map((src, i) => (
                <img key={i} src={src} alt="" className="ph__proof-avatar" style={{ '--ai': i }} />
              ))}
              <span className="ph__proof-more">+12K</span>
            </div>
            <p className="ph__proof-text">Candidates already enrolled</p>
          </div>
        </div>

        {/* ── RIGHT: hero image with decorations ── */}
        <div className="ph__right">

          {/* Large decorative ring behind photo */}
          <div className="ph__img-ring ph__img-ring--outer" />
          <div className="ph__img-ring ph__img-ring--inner" />
          <div className="ph__img-ring ph__img-ring--dashed" />

          {/* Main hero photo */}
          <div className={`ph__img-wrap ${imgLoaded ? 'ph__img-wrap--loaded' : ''}`}>
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=750&fit=crop&crop=center"
              alt="Student learning"
              className="ph__img"
              onLoad={() => setImgLoaded(true)}
            />
            <div className="ph__img-glow" />
          </div>

          {/* Floating stat card — bottom left of image */}
          <div className="ph__float-card ph__float-card--1">
            <div className="ph__float-icon">👩‍🎓</div>
            <div>
              <div className="ph__float-val">1,200+</div>
              <div className="ph__float-label">Mock Assessments</div>
            </div>
          </div>

          {/* Floating stat card — right of image */}
          <div className="ph__float-card ph__float-card--2">
            <div className="ph__float-icon">🎬</div>
            <div>
              <div className="ph__float-val">25,000+</div>
              <div className="ph__float-label">Interview Questions</div>
            </div>
          </div>

          {/* Small badge — top right */}
          <div className="ph__badge-card">
            <div className="ph__badge-icon">⭐</div>
            <div>
              <div className="ph__badge-val">4.9</div>
              <div className="ph__badge-label">Rating</div>
            </div>
          </div>

          {/* Dot grid (bottom-left decorative) */}
          <DotGrid />
        </div>
      </section>

      {/* ── Bottom features strip ── */}
      <div className="ph__strip">
        {bottomFeatures.map((f, i) => (
          <div key={i} className="ph__strip-item" style={{ '--bi': i }}>
            <div className="ph__strip-icon">{f.icon}</div>
            <span className="ph__strip-label">{f.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PracticeHero;