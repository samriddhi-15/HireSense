import React from 'react';
import './ProgressHeader.css';

const ProgressHeader = ({ visible }) => {
  return (
    <div className={`ps-header ${visible ? 'ps-header--visible' : ''}`}>
      <span className="ps-header__eyebrow">🚀 YOUR GROWTH TRACKER</span>
      <h2 className="ps-header__heading">
        Measure Progress <br />
        <span className="ps-header__heading-accent">That Matters</span>
      </h2>
      <p className="ps-header__body">
        Stay consistent with smart analytics, performance tracking, and AI-driven insights that help you improve every day.
      </p>
    </div>
  );
};

export default ProgressHeader;  