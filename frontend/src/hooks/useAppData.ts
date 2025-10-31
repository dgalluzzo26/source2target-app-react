import { useState, useEffect } from 'react';
import { 
  SourceColumn, 
  MappedField, 
  SemanticRecord, 
  AIMapping, 
  TemplateRow, 
  User, 
  AppConfig 
} from '../types';
import {
  dummyUnmappedFields,
  dummyMappedFields,
  dummySemanticRecords,
  dummyAIMappings,
  dummyTemplateRows,
  dummyUser,
  dummyConfig,
} from '../utils/dummyData';

// Custom hook for managing application data (frontend-only with dummy data)
export const useAppData = () => {
  const [user] = useState<User>(dummyUser);
  const [config, setConfig] = useState<AppConfig>(dummyConfig);
  const [unmappedFields, setUnmappedFields] = useState<SourceColumn[]>(dummyUnmappedFields);
  const [mappedFields, setMappedFields] = useState<MappedField[]>(dummyMappedFields);
  const [semanticRecords, setSemanticRecords] = useState<SemanticRecord[]>(dummySemanticRecords);
  const [aiSuggestions, setAiSuggestions] = useState<AIMapping[]>([]);
  const [templateHistory, setTemplateHistory] = useState<TemplateRow[]>(dummyTemplateRows);
  const [loading, setLoading] = useState(false);

  // Simulate loading data on mount
  useEffect(() => {
    console.log('Frontend-only mode: Application data initialized with dummy data');
  }, []);

  // Simulate AI mapping suggestions
  const runAISuggestions = async (sourceField: SourceColumn): Promise<AIMapping[]> => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Filter suggestions based on source field context
    const suggestions = dummyAIMappings.filter(suggestion => 
      suggestion.semantic_field.toLowerCase().includes(sourceField.src_column_name.toLowerCase()) ||
      suggestion.target_column.toLowerCase().includes(sourceField.src_column_name.toLowerCase())
    );
    
    setAiSuggestions(suggestions.length > 0 ? suggestions : dummyAIMappings.slice(0, 3));
    setLoading(false);
    
    console.log(`Frontend-only mode: AI suggestions generated for ${sourceField.src_column_name}`);
    return aiSuggestions;
  };

  // Simulate manual search
  const runManualSearch = async (searchTerm: string): Promise<SemanticRecord[]> => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const results = dummySemanticRecords.filter(record =>
      record.tgt_column_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.semantic_field.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setLoading(false);
    
    console.log(`Frontend-only mode: Manual search completed for "${searchTerm}"`);
    return results.length > 0 ? results : dummySemanticRecords.slice(0, 5);
  };

  // Save mapping
  const saveMapping = async (sourceField: SourceColumn, targetMapping: string): Promise<void> => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Remove from unmapped
    setUnmappedFields(prev => prev.filter(field => 
      !(field.src_table_name === sourceField.src_table_name && 
        field.src_column_name === sourceField.src_column_name)
    ));
    
    // Add to mapped
    const newMapping: MappedField = {
      src_table_name: sourceField.src_table_name,
      src_column_name: sourceField.src_column_name,
      tgt_mapping: targetMapping,
      tgt_table_name: 'target_table',
      tgt_column_physical: targetMapping.toUpperCase(),
      tgt_table_physical: 'TARGET_TABLE',
    };
    
    setMappedFields(prev => [...prev, newMapping]);
    setLoading(false);
    
    console.log(`Frontend-only mode: Mapping saved for ${sourceField.src_column_name} -> ${targetMapping}`);
  };

  // Unmap field
  const unmapField = async (mappedField: MappedField): Promise<void> => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Remove from mapped
    setMappedFields(prev => prev.filter(field => 
      !(field.src_table_name === mappedField.src_table_name && 
        field.src_column_name === mappedField.src_column_name)
    ));
    
    // Add back to unmapped
    const unmappedField: SourceColumn = {
      src_table_name: mappedField.src_table_name,
      src_column_name: mappedField.src_column_name,
      src_column_physical_name: mappedField.src_column_name.toUpperCase(),
      src_nullable: true,
      src_physical_datatype: 'VARCHAR(255)',
      src_comments: 'Previously mapped field',
      tgt_mapping: null,
    };
    
    setUnmappedFields(prev => [...prev, unmappedField]);
    setLoading(false);
    
    console.log(`Frontend-only mode: Field unmapped: ${mappedField.src_column_name}`);
  };

  // Template operations
  const uploadTemplate = async (file: File): Promise<void> => {
    setLoading(true);
    
    // Simulate file processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log(`Frontend-only mode: Template uploaded: ${file.name}`);
    setLoading(false);
  };

  const downloadTemplate = async (): Promise<void> => {
    // Create CSV content
    const csvContent = [
      'src_table_name,src_column_name,tgt_table_name,tgt_column_name',
      ...dummyTemplateRows.map(row => 
        `${row.src_columns.src_table_name},${row.src_columns.src_column_name},${row.tgt_columns.tgt_table_name},${row.tgt_columns.tgt_column_name}`
      )
    ].join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mapping_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log('Frontend-only mode: Template downloaded');
  };

  // Configuration operations
  const updateConfig = async (newConfig: Partial<AppConfig>): Promise<void> => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setConfig(prev => ({ ...prev, ...newConfig }));
    setLoading(false);
    
    console.log('Frontend-only mode: Configuration updated');
  };

  const testDatabricksConnection = async (): Promise<boolean> => {
    setLoading(true);
    
    // Simulate connection test
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setLoading(false);
    console.log('Frontend-only mode: Databricks connection test simulated - SUCCESS');
    return true;
  };

  return {
    // Data
    user,
    config,
    unmappedFields,
    mappedFields,
    semanticRecords,
    aiSuggestions,
    templateHistory,
    loading,
    
    // Actions
    runAISuggestions,
    runManualSearch,
    saveMapping,
    unmapField,
    uploadTemplate,
    downloadTemplate,
    updateConfig,
    testDatabricksConnection,
  };
};
