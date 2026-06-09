import React from 'react';
import ProgressChart from './ProgressChart';
import ProgressStats from './ProgressStats';
import ProgressFooter from './ProgressFooter';
import './SkillTrackerCard.css';

const SkillTrackerCard = ({
  visible,
  progressData
}) => {
  return (
    <div className={`st-card ${visible ? 'st-card--visible' : ''}`}>
      <div className="st-card__noise" />
      <div className="st-card__blob" />

      {/* Card header */}
      <div className="st-card__header">
        <div className="st-card__avatar"><span>🎓</span></div>
        <div className="st-card__user">
          <div className="st-card__name">Skill Tracker</div>
          <div className="st-card__sub">Smart Progress Analytics</div>
        </div>
        <div className="st-card__settings">⚙</div>
      </div>

      <ProgressChart
        visible={visible}
        progressData={progressData} />
      <ProgressStats
        visible={visible}
        progressData={progressData} />
      <ProgressFooter
        progressData={progressData} />
    </div>
  );
};

export default SkillTrackerCard;