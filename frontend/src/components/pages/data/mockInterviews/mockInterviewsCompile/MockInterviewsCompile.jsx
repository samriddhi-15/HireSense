import axios from "axios"
import React, { useState, useEffect } from "react";
import "./MockInterviewsCompile.css";
import MockInterviewsHero from "../mockInterviewsHero/MockInterviewsHero";
import MockSetupPanel from "../mockSetupPanel/MockSetupPanel";
import MockInterviewInterface from "../mockInterviewInterface/MockInterviewInterface";
import MockQuesPanel from "../mockQuesPanel/MockQuesPanel";
import MockTranscript from "../mockTranscript/MockTranscript";
import MockCoding from "../mockCoding/MockCoding";
import MockDashboard from "../mockDashboard/MockDashboard";
import MockAnalytics from "../mockAnalytics/MockAnalytics";
import MockRecommendation from "../mockRecommendation/MockRecommendation";
import MockSidebar from "../mockSidebar/MockSidebar";


export default function MockInterviewsCompile() {
  const [qi, setQi] = useState(0);
  const [view, setView] = useState("hero");
  const [interviewStage, setInterviewStage] = useState("intro");
  const [answers, setAnswers] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [interviewId, setInterviewId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [interviewSettings, setInterviewSettings] = useState({
    role: "",
    type: "",
    level: "",
    difficulty: "",
  });
  const [loading, setLoading] = useState(false);
  const [latestInterview, setLatestInterview] = useState(null);
  const currentQuestion =
    questions.length > 0
      ? questions[qi]
      : null;
  const [result, setResult] = useState(null);
  const [feedback, setFeedback] = useState("");
  useEffect(() => {

    setFeedback("");
    setResult(null);

  }, [qi]);


  const startInterview = async (
    settings
  ) => {

    try {

      if (loading) return false;

      setLoading(true);

      const user =
        JSON.parse(localStorage.getItem("user"));

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/interviews/start`,
        {
          userId: user._id,

          role: settings.role,

          type: settings.type,

          level: settings.level,

          difficulty: settings.difficulty
        }
      );
      console.log(
        "NEW QUESTIONS:",
        res.data.interview.questions
      );

      if (!res.data.success) {

        setLoading(false);

        return false;

      }

      setInterviewSettings(settings);

      setInterviewId(
        res.data.interview._id
      );

      setQuestions(
        res.data.interview.questions
      );

      localStorage.setItem(
        "interviewId",
        res.data.interview._id
      );

      setLoading(false);

      return true;

    } catch (error) {

      console.log(error);

      setLoading(false);

      return false;

    }

  };

  const fetchLatestInterview =
    async () => {

      try {

        const user =
          JSON.parse(
            localStorage.getItem("user")
          );

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/interviews/latest/${user._id}`
        );
        console.log(
          "LOADED INTERVIEW:",
          res.data.interview
        );

        setLatestInterview(
          res.data.interview
        );

      } catch (error) {

        console.log(error);

      }

    };

  const handleBack = () => {
    if (interviewStage === "questions") {
      setInterviewStage("intro");
    } else if (interviewStage === "coding") {
      setInterviewStage("questions");
    } else if (interviewStage === "dashboard") {
      setInterviewStage("coding");
    } else if (interviewStage === "analytics") {
      setInterviewStage("dashboard");
    } else if (interviewStage === "recommendation") {
      setInterviewStage("analytics");
    } else {
      setView("setup");
    }
  };


  const handleNextQuestion = () => {
    setResult(null);
    setFeedback("");
    if (!questions.length) return;

    if (qi < questions.length - 1) {

      setQi(prev => prev + 1);

    } else {

      setInterviewStage("coding");

    }

  };

  const handleSaveAnswer = async (answer) => {

    try {

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/interviews/answer`,
        {
          interviewId,
          questionIndex: qi,
          answer
        }
      );

      setFeedback(
        res.data.interview.questions[qi].feedback
      );

      setResult({
        score:
          res.data.interview.questions[qi].score,
        feedback:
          res.data.interview.questions[qi].feedback
      });

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div className="mip">
      <div className="page-blobs">
        <div className="pb1" /><div className="pb2" /><div className="pb3" />
      </div>

      {view === "hero" && <MockInterviewsHero onSetup={() => setView("setup")} />}

      {view === "setup" && (
        <div className="container">
          <button className="back-btn" onClick={() => {
            setView("hero")
            setInterviewStage("intro")
          }}>← Back</button>

          <MockSetupPanel
            loading={loading}
            onStart={async (settings) => {

              if (loading) return;

              const success =
                await startInterview(settings);

              if (success) {

                setView("interview");

                setInterviewStage("intro");

              }

            }}
          />
        </div>
      )}

      {view === "interview" && (


        <div className="interview-page">

          {/* Column 1: Main Content Wrapper */}
          <div className="interview-main">

            <button
              className="back-btn sticky-back"
              onClick={handleBack}
            >
              ← Back
            </button>

            <div className="interview-content-stack">

              {interviewStage === "intro" && (
                <MockInterviewInterface
                  interviewStage={interviewStage}
                  onContinue={() =>
                    setInterviewStage("questions")
                  }
                />
              )}

              {interviewStage === "questions" && (

                currentQuestion ? (

                  <>
                    <MockQuesPanel
                      question={currentQuestion}
                      qi={qi}
                      totalQuestions={questions.length}
                      setQi={setQi}
                      onNext={handleNextQuestion}
                    />

                    <MockTranscript
                      key={qi}
                      currentQuestion={currentQuestion}
                      onSaveAnswer={handleSaveAnswer}
                      feedback={feedback}
                      result={result}
                    />
                  </>

                ) : (

                  <div
                    style={{
                      padding: "40px",
                      textAlign: "center",
                      color: "#999"
                    }}
                  >
                    Loading question...
                  </div>

                )

              )}

              {interviewStage === "coding" && (
                <MockCoding
                  onSubmit={async () => {

                    await fetchLatestInterview();

                    setInterviewStage("dashboard");

                  }}
                />
              )}

              {interviewStage === "dashboard" && (
                <>
                  <MockDashboard
                    interview={latestInterview}
                    onNext={() =>
                      setInterviewStage("analytics")
                    }
                  />

                  <MockAnalytics
                    interview={latestInterview}
                    onNext={() =>
                      setInterviewStage(
                        "recommendation"
                      )
                    }
                  />
                </>
              )}

              {interviewStage === "recommendation" && (
                <MockRecommendation
                  interview={latestInterview}
                />
              )}

            </div>
          </div>

          {/* Sidebar */}
          <MockSidebar
            interview={latestInterview}
          />

        </div>

      )}  </div>
  );
}