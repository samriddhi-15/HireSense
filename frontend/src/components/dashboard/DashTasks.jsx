import React, { useState } from 'react';
import './DashTasks.css';

const tasks = [
  { id:1, title:'Aptitude Mock Test',    date:'Sep 13, 09:30', done:true,  icon:'📝' },
  { id:2, title:'HR Interview Questions',  date:'Sep 13, 12:00', done:true,  icon:'🤝' },
  { id:3, title:'Coding Assessment',     date:'Sep 13, 15:00', done:false, icon:'📁' },
  { id:4, title:'React Interview Practice',   date:'Sep 13, 15:45', done:false, icon:'🎯' },
  { id:5, title:'Communication Practice',   date:'Sep 13, 16:30', done:false, icon:'📋' },
];

const DashTasks = () => {
  const [done, setDone] = useState(tasks.map(t => t.done));

  const completed = done.filter(Boolean).length;
  const pct = Math.round((completed / tasks.length) * 100);

  const toggle = i => setDone(d => d.map((v,j) => j===i ? !v : v));

  return (
    <div className="dtk">
      {/* Onboarding header */}
      <div className="dtk__head">
        <div>
          <div className="dtk__title">TODAY’S GOALS</div>
          <div className="dtk__score">{completed}/{tasks.length}</div>
        </div>
        <div className="dtk__pct-wrap">
          <div className="dtk__pct-num">{pct}%</div>
          <div className="dtk__pct-label">Goal Progress</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="dtk__bar-track">
        <div className="dtk__bar-fill" style={{ width: `${pct}%` }}>
          <div className="dtk__bar-shine" />
        </div>
      </div>

      {/* Tasks */}
      <div className="dtk__list">
        {tasks.map((t,i) => (
          <div
            key={t.id}
            className={`dtk__task ${done[i] ? 'dtk__task--done' : ''}`}
            style={{ '--ti': i }}
            onClick={() => toggle(i)}
          >
            <div className="dtk__task-icon-wrap">{t.icon}</div>
            <div className="dtk__task-info">
              <span className="dtk__task-title">{t.title}</span>
              <span className="dtk__task-date">{t.date}</span>
            </div>
            <div className={`dtk__check ${done[i] ? 'dtk__check--done' : ''}`}>
              {done[i] && <span className="dtk__check-tick">✓</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <button className="dtk__add">+ Create New Target</button>
    </div>
  );
};

export default DashTasks;