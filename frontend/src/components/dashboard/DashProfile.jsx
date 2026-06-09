import React from 'react';
import './DashProfile.css';

const user =
  JSON.parse(localStorage.getItem("user"));

const DashProfile = ({
  dashboardData
}) => {

  const info = [
    {
      label: "Interviews",
      val: dashboardData?.interviews || 0
    },

    {
      label: "Streak",
      val: `${dashboardData?.streak || 0} Days 🔥`
    },

    {
      label: "Score",
      val: `${dashboardData?.averageScore || 0}%`
    },

    {
      label: "Mock Interviews",
      val: dashboardData?.mockTests || 0
    }
  ];

  return (
    <div className="dp">
      <div className="dp__img-wrap">
        <div className="dp__img-ring" />

        <img
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=400&fit=crop&crop=face"
          alt="Learner"
          className="dp__img"
        />

        <div className="dp__img-overlay" />

        <div className="dp__name-chip">
          <span className="dp__name">
            {user?.fname || "HireSense User"}
          </span>

          <span className="dp__title">
            Interview Candidate
          </span>
        </div>

        <div className="dp__salary-chip">
          {dashboardData?.averageScore >= 70
            ? "Top Performer"
            : "Keep Growing"}
        </div>
      </div>

      <div className="dp__info">
        {info.map((r, i) => (
          <div
            key={i}
            className="dp__info-row"
            style={{ '--ii': i }}
          >
            <span className="dp__info-label">
              {r.label}
            </span>

            <span className="dp__info-val">
              {r.val}
            </span>

            <span className="dp__info-chevron">
              ›
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashProfile;