import React from 'react';
import './AchievementBadge.css';

const AchievementBadge = ({ visible }) => {
  return (
    <>
      {/* Floating badge top right */}
      <div className={`st-badge-float ${visible ? 'st-badge-float--visible' : ''}`}>
        <span className="st-badge-float__icon">⭐</span>
        <div>
          <div className="st-badge-float__val">Top 5%</div>
          <div className="st-badge-float__label">This Month</div>
        </div>
      </div>

      {/* Floating mini card bottom left */}
      <div className={`st-mini-float ${visible ? 'st-mini-float--visible' : ''}`}>
        <span>🏆</span>
        <span className="st-mini-float__text">New Achievement Unlocked!</span>
      </div>
    </>
  );
};

export default AchievementBadge;