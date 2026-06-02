import React, { useEffect, useRef, useState } from 'react';
import ProgressHeader from './ProgressHeader';
import ActivityBars from './ActivityBars';
import SkillTrackerCard from './SkillTrackerCard';
import AchievementBadge from './AchievementBadge';
import './Progress.css';
import Leaderboard from './Leaderboard';

const Progress = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
    <section className={`ps ${visible ? 'ps--visible' : ''}`} ref={sectionRef}>
      <div className="ps__noise" />
      <div className="ps__blob ps__blob--1" />
      <div className="ps__blob ps__blob--2" />
      <div className="ps__blob ps__blob--3" />

      {/* Background Ambience Sparkles */}
      {[
        { top: '10%', left: '4%' },
        { top: '78%', left: '2%' },
        { top: '15%', right: '3%' },
        { top: '70%', right: '5%' },
        { top: '45%', left: '48%' },
      ].map((coords, index) => (
        <span key={index} className="ps__sparkle" style={{ ...coords, '--si': index }} />
      ))}

      <div className="ps__left">
        <ProgressHeader visible={visible} />
        <ActivityBars visible={visible} />
      </div>

      <div className="ps__right">
        <SkillTrackerCard visible={visible} />
        <AchievementBadge visible={visible} />
      </div>
    </section>
    <Leaderboard/>
    </>
  );
};

export default Progress;