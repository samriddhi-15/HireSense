import React, { useState } from "react";
import "./MockQuesPanel.css";
import DiffBadge from "../sharedComponents/DiffBadge";


const MockQuesPanel = ({
    question,
    qi,
    totalQuestions,
    setQi,
    onNext
}) => {
    const [bookmarked, setBookmarked] = useState(false);
    const [hintShown, setHintShown] = useState(false);
    const q = question;

    const handleNext = () => {
        if(qi < totalQuestions - 1) {
            setQi(prev => prev + 1)

        } else {
            onNext()
        }
    }

    return (
        <section className="question-section">
            <div className="qs-card">
                <div className="qs-header">
                    <div className="qs-left">
                        <span className="qs-num">{q.num}</span>
                        <DiffBadge d={q.diff} />
                        <span className="qs-cat">{q.cat}</span>
                    </div>
                    <div className="qs-right">
                        <button className={`qs-icon-btn ${bookmarked ? "bookmarked" : ""}`} onClick={() => setBookmarked(!bookmarked)} title="Bookmark">🔖</button>
                        <button className="qs-icon-btn" title="Repeat">🔁</button>
                        <button className="qs-icon-btn" title="Hint" onClick={() => setHintShown(!hintShown)}>💡</button>
                    </div>
                </div>
                <div className="qs-text">{q.question}</div>
                {hintShown && (
                    <div className="qs-hint">
                        <div className="hint-head">💡 AI Hint</div>
                        <p>Structure your answer using the STAR method: <strong>Situation, Task, Action, Result</strong>. Be specific with metrics and demonstrate your impact clearly.</p>
                    </div>
                )}
                <div className="qs-nav">
                    <button className="btn-outline" onClick={() => setQi(Math.max(0, qi - 1))} disabled={qi === 0}>← Previous</button>
                    <div className="qs-dots">
                        {[...Array(totalQuestions)].map((_, i) => (
                            <div key={i} className={`qs-dot ${i === qi ? "qs-dot-active" : ""} ${i < qi ? "qs-dot-done" : ""}`} onClick={() => setQi(i)} />
                        ))}
                    </div>
                    <button className="btn-primary" onClick={handleNext} >Next →</button>
                </div>
            </div>
        </section>
    );
};

export default MockQuesPanel;