import React from 'react';
import '../styles/components.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>Data Engineering AI Assistant</h1>
        <p>Learn • Build • Track Progress</p>
      </div>
      <div className="header-stats">
        <div className="stat">
          <span className="stat-number">50+</span>
          <span className="stat-label">Terms</span>
        </div>
        <div className="stat">
          <span className="stat-number">8</span>
          <span className="stat-label">Courses</span>
        </div>
        <div className="stat">
          <span className="stat-number">100+</span>
          <span className="stat-label">Videos</span>
        </div>
      </div>
    </header>
  );
};

export default Header;