import React from 'react';
import RingChart from './RingChart';
import './ProgressStats.css';

const RINGS = [
  { label: 'Practice Completion', value: 67, color: '#f5a623', delay: 0.3 },
  { label: 'Interview Accuracy', value: 43, color: '#4a9fd5', delay: 0.5 },
  { label: 'Confidence Level', value: 32, color: '#e8920f', delay: 0.7 },
];

const ProgressStats = ({ visible }) => {
  return (
    <div className="ps-rings-grid">
      {RINGS.map((r, i) => (
        <div key={i} className={`ps-ring-item ${visible ? 'ps-ring-item--visible' : ''}`} style={{ '--ri': i }}>
          <div className="ps-ring-item__wrap">
            <div className="ps-ring-item__bg" style={{ '--rc': r.color }} />
            <RingChart
              value={r.value}
              color={r.color}
              size={110}
              stroke={9}
              delay={r.delay}
              visible={visible}
            />
          </div>
          <span className="ps-ring-item__label">{r.label}</span>
        </div>
      ))}
    </div>
  );
};

export default ProgressStats;