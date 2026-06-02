import React, { useState, useEffect } from "react";
import "./DSAhero.css";

const DUMMY_CODE = `def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`;

const TOPIC_PILLS = [
  "Arrays", "Linked List", "Trees", "Graphs",
  "Dynamic Programming", "Recursion", "Sliding Window", "Binary Search",
];

const DIFFICULTIES = ["All", "Easy", "Medium", "Hard"];

function DSAhero({
  search, setSearch,
  difficulty, setDifficulty,
  activePill, setActivePill,
}) {
  const words = ["Master DSA.", "Ace Interviews.", "Think Faster.", "Get Hired."];
  const [wordIdx, setWordIdx] = useState(0);
  const [typedIdx, setTypedIdx] = useState(0);
  useEffect(() => {
    const word = words[wordIdx];
    if (typedIdx < word.length) {
      const t = setTimeout(() => setTypedIdx(typedIdx + 1), 80);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setTypedIdx(0);
      setWordIdx((wordIdx + 1) % words.length);
    }, 1800);
    return () => clearTimeout(t);
  }, [typedIdx, wordIdx]);

  return (
    <section className="hero-section">
      <div className="hero-blobs">
        <div className="hero-blob b1" />
        <div className="hero-blob b2" />
        <div className="hero-blob b3" />
      </div>

      <div className="hero-content">
        <div className="hero-badge">✦ AI Interview Preparation Platform</div>
        <h1 className="hero-heading">
          Practice DSA.<br />
          <span className="hero-typewriter">
            {words[wordIdx].slice(0, typedIdx)}
            <span className="cursor">|</span>
          </span>
        </h1>
        <p className="hero-sub">
          Sharpen your problem-solving skills with 500+ curated DSA problems,
          AI-powered hints, and real interview simulations.
        </p>

        <div className="hero-search-wrap">
          <span className="search-icon">🔍</span>
          <input
            className="hero-search"
            placeholder="Search problems, topics, companies…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-btn">Search</button>
        </div>

        <div className="hero-filters">
          <div className="filter-group">
            <span className="filter-label">Difficulty:</span>
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                className={`filter-btn ${difficulty === d ? "filter-btn--active" : ""}`}
                onClick={() => setDifficulty(d)}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="topic-pills">
          {TOPIC_PILLS.map((p) => (
            <button
              key={p}
              className={`topic-pill ${activePill === p ? "topic-pill--active" : ""}`}
              onClick={() => setActivePill(activePill === p ? null : p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="hero-visual">
        <div className="code-preview">
          <div className="code-preview-bar">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
            <span className="code-filename">twoSum.py</span>
          </div>
          <pre className="code-body">{DUMMY_CODE}</pre>
          <div className="code-preview-footer">
            <span className="verdict pass">✓ All tests passed</span>
            <span className="runtime">52ms · Beats 91%</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DSAhero;