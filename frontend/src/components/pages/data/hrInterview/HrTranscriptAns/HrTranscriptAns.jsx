import React, { useState, useEffect, useRef } from "react";
import "./HrTranscriptAns.css";

const TRANSCRIPT_INIT = [
    { role: "ai", text: "Hello! I'm your AI HR Interviewer today. I'll be evaluating your communication, confidence, and behavioral competencies. Let's begin — are you ready to start?", time: "00:00" },
    { role: "candidate", text: "Yes, absolutely! I'm ready and looking forward to this session.", time: "00:14" },
    { role: "ai", text: "Wonderful! Let's start with a classic question. I want you to be as natural and genuine as possible. Here's your first question.", time: "00:22" },
];

const HrTranscriptAns = () => {
    const [answer, setAnswer] = useState("");
    const [msgs, setMsgs] = useState(TRANSCRIPT_INIT);
    const [typing, setTyping] = useState(false);
    const [recording, setRecording] = useState(false);
    const bottomRef = useRef(null);

    const send = () => {
        if (!answer.trim()) return;
        setMsgs((m) => [...m, { role: "candidate", text: answer, time: `0${Math.floor(msgs.length / 2)}:${String((msgs.length * 14) % 60).padStart(2, "0")}` }]);
        setAnswer("");
        setTyping(true);
        setTimeout(() => {
            setTyping(false);
            setMsgs((m) => [...m, { role: "ai", text: "That's a great example! I noticed you mentioned the outcome clearly. Could you tell me more about your specific role in the decision-making process and what you would do differently today?", time: `0${Math.floor((msgs.length + 1) / 2)}:15` }]);
        }, 2000);
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [msgs, typing]);

    return (
        <section className="ta-section">
            <div className="ta-grid">
                <div className="transcript-panel glass-card">
                    <div className="tp-bar"><span>💬 Live Transcript</span><span className="live-chip">● LIVE</span></div>
                    <div className="tp-msgs">
                        {msgs.map((m, i) => (
                            <div key={i} className={`tp-msg ${m.role === 'ai' ? 'tpm-ai' : 'tpm-candidate'}`}>
                                <div className="tp-av">{m.role === "ai" ? "🤖" : "👤"}</div>
                                <div className={`tp-bub ${m.role === 'ai' ? 'tb-ai' : 'tb-candidate'}`}>
                                    <div className="tb-text">{m.text}</div>
                                    <div className="tb-time">{m.time}</div>
                                </div>
                            </div>
                        ))}
                        {typing && (
                            <div className="tp-msg tpm-ai">
                                <div className="tp-av">🤖</div>
                                <div className="tp-bub tb-ai tp-typing">
                                    <div className="typing-dots"><span /><span /><span /></div>
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>
                </div>

                <div className="answer-panel glass-card">
                    <div className="ap-head">🎙 Your Response</div>
                    <textarea className="ap-ta" placeholder="Type your answer here or use voice input to speak your response naturally…" value={answer} onChange={(e) => setAnswer(e.target.value)} rows={8} />
                    <div className="ap-footer">
                        <span className="char-cnt">{answer.length} / 2000</span>
                        <div className="ap-acts">
                            <button className={`voice-btn ${recording ? "vb-active" : ""}`} onClick={() => setRecording(!recording)}>{recording ? "⏹ Stop" : "🎙 Voice"}</button>
                            <button className="btn-primary" onClick={send} disabled={!answer.trim()}>Send →</button>
                        </div>
                    </div>
                    {recording && (
                        <div className="rec-indicator">
                            <span className="rec-d" />Recording…
                            <div className="mini-wave">{[...Array(7)].map((_, i) => <div key={i} className="mwb" style={{ "--wi": i }} />)}</div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default HrTranscriptAns;