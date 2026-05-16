import React, { useState } from 'react';
import { topics } from '../data/topicsData';
import { questions } from '../data/questions';
import '../styles/TopicPage.css';

export default function TopicPage({ currentTopic, currentSub, onTopicSelect, onQuestionSelect }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 200;

  const topic = topics.find((t) => t.id === currentTopic);
  if (!topic) return <div className="main"><p>Topic not found</p></div>;

  // Filter questions by category and subcategory
  const filteredQuestions = questions.filter((q) => {
    const matchesCategory = q.category.toLowerCase() === currentTopic.toLowerCase() || 
                            q.category.toLowerCase().replace(/\s+/g, '-') === currentTopic.toLowerCase();
    const matchesSub = q.subCategory.toLowerCase() === currentSub.toLowerCase() ||
                      q.subCategory.toLowerCase().replace(/\s+/g, '-') === currentSub.toLowerCase();
    return matchesCategory && matchesSub;
  });

  // Apply search filter
  const searchedQuestions = filteredQuestions.filter((q) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return q.question.toLowerCase().includes(query) ||
           q.category.toLowerCase().includes(query) ||
           q.subCategory.toLowerCase().includes(query);
  });

  // Pagination
  const totalPages = Math.ceil(searchedQuestions.length / questionsPerPage);
  const startIndex = (currentPage - 1) * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = searchedQuestions.slice(startIndex, endIndex);

  const handleQuestionClick = (questionId) => {
    onQuestionSelect(questionId);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
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
            {topic.label} → {currentSub} · {searchedQuestions.length} Questions
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
        />
      </div>
      <div className="q-list">
        {currentQuestions.map((q) => (
          <div key={q.id} className="q-card" onClick={() => handleQuestionClick(q.id)}>
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
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
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
