import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import IntroductionPage from './pages/IntroductionPage';
import MappingPage from './pages/MappingPage';
import ConfigPage from './pages/ConfigPage';
import { useAppData } from './hooks/useAppData';
import './App.css';

const App: React.FC = () => {
  const { user } = useAppData();
  const [activeTab, setActiveTab] = useState('introduction');

  const renderPage = () => {
    switch (activeTab) {
      case 'introduction':
        return <IntroductionPage />;
      case 'mapping':
        return <MappingPage isAdmin={user.is_admin} />;
      case 'config':
        // Configuration is admin-only (like original app)
        return user.is_admin ? <ConfigPage /> : (
          <div className="access-denied">
            <h2>🔒 Access Denied</h2>
            <p>Admin access required to view configuration settings.</p>
          </div>
        );
      default:
        return <IntroductionPage />;
    }
  };

  return (
    <div className="app">
      <Header user={user} />
      <div className="app-body">
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          isAdmin={user.is_admin} 
        />
        <main className="main-content">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;
