import React, { useState, useEffect, useMemo } from 'react';
import { roles } from '../data/topicsData';
import { personalInfo, projects, homeFeatures } from '../data/profileData';
import {
  interviewCategories,
  interviewMeta,
  filterQuestions,
} from '../data/interviewStore';
import '../styles/Home.css';
import JavaCodeAnimation from './JavaCodeAnimation';

const TECH_STACK = ['Java', 'Spring Boot', 'Microservices', 'SQL', 'Kafka', 'React', 'AWS'];
const STAT_ICONS = ['📚', '❓', '💻', '🚀'];
const FEATURED_PROJECTS = projects.slice(0, 3);

export default function Home({ onTopicSelect, onPageChange }) {
  const [typedText, setTypedText] = useState('');
  const [typedIdx, setTypedIdx] = useState(0);
  const [typedChar, setTypedChar] = useState(0);
  const [typedDel, setTypedDel] = useState(false);

  const categoryCounts = useMemo(() => {
    const map = new Map();
    interviewCategories.forEach((topic) => {
      map.set(topic.id, filterQuestions({ categoryId: topic.id }).length);
    });
    return map;
  }, []);

  const featuredTopics = useMemo(
    () =>
      [...interviewCategories]
        .sort((a, b) => (categoryCounts.get(b.id) || 0) - (categoryCounts.get(a.id) || 0))
        .slice(0, 8),
    [categoryCounts],
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTypedIdx((prev) => {
        const idx = prev;
        const char = typedChar;
        const del = typedDel;
        const cur = roles[idx];

        if (!del) {
          if (char < cur.length) {
            setTypedChar((c) => c + 1);
            setTypedText(cur.slice(0, char + 1));
          } else {
            setTimeout(() => setTypedDel(true), 1800);
          }
        } else if (char > 0) {
          setTypedChar((c) => c - 1);
          setTypedText(cur.slice(0, char - 1));
        } else {
          setTypedDel(false);
          setTypedIdx((i) => (i + 1) % roles.length);
        }
        return idx;
      });
    }, 80);

    return () => clearInterval(timer);
  }, [typedChar, typedDel]);

  const startLearning = () => {
    const first = interviewCategories[0];
    if (first) onTopicSelect(first.id, first.subs[0]);
  };

  return (
    <div className="main home-page">
      <section className="home-hero" aria-label="Introduction">
        <div className="home-hero-bg" aria-hidden="true">
          <div className="home-orb home-orb-1" />
          <div className="home-orb home-orb-2" />
          <div className="home-grid-pattern" />
        </div>

        <div className="home-hero-inner">
          <div className="home-hero-left">
            <div className="badge">
              <span className="dot" />
              {personalInfo.tagline}
            </div>

            <p className="hero-subtitle">Hi, I&apos;m</p>
            <h1 className="home-title">
              <span className="name">{personalInfo.name}</span>
            </h1>

            <div className="home-hero-row">
              <div className="home-hero-copy">
                <div className="typed-wrap">
              <span className="typed-label">I am a</span>
              <div className="typed">
                <span>{typedText}</span>
                <span className="cursor">|</span>
              </div>
            </div>

            <p className="hero-desc hero-desc-primary">{personalInfo.summary.slice(0, 180)}…</p>

            <div className="tech-stack">
              {TECH_STACK.map((tech) => (
                <span key={tech} className="tech-chip">
                  {tech}
                </span>
              ))}
            </div>

            <div className="hero-btns">
              <button type="button" className="btn-p" onClick={startLearning}>
                Start Learning
                <span className="btn-arrow">→</span>
              </button>
              <button type="button" className="btn-g" onClick={() => onPageChange('about')}>
                View Full Profile
              </button>
            </div>

                <div className="hero-contact-info">
                  <span className="contact-pill">📍 {personalInfo.location.split(',')[0]}</span>
                  <a
                    className="contact-pill contact-pill-link"
                    href={`mailto:${personalInfo.email}`}
                  >
                    📧 {personalInfo.email}
                  </a>
                </div>
              </div>

              <ProfilePhoto />
            </div>
          </div>

          <div className="home-hero-code">
            <div className="home-code-panel">
              <JavaCodeAnimation />
            </div>
          </div>
        </div>
      </section>

      <section className="home-features" aria-label="Platform features">
        {homeFeatures.map((f) => (
          <div key={f.title} className="home-feature-card">
            <span className="home-feature-icon">{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </section>

      <section className="home-stats" aria-label="Platform statistics">
        {[
          [`${interviewCategories.length}+`, 'Interview Topics', STAT_ICONS[0]],
          [`${interviewMeta.totalQuestions}+`, 'Practice Questions', STAT_ICONS[1]],
          ['100+', 'Code Examples', STAT_ICONS[2]],
          [`${personalInfo.projectsCount}`, 'Enterprise Projects', STAT_ICONS[3]],
        ].map(([value, label, icon]) => (
          <div key={label} className="stat-card">
            <span className="stat-icon" aria-hidden="true">
              {icon}
            </span>
            <div className="stat-num">{value}</div>
            <div className="stat-lbl">{label}</div>
          </div>
        ))}
      </section>

      <section className="home-projects" aria-label="Featured projects">
        <header className="home-section-header">
          <div>
            <p className="section-eyebrow">Portfolio highlights</p>
            <h2 className="section-title">Enterprise Projects</h2>
            <p className="section-subtitle">
              Real-world delivery across telecom, e-commerce, and healthcare — see full details on the About page.
            </p>
          </div>
          <button type="button" className="btn-outline" onClick={() => onPageChange('about')}>
            View all projects
          </button>
        </header>
        <div className="home-projects-grid">
          {FEATURED_PROJECTS.map((p) => (
            <article
              key={p.id}
              className="home-project-card"
              style={{ '--project-color': p.color }}
              onClick={() => onPageChange('about')}
              onKeyDown={(e) => e.key === 'Enter' && onPageChange('about')}
              role="button"
              tabIndex={0}
            >
              <div className="home-project-icon" style={{ background: `${p.color}20` }}>
                {p.icon}
              </div>
              <h3>{p.name}</h3>
              <p className="home-project-client">{p.client}</p>
              <p className="home-project-desc">{p.description.slice(0, 120)}…</p>
              <div className="home-project-tech">
                {p.tech.slice(0, 4).map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-cta" aria-label="Get started">
        <div className="home-cta-content">
          <h2>Ready for your next interview?</h2>
          <p>
            Practice {interviewMeta.totalQuestions}+ questions with explanations, SQL variants, and Java solutions.
          </p>
          <div className="home-cta-btns">
            <button type="button" className="btn-p" onClick={startLearning}>
              Start practicing now
            </button>
            <button type="button" className="btn-g" onClick={() => onPageChange('contact')}>
              Get in touch
            </button>
          </div>
        </div>
      </section>

      <section className="home-topics" aria-label="Interview topics">
        <header className="home-section-header">
          <div>
            <p className="section-eyebrow">Curated for interviews</p>
            <h2 className="section-title">Master Every Topic</h2>
            <p className="section-subtitle">
              Deep-dive explanations, production examples, and code — organized by category.
            </p>
          </div>
          <button type="button" className="btn-outline" onClick={startLearning}>
            Browse all questions
          </button>
        </header>

        <div className="topics-grid topics-grid-featured">
          {featuredTopics.map((topic) => {
            const count = categoryCounts.get(topic.id) || 0;
            return (
              <article
                key={topic.id}
                className="topic-card"
                style={{ '--topic-accent': topic.color }}
                onClick={() => onTopicSelect(topic.id, topic.subs[0])}
                onKeyDown={(e) => e.key === 'Enter' && onTopicSelect(topic.id, topic.subs[0])}
                role="button"
                tabIndex={0}
              >
                <div className="topic-card-top">
                  <div
                    className="topic-icon-lg"
                    style={{ background: `${topic.color}18`, color: topic.color }}
                  >
                    {topic.icon}
                  </div>
                  <span className="topic-count">{count} Qs</span>
                </div>
                <h3>{topic.label}</h3>
                <p>{topic.subs.length} subtopics · hands-on prep</p>
                <div className="topic-tags">
                  {topic.subs.slice(0, 2).map((s) => (
                    <span
                      key={s}
                      className="topic-tag"
                      style={{ background: `${topic.color}12`, color: topic.color }}
                    >
                      {s}
                    </span>
                  ))}
                  {topic.subs.length > 2 && (
                    <span className="topic-tag topic-tag-more">+{topic.subs.length - 2}</span>
                  )}
                </div>
                <span className="topic-card-arrow" aria-hidden="true">
                  →
                </span>
              </article>
            );
          })}
        </div>

        {interviewCategories.length > 8 && (
          <>
            <h3 className="section-title section-title-sm">All categories</h3>
            <div className="topics-grid topics-grid-all">
              {interviewCategories.map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  className="topic-chip"
                  style={{ '--topic-accent': topic.color }}
                  onClick={() => onTopicSelect(topic.id, topic.subs[0])}
                >
                  <span className="topic-chip-icon">{topic.icon}</span>
                  <span className="topic-chip-label">{topic.label}</span>
                  <span className="topic-chip-count">{categoryCounts.get(topic.id) || 0}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

function ProfilePhoto() {
  return (
    <div className="hero-photo-wrapper">
      <div className="hero-photo-ring" aria-hidden="true" />
      <div className="hero-photo">
        <img
          src="/profile.png"
          alt={personalInfo.name}
          onError={(e) => {
            e.target.src =
              'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%2306a8e9%22 rx=%2250%22/><text x=%2250%22 y=%2265%22 text-anchor=%22middle%22 font-size=%2240%22 fill=%22white%22>AK</text></svg>';
          }}
        />
      </div>
      <div className="hero-years-badge">
        <div className="hero-years-badge-num">{personalInfo.yearsExperience}</div>
        <div className="hero-years-badge-lbl">Years Exp.</div>
      </div>
    </div>
  );
}
