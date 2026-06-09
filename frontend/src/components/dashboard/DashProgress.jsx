import React, { useEffect, useState } from 'react';
import './DashProgress.css';

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const barHeights = [30, 55, 45, 70, 90, 100, 60];
const currentDay = 5;


const DashProgress = ({
  dashboardData,
  progressData
}) => {
  const courses = [
    {
      name: "Communication Skills",
      pct: progressData?.communication || 0,
      color: "#f5a623"
    },

    {
      name: "Technical Skills",
      pct: progressData?.technical || 0,
      color: "#4a9fd5"
    },

    {
      name: "Problem Solving",
      pct: progressData?.problemSolving || 0,
      color: "#e8920f"
    }
  ];

  const [go, setGo] = useState(false);
  useEffect(() => { const t = setTimeout(() => setGo(true), 500); return () => clearTimeout(t); }, []);

  return (
    <div className="dpg">
      <div className="dpg__head">
        <div>
          <div className="dpg__title">Progress</div>
          <div className="dpg__hours">
            <span className="dpg__hrs-val">{dashboardData?.practiceHours || 0}</span>
            <span className="dpg__hrs-unit"></span>
            <span className="dpg__hrs-label">Practice Time this week</span>
          </div>
        </div>
        <button className="dpg__expand">↗</button>
      </div>

      {/* Bar chart */}
      <div className="dpg__bars">
        {barHeights.map((h, i) => (
          <div key={i} className="dpg__bar-col">
            <div className="dpg__bar-track">
              <div
                className={`dpg__bar-fill ${i === currentDay ? 'dpg__bar-fill--active' : ''}`}
                style={{
                  height: go ? `${h}%` : '0%',
                  transitionDelay: go ? `${i * 0.08 + 0.3}s` : '0s',
                }}
              >
                {i === currentDay && (
                  <div className="dpg__bar-tip">
                    <span>5h 23m</span>
                  </div>
                )}
              </div>
            </div>
            <span className="dpg__bar-day">{days[i]}</span>
          </div>
        ))}
      </div>

      {/* Course progress */}
      <div className="dpg__courses">
        {courses.map((c, i) => (
          <div key={i} className="dpg__course" style={{ '--coi': i }}>
            <div className="dpg__course-top">
              <span className="dpg__course-name">{c.name}</span>
              <span className="dpg__course-pct" style={{ color: c.color }}>{c.pct}%</span>
            </div>
            <div className="dpg__course-track">
              <div
                className="dpg__course-fill"
                style={{
                  '--cc': c.color,
                  width: go ? `${c.pct}%` : '0%',
                  transitionDelay: go ? `${i * 0.14 + 0.7}s` : '0s',
                }}
              />
              <div
                className="dpg__course-glow"
                style={{
                  '--cc': c.color,
                  width: go ? `${c.pct}%` : '0%',
                  transitionDelay: go ? `${i * 0.14 + 0.7}s` : '0s',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashProgress;