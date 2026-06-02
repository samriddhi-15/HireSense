import React, { useState } from "react";
import "./HrSetupPanel.css";

const INTERVIEW_TYPES = ["HR Round", "Behavioral Round", "Managerial Round", "Communication Round", "Leadership Round"];
const EXP_LEVELS = ["Fresher", "Intermediate", "Experienced"];
const COMPANY_TYPES = ["Startup", "Product Based", "Service Based", "FAANG"];
const DIFFICULTIES = ["Easy", "Medium", "Hard"];
const DURATIONS = ["20 min", "30 min", "45 min", "60 min"];

const HrSetupPanel = ({ onStart }) => {
  const [itype, setItype] = useState(INTERVIEW_TYPES[0]);
  const [exp, setExp] = useState(EXP_LEVELS[0]);
  const [ctype, setCtype] = useState(COMPANY_TYPES[1]);
  const [diff, setDiff] = useState(DIFFICULTIES[1]);
  const [dur, setDur] = useState(DURATIONS[2]);
  const [cam, setCam] = useState(true);
  const [mic, setMic] = useState(true);

  return (
    <section className="setup-section">
      <div className="sh">
        <span className="eyebrow">✦ Configure Your Session</span>
        <h2 className="stitle">Interview <span className="acc">Setup</span></h2>
      </div>
      <div className="setup-grid">
        <div className="glass-card">
          <div className="gc-head">⚙️ Interview Settings</div>
          {[
            ["Interview Type", itype, setItype, INTERVIEW_TYPES],
            ["Experience Level", exp, setExp, EXP_LEVELS],
            ["Company Type", ctype, setCtype, COMPANY_TYPES],
            ["Difficulty", diff, setDiff, DIFFICULTIES],
            ["Duration", dur, setDur, DURATIONS],
          ].map(([l, v, s, o]) => (
            <div key={l} className="field">
              <label className="flabel">{l}</label>
              <select className="fselect" value={v} onChange={(e) => s(e.target.value)}>
                {o.map((x) => <option key={x}>{x}</option>)}
              </select>
            </div>
          ))}
        </div>

        <div className="glass-card">
          <div className="gc-head">📄 Resume & JD</div>
          <div className="upload-zone">
            <div style={{ fontSize: 32 }}>📤</div>
            <div className="uz-title">Upload Resume</div>
            <div className="uz-sub">PDF · DOC · Max 5MB</div>
            <button className="upload-btn">Choose File</button>
          </div>
          <div className="upload-zone" style={{ marginTop: 14 }}>
            <div style={{ fontSize: 32 }}>🏢</div>
            <div className="uz-title">Job Description (Optional)</div>
            <div className="uz-sub">AI will tailor questions to the role</div>
            <button className="upload-btn">Paste JD</button>
          </div>
        </div>

        <div className="glass-card">
          <div className="gc-head">🎥 Device Check</div>
          <div className="cam-box">
            <span style={{ fontSize: 48 }}>👤</span>
            <div className="cam-lbl">Camera Preview</div>
            <div className="cam-status"><span className="live-dot" />Live</div>
          </div>
          <div className="device-rows">
            {[
              ["📷", "Camera", "HD Webcam Active", cam, setCam],
              ["🎙", "Microphone", "Built-in Mic Active", mic, setMic],
            ].map(([ico, n, s, v, set]) => (
              <div key={n} className="dev-row">
                <span style={{ fontSize: 22 }}>{ico}</span>
                <div className="dev-info">
                  <div className="dev-name">{n}</div>
                  <div className="dev-sub">{s}</div>
                </div>
                <div className={`toggle ${v ? "ton" : ""}`} onClick={() => set(!v)}>
                  <div className="tthumb" />
                </div>
              </div>
            ))}
            <div className="dev-row">
              <span style={{ fontSize: 22 }}>🔊</span>
              <div className="dev-info">
                <div className="dev-name">Speakers</div>
                <div className="dev-sub">System Audio</div>
              </div>
              <span className="pill-ok">Ready</span>
            </div>
          </div>
          <button className="btn-primary wf" style={{ marginTop: 18 }} onClick={onStart}>
            🚀 Begin Interview
          </button>
        </div>
      </div>
    </section>
  );
};

export default HrSetupPanel;