import React, { useEffect, useState } from 'react';
import './DashTracker.css';
import axios from 'axios'


const DashTracker = ({
  dashboardData
}) => {
  const [seconds, setSeconds] = useState(() => {
    const startTime = Number(
      localStorage.getItem("practiceStartTime")
    );

    return startTime
      ? Math.floor(
        (Date.now() - startTime) / 1000
      )
      : 0;
  });

  const [running, setRunning] = useState(
    localStorage.getItem("practiceRunning")
    === "true"
  );

  useEffect(() => {

    const id = setInterval(() => {

      const startTime = Number(
        localStorage.getItem(
          "practiceStartTime"
        )
      );

      const isRunning =
        localStorage.getItem(
          "practiceRunning"
        ) === "true";

      setRunning(isRunning);

      if (isRunning && startTime) {

        setSeconds(
          Math.floor(
            (Date.now() - startTime) / 1000
          )
        );

      }

    }, 1000);

    return () => clearInterval(id);

  }, []);
  const total = 3600;
  const pct = (seconds % total) / total;
  const r = 58; const circ = 2 * Math.PI * r;
  const offset = circ - circ * pct;

  const fmt = (s) => {
    const hrs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);

    if (hrs > 0) {
      return `${hrs}h ${mins}m`;
    }

    return `${mins}m`;
  };

  return (
    <div className="dtr">
      <div className="dtr__head">
        <div className="dtr__title">Time Tracker</div>
        <button className="dtr__expand">↗</button>
      </div>

      {/* Clock ring */}
      <div className="dtr__ring-wrap">
        <svg width="140" height="140" className="dtr__svg">
          {/* Tick marks */}
          {[...Array(60)].map((_, i) => {
            const a = (i / 60) * 2 * Math.PI - Math.PI / 2;
            const inner = i % 5 === 0 ? 56 : 62;
            return (
              <line key={i}
                x1={70 + Math.cos(a) * inner} y1={70 + Math.sin(a) * inner}
                x2={70 + Math.cos(a) * 66} y2={70 + Math.sin(a) * 66}
                stroke={i % 5 === 0 ? 'rgba(245,166,35,0.4)' : 'rgba(0,0,0,0.08)'} strokeWidth={i % 5 === 0 ? 2 : 1}
              />
            );
          })}
          {/* Track */}
          <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="8" />
          {/* Arc */}
          <circle cx="70" cy="70" r={r} fill="none"
            stroke="#f5a623" strokeWidth="8"
            strokeDasharray={circ} strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 0.5s ease' }}
          />
          {/* Glow arc */}
          <circle cx="70" cy="70" r={r} fill="none"
            stroke="#f5a623" strokeWidth="12"
            strokeDasharray={circ} strokeDashoffset={offset}
            strokeLinecap="round" opacity="0.12"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', filter: 'blur(4px)', transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>

        <div className="dtr__time-center">
          <div className="dtr__time">{fmt(seconds)}</div>
          <div className="dtr__time-label">FOCUSED PRACTICE</div>
        </div>
      </div>

      {/* Controls */}
      <div className="dtr__controls">
        <button
          className="dtr__ctrl"
          onClick={async () => {

            const user = JSON.parse(
              localStorage.getItem("user")
            );

            if (user && seconds > 0) {

              await axios.post(
                "http://localhost:4000/api/user/update-practice",
                {
                  userId: user._id,
                  seconds
                }
              );

            }

            setRunning(false);
            setSeconds(0);

            localStorage.setItem(
              "practiceRunning",
              "false"
            );

            localStorage.removeItem(
              "practiceStartTime"
            );

          }}
        >{running ? '⏸' : '▶'}
        </button>
        <button className="dtr__ctrl dtr__ctrl--stop" onClick={() => {

          setRunning(false);

          setSeconds(0);

          localStorage.setItem(
            "practiceRunning",
            "false"
          );

          localStorage.removeItem(
            "practiceStartTime"
          );

        }}>
          ⏹
        </button>
      </div>

      {/* Session stats */}
      <div className="dtr__stats">

        <div className="dtr__stat">
          <span className="dtr__stat-val">
            {dashboardData?.interviews || 0}
          </span>
          <span className="dtr__stat-label">
            Sessions
          </span>
        </div>

        <div className="dtr__stat-div" />

        <div className="dtr__stat">
          <span className="dtr__stat-val">
            {dashboardData?.practiceHours || 0}h
          </span>
          <span className="dtr__stat-label">
            Total
          </span>
        </div>

        <div className="dtr__stat-div" />

        <div className="dtr__stat">
          <span className="dtr__stat-val">
            {dashboardData?.streak
              ? (
                dashboardData.practiceHours /
                dashboardData.streak
              ).toFixed(1)
              : 0}h
          </span>
          <span className="dtr__stat-label">
            Avg/day
          </span>
        </div>

      </div>
    </div>
  );
};

export default DashTracker;