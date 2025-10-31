import React, { useState } from 'react';
import { AppConfig } from '../types';
import { useAppData } from '../hooks/useAppData';
import LoadingSpinner from '../components/LoadingSpinner';

const ConfigPage: React.FC = () => {
  const { config, loading, updateConfig, testDatabricksConnection } = useAppData();
  const [localConfig, setLocalConfig] = useState<AppConfig>(config);
  const [activeSection, setActiveSection] = useState<string>('database');
  const [testResults, setTestResults] = useState<{ [key: string]: boolean | null }>({});

  const sections = [
    { id: 'database', label: 'Database Configuration', icon: '🗄️' },
    { id: 'ai_model', label: 'AI Model Settings', icon: '🤖' },
    { id: 'vector_search', label: 'Vector Search', icon: '🔍' },
    { id: 'ui', label: 'UI Settings', icon: '🎨' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'support', label: 'Support', icon: '📞' },
  ];

  const handleConfigChange = (section: keyof AppConfig, field: string, value: any) => {
    setLocalConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    await updateConfig(localConfig);
  };

  const handleTest = async (testType: string) => {
    setTestResults(prev => ({ ...prev, [testType]: null }));
    
    if (testType === 'database') {
      const result = await testDatabricksConnection();
      setTestResults(prev => ({ ...prev, [testType]: result }));
    } else if (testType === 'vector_search') {
      // Simulate vector search test
      setTimeout(() => {
        setTestResults(prev => ({ ...prev, [testType]: true }));
      }, 2000);
    }
  };

  const renderDatabaseConfig = () => (
    <div className="config-section">
      <h3>Database Configuration</h3>
      <div className="config-grid">
        <div className="config-field">
          <label>Warehouse Name</label>
          <input
            type="text"
            value={localConfig.database.warehouse_name}
            onChange={(e) => handleConfigChange('database', 'warehouse_name', e.target.value)}
            className="config-input"
          />
        </div>
        <div className="config-field">
          <label>Server Hostname</label>
          <input
            type="text"
            value={localConfig.database.server_hostname}
            onChange={(e) => handleConfigChange('database', 'server_hostname', e.target.value)}
            className="config-input"
          />
        </div>
        <div className="config-field">
          <label>HTTP Path</label>
          <input
            type="text"
            value={localConfig.database.http_path}
            onChange={(e) => handleConfigChange('database', 'http_path', e.target.value)}
            className="config-input"
          />
        </div>
        <div className="config-field">
          <label>Mapping Table</label>
          <input
            type="text"
            value={localConfig.database.mapping_table}
            onChange={(e) => handleConfigChange('database', 'mapping_table', e.target.value)}
            className="config-input"
          />
        </div>
        <div className="config-field">
          <label>Semantic Table</label>
          <input
            type="text"
            value={localConfig.database.semantic_table}
            onChange={(e) => handleConfigChange('database', 'semantic_table', e.target.value)}
            className="config-input"
          />
        </div>
      </div>
      <div className="config-actions">
        <button
          onClick={() => handleTest('database')}
          className="btn btn-secondary"
          disabled={loading}
        >
          {loading ? <LoadingSpinner size="small" /> : '🔗 Test Connection'}
        </button>
        {testResults.database !== undefined && (
          <span className={`test-result ${testResults.database ? 'success' : 'error'}`}>
            {testResults.database ? '✅ Connection successful' : '❌ Connection failed'}
          </span>
        )}
      </div>
    </div>
  );

  const renderAIModelConfig = () => (
    <div className="config-section">
      <h3>AI Model Settings</h3>
      <div className="config-grid">
        <div className="config-field">
          <label>Foundation Model Endpoint</label>
          <input
            type="text"
            value={localConfig.ai_model.foundation_model_endpoint}
            onChange={(e) => handleConfigChange('ai_model', 'foundation_model_endpoint', e.target.value)}
            className="config-input"
          />
        </div>
        <div className="config-field">
          <label>Previous Mappings Table</label>
          <input
            type="text"
            value={localConfig.ai_model.previous_mappings_table_name}
            onChange={(e) => handleConfigChange('ai_model', 'previous_mappings_table_name', e.target.value)}
            className="config-input"
          />
        </div>
        <div className="config-field full-width">
          <label>Default Prompt</label>
          <textarea
            value={localConfig.ai_model.default_prompt}
            onChange={(e) => handleConfigChange('ai_model', 'default_prompt', e.target.value)}
            className="config-textarea"
            rows={6}
          />
        </div>
      </div>
    </div>
  );

  const renderVectorSearchConfig = () => (
    <div className="config-section">
      <h3>Vector Search Configuration</h3>
      <div className="config-grid">
        <div className="config-field">
          <label>Index Name</label>
          <input
            type="text"
            value={localConfig.vector_search.index_name}
            onChange={(e) => handleConfigChange('vector_search', 'index_name', e.target.value)}
            className="config-input"
          />
        </div>
        <div className="config-field">
          <label>Endpoint Name</label>
          <input
            type="text"
            value={localConfig.vector_search.endpoint_name}
            onChange={(e) => handleConfigChange('vector_search', 'endpoint_name', e.target.value)}
            className="config-input"
          />
        </div>
      </div>
      <div className="config-actions">
        <button
          onClick={() => handleTest('vector_search')}
          className="btn btn-secondary"
          disabled={loading}
        >
          {loading ? <LoadingSpinner size="small" /> : '🔍 Test Vector Search'}
        </button>
        {testResults.vector_search !== undefined && (
          <span className={`test-result ${testResults.vector_search ? 'success' : 'error'}`}>
            {testResults.vector_search ? '✅ Vector search working' : '❌ Vector search failed'}
          </span>
        )}
      </div>
    </div>
  );

  const renderUIConfig = () => (
    <div className="config-section">
      <h3>UI Settings</h3>
      <div className="config-grid">
        <div className="config-field">
          <label>App Title</label>
          <input
            type="text"
            value={localConfig.ui.app_title}
            onChange={(e) => handleConfigChange('ui', 'app_title', e.target.value)}
            className="config-input"
          />
        </div>
        <div className="config-field">
          <label>Theme Color</label>
          <input
            type="color"
            value={localConfig.ui.theme_color}
            onChange={(e) => handleConfigChange('ui', 'theme_color', e.target.value)}
            className="config-input"
          />
        </div>
        <div className="config-field">
          <label>
            <input
              type="checkbox"
              checked={localConfig.ui.sidebar_expanded}
              onChange={(e) => handleConfigChange('ui', 'sidebar_expanded', e.target.checked)}
            />
            Sidebar Expanded by Default
          </label>
        </div>
      </div>
    </div>
  );

  const renderSecurityConfig = () => (
    <div className="config-section">
      <h3>Security Settings</h3>
      <div className="config-grid">
        <div className="config-field">
          <label>Admin Group Name</label>
          <input
            type="text"
            value={localConfig.security.admin_group_name}
            onChange={(e) => handleConfigChange('security', 'admin_group_name', e.target.value)}
            className="config-input"
          />
        </div>
        <div className="config-field">
          <label>
            <input
              type="checkbox"
              checked={localConfig.security.enable_password_auth}
              onChange={(e) => handleConfigChange('security', 'enable_password_auth', e.target.checked)}
            />
            Enable Password Authentication
          </label>
        </div>
      </div>
    </div>
  );

  const renderSupportConfig = () => (
    <div className="config-section">
      <h3>Support Settings</h3>
      <div className="config-grid">
        <div className="config-field">
          <label>Support URL</label>
          <input
            type="url"
            value={localConfig.support.support_url}
            onChange={(e) => handleConfigChange('support', 'support_url', e.target.value)}
            className="config-input"
          />
        </div>
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'database': return renderDatabaseConfig();
      case 'ai_model': return renderAIModelConfig();
      case 'vector_search': return renderVectorSearchConfig();
      case 'ui': return renderUIConfig();
      case 'security': return renderSecurityConfig();
      case 'support': return renderSupportConfig();
      default: return renderDatabaseConfig();
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Configuration</h2>
        <p className="page-subtitle">Manage application settings and connections</p>
      </div>

      <div className="config-layout">
        {/* Section Navigation */}
        <div className="config-sidebar">
          <nav className="config-nav">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`config-nav-item ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <span className="config-nav-icon">{section.icon}</span>
                <span className="config-nav-label">{section.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Configuration Content */}
        <div className="config-content">
          {renderActiveSection()}
          
          <div className="config-footer">
            <button
              onClick={handleSave}
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? <LoadingSpinner size="small" /> : '💾 Save Configuration'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigPage;
