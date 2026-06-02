import React, { useEffect, useState } from 'react';
import './DashStatRow.css';

function useCounter(target, suffix='', start=false, delay=0) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    const t = setTimeout(() => {
      let s = null;
      const step = (ts) => {
        if (!s) s = ts;
        const p = Math.min((ts-s)/1600, 1);
        const e = 1 - Math.pow(1-p, 3);
        setVal(Math.floor(e * target));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(t);
  }, [start, target, delay]);
  return val + suffix;
}

const bars = [
  { label:'Interviews', color:'#f5a623', w:'15%', target:15, suffix:'%' },
  { label:'Score',      color:'#1a1a1a', w:'15%', target:15, suffix:'%' },
  { label:'Practice Hours', color:'rgba(0,0,0,0.12)', w:'60%', target:60, suffix:'%', dark:true },
  { label:'Skill Growth',     color:'rgba(0,0,0,0.1)',  w:'10%', target:10, suffix:'%', dark:true },
];

const bigStats = [
  { icon:'🏆', label:'Practice Streak',  target:78,  suffix:'',  delay:200 },
  { icon:'📋', label:'Mock Tests',   target:56,  suffix:'',  delay:350 },
  { icon:'✨', label:'Skills Mastered',  target:203, suffix:'',  delay:500 },
];

const DashStatRow = () => {
  const [go, setGo] = useState(false);
  useEffect(() => { const t = setTimeout(() => setGo(true), 400); return () => clearTimeout(t); }, []);

  const s0 = useCounter(bigStats[0].target,'',go,bigStats[0].delay);
  const s1 = useCounter(bigStats[1].target,'',go,bigStats[1].delay);
  const s2 = useCounter(bigStats[2].target,'',go,bigStats[2].delay);
  const counts = [s0, s1, s2];

  return (
    <div className="dsr">
      {/* Bar metrics */}
      <div className="dsr__bars">
        {bars.map((b,i) => (
          <div key={i} className="dsr__bar-item" style={{ '--bdi': i }}>
            <span className="dsr__bar-label">{b.label}</span>
            <div className="dsr__bar-pill" style={{ background: b.color }}>
              {!b.dark && (
                <span className="dsr__bar-val">{go ? b.target : 0}%</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Big number stats */}
      <div className="dsr__bigs">
        {bigStats.map((s,i) => (
          <div key={i} className="dsr__big" style={{ '--bgi': i }}>
            <span className="dsr__big-icon">{s.icon}</span>
            <div>
              <span className="dsr__big-val">{counts[i]}</span>
              <span className="dsr__big-label">{s.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashStatRow;