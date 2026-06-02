import React, { useState } from "react";
import "./MockCoding.css";
import DiffBadge from "../sharedComponents/DiffBadge";

const LANGUAGES = ["JavaScript", "Python", "Java", "C++", "Go", "TypeScript", "Rust"];
const INITIAL_CODE = `function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  
  return maxSum;
}

console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // 6`;

const MockCoding = ({
    onSubmit
}) => {
    const [lang, setLang] = useState("JavaScript");
    const [code, setCode] = useState(INITIAL_CODE);
    const [output, setOutput] = useState("");
    const [running, setRunning] = useState(false);
    const [activeCase, setActiveCase] = useState(0);
    const [allTestsPassed, setAllTestsPassed] = useState(false);

    const testCases = [
        { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", expected: "6" },
        { input: "nums = [1]", expected: "1" },
        { input: "nums = [5,4,-1,7,8]", expected: "23" },
    ];

    const handleRun = () => {
        setRunning(true);
        setOutput("Running test cases…");
        setAllTestsPassed(true);
        setTimeout(() => {
            setOutput(`✓ Test 1: Output = 6, Expected = 6  PASSED
✓ Test 2: Output = 1, Expected = 1  PASSED
✓ Test 3: Output = 23, Expected = 23  PASSED

All 3/3 tests passed!
Runtime: 48ms  |  Memory: 41.2 MB`);
            setRunning(false);
        }, 1500);
    };

    const handleSubmit = () => {

        if (!allTestsPassed) {

            alert("Run and pass test cases first!");

            return;
        }

        onSubmit();
    }

    return (
        <section className="coding-section">
            <div className="section-header">
                <span className="section-eyebrow">✦ Coding Round</span>
                <h2 className="section-title">Solve the <span className="accent">Problem</span></h2>
            </div>
            <div className="coding-grid">
                <div className="code-problem-card">
                    <div className="cp-title">Maximum Subarray <DiffBadge d="Medium" /></div>
                    <div className="cp-tags"><span className="tag">Arrays</span><span className="tag">DP</span><span className="tag">Kadane's</span></div>
                    <div className="cp-desc">
                        <p>Given an integer array <code>nums</code>, find the subarray with the largest sum, and return its sum.</p>
                        <div className="cp-example">
                            <div className="ex-label">Example 1</div>
                            <pre className="ex-code">{`Input: nums = [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6`}</pre>
                        </div>
                    </div>
                    <div className="test-cases">
                        <div className="tc-label">Test Cases</div>
                        {testCases.map((tc, i) => (
                            <div key={i} className={`tc-item ${activeCase === i ? "tc-active" : ""}`} onClick={() => setActiveCase(i)}>
                                <div className="tc-num">Case {i + 1}</div>
                                <div className="tc-input">{tc.input}</div>
                                <div className="tc-expected">Expected: {tc.expected}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="editor-panel">
                    <div className="editor-bar">
                        <select className="lang-select" value={lang} onChange={e => setLang(e.target.value)}>
                            {LANGUAGES.map(l => <option key={l}>{l}</option>)}
                        </select>
                        <button className="editor-btn editor-run" onClick={handleRun} disabled={running}>
                            {running ? "⏳ Running…" : "▶ Run Code"}
                        </button>
                        <button className="editor-btn editor-submit"  onClick={handleSubmit}>🚀 Submit</button>
                    </div>
                    <div className="editor-body">
                        <div className="line-nums">
                            {code.split("\n").map((_, i) => <div key={i}>{i + 1}</div>)}
                        </div>
                        <textarea className="code-ta" value={code} onChange={e => setCode(e.target.value)} spellCheck={false} />
                    </div>
                    <div className="output-panel">
                        <div className="op-label">Output Console</div>
                        <pre className={`op-body ${output.includes("passed") ? "op-success" : output ? "op-text" : "op-empty"}`}>
                            {output || "// Click 'Run Code' to execute your solution"}
                        </pre>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MockCoding;