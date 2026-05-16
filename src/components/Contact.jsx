import React, { useState } from 'react';
import { contactInfo } from '../data/topicsData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="main">
      <h1 style={{ fontFamily: "'Syne', system-ui", fontSize: '22px', fontWeight: '700', marginBottom: '6px' }}>
        Contact Me
      </h1>
      <p style={{ fontSize: '13px', color: 'var(--text2)', marginBottom: '16px' }}>
        Have a question? Reach out anytime.
      </p>
      <div className="contact-grid">
        <div className="contact-info">
          {contactInfo.map((item, idx) => (
            <div key={idx} className="contact-item">
              <div className="contact-icon" style={{ fontSize: '18px' }}>
                {item.ico}
              </div>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text2)' }}>{item.lbl}</div>
                <div style={{ fontSize: '12px', fontWeight: '500' }}>{item.val}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="form-card">
          <div style={{ fontSize: '15px', fontWeight: '600', marginBottom: '12px' }}>
            Send a Message
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                className="form-input"
                placeholder="Your name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                className="form-input"
                type="email"
                placeholder="your@email.com"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Subject</label>
              <input
                className="form-input"
                placeholder="What's this about?"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                className="form-input"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <button
              className="btn-p"
              type="submit"
              style={{
                width: '100%',
                justifyContent: 'center',
                background: submitted
                  ? 'linear-gradient(135deg,#22c55e,#16a34a)'
                  : 'linear-gradient(135deg,var(--brand),var(--brand-dark))',
              }}
            >
              {submitted ? '✓ Sent! I will get back to you.' : 'Send Message →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
