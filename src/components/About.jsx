import React from 'react';
import { experience, education } from '../data/topicsData';
import '../styles/About.css';

export default function About() {
  const skills = [
    {
      cat: 'Backend',
      col: '#06a8e9',
      list: ['Java 8+', 'Spring Boot', 'Spring Security', 'JPA', 'Hibernate', 'REST API', 'Microservices', 'Redis', 'Kafka'],
    },
    {
      cat: 'Frontend',
      col: '#06b6d4',
      list: ['Angular 9', 'Angular 17', 'React JS', 'JavaScript', 'TypeScript'],
    },
    {
      cat: 'DevOps',
      col: '#f97316',
      list: ['Docker', 'Kubernetes', 'Jenkins', 'CI/CD', 'AWS', 'Git'],
    },
    {
      cat: 'Tools',
      col: '#a855f7',
      list: ['IntelliJ IDEA', 'VS Code', 'Maven', 'Jira', 'GitHub Copilot', 'Cursor AI'],
    },
  ];

  return (
    <div className="cv-container">
      <div className="cv-header">
        <div className="cv-profile-img">
          <img
            src="/profile.png"
            alt="Abhay Kumar"
            onError={(e) => {
              e.style.display = 'none';
              const placeholder = document.createElement('div');
              placeholder.className = 'cv-profile-placeholder';
              placeholder.textContent = 'AK';
              e.parentElement.appendChild(placeholder);
            }}
          />
        </div>
        <div className="cv-header-content">
          <h1 className="cv-name">Abhay Kumar</h1>
          <p className="cv-title">Full Stack Java Developer & SENIOR TECHNICAL LEAD</p>
          <div className="cv-contact-list">
            <div className="cv-contact-item">
              <span>📍</span>
              <span>Hyderabad, India</span>
            </div>
            <div className="cv-contact-item">
              <span>📧</span>
              <span>abhay.fsd.dev@gmail.com</span>
            </div>
            <div className="cv-contact-item">
              <span>�</span>
              <span>+91 6200329955</span>
            </div>
          </div>
        </div>
        <div className="cv-stats">
          <div className="cv-stat-item">
            <span className="cv-stat-num">7+</span>
            <span className="cv-stat-label">Years</span>
          </div>
          <div className="cv-stat-item">
            <span className="cv-stat-num">10+</span>
            <span className="cv-stat-label">Projects</span>
          </div>
        </div>
      </div>

      <div className="cv-section">
        <h2 className="cv-section-title">Technical Skills</h2>
        <div className="skills-categories">
          {skills.map((skill) => (
            <div key={skill.cat} className="skill-category" style={{ '--skill-color': skill.col }}>
              <h3 className="skill-category-title">
                <span className="skill-category-dot"></span>
                {skill.cat}
              </h3>
              <div className="skills-tags">
                {skill.list.map((s) => (
                  <span
                    key={s}
                    className="skill-tag"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cv-section">
        <h2 className="cv-section-title">Experience</h2>
        {experience.map((exp, idx) => (
          <div key={idx} className="exp-card">
            <div className="exp-header">
              <div>
                <h3 className="exp-title">{exp.role}</h3>
                <p className="exp-company">{exp.co}</p>
              </div>
              <span className="exp-period">{exp.period}</span>
            </div>
            <ul className="exp-description">
              {exp.pts.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
            <div className="exp-tech">
              {exp.tech.map((t) => (
                <span key={t} className="exp-tech-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="cv-section">
        <h2 className="cv-section-title">Education</h2>
        {education.map((edu, idx) => (
          <div key={idx} className="edu-card">
            <div className="edu-icon">🎓</div>
            <div className="edu-content">
              <h3 className="edu-degree">{edu.deg}</h3>
              <p className="edu-school">{edu.inst}</p>
            </div>
            <div className="edu-info">
              <div className="edu-score">{edu.gpa}</div>
              <div className="edu-year">{edu.yr}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
