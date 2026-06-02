import React from 'react';
import './DashProfile.css';

const info = [
  { label:'Role',    val:'Frontend Dev' },
  { label:'Streak',  val:'28 Days 🔥' },
  { label:'Level',   val:'Advanced' },
  { label:'Moch Interviews',  val:'35' },
];

const DashProfile = () => (
  <div className="dp">
    <div className="dp__img-wrap">
      <div className="dp__img-ring" />
      <img
        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=400&fit=crop&crop=face"
        alt="Learner"
        className="dp__img"
      />
      <div className="dp__img-overlay" />
      <div className="dp__name-chip">
        <span className="dp__name">Priya Nambiar</span>
        <span className="dp__title">Frontend Developer</span>
      </div>
      <div className="dp__salary-chip">
         Top Performer
      </div>
    </div>

    <div className="dp__info">
      {info.map((r,i) => (
        <div key={i} className="dp__info-row" style={{ '--ii': i }}>
          <span className="dp__info-label">{r.label}</span>
          <span className="dp__info-val">{r.val}</span>
          <span className="dp__info-chevron">›</span>
        </div>
      ))}
    </div>
  </div>
);

export default DashProfile;