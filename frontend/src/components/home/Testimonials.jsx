import React, { useEffect, useRef, useState } from 'react';
import Testimonial1 from "../../assets/Testimonial1.png";
import Testimonial2 from "../../assets/Testimonial2.png";
import Testimonial3 from "../../assets/Testimonial3.png";
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: 'Aarav Sharma',
    role: 'B.Tech Student ',
    company: 'Chandigarh University',
    avatar: Testimonial1,
    rating: 5,
    quote: "HireSense helped me overcome interview anxiety through realistic mock sessions. The timed practice rounds improved both my confidence and communication skills.",
    highlighted: false,
  },
  {
    id: 2,
    name: 'Simran Kaur',
    role: 'Software Engineering Aspirant',
    company: 'Stripe',
    avatar: Testimonial3,
    rating: 5,
    quote: "The technical interview practice and AI-based feedback helped me identify weak areas and improve quickly. It felt very close to real placement interviews.",
    highlighted: true,
  },
  {
    id: 3,
    name: 'Priyansh Verma',
    role: 'Final Year CSE Student',
    company: 'Fresher',
    avatar: Testimonial2,
    rating: 5,
    quote: "The HR interview questions and performance tracking dashboard made my preparation structured and effective. I felt much more prepared during campus placements.",
    highlighted: false,
  },
];

const StarRating = ({ count, highlighted }) => (
  <div className="testi__stars">
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} className={`testi__star ${highlighted ? 'testi__star--light' : ''}`} style={{ '--si': i }}>★</span>
    ))}
  </div>
);

const TestiCard = ({ t, index, visible }) => {
  const [cardIn, setCardIn]   = useState(false);
  const [photoIn, setPhotoIn] = useState(false);
  const [textIn, setTextIn]   = useState(false);

  useEffect(() => {
    if (!visible) return;
    // Card slides in first
    const t1 = setTimeout(() => setCardIn(true),  index * 220);
    // Photo pops in after card
    const t2 = setTimeout(() => setPhotoIn(true), index * 220 + 350);
    // Text fades in last
    const t3 = setTimeout(() => setTextIn(true),  index * 220 + 620);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [visible, index]);

  return (
    <div className={`testi__card ${t.highlighted ? 'testi__card--hl' : ''} ${cardIn ? 'testi__card--in' : ''}`}>
        

      {/* Shimmer */}
      <div className="testi__shimmer" />
      {/* Glow */}
      <div className="testi__glow" />

      {/* Avatar — pops in second */}
      <div className={`testi__avatar-wrap ${photoIn ? 'testi__avatar-wrap--in' : ''}`}>
        <div className="testi__avatar-ring" />
        <div className="testi__avatar-ring testi__avatar-ring--2" />
        <img src={t.avatar} alt={t.name} className="testi__avatar" />
        <div className="testi__avatar-badge">✓</div>
      </div>

      {/* Text block — fades in last */}
      <div className={`testi__body ${textIn ? 'testi__body--in' : ''}`}>

        <StarRating count={t.rating} highlighted={t.highlighted} />

        <h3 className="testi__name">{t.name}</h3>
        <p className="testi__role">
          {t.role} · <span className="testi__company">{t.company}</span>
        </p>

        <div className="testi__quote-icon">"</div>

        <p className="testi__quote">{t.quote}</p>

        {/* Bottom bar */}
        <div className="testi__bar">
          <div className="testi__bar-fill" style={{ '--bd': `${index * 0.2 + 0.5}s` }} />
        </div>
      </div>

      {/* Corner accent */}
      <div className="testi__corner" />
    </div>
  );
};

function Testimonials() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`testi ${visible ? 'testi--visible' : ''}`} ref={ref}>

      {/* Blobs */}
      <div className="testi__blob testi__blob--1" />
      <div className="testi__blob testi__blob--2" />
      <div className="testi__blob testi__blob--3" />
      <div className="testi__noise" />

      {/* Header */}
      <div className="testi__header">
        <span className="testi__eyebrow">✦ SUCCESS STORIES</span>
        <h2 className="testi__heading">
          What Our <span className="testi__heading-accent">Users Say</span>
        </h2>
        <p className="testi__subtext">
          Don't take our word for it — here's what real HireSense users have to say.
        </p>
      </div>

      {/* Cards */}
      <div className="testi__grid">
        {testimonials.map((t, i) => (
          <TestiCard key={t.id} t={t} index={i} visible={visible} />
        ))}
      </div>

      {/* Dot indicators */}
      <div className="testi__dots">
        {testimonials.map((_, i) => (
          <div key={i} className={`testi__dot ${i === 1 ? 'testi__dot--active' : ''}`} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;