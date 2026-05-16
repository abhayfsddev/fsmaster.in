import React, { useState } from 'react';
import { filterQuestions, getCategoryById, paginate } from '../data/interviewStore';
import '../styles/TopicPage.css';

const PAGE_SIZE = 10;

export default function TopicPage({ currentTopic, currentSub, onTopicSelect, onQuestionSelect }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const topic = getCategoryById(currentTopic);
  if (!topic) {
    return (
      <div className="main">
        <p>Select a category from the sidebar.</p>
      </div>
    );
  }

  const filtered = filterQuestions({
    categoryId: currentTopic,
    subCategory: currentSub,
    search: searchQuery,
  });

  const { items, page, totalPages, total } = paginate(filtered, currentPage, PAGE_SIZE);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <div className="main">
      <div className="breadcrumb">
        Home / {topic.label} / {currentSub}
      </div>
      <div
        className="page-header"
        style={{ background: `linear-gradient(135deg,${topic.color}dd,${topic.color}99)` }}
      >
        <div className="page-header-icon">{topic.icon}</div>
        <div className="page-header-content">
          <h2>{currentSub}</h2>
          <p>
            {topic.label} → {currentSub} · {total} Questions
          </p>
        </div>
      </div>

      <div className="filters">
        <input
          className="search-box"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          aria-label="Search questions"
        />
      </div>

      <div className="q-list">
        {items.length === 0 && <p className="empty-msg">No questions match your search.</p>}
        {items.map((q) => (
          <div
            key={q.id}
            className="q-card"
            role="button"
            tabIndex={0}
            onClick={() => onQuestionSelect(q.id)}
            onKeyDown={(e) => e.key === 'Enter' && onQuestionSelect(q.id)}
          >
            <div className="q-header">
              <div className="q-num">#{q.id}</div>
              <div className="q-header-content">
                <p className="q-title">{q.question}</p>
                <div className="q-meta">
                  <span className="category-badge">{q.category}</span>
                  <span className="subcategory-badge">{q.subCategory}</span>
                  {q.codeRequired && <span className="code-badge">💻 Code</span>}
                  {q.tableRequired && <span className="table-badge">📊 Table</span>}
                </div>
              </div>
              <div className="chevron">→</div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            type="button"
            className="pagination-btn"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            ← Previous
          </button>
          <span className="pagination-info">
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            className="pagination-btn"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next →
          </button>
        </div>
      )}

      <div className="related-topics">
        <div className="related-topics-title">Other {topic.label} Topics</div>
        <div className="related-topics-buttons">
          {topic.subs.map((sub) => (
            <button
              key={sub}
              type="button"
              onClick={() => {
                onTopicSelect(topic.id, sub);
                setCurrentPage(1);
              }}
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
