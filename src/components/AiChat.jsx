import React, { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { marked } from 'marked';

export default function AiChat({ solutionData, apiKey }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello! I'm your LeetCode tutor. Ask me anything about **${solutionData?.title || 'this solution'}**! You can ask about code line choices, edge cases, or alternative approaches.`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const quickQuestions = [
    'Can we optimize the time complexity?',
    'What edge cases might fail?',
    'How does this handle large inputs?',
    'Explain the main loop condition'
  ];

  const handleSend = async (questionText) => {
    const q = questionText || input;
    if (!q.trim() || loading || !solutionData) return;

    const newMessages = [...messages, { sender: 'user', text: q }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: solutionData.title,
          question: solutionData.questionContent,
          code: solutionData.code,
          language: solutionData.language,
          mode: 'chat',
          apiKey,
          userQuery: q
        })
      });

      const data = await res.json();
      if (data.success) {
        setMessages([...newMessages, { sender: 'ai', text: data.explanation }]);
      } else {
        setMessages([...newMessages, { sender: 'ai', text: 'Sorry, I ran into an issue answering your question.' }]);
      }
    } catch (err) {
      setMessages([...newMessages, { sender: 'ai', text: 'Network error occurred while fetching answer.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Messages Scroll Area */}
      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '6px', marginBottom: '14px' }}>
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            style={{ 
              display: 'flex', 
              gap: '10px', 
              marginBottom: '16px',
              flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row'
            }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: msg.sender === 'user' ? 'rgba(99, 102, 241, 0.2)' : 'linear-gradient(135deg, #a855f7, #6366f1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              {msg.sender === 'user' ? <User size={16} color="#a5b4fc" /> : <Bot size={16} color="#fff" />}
            </div>

            <div style={{
              maxWidth: '82%',
              background: msg.sender === 'user' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(0,0,0,0.3)',
              border: msg.sender === 'user' ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 14px',
              fontSize: '0.875rem'
            }}>
              <div 
                className="markdown-body" 
                dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) }} 
              />
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #a855f7, #6366f1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={16} className="spin" color="#fff" />
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', alignSelf: 'center' }}>
              Tutor is thinking...
            </div>
          </div>
        )}
      </div>

      {/* Suggestion Chips */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', marginBottom: '10px', paddingBottom: '2px' }}>
        {quickQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => handleSend(q)}
            style={{
              padding: '4px 10px',
              borderRadius: '12px',
              fontSize: '0.75rem',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.color = 'var(--text-muted)';
            }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input box */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.3)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '0 8px 0 14px',
        height: '42px'
      }}>
        <input
          type="text"
          placeholder="Ask a question about this code..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-main)',
            width: '100%',
            fontSize: '0.85rem',
            outline: 'none'
          }}
        />
        <button 
          className="btn btn-primary" 
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          style={{ padding: '6px 12px', fontSize: '0.8rem', height: '30px' }}
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}
