import React from "react";
import FrontendChallenges from "../FrontendChallenges/FrontendChallenges";
import FrontendCodingPlayground from "../FrontendCodingPlayground/FrontendCodingPlayground";
import FrontendCompanyPrep from "../FrontendCompanyPrep/FrontendCompanyPrep";
import FrontendHero from "../FrontendHero/FrontendHero";
import FrontendMockInterviews from "../FrontendMockInterviews/FrontendMockInterviews";
import FrontendPerformance from "../FrontendPerformance/FrontendPerformance";
import FrontendRecommended from "../FrontendRecommended/FrontendRecommended";
import FrontendRoadmap from "../FrontendRoadmap/FrontendRoadmap";
import FrontendStreak from "../FrontendStreak/FrontendStreak";
import FrontendTopicCategories from "../FrontendTopicCategories/FrontendTopicCategories";
import FrontendInterviewQues from "../FrontendInterviewQues/FrontendInterviewQues";
import "./FrontendCompile.css";

function FrontendCompile() {
    return (
        <>
            <div className="fe-compile-page">
                <FrontendHero />

                <div className="fe-container fe-grid-layout">
                    <div className="fe-main-content">
                        <FrontendPerformance />
                        <FrontendRoadmap />
                        <FrontendTopicCategories />
                        <FrontendInterviewQues/>
                        <FrontendCodingPlayground />
                        <FrontendChallenges />
                        <FrontendCompanyPrep />
                        <FrontendRecommended />
                    </div>

                    <aside className="fe-sidebar-content">
                        <FrontendStreak />
                        <FrontendMockInterviews />
                    </aside>
                </div>
            </div>
        </>
    )
}

export default FrontendCompile;