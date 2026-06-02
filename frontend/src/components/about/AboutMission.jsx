import React, { useEffect, useRef, useState } from 'react';
import './AboutMission.css';

const values = [
  { icon: '🎯', title: 'Candidate First',  desc: 'Every feature we build is designed to help candidates learn better, practice smarter, and prepare confidently for their careers.' },
  { icon: '🔬', title: 'Always Improving', desc: 'We continuously evolve our platform with modern practice experiences, updated interview content, and smarter learning tools.' },
  { icon: '🤝', title: 'Accessible Learning', desc: 'We believe career preparation should be accessible to everyone regardless of background, location, or experience level.' },
  { icon: '⚡', title: 'Results Focused',  desc: 'Our goal is to help users build real skills, improve performance, and achieve meaningful career outcomes.' },
];

const team = [
  {
    name: 'Samriddhi Kaushal',
    role: 'Founder & MERN Stack Developer',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face',
  },
  {
    name: 'Aarav Sharma',
    role: 'Frontend Developer',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
  },
  {
    name: 'Priya Mehta',
    role: 'UI/UX Designer',
    img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face',
  },
  {
    name: 'Rohan Verma',
    role: 'Backend Developer',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
  },
];

const AboutMission = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`am ${visible ? 'am--visible' : ''}`} ref={ref}>
      <div className="am__noise" />
      <div className="am__blob am__blob--1" />
      <div className="am__blob am__blob--2" />

      {/* Mission strip */}
      <div className="am__mission">
        <div className="am__mission-left">
          <span className="am__eyebrow">✦ Our Mission</span>
          <h2 className="am__heading">
            Empowering Every <span className="am__heading-accent">Candidate</span> to Reach Their Full Potential
          </h2>
        </div>
        <div className="am__mission-right">
          <p className="am__mission-body">
            HireSense was built with a mission to bridge the gap between talent and opportunity. We combine smart learning tools, interview preparation, and career-focused practice experiences to help users grow their confidence, sharpen their skills, and succeed in today's competitive job market.
          </p>
          <button className="am__cta">Explore Our Story →</button>
        </div>
      </div>

      {/* Values grid */}
      <div className="am__values">
        {values.map((v, i) => (
          <div key={i} className="am__value" style={{ '--vi': i }}>
            <div className="am__value-icon-wrap">
              <div className="am__value-icon-ring" />
              <span className="am__value-icon">{v.icon}</span>
            </div>
            <div>
              <h4 className="am__value-title">{v.title}</h4>
              <p className="am__value-desc">{v.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="am__divider">
        <span /><span className="am__divider-text">Meet The Team</span><span />
      </div>

      {/* Team row */}
      <div className="am__team">
        {team.map((member, i) => (
          <div key={i} className="am__member" style={{ '--mi': i }}>
            <div className="am__member-img-wrap">
              <div className="am__member-ring am__member-ring--outer" />
              <div className="am__member-ring am__member-ring--inner" />
              <img src={member.img} alt={member.name} className="am__member-img" />
              <div className="am__member-badge">✓</div>
            </div>
            <h4 className="am__member-name">{member.name}</h4>
            <p className="am__member-role">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutMission;