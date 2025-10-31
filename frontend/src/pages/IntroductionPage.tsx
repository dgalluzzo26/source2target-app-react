import React from 'react';

const IntroductionPage: React.FC = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Welcome to the Source-to-Target Mapping Platform</h2>
        <p className="page-subtitle">Streamline your healthcare data mapping workflow</p>
      </div>

      <div className="intro-content">
        <div className="intro-section">
          <h3>🎯 Purpose</h3>
          <p>
            This platform helps healthcare organizations map source data fields to target schemas 
            efficiently and accurately. Built specifically for healthcare data standards including 
            FHIR, HL7, and common healthcare terminologies.
          </p>
        </div>

        <div className="intro-section">
          <h3>🚀 Key Features</h3>
          <ul className="feature-list">
            <li><strong>AI-Powered Suggestions:</strong> Get intelligent mapping recommendations based on healthcare data patterns</li>
            <li><strong>Manual Search:</strong> Search through semantic records to find the perfect target mapping</li>
            <li><strong>Template System:</strong> Upload and download mapping templates for bulk operations</li>
            <li><strong>Configuration Management:</strong> Centralized settings for Databricks, AI models, and vector search</li>
            <li><strong>Healthcare Focus:</strong> Optimized for claims, member, provider, and clinical data</li>
          </ul>
        </div>

        <div className="intro-section">
          <h3>📊 Workflow Overview</h3>
          <div className="workflow-steps">
            <div className="workflow-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Discover Unmapped Fields</h4>
                <p>Review source columns that need target mappings</p>
              </div>
            </div>
            <div className="workflow-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Get AI Suggestions</h4>
                <p>Use AI to find the best target mappings automatically</p>
              </div>
            </div>
            <div className="workflow-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Manual Search & Validation</h4>
                <p>Search semantic records and validate mappings</p>
              </div>
            </div>
            <div className="workflow-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Save & Export</h4>
                <p>Save mappings and export templates for reuse</p>
              </div>
            </div>
          </div>
        </div>

        <div className="intro-section">
          <h3>🏥 Healthcare Data Standards</h3>
          <p>
            This platform is designed with healthcare data standards in mind:
          </p>
          <ul className="standards-list">
            <li><strong>FHIR:</strong> Fast Healthcare Interoperability Resources</li>
            <li><strong>HL7:</strong> Health Level Seven International standards</li>
            <li><strong>ICD-10:</strong> International Classification of Diseases</li>
            <li><strong>CPT:</strong> Current Procedural Terminology</li>
            <li><strong>HIPAA:</strong> Privacy and security compliance</li>
          </ul>
        </div>

        <div className="intro-section">
          <h3>🔧 Getting Started</h3>
          <p>
            Navigate to the <strong>Field Mapping</strong> section to begin mapping your source fields 
            to target schemas. Use the <strong>Configuration</strong> section to set up your 
            Databricks connection and AI model preferences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroductionPage;
