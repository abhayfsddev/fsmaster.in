import React, { useState } from 'react';
import { topics, getQuestions } from '../data/topicsData';
import '../styles/TopicPage.css';

export default function TopicPage({ currentTopic, currentSub, onTopicSelect }) {
  const [openQuestions, setOpenQuestions] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  const topic = topics.find((t) => t.id === currentTopic);
  if (!topic) return <div className="main"><p>Topic not found</p></div>;

  const allQuestions = getQuestions(currentTopic, currentSub);

  const filteredQuestions = allQuestions.filter((q) => {
    const matchesSearch =
      !searchQuery ||
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.a.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      difficultyFilter === 'All' || q.d === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  const toggleQuestion = (index) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const copyCode = (code, buttonId) => {
    if (code && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      const btn = document.getElementById(buttonId);
      if (btn) {
        btn.textContent = 'Copied!';
        setTimeout(() => {
          if (btn) btn.textContent = 'Copy';
        }, 1500);
      }
    }
  };

  const getDiffClass = (difficulty) => {
    const map = { Basic: 'diff-basic', Intermediate: 'diff-inter', Advanced: 'diff-adv' };
    return map[difficulty] || 'diff-basic';
  };

  return (
    <div className="main">
      <div className="breadcrumb">
        Home / {topic.label} / {currentSub}
      </div>
      <div className="page-header" style={{ background: `linear-gradient(135deg,${topic.color}dd,${topic.color}99)` }}>
        <div className="page-header-icon">{topic.icon}</div>
        <div className="page-header-content">
          <h2>{currentSub}</h2>
          <p>
            {topic.label} → {currentSub} · {allQuestions.length} Questions
          </p>
        </div>
      </div>
      <div className="filters">
        <input
          className="search-box"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="diff-tabs">
          {['All', 'Basic', 'Intermediate', 'Advanced'].map((diff) => (
            <button
              key={diff}
              className={`diff-tab ${difficultyFilter === diff ? 'active' : ''}`}
              onClick={() => setDifficultyFilter(diff)}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>
      <div className="q-list">
        {filteredQuestions.map((q, i) => {
          const qIndex = allQuestions.indexOf(q);
          const isOpen = openQuestions[qIndex];
          return (
            <div key={qIndex} className={`q-card ${isOpen ? 'open' : ''}`}>
              <div className="q-header" onClick={() => toggleQuestion(qIndex)}>
                <div className="q-num">{String(qIndex + 1).padStart(2, '0')}</div>
                <div className="q-header-content">
                  <p className="q-title">{q.q}</p>
                  <span className={`diff-badge ${getDiffClass(q.d)}`}>{q.d}</span>
                </div>
                <div className="chevron">▾</div>
              </div>
              {isOpen && (
                <div className="q-body">
                  <p className="q-ans">{q.a}</p>
                  {q.code && (
                    <div className="code-block">
                      <button
                        className="copy-btn"
                        id={`copy-${qIndex}`}
                        onClick={() => copyCode(q.code, `copy-${qIndex}`)}
                      >
                        Copy
                      </button>
                      <pre>{q.code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="related-topics">
        <div className="related-topics-title">Other {topic.label} Topics</div>
        <div className="related-topics-buttons">
          {topic.subs.map((sub) => (
            <button
              key={sub}
              onClick={() => onTopicSelect(topic.id, sub)}
              className={`related-topic-btn ${sub === currentSub ? 'active' : ''}`}
              style={{
                borderColor: sub === currentSub ? topic.color : undefined,
                background: sub === currentSub ? topic.color : undefined,
              }}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
