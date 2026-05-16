import React, { useState, useEffect } from 'react';
import { topics, roles } from '../data/topicsData';
import '../styles/Home.css';
import JavaCodeAnimation from './JavaCodeAnimation';

export default function Home({ onTopicSelect, onPageChange }) {
  const [typedText, setTypedText] = useState('');
  const [typedIdx, setTypedIdx] = useState(0);
  const [typedChar, setTypedChar] = useState(0);
  const [typedDel, setTypedDel] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTypedIdx((prev) => {
        let idx = prev;
        let char = typedChar;
        let del = typedDel;

        const cur = roles[idx];
        if (!del) {
          if (char < cur.length) {
            setTypedChar((c) => c + 1);
            setTypedText(cur.slice(0, char + 1));
          } else {
            setTimeout(() => setTypedDel(true), 1800);
          }
        } else {
          if (char > 0) {
            setTypedChar((c) => c - 1);
            setTypedText(cur.slice(0, char - 1));
          } else {
            setTypedDel(false);
            setTypedIdx((i) => (i + 1) % roles.length);
          }
        }
        return idx;
      });
    }, 80);

    return () => clearInterval(timer);
  }, [typedChar, typedDel]);

  return (
    <div className="main">
      <div className="hero-split">
        <div className="hero-left">
          <div className="hero-text">
            <div className="badge">
              <span className="dot"></span> Open to Mentoring & Interview Prep
            </div>
            <p className="hero-subtitle">Hi, I'm</p>
            <h1>
              <span className="name">Abhay Kumar</span>
            </h1>
            <div className="typed">
              <span>{typedText}</span>
              <span className="cursor">|</span>
            </div>
            <p className="hero-desc">
              8+ years building enterprise Java apps. Currently leading Trinet Project  at{' '}
              <strong>Coforge</strong> using Spring Boot, Microservices, React js & Angular.
            </p>
            <p className="hero-desc">
              Possesses versatile skills in project management, problem-solving,
              and collaboration. Brings fresh perspective and strong commitment
              to quality and success. Recognized for adaptability and proactive
              approach in delivering effective solutions.
            </p>
            <div className="hero-btns">
              <button
                className="btn-p"
                onClick={() => onTopicSelect('java', 'JVM')}
              >
                Start Learning →
              </button>
              <button className="btn-g" onClick={() => onPageChange('about')}>
                View Resume
              </button>
            </div>
            <div className="hero-contact-info">
              <span>📍 Hyderabad, India</span>
              <span>📧 ancabhay@gmail.com</span>
            </div>
          </div>
          <div className="hero-photo-wrapper">
            <div className="hero-photo-ring"></div>
            <div className="hero-photo">
              <img
                src="/profile.png"
                alt="Abhay Kumar"
                onError={(e) => {
                  e.target.src =
                    'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%2306a8e9%22 rx=%2250%22/><text x=%2250%22 y=%2265%22 text-anchor=%22middle%22 font-size=%2240%22 fill=%22white%22>AK</text></svg>';
                }}
              />
            </div>
            <div className="hero-years-badge">
              <div className="hero-years-badge-num">8+</div>
              <div className="hero-years-badge-lbl">Years</div>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <JavaCodeAnimation />
        </div>
      </div>
      <div className="stats-row">
        {[
          ['14+', 'Topics'],
          ['200+', 'Questions'],
          ['100+', 'Code Examples'],
          ['10+', 'Projects'],
        ].map(([v, l]) => (
          <div key={l} className="stat-card">
            <div className="stat-num">{v}</div>
            <div className="stat-lbl">{l}</div>
          </div>
        ))}
      </div>
      <div className="section-title">Master Every Topic</div>
      <div className="topics-grid">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="topic-card"
            onClick={() => onTopicSelect(topic.id, topic.subs[0])}
          >
            <div className="topic-icon-lg" style={{ background: `${topic.color}18` }}>
              {topic.icon}
            </div>
            <h3>{topic.label}</h3>
            <p>{topic.subs.length} subtopics</p>
            <div className="topic-tags">
              {topic.subs.slice(0, 2).map((s) => (
                <span
                  key={s}
                  className="topic-tag"
                  style={{
                    background: `${topic.color}15`,
                    color: topic.color,
                  }}
                >
                  {s}
                </span>
              ))}
              {topic.subs.length > 2 && (
                <span
                  className="topic-tag"
                  style={{
                    background: 'var(--bg)',
                    color: 'var(--text2)',
                  }}
                >
                  +{topic.subs.length - 2}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
