import axios from "axios";
import React,{ useEffect, useState } from "react";
import './ActivityBars.css';

const ActivityBars = ({ visible }) => {

  const [activities, setActivities] = useState([]);
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {

    const fetchProgress = async () => {

      try {

        const res = await axios.get(
          `http://localhost:4000/api/progress/${user._id}`
        );

        const p = res.data.progress;

        setActivities([
          {
            icon: "💻",
            label: "Technical Interviews",
            val: p.technical,
            color: "#4a9fd5",
          },
          {
            icon: "🎤",
            label: "Communication Skills",
            val: p.communication,
            color: "#f5a623",
          },
          {
            icon: "📊",
            label: "Problem Solving",
            val: p.problemSolving,
            color: "#4a9fd5",
          },
          {
            icon: "🔥",
            label: "Confidence",
            val: p.confidence,
            color: "#f5a623",
          },
        ]);

      } catch (error) {
        console.log(error);
      }

    };

    if (user) {
      fetchProgress();
    }

  }, []);

  return (
    <div className="ps-activities">
      {activities.map((a, i) => (
        <div key={i} className={`ps-activity ${visible ? 'ps-activity--visible' : ''}`} style={{ '--ai': i }}>
          <div className="ps-activity__top">
            <span className="ps-activity__icon">{a.icon}</span>
            <span className="ps-activity__label">{a.label}</span>
            <span className="ps-activity__val" style={{ color: a.color }}>{a.val}%</span>
          </div>
          <div className="ps-activity__track">
            <div
              className="ps-activity__fill"
              style={{
                '--fill-color': a.color,
                transitionDelay: visible ? `${i * 0.15 + 0.6}s` : '0s',
                width: visible ? `${a.val}%` : '0%',
              }}
            />
            <div
              className="ps-activity__glow"
              style={{
                '--fill-color': a.color,
                transitionDelay: visible ? `${i * 0.15 + 0.6}s` : '0s',
                width: visible ? `${a.val}%` : '0%',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityBars;