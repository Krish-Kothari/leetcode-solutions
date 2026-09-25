import React, { useState, useEffect, Component } from 'react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import ProblemViewer from './components/ProblemViewer.jsx';
import CodeViewer from './components/CodeViewer.jsx';
import ExplanationPanel from './components/ExplanationPanel.jsx';
import SettingsModal from './components/SettingsModal.jsx';
import ResizablePanels from './components/ResizablePanels.jsx';

// Error Boundary to prevent blank white screens
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Error Boundary Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#090d16',
          color: '#fff',
          fontFamily: 'sans-serif',
          padding: '20px',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#ef4444', marginBottom: '12px' }}>Something went wrong rendering the UI</h2>
          <pre style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '12px 18px',
            borderRadius: '8px',
            maxWidth: '600px',
            overflowX: 'auto',
            fontSize: '0.85rem',
            color: '#cbd5e1'
          }}>
            {this.state.error?.toString()}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              background: '#6366f1',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function MainApp() {
  const [solutions, setSolutions] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState('');
  const [solutionData, setSolutionData] = useState(null);
  
  const [loadingList, setLoadingList] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');

  // Load solutions list from server and auto-sync when new solutions are added
  useEffect(() => {
    const fetchSolutions = () => {
      fetch('/api/solutions')
        .then(res => res.json())
        .then(data => {
          if (data.success && data.solutions && data.solutions.length > 0) {
            setSolutions(prev => {
              if (prev.length !== data.solutions.length || JSON.stringify(prev) !== JSON.stringify(data.solutions)) {
                return data.solutions;
              }
              return prev;
            });
            setSelectedSlug(current => current || data.solutions[0].slug);
          }
        })
        .catch(err => console.error('Failed to fetch solutions:', err))
        .finally(() => setLoadingList(false));
    };

    fetchSolutions();
    const interval = setInterval(fetchSolutions, 5000); // Live sync every 5s
    return () => clearInterval(interval);
  }, []);

  // Load selected solution details
  useEffect(() => {
    if (!selectedSlug) return;
    setLoadingDetail(true);

    fetch(`/api/solutions/${selectedSlug}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSolutionData(data.data);
        }
      })
      .catch(err => console.error(`Failed to fetch solution details for ${selectedSlug}:`, err))
      .finally(() => setLoadingDetail(false));
  }, [selectedSlug]);

  const currentIndex = solutions.findIndex(s => s.slug === selectedSlug);

  const handleSaveApiKey = (newKey) => {
    setApiKey(newKey);
    localStorage.setItem('gemini_api_key', newKey);
  };

  return (
    <div className="app-container">
      {/* Top Header Navigation */}
      <Header 
        currentSolution={solutionData}
        totalSolutions={solutions.length}
        currentIndex={currentIndex >= 0 ? currentIndex : 0}
        onSelectSolution={setSelectedSlug}
        solutions={solutions}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onOpenSettings={() => setIsSettingsOpen(true)}
        apiKeySet={!!apiKey}
      />

      {/* Main Workspace Layout */}
      <div className="main-content">
        {/* Collapsible Sidebar */}
        <Sidebar 
          solutions={solutions}
          selectedSlug={selectedSlug}
          onSelectSolution={setSelectedSlug}
          isOpen={sidebarOpen}
        />

        {/* 3-Panel Resizable Workspace */}
        <ResizablePanels>
          {/* Panel 1: Problem Statement */}
          <ProblemViewer 
            solutionData={solutionData}
            loading={loadingDetail}
          />

          {/* Panel 2: User's Solution Code */}
          <CodeViewer 
            solutionData={solutionData}
            loading={loadingDetail}
          />

          {/* Panel 3: AI Explanation & Tutor */}
          <ExplanationPanel 
            solutionData={solutionData}
            apiKey={apiKey}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        </ResizablePanels>
      </div>

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
      />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <MainApp />
    </ErrorBoundary>
  );
}
