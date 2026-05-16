import React from 'react';
import '../styles/Navigation.css';

export default function Navigation({ currentPage, onPageChange, darkMode, onToggleDark }) {
  return (
    <nav className="nav">
      <div className="logo">
        <div className="logo-icon">
          <svg viewBox="0 0 16 16">
            <path d="M2 2h5v2H4v8h3v2H2V2zm7 0h5v12h-5v-2h3V4h-3V2z" />
          </svg>
        </div>
        <span>FS</span>
        <em>Master</em>
        <small>.in</small>
      </div>
      <div className="nav-links">
        <button
          className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
          onClick={() => onPageChange('home')}
        >
          Home
        </button>
        <button
          className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
          onClick={() => onPageChange('about')}
        >
          About
        </button>
        <button
          className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`}
          onClick={() => onPageChange('contact')}
        >
          Contact
        </button>
      </div>
      <div className="nav-right">
        <button
          className="icon-btn"
          onClick={onToggleDark}
          title="Toggle dark mode"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}
