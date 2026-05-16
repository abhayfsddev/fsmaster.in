import React, { useState } from 'react';
import { questions } from '../data/questions';
import { questionExplanations } from '../data/questionExplanations';
import './QuestionDetail.css';

const QuestionDetail = ({ questionId, onBack }) => {
  const [copiedCode, setCopiedCode] = useState(null);
  
  const question = questions.find(q => q.id === parseInt(questionId));
  const explanationData = questionExplanations[parseInt(questionId)];
  
  if (!question) {
    return <div className="question-detail">Question not found</div>;
  }

  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const renderTable = (tableString) => {
    if (!tableString) return null;
    
    const lines = tableString.trim().split('\n');
    const rows = lines.map(line => line.split('|').filter(cell => cell.trim() !== ''));
    
    if (rows.length < 2) return null;
    
    const headers = rows[0].map(cell => cell.trim());
    const bodyRows = rows.slice(1);
    
    return (
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell.trim()}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="question-detail">
      <button className="back-button" onClick={onBack}>← Back to Questions</button>
      
      <div className="question-header">
        <span className="question-id">#{question.id}</span>
        <span className="question-category">{question.category}</span>
        <span className="question-subcategory">{question.subCategory}</span>
      </div>
      
      <h1 className="question-title">{question.question}</h1>
      
      <div className="question-explanation">
        <h2>Explanation</h2>
        <p>{explanationData?.explanation || 'Explanation not available for this question.'}</p>
      </div>
      
      {question.codeRequired && explanationData?.code && (
        <div className="code-section">
          <div className="code-header">
            <h3>Code Solution</h3>
            <button 
              className="copy-button"
              onClick={() => handleCopy(explanationData.code, 'main')}
            >
              {copiedCode === 'main' ? '✓ Copied!' : '📋 Copy'}
            </button>
          </div>
          <pre className="code-block">
            <code>{explanationData.code}</code>
          </pre>
        </div>
      )}
      
      {question.tableRequired && explanationData?.table && (
        <div className="table-container">
          <h3>Related Table</h3>
          {renderTable(explanationData.table)}
        </div>
      )}
      
      <div className="question-meta">
        <span className="meta-tag">
          {question.codeRequired ? '💻 Code Required' : '📝 Theory Only'}
        </span>
        <span className="meta-tag">
          {question.tableRequired ? '📊 Table Required' : '📄 No Table'}
        </span>
      </div>
    </div>
  );
};

export default QuestionDetail;
