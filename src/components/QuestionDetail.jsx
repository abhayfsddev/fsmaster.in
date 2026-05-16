import React, { useState } from 'react';
import { getQuestionById } from '../data/interviewStore';
import CodeBlock from './CodeBlock';
import './QuestionDetail.css';

function BulletList({ title, items }) {
  if (!items?.length) return null;
  return (
    <section className="qd-section">
      <h3>{title}</h3>
      <ul className="qd-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function TableBlock({ table }) {
  if (!table?.headers?.length) return null;
  return (
    <section className="table-container">
      <h3>{table.title}</h3>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              {table.headers.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function QuestionDetail({ questionId, onBack }) {
  const [activeQueryTab, setActiveQueryTab] = useState(0);
  const question = getQuestionById(questionId);

  if (!question) {
    return (
      <div className="question-detail main">
        <p>Question not found.</p>
        <button type="button" className="back-button" onClick={onBack}>← Back</button>
      </div>
    );
  }

  const { content, codeExamples = [], queryVariations = [], tables = [] } = question;
  const activeQuery = queryVariations[activeQueryTab];

  return (
    <article className="question-detail main" itemScope itemType="https://schema.org/Question">
      <button type="button" className="back-button" onClick={onBack}>← Back to Questions</button>

      <header className="question-header">
        <span className="question-id">#{question.id}</span>
        <span className="question-category">{question.category}</span>
        <span className="question-subcategory">{question.subCategory}</span>
      </header>

      <h1 className="question-title" itemProp="name">{question.question}</h1>

      <section className="question-explanation">
        <h2>Explanation</h2>
        {content.explanation.split('\n\n').map((para, i) => (
          <p key={i} itemProp="acceptedAnswer">{para}</p>
        ))}
      </section>

      <BulletList title="Key Concepts" items={content.keyConcepts} />
      <section className="qd-section">
        <h3>Internal Working</h3>
        <p>{content.internalWorking}</p>
      </section>
      <section className="qd-section">
        <h3>Real-Time Use Case</h3>
        <p>{content.realTimeUseCase}</p>
      </section>
      <BulletList title="Advantages" items={content.advantages} />
      <BulletList title="Disadvantages" items={content.disadvantages} />
      <BulletList title="Performance Considerations" items={content.performanceConsiderations} />
      <BulletList title="Common Mistakes" items={content.commonMistakes} />
      <section className="qd-section">
        <h3>Summary</h3>
        <p>{content.summary}</p>
      </section>
      <BulletList title="Follow-Up Questions" items={content.followUpQuestions} />

      {codeExamples.length > 0 && (
        <section className="qd-section">
          <h2>Code Examples</h2>
          {codeExamples.map((ex, i) => (
            <CodeBlock
              key={`${ex.title}-${i}`}
              id={`code-${question.id}-${i}`}
              title={ex.title}
              language={ex.language}
              code={ex.code}
            />
          ))}
        </section>
      )}

      {queryVariations.length > 0 && (
        <section className="qd-section query-tabs">
          <h2>SQL Query Variations</h2>
          <div className="query-tab-bar" role="tablist">
            {queryVariations.map((qv, i) => (
              <button
                key={qv.title}
                type="button"
                role="tab"
                aria-selected={activeQueryTab === i}
                className={`query-tab ${activeQueryTab === i ? 'active' : ''}`}
                onClick={() => setActiveQueryTab(i)}
              >
                {qv.title}
              </button>
            ))}
          </div>
          {activeQuery && (
            <CodeBlock
              id={`query-${question.id}-${activeQueryTab}`}
              title={activeQuery.title}
              language={activeQuery.language || 'sql'}
              code={activeQuery.query}
            />
          )}
        </section>
      )}

      {tables.map((table, i) => (
        <TableBlock key={`${table.title}-${i}`} table={table} />
      ))}

      <footer className="question-meta">
        <span className="meta-tag">{question.codeRequired ? '💻 Code' : '📝 Theory'}</span>
        <span className="meta-tag">{question.tableRequired ? '📊 Table' : '📄 No Table'}</span>
      </footer>
    </article>
  );
}
