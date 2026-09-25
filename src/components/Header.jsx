import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  Search, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  PanelLeftClose, 
  PanelLeft,
  Key
} from 'lucide-react';

export default function Header({ 
  currentSolution, 
  totalSolutions, 
  currentIndex, 
  onSelectSolution,
  solutions,
  sidebarOpen, 
  setSidebarOpen,
  onOpenSettings,
  apiKeySet
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredSolutions = solutions.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.formattedNumber.includes(searchQuery) ||
    s.slug.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 10);

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectSolution(solutions[currentIndex - 1].slug);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalSolutions - 1) {
      onSelectSolution(solutions[currentIndex + 1].slug);
    }
  };

  return (
    <header style={{
      height: '60px',
      background: 'rgba(13, 19, 34, 0.9)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      zIndex: 50,
      position: 'relative'
    }}>
      {/* Left section: Logo & Sidebar Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button 
          className="btn-icon" 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          title={sidebarOpen ? "Hide Problem List" : "Show Problem List"}
        >
          {sidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeft size={20} />}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 12px rgba(99, 102, 241, 0.4)'
          }}>
            <Code2 size={20} color="#fff" />
          </div>
          <div>
            <h1 style={{ 
              fontFamily: 'var(--font-heading)', 
              fontSize: '1.15rem', 
              fontWeight: 700, 
              color: '#fff',
              lineHeight: 1.1,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              LeetExplainer
              <span style={{ fontSize: '0.65rem', padding: '2px 6px', background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', borderRadius: '4px', color: '#a5b4fc' }}>
                AI PRO
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* Center section: Search & Nav buttons */}
      <div style={{ flex: 1, maxWidth: '460px', margin: '0 20px', position: 'relative' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '0 12px',
          height: '36px',
          transition: 'all 0.2s ease'
        }}>
          <Search size={16} color="var(--text-dim)" style={{ marginRight: '8px' }} />
          <input 
            type="text" 
            placeholder="Search problem by title or #... (e.g. 0001 or Two Sum)"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsDropdownOpen(true);
            }}
            onFocus={() => setIsDropdownOpen(true)}
            onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-main)',
              width: '100%',
              fontSize: '0.85rem',
              outline: 'none',
              fontFamily: 'var(--font-sans)'
            }}
          />
        </div>

        {/* Search Dropdown */}
        {isDropdownOpen && searchQuery.trim() !== '' && (
          <div style={{
            position: 'absolute',
            top: '42px',
            left: 0,
            right: 0,
            background: '#0f172a',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            maxHeight: '300px',
            overflowY: 'auto',
            zIndex: 100
          }}>
            {filteredSolutions.length === 0 ? (
              <div style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center' }}>
                No matching solutions found
              </div>
            ) : (
              filteredSolutions.map(s => (
                <div
                  key={s.slug}
                  onClick={() => {
                    onSelectSolution(s.slug);
                    setSearchQuery('');
                    setIsDropdownOpen(false);
                  }}
                  style={{
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    fontSize: '0.85rem'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>
                    #{s.formattedNumber} — {s.title}
                  </span>
                  <span className="badge badge-lang" style={{ fontSize: '0.7rem' }}>
                    {s.language}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Right section: Problem Prev/Next & Settings */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {currentSolution && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(0,0,0,0.2)', padding: '2px 6px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <button 
              className="btn-icon" 
              onClick={handlePrev} 
              disabled={currentIndex <= 0}
              style={{ opacity: currentIndex <= 0 ? 0.3 : 1 }}
              title="Previous Problem"
            >
              <ChevronLeft size={18} />
            </button>

            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, padding: '0 4px', fontFamily: 'var(--font-mono)' }}>
              {currentIndex + 1} / {totalSolutions}
            </span>

            <button 
              className="btn-icon" 
              onClick={handleNext} 
              disabled={currentIndex >= totalSolutions - 1}
              style={{ opacity: currentIndex >= totalSolutions - 1 ? 0.3 : 1 }}
              title="Next Problem"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        <button 
          className="btn btn-secondary" 
          onClick={onOpenSettings}
          style={{ fontSize: '0.8rem', padding: '6px 12px' }}
        >
          <Key size={14} color={apiKeySet ? "#10b981" : "#f59e0b"} />
          <span>{apiKeySet ? "API Active" : "Set API Key"}</span>
        </button>
      </div>
    </header>
  );
}
