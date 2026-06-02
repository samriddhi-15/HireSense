import React from "react";
import "./MockDashboard.css";

const TIMELINE = [
  {
    label: "Introduction",
    status: "done"
  },
  {
    label: "Technical Round",
    status: "done"
  },
  {
    label: "Coding Round",
    status: "done"
  },
  {
    label: "HR Round",
    status: "done"
  },
  {
    label: "Final Evaluation",
    status: "active"
  },
];

const MockDashboard = (
  { interview }
) => {
  console.log("DASHBOARD INTERVIEW:", interview);

  const analytics =
    interview?.analytics || {};

  const overallScore =
    interview?.overallScore || 0;

  const answeredQuestions =
    interview?.questions?.filter(
      q => q.answer?.trim()
    ).length || 0;

  const totalQuestions =
    interview?.questions?.length || 0;

  const progressPercent =
    totalQuestions
      ? (answeredQuestions / totalQuestions) * 100
      : 0;

  return (
    <>
      <section className="timeline-section">

        <div className="section-header">
          <span className="section-eyebrow">
            ✦ Interview Journey
          </span>

          <h2 className="section-title">
            Your <span className="accent">Progress</span> Timeline
          </h2>
          <div className="timeline-progress">
            <div
              className="timeline-progress-fill"
              style={{
                width: `${progressPercent}%`
              }}
            />
          </div>

          <div className="timeline-progress-text">
            {answeredQuestions} / {totalQuestions} Questions Completed
          </div>
        </div>

        <div className="tl-container">

          {TIMELINE.map((step, i) => (

            <div
              key={i}
              className={`tl-step 
                ${step.status === "done" ? "tl-done" : ""} 
                ${step.status === "active" ? "tl-active" : ""}
              `}
            >

              {i < TIMELINE.length - 1 && (
                <div
                  className={`tl-connector 
                    ${step.status === "done" ? "tl-connector-done" : ""}
                  `}
                />
              )}

              <div className="tl-dot-wrap">
                <div className="tl-dot">

                  {
                    step.status === "done"
                      ? "✓"
                      : step.status === "active"
                        ? "●"
                        : i + 1
                  }
                </div>

                {step.status === "active" && (
                  <div className="tl-dot-pulse" />
                )}
              </div>

              <div className="tl-content">

                <div className="tl-label">
                  {step.label}
                </div>

                <div className="tl-status">
                  {
                    step.status === "done"
                      ? "Completed ✓"
                      : step.status === "active"
                        ? "In Progress"
                        : "Upcoming"
                  }
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>
    </>

  );
};

export default MockDashboard;