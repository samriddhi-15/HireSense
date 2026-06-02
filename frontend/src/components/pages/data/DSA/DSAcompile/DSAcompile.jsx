import React, { useState, useRef, useEffect } from "react";
import DSAhero from "../DSAhero/DSAhero";
import DSAstats from "../DSAstats/DSAstats";
import DSAfeatured from "../DSAfeatured/DSAfeatured";
import DSATopicCards from "../DSATopicCards/DSATopicCards";
import ProblemRow from "../DSAproblems/ProblemRow";
import ProblemDetail from "../DSAproblems/ProblemDetail";
import "./DSAcompile.css"; 
import DSASidebar from "../DSAsidebar/DSAsidebar";

// 1. Move your raw problems array here or source it from an API/JSON file
const PROBLEMS = [
  { id: 1, status: "solved", name: "Two Sum", difficulty: "Easy", tags: ["Arrays", "Hash Map"], acceptance: "49.3%" },
  { id: 2, status: "solved", name: "Best Time to Buy and Sell Stock", difficulty: "Easy", tags: ["Arrays", "Sliding Window"], acceptance: "54.2%" },
  { id: 3, status: "attempted", name: "Longest Substring Without Repeating Characters", difficulty: "Medium", tags: ["Sliding Window", "Hash Map"], acceptance: "33.8%" },
  { id: 4, status: "none", name: "Median of Two Sorted Arrays", difficulty: "Hard", tags: ["Binary Search", "Arrays"], acceptance: "35.7%" },
  { id: 5, status: "solved", name: "Valid Parentheses", difficulty: "Easy", tags: ["Stack", "Strings"], acceptance: "40.5%" },
  { id: 6, status: "none", name: "Merge Two Sorted Lists", difficulty: "Easy", tags: ["Linked List", "Recursion"], acceptance: "62.1%" },
  { id: 7, status: "attempted", name: "Maximum Subarray", difficulty: "Medium", tags: ["Arrays", "DP"], acceptance: "50.8%" },
  { id: 8, status: "none", name: "Word Search", difficulty: "Medium", tags: ["Backtracking", "Graphs"], acceptance: "40.2%" },
  { id: 9, status: "none", name: "Trapping Rain Water", difficulty: "Hard", tags: ["Arrays", "Two Pointers"], acceptance: "57.3%" },
  { id: 10, status: "solved", name: "Climbing Stairs", difficulty: "Easy", tags: ["DP", "Recursion"], acceptance: "51.9%" },
  { id: 11, status: "none", name: "Binary Tree Level Order Traversal", difficulty: "Medium", tags: ["Trees", "BFS"], acceptance: "65.4%" },
  { id: 12, status: "attempted", name: "Coin Change", difficulty: "Medium", tags: ["DP", "Greedy"], acceptance: "41.7%" },
];

function DSAcompile() {
  // 2. Main cross-component layout states
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [activePill, setActivePill] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [listVisible, setListVisible] = useState(false);
  const listRef = useRef(null);

  // Intersection observer for table appearance animation
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setListVisible(true); }, { threshold: 0.05 });
    if (listRef.current) obs.observe(listRef.current);
    return () => obs.disconnect();
  }, []);

  // 3. Problem Filter Logic
  const filteredProblems = PROBLEMS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchDiff = difficulty === "All" || p.difficulty === difficulty;
    const matchPill = !activePill || p.tags.some(t => t.toLowerCase().includes(activePill.toLowerCase()));
    return matchSearch && matchDiff && matchPill;
  });

  return (
    <div className="dsa-page">
      {/* Hero Section receives mutation controls */}
      <DSAhero
        search={search} setSearch={setSearch}
        difficulty={difficulty} setDifficulty={setDifficulty}
        activePill={activePill} setActivePill={setActivePill}
      />

      <div className="container">
        <DSAstats />
      </div>

      <div className="container">
        <DSAfeatured />
      </div>

      <div className="container">
        <DSATopicCards />
      </div>

      {/* Main Grid Wrapper layout for Table vs Sidebar */}
      <div className="container">
        <div className="section-head">
          <div>
            <span className="section-eyebrow">✦ Problem Bank</span>
            <h2 className="section-title">All <span className="accent-text">Problems</span></h2>
          </div>
          <div className="list-controls">
            <span className="problem-count">{filteredProblems.length} problems</span>
          </div>
        </div>

        <div className="main-layout">
          {/* Problem Table Side */}
          <div className={`problem-list-wrap ${listVisible ? "list-visible" : ""}`} ref={listRef}>
            <table className="problem-table">
              <thead>
                <tr>
                  <th style={{ width: "40px" }}>Status</th>
                  <th>Problem</th>
                  <th style={{ width: "100px" }}>Difficulty</th>
                  <th>Tags</th>
                  <th style={{ width: "100px" }}>Acceptance</th>
                </tr>
              </thead>
              <tbody>
                {filteredProblems.map((problem) => (
                  <ProblemRow 
                    key={problem.id} 
                    problem={problem} 
                    onClick={setSelectedProblem} 
                  />
                ))}
                {filteredProblems.length === 0 && (
                  <tr>
                    <td colSpan={5} className="empty-state">
                      No problems match your filters. Try adjusting the search or difficulty.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Sidebar Area */}
          <DSASidebar />
        </div>
      </div>

      {/* Conditionally rendered detail Modal overlay */}
      {selectedProblem && (
        <ProblemDetail 
          problem={selectedProblem} 
          onClose={() => setSelectedProblem(null)} 
        />
      )}
    </div>
  );
}

export default DSAcompile;