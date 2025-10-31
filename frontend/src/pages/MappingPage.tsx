import React, { useState } from 'react';
import { SourceColumn, MappedField, SemanticRecord, AIMapping } from '../types';
import { useAppData } from '../hooks/useAppData';
import LoadingSpinner from '../components/LoadingSpinner';

interface MappingPageProps {
  isAdmin: boolean;
}

const MappingPage: React.FC<MappingPageProps> = ({ isAdmin }) => {
  const {
    unmappedFields,
    mappedFields,
    semanticRecords,
    aiSuggestions,
    loading,
    runAISuggestions,
    runManualSearch,
    saveMapping,
    unmapField,
    uploadTemplate,
    downloadTemplate,
  } = useAppData();

  const [activeTab, setActiveTab] = useState<'unmapped' | 'mapped' | 'semantic'>('unmapped');
  const [selectedField, setSelectedField] = useState<SourceColumn | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SemanticRecord[]>([]);
  const [showDetailView, setShowDetailView] = useState(false);

  const handleAISuggestions = async (field: SourceColumn) => {
    setSelectedField(field);
    setShowDetailView(true);
    await runAISuggestions(field);
  };

  const handleManualSearch = async () => {
    if (searchTerm.trim()) {
      const results = await runManualSearch(searchTerm);
      setSearchResults(results);
    }
  };

  const handleSaveMapping = async (targetMapping: string) => {
    if (selectedField) {
      await saveMapping(selectedField, targetMapping);
      setShowDetailView(false);
      setSelectedField(null);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadTemplate(file);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Field Mapping</h2>
        <p className="page-subtitle">Map source fields to target schemas</p>
      </div>

      {/* Tab Navigation - Semantic tab only for admins (like original app) */}
      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === 'unmapped' ? 'active' : ''}`}
          onClick={() => setActiveTab('unmapped')}
        >
          🔍 Unmapped Fields ({unmappedFields.length})
        </button>
        <button
          className={`tab-button ${activeTab === 'mapped' ? 'active' : ''}`}
          onClick={() => setActiveTab('mapped')}
        >
          ✅ Mapped Fields ({mappedFields.length})
        </button>
        {isAdmin && (
          <button
            className={`tab-button ${activeTab === 'semantic' ? 'active' : ''}`}
            onClick={() => setActiveTab('semantic')}
          >
            🧠 Semantic Management ({semanticRecords.length})
          </button>
        )}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'unmapped' && (
          <div className="unmapped-tab">
            <div className="section-header">
              <h3>Unmapped Source Fields</h3>
              <div className="template-actions">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  id="template-upload"
                />
                <label htmlFor="template-upload" className="btn btn-secondary">
                  📤 Upload Template
                </label>
                <button onClick={downloadTemplate} className="btn btn-secondary">
                  📥 Download Template
                </button>
              </div>
            </div>

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Table Name</th>
                    <th>Column Name</th>
                    <th>Physical Name</th>
                    <th>Data Type</th>
                    <th>Comments</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {unmappedFields.map((field, index) => (
                    <tr key={index}>
                      <td>{field.src_table_name}</td>
                      <td>{field.src_column_name}</td>
                      <td>{field.src_column_physical_name}</td>
                      <td>{field.src_physical_datatype}</td>
                      <td className="comments-cell">{field.src_comments}</td>
                      <td>
                        <button
                          onClick={() => handleAISuggestions(field)}
                          className="btn btn-primary btn-sm"
                          disabled={loading}
                        >
                          🤖 AI Suggestions
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Detail View */}
            {showDetailView && selectedField && (
              <div className="detail-view">
                <div className="detail-header">
                  <h4>Mapping Details: {selectedField.src_column_name}</h4>
                  <button
                    onClick={() => setShowDetailView(false)}
                    className="btn btn-secondary btn-sm"
                  >
                    ✕ Close
                  </button>
                </div>

                <div className="detail-content">
                  <div className="detail-section">
                    <h5>AI Mapping Suggestions</h5>
                    {loading ? (
                      <LoadingSpinner message="Generating AI suggestions..." />
                    ) : (
                      <div className="suggestions-list">
                        {aiSuggestions.map((suggestion, index) => (
                          <div key={index} className="suggestion-item">
                            <div className="suggestion-info">
                              <strong>{suggestion.target_table}.{suggestion.target_column}</strong>
                              <p>{suggestion.semantic_field}</p>
                              {suggestion.confidence && (
                                <span className="confidence-score">
                                  Confidence: {(suggestion.confidence * 100).toFixed(1)}%
                                </span>
                              )}
                            </div>
                            <button
                              onClick={() => handleSaveMapping(suggestion.target_column)}
                              className="btn btn-success btn-sm"
                            >
                              Use This Mapping
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="detail-section">
                    <h5>Manual Search</h5>
                    <div className="search-container">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search semantic records..."
                        className="search-input"
                      />
                      <button
                        onClick={handleManualSearch}
                        className="btn btn-primary"
                        disabled={loading}
                      >
                        🔍 Search
                      </button>
                    </div>

                    {searchResults.length > 0 && (
                      <div className="search-results">
                        {searchResults.map((result, index) => (
                          <div key={index} className="search-result-item">
                            <div className="result-info">
                              <strong>{result.tgt_table_name}.{result.tgt_column_name}</strong>
                              <p>{result.semantic_field}</p>
                            </div>
                            <button
                              onClick={() => handleSaveMapping(result.tgt_column_name)}
                              className="btn btn-success btn-sm"
                            >
                              Use This Mapping
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'mapped' && (
          <div className="mapped-tab">
            <h3>Mapped Fields</h3>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Source Table</th>
                    <th>Source Column</th>
                    <th>Target Mapping</th>
                    <th>Target Table</th>
                    <th>Target Physical</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mappedFields.map((field, index) => (
                    <tr key={index}>
                      <td>{field.src_table_name}</td>
                      <td>{field.src_column_name}</td>
                      <td>{field.tgt_mapping}</td>
                      <td>{field.tgt_table_name}</td>
                      <td>{field.tgt_column_physical}</td>
                      <td>
                        <button
                          onClick={() => unmapField(field)}
                          className="btn btn-danger btn-sm"
                          disabled={loading}
                        >
                          🗑️ Unmap
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'semantic' && isAdmin && (
          <div className="semantic-tab">
            <h3>🧠 Semantic Table Management</h3>
            <p className="tab-description">
              Manage semantic field descriptions for AI mapping suggestions. Admin access required.
            </p>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Target Table</th>
                    <th>Target Column</th>
                    <th>Semantic Field Description</th>
                  </tr>
                </thead>
                <tbody>
                  {semanticRecords.map((record, index) => (
                    <tr key={index}>
                      <td>{record.tgt_table_name}</td>
                      <td>{record.tgt_column_name}</td>
                      <td className="semantic-description">{record.semantic_field}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'semantic' && !isAdmin && (
          <div className="access-denied">
            <h3>🔒 Access Denied</h3>
            <p>Admin access required for semantic management features.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MappingPage;
