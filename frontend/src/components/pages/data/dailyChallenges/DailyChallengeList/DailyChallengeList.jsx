import React, { useState, useEffect, useRef } from "react";
import "./DailyChallengeList.css";
import DiffBadge from "../DiffBadge/DiffBadge";
import DailyProgress from "../DailyProgress/DailyProgress";
import DailyRelatedTopics from "../DailyRelatedTopics/DailyRelatedTopics";
import DailyMotivation from "../DailyMotivation/DailyMotivation";

const CHALLENGES = [
    {
        id: 1,
        title: "Maximum Subarray",
        difficulty: "Medium",
        time: "20 mins",
        topic: "Dynamic Programming",
        tags: ["Arrays", "DP", "Kadane's"],
        desc: "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
        example: { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explain: "The subarray [4,-1,2,1] has the largest sum = 6." },
        constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
    },
    {
        id: 2,
        title: "Valid Parentheses",
        difficulty: "Easy",
        time: "15 mins",
        topic: "Stack",
        tags: ["Stack", "Strings"],
        desc: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
        example: { input: 's = "()[]{}"', output: "true", explain: "All brackets are properly matched and closed." },
        constraints: ["1 ≤ s.length ≤ 10⁴", "s consists only of parentheses characters"],
    },
    {
        id: 3,
        title: "Word Break",
        difficulty: "Hard",
        time: "35 mins",
        topic: "Dynamic Programming",
        tags: ["DP", "Strings", "Hash Set"],
        desc: "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.",
        example: { input: 's = "leetcode", wordDict = ["leet","code"]', output: "true", explain: '"leetcode" can be segmented as "leet code".' },
        constraints: ["1 ≤ s.length ≤ 300", "1 ≤ wordDict.length ≤ 1000"],
    },
];

const DIFF_COLOR = { Easy: "#22c55e", Medium: "#f5a623", Hard: "#ef4444" };

export default function DailyChallengeList({ onSelect }) {
    const [go, setGo] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const t = setTimeout(() => setGo(true), 200);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="list-page">
            <section className="list-hero">
                <div className="lh-blobs"><div className="lb1" /><div className="lb2" /><div className="lb3" /></div>
                <div className="lh-content">
                    <div className="lh-badge"><span className="cp-dot pulse" />Daily Challenges · Active</div>
                    <h1 className="lh-title">Daily Coding<br /><span className="cp-accent">Challenge</span></h1>
                    <p className="lh-sub">Solve one interview-level problem daily to build consistency and sharpen your problem-solving skills.</p>
                    <div className="lh-chips">
                        <div className="lh-chip">🔥 28-Day Streak</div>
                        <div className="lh-chip">✅ 147 Solved</div>
                        <div className="lh-chip">🎯 84% Accuracy</div>
                        <div className="lh-chip">🏆 Top 8% this week</div>
                    </div>
                </div>
            </section>

            <section className="list-cards-section">
                <div className="lcs-header">
                    <span className="eyebrow">✦ Today's Challenges</span>
                    <h2 className="section-title">Pick Your <span className="acc">Challenge</span></h2>
                    <p className="lcs-sub">Each challenge is curated from real FAANG interview questions. Click any card to open the full problem.</p>
                </div>
                <div className={`lcs-grid ${go ? "lcs-visible" : ""}`} ref={ref}>
                    {CHALLENGES.map((c, i) => (
                        <div key={c.id} className="lcs-card glass-card" style={{ "--lci": i }} onClick={() => onSelect(c)}>
                            <div className="lcs-shimmer" />
                            <div className="lcs-top">
                                <div className="lcs-topic">{c.topic}</div>
                                <DiffBadge d={c.difficulty} />
                            </div>
                            <h3 className="lcs-title">{c.title}</h3>
                            <p className="lcs-desc">{c.desc.slice(0, 100)}…</p>
                            <div className="lcs-tags">
                                {c.tags.map(t => <span key={t} className="lcs-tag">{t}</span>)}
                            </div>
                            <div className="lcs-footer">
                                <span className="lcs-time">⏱ {c.time}</span>
                                <button className="lcs-btn">Start →</button>
                            </div>
                            <div className="lcs-corner-dot" style={{ background: DIFF_COLOR[c.difficulty] }} />
                        </div>
                    ))}
                </div>
            </section>

            <DailyProgress />
            <DailyMotivation />
            <DailyRelatedTopics />
        </div>
    );
}