import React, { useState } from 'react';
import { Search, Code, CheckCircle, FileCode, Hash, ListFilter } from 'lucide-react';

export default function Sidebar({ solutions, selectedSlug, onSelectSolution, isOpen }) {
  const [filterLang, setFilterLang] = useState('all');
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = solutions.filter(s => {
    const matchesQuery = s.title.toLowerCase().includes(query.toLowerCase()) || 
                         s.formattedNumber.includes(query) ||
                         s.slug.toLowerCase().includes(query.toLowerCase());
    const matchesLang = filterLang === 'all' || s.language === filterLang;
    return matchesQuery && matchesLang;
  });

  const languages = ['all', ...new Set(solutions.map(s => s.language))];

  return (
    <aside style={{
      width: '320px',
      height: '100%',
      background: 'rgba(13, 19, 34, 0.85)',
      backdropFilter: 'blur(16px)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 40,
      flexShrink: 0
    }}>
      {/* Sidebar Header & Search */}
      <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
            <Hash size={16} color="var(--accent-primary)" />
            Solutions Explorer
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '10px', fontFamily: 'var(--font-mono)' }}>
            {filtered.length} total
          </span>
        </div>

        {/* Search input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(0, 0, 0, 0.25)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-sm)',
          padding: '0 10px',
          height: '34px',
          marginBottom: '10px'
        }}>
          <Search size={14} color="var(--text-dim)" style={{ marginRight: '6px' }} />
          <input
            type="text"
            placeholder="Filter problems..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-main)',
              width: '100%',
              fontSize: '0.8rem',
              outline: 'none'
            }}
          />
        </div>

        {/* Filter tags */}
        <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '2px' }}>
          {languages.map(lang => (
            <button
              key={lang}
              onClick={() => setFilterLang(lang)}
              style={{
                padding: '3px 8px',
                borderRadius: '4px',
                fontSize: '0.7rem',
                border: 'none',
                cursor: 'pointer',
                textTransform: 'uppercase',
                fontWeight: 600,
                background: filterLang === lang ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                color: filterLang === lang ? '#fff' : 'var(--text-muted)',
                transition: 'all 0.15s ease'
              }}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Solutions list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
        {filtered.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
            No matching solutions found.
          </div>
        ) : (
          filtered.map(item => {
            const isSelected = item.slug === selectedSlug;
            return (
              <div
                key={item.slug}
                onClick={() => onSelectSolution(item.slug)}
                style={{
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: isSelected ? 'rgba(99, 102, 241, 0.18)' : 'transparent',
                  border: isSelected ? '1px solid rgba(99, 102, 241, 0.35)' : '1px solid transparent',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.background = 'transparent';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    fontFamily: 'var(--font-mono)', 
                    color: isSelected ? '#a5b4fc' : 'var(--text-dim)',
                    minWidth: '38px' 
                  }}>
                    #{item.formattedNumber}
                  </span>
                  <span style={{ 
                    fontSize: '0.85rem', 
                    fontWeight: isSelected ? 600 : 400, 
                    color: isSelected ? '#ffffff' : 'var(--text-main)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {item.title}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className="badge badge-lang" style={{ fontSize: '0.65rem', padding: '1px 5px' }}>
                    {item.language}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
}
