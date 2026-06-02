import React from 'react';
import './ActivityBars.css';

const ACTIVITIES = [
  { icon: '🧠', label: 'Aptitude Practice', val: 88, color: '#f5a623' },
  { icon: '💻', label: 'Technical Interviews', val: 62, color: '#4a9fd5' },
  { icon: '🎤', label: 'Communication Skills', val: 51, color: '#f5a623' },
  { icon: '📊', label: 'Problem Solving', val: 35, color: '#4a9fd5' },
];

const ActivityBars = ({ visible }) => {
  return (
    <div className="ps-activities">
      {ACTIVITIES.map((a, i) => (
        <div key={i} className={`ps-activity ${visible ? 'ps-activity--visible' : ''}`} style={{ '--ai': i }}>
          <div className="ps-activity__top">
            <span className="ps-activity__icon">{a.icon}</span>
            <span className="ps-activity__label">{a.label}</span>
            <span className="ps-activity__val" style={{ color: a.color }}>{a.val}%</span>
          </div>
          <div className="ps-activity__track">
            <div
              className="ps-activity__fill"
              style={{
                '--fill-color': a.color,
                transitionDelay: visible ? `${i * 0.15 + 0.6}s` : '0s',
                width: visible ? `${a.val}%` : '0%',
              }}
            />
            <div
              className="ps-activity__glow"
              style={{
                '--fill-color': a.color,
                transitionDelay: visible ? `${i * 0.15 + 0.6}s` : '0s',
                width: visible ? `${a.val}%` : '0%',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityBars;