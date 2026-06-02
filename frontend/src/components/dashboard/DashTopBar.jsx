import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './DashTopBar.css';

const navItems = ['Dashboard','Mock Tests','Practice Hub','Progress','Interviews','Leaderboard'];

const DashTopBar = ({ activeNav, setActiveNav }) => {
  const [searchVal, setSearchVal] = useState('');

  return (
    <header className="dtb">
      <div className="dtb__noise" />

      {/* Logo */}
      <div className="dtb__logo">
        <span className="dtb__logo-icon">◆</span>
        <span className="dtb__logo-text"><Link to={'/'}>HireSense.</Link></span>
      </div>

      {/* Nav */}
      <nav className="dtb__nav">
        {navItems.map(item => (
          <button
            key={item}
            className={`dtb__nav-item ${activeNav === item ? 'dtb__nav-item--active' : ''}`}
            onClick={() => setActiveNav(item)}
          >
            {item}
            {activeNav === item && <span className="dtb__nav-pip" />}
          </button>
        ))}
      </nav>

      {/* Right actions */}
      <div className="dtb__right">
        <div className="dtb__search">
          <span className="dtb__search-icon">🔍</span>
          <input
            className="dtb__search-input"
            placeholder="Search interview questions..."
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
          />
        </div>
        <div className="dtb__notif">
          🔔
          <span className="dtb__notif-badge">3</span>
        </div>
        <div className="dtb__avatar">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face"
            alt="User"
            className="dtb__avatar-img"
          />
          <span className="dtb__avatar-dot" />
        </div>
      </div>
    </header>
  );
};

export default DashTopBar;