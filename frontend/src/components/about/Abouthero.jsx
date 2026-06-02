import React, { useEffect, useRef, useState } from 'react';
import './Abouthero.css';

// ── Animated counter ──────────────────────────────────────────
function useCounter(target, suffix, duration = 2000, start = false) {
  const [display, setDisplay] = useState('0' + suffix);

  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const isFloat = String(target).includes('.');

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = isFloat
        ? (eased * target).toFixed(1)
        : Math.floor(eased * target);
      setDisplay(current + suffix);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, suffix, duration]);

  return display;
}

// ── Individual stat card ──────────────────────────────────────
const StatCard = ({ target, suffix, label, index, start }) => {
  const display = useCounter(target, suffix, 1800 + index * 150, start);
  return (
    <div className="ah__stat" style={{ '--si': index }}>
      <span className="ah__stat-val">{display}</span>
      <span className="ah__stat-label">{label}</span>
    </div>
  );
};

const stats = [
  { target: 12,  suffix: 'K+', label: 'Active Users' },
  { target: 2, suffix: 'K+',  label: 'Practice Questions' },
  { target: 1,  suffix: 'K+',  label: 'Companies' },
  { target: 50,  suffix: '+',  label: 'Countries Reached' },
];

// ── Main component ────────────────────────────────────────────
const Abouthero = () => {
  const [visible, setVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // Start immediately so numbers animate on page load
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  // Also watch scroll in case it's not in first viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`ah ${visible ? 'ah--visible' : ''}`} ref={ref}>
      <div className="ah__noise" />
      <div className="ah__blob ah__blob--1" />
      <div className="ah__blob ah__blob--2" />
      <div className="ah__blob ah__blob--3" />

      {/* Decorative vertical grid lines */}
      <div className="ah__gridlines" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="ah__gridline" style={{ '--gi': i }} />
        ))}
      </div>

      {/* Badge */}
      <div className="ah__badge">✦ About Us</div>

      {/* Heading */}
      <h1 className="ah__heading">
        About <span className="ah__heading-accent">HireSense.</span>
      </h1>

      {/* Subtext */}
      <p className="ah__sub">
        HireSense is an intelligent hiring platform designed to connect job seekers with the right opportunities while helping companies streamline recruitment efficiently. From interview preparation to skill development, HireSense empowers users to grow, practice, and succeed in their careers.
      </p>

      {/* ── Real photo from Unsplash ── */}
      <div className="ah__img-row">
        {/* Left decorative card */}
        <div className="ah__img-card ah__img-card--sm">
          <img
            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&h=280&fit=crop&crop=center"
            alt="Students collaborating"
            className="ah__img"
            onLoad={() => setImgLoaded(true)}
          />
          <div className="ah__img-overlay" />
          <div className="ah__img-tag">📚 12K+ Learners</div>
        </div>

        {/* Center main card */}
        <div className="ah__img-card ah__img-card--lg">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&h=420&fit=crop&crop=center"
            alt="Team learning together"
            className="ah__img"
          />
          <div className="ah__img-overlay" />
          <div className="ah__img-tag">🚀 Live Classes</div>
        </div>

        {/* Right decorative card */}
        <div className="ah__img-card ah__img-card--sm">
          <img
            src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=280&fit=crop&crop=center"
            alt="Focused studying"
            className="ah__img"
          />
          <div className="ah__img-overlay" />
          <div className="ah__img-tag">🏆 98% Success</div>
        </div>
      </div>

      {/* ── Stats row with animated counters ── */}
      <div className="ah__stats">
        {stats.map((s, i) => (
          <StatCard
            key={i}
            target={s.target}
            suffix={s.suffix}
            label={s.label}
            index={i}
            start={visible}
          />
        ))}
      </div>
    </section>
  );
};

export default Abouthero;