import React, { useState, useEffect } from 'react';
import { Code2, Copy, Check, WrapText } from 'lucide-react';

export default function CodeViewer({ solutionData, loading }) {
  const [copied, setCopied] = useState(false);
  const [wrapLines, setWrapLines] = useState(false);
  const [selectedFileIdx, setSelectedFileIdx] = useState(0);

  const activeFile = solutionData?.codeFiles?.[selectedFileIdx] || {
    fileName: 'solution.py',
    language: solutionData?.language || 'python',
    content: solutionData?.code || ''
  };

  useEffect(() => {
    setSelectedFileIdx(0);
  }, [solutionData?.slug]);

  useEffect(() => {
    if (window.Prism) {
      window.Prism.highlightAll();
    }
  }, [activeFile.content, activeFile.language, selectedFileIdx]);

  const handleCopy = () => {
    if (activeFile.content) {
      navigator.clipboard.writeText(activeFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const lines = (activeFile.content || '').split('\n');

  if (loading) {
    return (
      <div className="glass-panel" style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Loading code solution...</div>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ height: '100%' }}>
      {/* Panel Header */}
      <div className="panel-header">
        <div className="panel-title">
          <Code2 size={18} color="var(--accent-secondary)" />
          <span>My Solution Code</span>
          {solutionData?.codeFiles?.length > 1 && (
            <div style={{ display: 'flex', gap: '4px', marginLeft: '12px' }}>
              {solutionData.codeFiles.map((file, idx) => (
                <button
                  key={file.fileName}
                  onClick={() => setSelectedFileIdx(idx)}
                  className={`tab-btn ${selectedFileIdx === idx ? 'active' : ''}`}
                  style={{ fontSize: '0.75rem', padding: '2px 8px' }}
                >
                  {file.fileName}
                </button>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge badge-lang">
            {activeFile.language}
          </span>
          
          <button 
            className={`btn-icon ${wrapLines ? 'active' : ''}`} 
            onClick={() => setWrapLines(!wrapLines)}
            title="Toggle Word Wrap"
          >
            <WrapText size={16} color={wrapLines ? "var(--accent-cyan)" : "var(--text-muted)"} />
          </button>

          <button className="btn-icon" onClick={handleCopy} title="Copy Code">
            {copied ? <Check size={16} color="var(--accent-emerald)" /> : <Copy size={16} />}
          </button>
        </div>
      </div>

      {/* Code Body */}
      <div className="panel-body" style={{ padding: '16px', background: '#070a12' }}>
        <div className="code-container">
          {/* Line Numbers */}
          <div className="line-numbers">
            {lines.map((_, i) => (
              <div key={i + 1} style={{ height: '1.6em', fontSize: '0.82rem' }}>
                {i + 1}
              </div>
            ))}
          </div>

          {/* Syntax Highlighted Code */}
          <div className="code-content" style={{ whiteSpace: wrapLines ? 'pre-wrap' : 'pre' }}>
            <pre className={`language-${activeFile.language}`}>
              <code className={`language-${activeFile.language}`}>
                {activeFile.content}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
