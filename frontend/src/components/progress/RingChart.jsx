import React from 'react';
import './RingChart.css';

const RingChart = ({ value, color, size = 120, stroke = 10, delay = 0, visible }) => {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (circ * value) / 100;

  return (
    <svg width={size} height={size} className="rc-svg" viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke + 4}
        strokeDasharray={circ} strokeDashoffset={visible ? offset : circ} strokeLinecap="round" opacity="0.12"
        style={{
          transform: 'rotate(-90deg)', transformOrigin: '50% 50%',
          transition: `stroke-dashoffset 1.6s cubic-bezier(0.22,1,0.36,1) ${delay}s`, filter: `blur(4px)`,
        }}
      />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={visible ? offset : circ} strokeLinecap="round"
        style={{
          transform: 'rotate(-90deg)', transformOrigin: '50% 50%',
          transition: `stroke-dashoffset 1.6s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        }}
      />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" className="rc-svg__text" style={{ fill: color, fontSize: size * 0.2 }}>
        {value}%
      </text>
    </svg>
  );
};

export default RingChart;