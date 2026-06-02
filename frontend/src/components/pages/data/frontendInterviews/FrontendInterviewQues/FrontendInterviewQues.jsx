import React, { useState } from "react";
import "./FrontendInterviewQues.css";

export default function FrontendInterviewQues() {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeDiff, setActiveDiff] = useState("All");

    const questions = [
        { title: "Implement deep clone with circular references handles", diff: "Hard", tags: ["JS Engine", "Algorithms"], accept: "34.2%", companies: ["Google", "Meta"] },
        { title: "Design custom concurrent async task batch scheduler", diff: "Hard", tags: ["Async Flow", "Promises"], accept: "41.8%", companies: ["Uber", "Amazon"] },
        { title: "Build custom React Hook orchestration matching state lifecycles", diff: "Medium", tags: ["React", "Hooks"], accept: "56.3%", companies: ["Netflix", "Microsoft"] },
        { title: "Optimize virtualization matrix container for 100k items", diff: "Hard", tags: ["DOM Opt", "Virtualization"], accept: "28.9%", companies: ["Google", "AirBnB"] },
        { title: "Resolve rendering priority inversion bottlenecks inside layout engines", diff: "Medium", tags: ["Performance", "CSS"], accept: "61.2%", companies: ["Apple"] }
    ];

    const filtered = questions.filter(q => {
        const matchSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchDiff = activeDiff === "All" || q.diff === activeDiff;
        return matchSearch && matchDiff;
    });

    return (
        <section className="fe-card fe-iq-section">
            <div className="fe-iq-header-block">
                <div>
                    <h2 className="fe-section-title">Core Interview Query Database</h2>
                    <p className="fe-section-subtitle">Filter through targeted validation patterns frequently requested by technical committees.</p>
                </div>
            </div>

            <div className="fe-iq-toolbar">
                <div className="fe-iq-search-box">
                    <span className="fe-search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search core concepts, data arrays, companies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="fe-iq-filters">
                    {["All", "Medium", "Hard"].map((d, i) => (
                        <button
                            key={i}
                            className={`fe-iq-filter-btn ${activeDiff === d ? "fe-iq-fbtn-active" : ""}`}
                            onClick={() => setActiveDiff(d)}
                        >{d}</button>
                    ))}
                </div>
            </div>

            <div className="fe-iq-table-wrapper">
                <table className="fe-iq-table">
                    <thead>
                        <tr>
                            <th>Problem Spec</th>
                            <th>Complexity</th>
                            <th>Module Scope</th>
                            <th>Yield Ratio</th>
                            <th>Target Board</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((q, idx) => (
                            <tr key={idx} className="fe-iq-row">
                                <td className="fe-iq-title-cell">
                                    <span className="fe-iq-star">☆</span>
                                    <span className="fe-iq-title-text">{q.title}</span>
                                </td>
                                <td><span className={`fe-iq-badge fe-iq-${q.diff.toLowerCase()}`}>{q.diff}</span></td>
                                <td>
                                    <div className="fe-iq-tags">
                                        {q.tags.map((t, i) => <span key={i} className="fe-iq-tag">{t}</span>)}
                                    </div>
                                </td>
                                <td className="fe-iq-mono">{q.accept}</td>
                                <td>
                                    <div className="fe-iq-comps">
                                        {q.companies.map((c, i) => <span key={i} className="fe-iq-comp">{c}</span>)}
                                    </div>
                                </td>
                                <td><button className="fe-iq-solve-btn">Solve</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}