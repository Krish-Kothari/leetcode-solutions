import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import { Sparkles, Cpu, Layers, RefreshCw, MessageSquare, Zap, Clock } from 'lucide-react';
import AiChat from './AiChat.jsx';

export default function ExplanationPanel({ 
  solutionData, 
  apiKey, 
  onOpenSettings 
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'line-by-line' | 'complexity' | 'dry-run' | 'chat'
  const [explanation, setExplanation] = useState('');
  const [isAiGenerated, setIsAiGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchExplanation = async (mode) => {
    if (!solutionData) return;
    setLoading(true);
    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: solutionData.title,
          question: solutionData.questionContent,
          code: solutionData.code,
          language: solutionData.language,
          mode,
          apiKey
        })
      });

      const resData = await response.json();
      if (resData.success) {
        setExplanation(resData.explanation);
        setIsAiGenerated(resData.isAiGenerated);
      }
    } catch (err) {
      console.error('Error fetching explanation:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (solutionData && activeTab !== 'chat') {
      fetchExplanation(activeTab);
    }
  }, [solutionData?.slug, activeTab]);

  return (
    <div className="glass-panel" style={{ height: '100%' }}>
      {/* Header & Mode Tabs */}
      <div className="panel-header" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="panel-title">
            <Sparkles size={18} color="var(--accent-primary)" />
            <span>AI Code Explainer</span>
            {isAiGenerated ? (
              <span className="badge" style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)', fontSize: '0.65rem' }}>
                <Zap size={10} style={{ marginRight: '4px' }} /> Gemini AI
              </span>
            ) : (
              <span className="badge" style={{ background: 'rgba(245,158,11,0.15)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)', fontSize: '0.65rem' }}>
                Local Engine
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {activeTab !== 'chat' && (
              <button className="btn-icon" onClick={() => fetchExplanation(activeTab)} title="Re-generate Explanation">
                <RefreshCw size={15} className={loading ? 'spin' : ''} />
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tab-group" style={{ width: '100%', overflowX: 'auto' }}>
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            💡 Intuition & Strategy
          </button>

          <button 
            className={`tab-btn ${activeTab === 'line-by-line' ? 'active' : ''}`}
            onClick={() => setActiveTab('line-by-line')}
          >
            🔍 Line-by-Line
          </button>

          <button 
            className={`tab-btn ${activeTab === 'complexity' ? 'active' : ''}`}
            onClick={() => setActiveTab('complexity')}
          >
            ⏱️ Complexity
          </button>

          <button 
            className={`tab-btn ${activeTab === 'dry-run' ? 'active' : ''}`}
            onClick={() => setActiveTab('dry-run')}
          >
            🧪 Dry Run
          </button>

          <button 
            className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            💬 Ask AI Tutor
          </button>
        </div>
      </div>

      {/* Body Content */}
      <div className="panel-body">
        {activeTab === 'chat' ? (
          <AiChat solutionData={solutionData} apiKey={apiKey} />
        ) : loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '12px' }}>
            <Sparkles size={28} className="spin" color="var(--accent-primary)" />
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Analyzing code logic & problem requirements...
            </span>
          </div>
        ) : (
          <div>
            <div 
              className="markdown-body"
              dangerouslySetInnerHTML={{ __html: marked.parse(explanation || '') }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
