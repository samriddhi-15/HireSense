import React from 'react';
import RingChart from './RingChart';
import './ProgressStats.css';


const ProgressStats = ({
  visible,
  progressData
}) => {

  const RINGS = [
    {
      label: "Communication",
      value: progressData?.communication || 0,
      color: "#f5a623",
      delay: 0.3
    },
    {
      label: "Technical",
      value: progressData?.technical || 0,
      color: "#4a9fd5",
      delay: 0.5
    },
    {
      label: "Problem Solving",
      value: progressData?.problemSolving || 0,
      color: "#e8920f",
      delay: 0.7
    }
  ];


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