import React, { useState } from "react";
import "./FrontendCodingPlayground.css";

export default function FrontendCodingPlayground() {
    const [consoleOutput, setConsoleOutput] = useState("");
    const [isRunning, setIsRunning] = useState(false);

    const initialCode = `// Problem: Complete the debounced wrapper execution model
function debounce(fn, waitTime) {
  let timeoutId = null;
  
  return function(...args) {
    const context = this;
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      fn.apply(context, args);
    }, waitTime);
  };
}`;

    const triggerEvaluation = () => {
        setIsRunning(true);
        setConsoleOutput(">> Running unit test assertions framework...\n");
        setTimeout(() => {
            setConsoleOutput(prev => prev + "✓ Test Case 1: Initial call spacing context retained.\n✓ Test Case 2: Immediate trailing scheduling overridden successfully.\n\n>> Output Status: SUCCESS. All assertions resolved cleanly (32ms).");
            setIsRunning(false);
        }, 1200);
    };

    return (
        <section className="fe-card fe-playground">
            <div className="fe-play-header">
                <div>
                    <h2 className="fe-play-title">Monaco Runtime Coding Environment</h2>
                    <p className="fe-play-sub">Interact directly with architectural mock environments.</p>
                </div>
                <div className="fe-play-actions">
                    <select className="fe-play-select">
                        <option>JavaScript (ES6)</option>
                        <option>TypeScript v5.2</option>
                    </select>
                    <button className="fe-play-btn fe-play-run" onClick={triggerEvaluation} disabled={isRunning}>
                        {isRunning ? "Running..." : "▶ Run Submissions"}
                    </button>
                </div>
            </div>

            <div className="fe-play-split">
                <div className="fe-play-editor-panel">
                    <div className="fe-play-lines">
                        {Array.from({ length: 13 }).map((_, i) => <div key={i}>{i + 1}</div>)}
                    </div>
                    <textarea
                        className="fe-play-textarea"
                        defaultValue={initialCode}
                        spellCheck="false"
                    />
                </div>

                <div className="fe-play-console">
                    <div className="fe-console-title">Console Output Logs</div>
                    <pre className="fe-console-body">
                        {consoleOutput || "// Execute current stack runtime data parameters to view assertions logs..."}
                    </pre>
                </div>
            </div>
        </section>
    );
}