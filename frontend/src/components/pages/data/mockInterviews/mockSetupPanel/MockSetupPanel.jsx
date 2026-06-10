import React, { useState } from "react";
import "./MockSetupPanel.css";

const ROLES = ["Frontend Engineer", "Backend Engineer", "Full Stack Engineer", "Data Scientist", "DevOps Engineer", "Product Manager", "System Design", "ML Engineer"];
const LEVELS = ["Intern", "Junior", "Mid-Level", "Senior", "Staff", "Principal"];
const TYPES = ["Technical", "Behavioral", "HR", "System Design", "Coding", "Mixed"];
const DIFFICULTIES = ["Easy", "Medium", "Hard", "Expert"];
const DURATIONS = ["15 min", "30 min", "45 min", "60 min", "90 min"];

const MockSetupPanel = ({
  onStart,
  loading
}) => {

  const [role, setRole] = useState(ROLES[0]);
  const [level, setLevel] = useState(LEVELS[2]);
  const [type, setType] = useState(TYPES[5]);
  const [diff, setDiff] = useState(DIFFICULTIES[1]);
  const [dur, setDur] = useState(DURATIONS[3]);
  const [cam, setCam] = useState(true);
  const [mic, setMic] = useState(true);
  const [resumeFile, setResumeFile] = useState(null);
  const [jdText, setJdText] = useState("");

  const handleStartInterview =
    async () => {
      if (loading) return;
      await onStart({
        role,
        level,
        type,
        difficulty: diff,
        duration: dur,
        resumeFile,
        jdText
      });

    };

  return (
    <section className="setup-section">
      <div className="section-header">
        <span className="section-eyebrow">
          ✦ Interview Configuration
        </span>

        <h2 className="section-title">
          Setup Your
          <span className="accent">
            {" "}Interview Session
          </span>
        </h2>

        <p className="section-sub">
          Configure your interview preferences before we begin
        </p>
      </div>

      <div className="setup-grid">
        <div className="setup-card">
          <div className="setup-card-head">
            ⚙️ Interview Settings
          </div>
          <div className="setup-fields">

            {[
              ["Target Role", role, setRole, ROLES],
              ["Experience Level", level, setLevel, LEVELS],
              ["Interview Type", type, setType, TYPES],
              ["Difficulty", diff, setDiff, DIFFICULTIES],
              ["Duration", dur, setDur, DURATIONS]
            ].map(([label, val, setter, opts]) => (

              <div
                key={label}
                className="field-group"
              >

                <label className="field-label">
                  {label}
                </label>

                <select
                  className="field-select"
                  value={val}
                  onChange={(e) =>
                    setter(e.target.value)
                  }
                >

                  {opts.map((o) => (
                    <option key={o}>
                      {o}
                    </option>
                  ))}

                </select>
              </div>
            ))}

          </div>
        </div>

        <div className="setup-card">
          <div className="setup-card-head">
            📄 Documents
          </div>
          <div className="upload-area">
            <div className="upload-icon">
              📤
            </div>

            <div className="upload-text">
              Upload Your Resume
            </div>

            <div className="upload-sub">
              PDF, DOC, DOCX · Max 5MB
            </div>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) =>
                setResumeFile(e.target.files[0])
              }
            />

            {resumeFile && (
              <p>{resumeFile.name}</p>
            )}

          </div>

          <div
            className="upload-area"
            style={{ marginTop: 16 }}
          >

            <div className="upload-icon">
              📋
            </div>

            <div className="upload-text">
              Job Description (Optional)
            </div>

            <div className="upload-sub">
              Paste the job posting
            </div>

            <textarea
              placeholder="Paste Job Description"
              value={jdText}
              onChange={(e) =>
                setJdText(e.target.value)
              }
            />

          </div>
        </div>

        <div className="setup-card">
          <div className="setup-card-head">
            🎥 Device Setup
          </div>

          <div className="device-preview">
            <div className="cam-preview">

              <span style={{ fontSize: 48 }}>
                👤
              </span>

              <div className="cam-label">
                Camera Preview
              </div>

            </div>
          </div>

          <div className="device-toggles">
            <div className="device-row">
              <div className="device-info">

                <span style={{ fontSize: 20 }}>
                  📷
                </span>

                <div>

                  <div className="device-name">
                    Camera
                  </div>
                  <div className="device-sub">
                    HD Webcam · Active
                  </div>
                </div>
              </div>

              <div
                className={`toggle ${cam ? "toggle-on" : ""}`}
                onClick={() => setCam(!cam)}
              >
                <div className="toggle-thumb" />
              </div>
            </div>

            <div className="device-row">
              <div className="device-info">

                <span style={{ fontSize: 20 }}>
                  🎙
                </span>

                <div>

                  <div className="device-name">
                    Microphone
                  </div>
                  <div className="device-sub">
                    Built-in Mic · Active
                  </div>
                </div>
              </div>

              <div
                className={`toggle ${mic ? "toggle-on" : ""}`}
                onClick={() => setMic(!mic)}
              >
                <div className="toggle-thumb" />
              </div>

            </div>

            <div className="device-row">
              <div className="device-info">
                <span style={{ fontSize: 20 }}>
                  🔊
                </span>

                <div>
                  <div className="device-name">
                    Speakers
                  </div>

                  <div className="device-sub">
                    System Audio · Active
                  </div>

                </div>
              </div>
              <div className="status-pill status-ok">
                Ready
              </div>
            </div>
          </div>

          <button
            className="btn-primary w-full"
            onClick={handleStartInterview}
            disabled={loading}
            style={{
              marginTop: 20,
              opacity: loading ? 0.7 : 1,
              cursor: loading
                ? "not-allowed"
                : "pointer"
            }}
          >

            {loading
              ? "Generating AI Interview..."
              : "🚀 Begin Interview Session"}

          </button>
        </div>
      </div>
    </section>
  );
};

export default MockSetupPanel;