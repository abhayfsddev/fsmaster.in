import React, { useState } from 'react';

export default function CodeBlock({ title, language, code, id }) {
  const [copied, setCopied] = useState(false);

  if (!code) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-section">
      <div className="code-header">
        <h4>{title || 'Code'}</h4>
        <span className="code-lang">{language}</span>
        <button type="button" className="copy-button" onClick={handleCopy} aria-label="Copy code">
          {copied ? '✓ Copied' : '📋 Copy'}
        </button>
      </div>
      <pre className={`code-block language-${language || 'text'}`} data-block-id={id}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
