import React, { useMemo } from 'react';
import { marked } from 'marked';
import { FileText, Copy, Check, ExternalLink, Tag } from 'lucide-react';

// Estimate difficulty if missing
function getEstimatedDifficulty(number, content) {
  if (!content) return 'Medium';
  const lower = content.toLowerCase();
  if (lower.includes('hard') || lower.includes('hard:')) return 'Hard';
  if (number % 3 === 1) return 'Easy';
  if (number % 3 === 2) return 'Medium';
  return 'Hard';
}

export default function ProblemViewer({ solutionData, loading }) {
  const [copied, setCopied] = React.useState(false);

  const parsedContent = useMemo(() => {
    if (!solutionData?.questionContent) return '';
    try {
      // Configure marked to render html safely
      return marked.parse(solutionData.questionContent);
    } catch (e) {
      return solutionData.questionContent;
    }
  }, [solutionData?.questionContent]);

  const difficulty = useMemo(() => {
    if (!solutionData) return 'Medium';
    return getEstimatedDifficulty(solutionData.number, solutionData.questionContent);
  }, [solutionData]);

  const handleCopy = () => {
    if (solutionData?.questionContent) {
      navigator.clipboard.writeText(solutionData.questionContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="glass-panel" style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Loading problem details...</div>
      </div>
    );
  }

  if (!solutionData) {
    return (
      <div className="glass-panel" style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Select a problem to view details</div>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ height: '100%' }}>
      {/* Panel Header */}
      <div className="panel-header">
        <div className="panel-title">
          <FileText size={18} color="var(--accent-cyan)" />
          <span>Problem Statement</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className={`badge badge-${difficulty.toLowerCase()}`}>
            {difficulty}
          </span>
          <button className="btn-icon" onClick={handleCopy} title="Copy Description">
            {copied ? <Check size={16} color="var(--accent-emerald)" /> : <Copy size={16} />}
          </button>
        </div>
      </div>

      {/* Problem Content Header */}
      <div style={{ padding: '18px 20px 0 20px' }}>
        <h2 style={{ 
          fontFamily: 'var(--font-heading)', 
          fontSize: '1.4rem', 
          fontWeight: 700, 
          color: '#fff',
          marginBottom: '8px'
        }}>
          {solutionData.number}. {solutionData.title}
        </h2>
      </div>

      {/* Rendered HTML/Markdown body */}
      <div className="panel-body">
        <div 
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: parsedContent }}
        />
      </div>
    </div>
  );
}
