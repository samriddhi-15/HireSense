import React, { useState, useEffect, useRef } from "react";
import "./MockTranscript.css";


const MockTranscript = ({
  currentQuestion,
  onSaveAnswer,
  feedback,
  result
}) => {
  const [answer, setAnswer] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: currentQuestion.question,
      time: "00:00"
    }
  ]);
  const [typing, setTyping] = useState(false);
  const [recording, setRecording] = useState(false);
  const bottomRef = useRef(null);


  const sendAnswer = async () => {
    if (!answer.trim()) return;
    await onSaveAnswer(answer);
    const newMsg = {
      role: "candidate",
      text: answer,
      time: `0${Math.floor(messages.length / 2)}:${String((messages.length * 12) % 60).padStart(2, "0")}`
    };
    setMessages(m => [...m, newMsg]);
    setAnswer("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {

    if (!currentQuestion) return;

    setMessages([
      {
        role: "ai",
        text: currentQuestion.question,
        time: "00:00"
      }
    ]);

  }, [currentQuestion]);

  return (
    <section className="ta-section">
      <div className="ta-grid">
        <div className="transcript-panel">
          <div className="tp-header">
            <span>💬 Live Transcript</span>
            <span className="tp-live">● LIVE</span>
          </div>
          <div className="tp-messages">
            {messages.map((m, i) => (
              <div key={i} className={`tp-msg tp-msg-${m.role}`}>
                <div className="tp-avatar">{m.role === "ai" ? "🤖" : "👤"}</div>
                <div className="tp-bubble">
                  <div className="tp-bubble-text">{m.text}</div>
                  <div className="tp-time">{m.time}</div>
                </div>
              </div>
            ))}
            {typing && (
              <div className="tp-msg tp-msg-ai">
                <div className="tp-avatar">🤖</div>
                <div className="tp-bubble tp-typing">
                  <div className="typing-dots"><span /><span /><span /></div>
                </div>
              </div>
            )}
            {
              result && (
                <div className="tp-msg tp-msg-ai">
                  <div className="tp-avatar">🤖</div>

                  <div className="tp-bubble">
                    <strong>
                      Score: {result.score}/100
                    </strong>

                    <p>
                      {result.feedback}
                    </p>
                  </div>
                </div>
              )
            } 
            <div ref={bottomRef} />
          </div>
        </div>

        <div className="answer-panel">
          <div className="ap-header">🎙 Your Response</div>
          <textarea
            className="ap-textarea"
            placeholder="Type your answer here, or use the voice input button to speak your response…"
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            rows={8}
          />
          <div className="ap-footer">
            <span className="char-count">{answer.length} / 2000 characters</span>
            <div className="ap-actions">
              <button className={`voice-btn ${recording ? "voice-active" : ""}`} onClick={() => setRecording(!recording)}>
                {recording ? "⏹ Stop" : "🎙 Voice"}
              </button>
              <button className="btn-primary" onClick={sendAnswer} disabled={!answer.trim()}>Send Answer →</button>
            </div>
          </div>
          {recording && (
            <div className="recording-indicator">
              <span className="rec-dot" />Recording… speak now
              <div className="mini-wave">{[...Array(7)].map((_, i) => <div key={i} className="mw-bar" style={{ "--wi": i }} />)}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MockTranscript;