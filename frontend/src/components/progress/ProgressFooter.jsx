import React from 'react';
import './ProgressFooter.css';

const ProgressFooter = () => {
  return (
    <div className="st-card-footer">
      <div className="st-card-footer__item">
        <span className="st-card-footer__val">28</span>
        <span className="st-card-footer__label">Day Streak 🔥</span>
      </div>
      <div className="st-card-footer__div" />
      <div className="st-card-footer__item">
        <span className="st-card-footer__val">6</span>
        <span className="st-card-footer__label">Mock Tests</span>
      </div>
      <div className="st-card-footer__div" />
      <div className="st-card-footer__item">
        <span className="st-card-footer__val">142h</span>
        <span className="st-card-footer__label">Practiced</span>
      </div>
    </div>
  );
};

export default ProgressFooter;