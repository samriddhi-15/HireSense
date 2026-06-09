import React, { useEffect, useState } from 'react';
import './ProgressChart.css';


const ProgressChart = ({
  visible,
  progressData
}) => {
  const [count, setCount] = useState(0);
  const TARGET_VALUE =
    progressData?.overall || 0;

  useEffect(() => {
    if (!visible) return;
    let start = null;
    const duration = 1800;

    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * TARGET_VALUE));
      if (p < 1) requestAnimationFrame(step);
    };

    const t = setTimeout(() => requestAnimationFrame(step), 300);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div className="pc-main-bar">
      <div className="pc-main-bar__top">
        <span className="pc-main-bar__label">📚 Overall Progress</span>
        <div className="pc-main-bar__remind">
          <span className="pc-main-bar__remind-text">Stay Consistent</span>
          <span className="pc-main-bar__remind-bell">🔔</span>
        </div>
      </div>

      <div className="pc-main-bar__track">
        <div className="pc-main-bar__fill" style={{ width: visible ? `${TARGET_VALUE}%` : '0%' }}>
          <div className="pc-main-bar__shine" />
          <span className="pc-main-bar__val">{count}%</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;