import React, { useState } from "react";
import DiffBadge from "../ui/DiffBadge";
import "./DSAProblems.css";

const DUMMY_CODE = `def twoSum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []`;

const ProblemDetail = ({ problem, onClose }) => {
  const [lang, setLang] = useState("Python");
  const [code, setCode] = useState(DUMMY_CODE);
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  const handleRun = () => {
    setRunning(true);
    setOutput("Running...");
    setTimeout(() => { 
        setOutput("All test cases passed!"); 
        setRunning(false); 
    }, 1400);
  };

  if (!problem) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="problem-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">{problem.name}</h2>
            <div className="modal-meta">
              <DiffBadge difficulty={problem.difficulty} />
              {problem.tags.map(t => <span key={t} className="tag-chip">{t}</span>)}
              <span className="acceptance-chip">✓ {problem.acceptance}</span>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="modal-left">
            <div className="modal-tabs">
              {["description", "examples", "constraints", "hints"].map(tab => (
                <button
                  key={tab}
                  className={`modal-tab ${activeTab === tab ? "modal-tab--active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >{tab.toUpperCase()}</button>
              ))}
            </div>
            <div className="tab-content">
                {/* Content based on activeTab... */}
                <p>Problem details for {problem.name} would render here.</p>
            </div>
          </div>

          <div className="modal-right">
            <div className="editor-toolbar">
              <select className="lang-select" value={lang} onChange={e => setLang(e.target.value)}>
                {["Python", "JavaScript", "Java", "C++"].map(l => <option key={l}>{l}</option>)}
              </select>
              <button className="editor-btn editor-run" onClick={handleRun} disabled={running}>
                {running ? "⏳ Running…" : "▶ Run Code"}
              </button>
            </div>
            <div className="code-editor-area">
              <textarea className="code-textarea" value={code} onChange={e => setCode(e.target.value)} spellCheck={false} />
            </div>
            <div className="output-console">
              <pre className="output-body">{output || "// Run your code"}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;