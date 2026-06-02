import React, { useEffect, useRef, useState } from 'react';
import './Leaderboard.css';

const topThree = [
  {
    rank: 2,
    name: 'Priya Nambiar',
    handle: '@priyaN',
    pts: 2774,
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=120&h=120&fit=crop&crop=face',
    medal: '🥈',
    color: '#4a9fd5',
    crownColor: '#4a9fd5',
    height: 'short',
  },
  {
    rank: 1,
    name: 'James Okonkwo',
    handle: '@jamesoK',
    pts: 3045,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face',
    medal: '🥇',
    color: '#f5a623',
    crownColor: '#f5a623',
    height: 'tall',
  },
  {
    rank: 3,
    name: 'Sarah Mitchell',
    handle: '@sarahM',
    pts: 1988,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face',
    medal: '🥉',
    color: '#e8920f',
    crownColor: '#e8920f',
    height: 'short',
  },
];

const restRows = [
  { rank: 4,  name: 'Marcus Chen',   handle: '@marcusc', pts: 1589, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face' },
  { rank: 5,  name: 'Aisha Patel',   handle: '@aishap',  pts: 1021, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face' },
  { rank: 6,  name: 'Jordan Blake',  handle: '@jordanB', pts: 1000, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face' },
  { rank: 7,  name: 'Kenji Watanabe',handle: '@kenjiW',  pts: 875,  avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop&crop=face' },
];

const tabs = ['This Week', 'This Month', 'All Time'];

const Leaderboard = () => {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredRow, setHoveredRow] = useState(null);
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
    <section className={`lb ${visible ? 'lb--visible' : ''}`} ref={ref}>
      <div className="lb__noise" />
      <div className="lb__blob lb__blob--1" />
      <div className="lb__blob lb__blob--2" />
      <div className="lb__blob lb__blob--3" />

      {/* Grid lines */}
      <div className="lb__gridlines">
        {[...Array(8)].map((_,i) => (
          <div key={i} className="lb__gridline" style={{ '--gi': i }} />
        ))}
      </div>

      {/* Sparkles */}
      {[
        { top:'8%',  left:'6%'  },
        { top:'72%', left:'3%'  },
        { top:'12%', right:'5%' },
        { top:'80%', right:'8%' },
        { top:'40%', left:'50%' },
        { top:'60%', right:'30%'},
      ].map((s,i) => (
        <span key={i} className="lb__sparkle" style={{ ...s, '--si': i }} />
      ))}

      {/* ── Header ── */}
      <div className="lb__header">
        <div className="lb__header-left">
          <span className="lb__eyebrow">✦ Top Performers</span>
          <h2 className="lb__heading">
            HireSense <span className="lb__heading-accent">Leaderboard</span>
          </h2>
          <p className="lb__sub">Every challenge completed brings you closer to the top.</p>
        </div>

        {/* Tab switcher */}
        <div className="lb__tabs">
          {tabs.map((t, i) => (
            <button
              key={i}
              className={`lb__tab ${activeTab === i ? 'lb__tab--active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* ── Podium — top 3 ── */}
      <div className="lb__podium">
        {[topThree[0], topThree[1], topThree[2]].map((p, i) => (
          <div
            key={p.rank}
            className={`lb__podium-card lb__podium-card--${p.height} ${visible ? 'lb__podium-card--in' : ''}`}
            style={{ '--pi': i, '--pcolor': p.color }}
          >
            {/* Glow behind card */}
            <div className="lb__podium-glow" />

            {/* Crown / medal */}
            <div className="lb__podium-medal">{p.medal}</div>
            {p.rank === 1 && <div className="lb__crown">👑</div>}

            {/* Avatar */}
            <div className="lb__podium-avatar-wrap">
              <div className="lb__podium-avatar-ring" />
              <div className="lb__podium-avatar-ring lb__podium-avatar-ring--2" />
              <img src={p.avatar} alt={p.name} className="lb__podium-avatar" />
              <div className="lb__podium-rank-badge">{p.rank}</div>
            </div>

            {/* Info */}
            <h3 className="lb__podium-name">{p.name}</h3>
            <p className="lb__podium-handle">{p.handle}</p>

            {/* Points */}
            <div className="lb__podium-pts">
              <span className="lb__podium-pts-val">{p.pts.toLocaleString()}</span>
              <span className="lb__podium-pts-label"> pts</span>
            </div>

            {/* Bottom bar */}
            <div className="lb__podium-bar">
              <div className="lb__podium-bar-fill" />
            </div>
          </div>
        ))}
      </div>

      {/* ── Rest of the list ── */}
      <div className="lb__list">
        {restRows.map((row, i) => (
          <div
            key={row.rank}
            className={`lb__row ${hoveredRow === i ? 'lb__row--hovered' : ''} ${visible ? 'lb__row--in' : ''}`}
            style={{ '--ri': i }}
            onMouseEnter={() => setHoveredRow(i)}
            onMouseLeave={() => setHoveredRow(null)}
          >
            {/* Shimmer */}
            <div className="lb__row-shimmer" />

            {/* Rank number */}
            <div className="lb__row-rank">
              <span className="lb__row-rank-num">{row.rank}</span>
            </div>

            {/* Avatar */}
            <div className="lb__row-avatar-wrap">
              <img src={row.avatar} alt={row.name} className="lb__row-avatar" />
            </div>

            {/* Name + handle */}
            <div className="lb__row-info">
              <span className="lb__row-name">{row.name}</span>
              <span className="lb__row-handle">{row.handle}</span>
            </div>

            {/* Progress bar */}
            <div className="lb__row-bar-wrap">
              <div className="lb__row-bar">
                <div
                  className="lb__row-bar-fill"
                  style={{
                    '--bw': `${(row.pts / 3045) * 100}%`,
                    transitionDelay: visible ? `${i * 0.1 + 0.8}s` : '0s',
                    width: visible ? `${(row.pts / 3045) * 100}%` : '0%',
                  }}
                />
              </div>
            </div>

            {/* Points */}
            <div className="lb__row-pts">
              {row.pts.toLocaleString()} <span>pts</span>
            </div>

            {/* Star icon */}
            <div className="lb__row-star">⭐</div>
          </div>
        ))}
      </div>

      {/* ── CTA ── */}
      <div className="lb__cta-wrap">
        <button className="lb__cta">View Full Leaderboard →</button>
        <p className="lb__cta-note">Updated every 24 hours · 12,000+ learners competing</p>
      </div>
    </section>
  );
};

export default Leaderboard;