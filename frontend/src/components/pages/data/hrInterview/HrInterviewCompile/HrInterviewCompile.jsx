import React, { useState } from "react";

import "./HrInterviewCompile.css";
import HrInterviewHero from "../HrInterviewHero/HrInterviewHero";
import HrBehavioralSkills from "../HrBeahvioralSkills/HrBeahvioralSkills";
import HrStarMethod from "../HrStarMethod/HrStarMethod";
import HrCompanyPrep from "../HrCompanyPrep/HrCompanyPrep";
import HrQuesPanel from "../HrQuesPanel/HrQuesPanel";
import HrSetupPanel from "../HrSetupPanel/HrSetupPanel";
import HrInterviewSimulator from "../HrInterviewSimulator/HrInterviewSimulator";
import HrTranscriptAns from "../HrTranscriptAns/HrTranscriptAns";
import HrSidebar from "../HrSidebar/HrSidebar";
import HrAnalytics from "../HrAnalytics/HrAnalytics";
import HrAiSuggestions from "../HrAiSuggestions/HrAiSuggestions";
import HrHistoryAchievements from "../HrHistoryAchievements/HrHistoryAchievements";

export default function HrInterviewCompile() {
  const [view, setView] = useState("hero");

  return (
    <div className="hrp">
      <div className="page-blobs">
        <div className="pb1" />
        <div className="pb2" />
        <div className="pb3" />
      </div>

      {view === "hero" && (
        <>
          <HrInterviewHero onSetup={() => setView("setup")} />
          <div className="container">
            <HrBehavioralSkills />
            <HrStarMethod />
            <HrCompanyPrep />
            <HrAnalytics />
            <HrAiSuggestions />
            <HrHistoryAchievements /> 
          </div>
        </>
      )}

      {view === "setup" && (
        <div className="container">
          <button className="back-btn" onClick={() => setView("hero")}>← Back to Home</button>
          <HrSetupPanel onStart={() => setView("interview")} />
        </div>
      )}

      {view === "interview" && (
        <div className="interview-wrap">
          
          {/* LEFT PANEL: Holds navigation and core interactive items */}
          <div className="interview-main-pane">
            <button className="back-btn sticky-back" onClick={() => setView("setup")}>
              ← Back to Setup
            </button>
            <div className="interview-content-stack">
              <HrInterviewSimulator />
              <HrQuesPanel />
              <HrTranscriptAns />
              <HrAnalytics /> 
            </div>
          </div>
          
          {/* RIGHT PANEL: Pure sidebar track */}
          <HrSidebar show={true} />

        </div>
      )}
    </div>
  );
}