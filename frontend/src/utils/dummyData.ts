import { SourceColumn, MappedField, SemanticRecord, AIMapping, TemplateRow, User, AppConfig } from '../types';

// Dummy user data
export const dummyUser: User = {
  email: 'demo.user@gainwell.com',
  display_name: 'Demo User',
  role: 'platform_user',
  is_admin: false,
  is_platform_user: true,
};

// Healthcare-focused unmapped fields data
export const dummyUnmappedFields: SourceColumn[] = [
  {
    src_table_name: 'claims_raw',
    src_column_name: 'member_id',
    src_column_physical_name: 'MEMBER_ID',
    src_nullable: false,
    src_physical_datatype: 'VARCHAR(50)',
    src_comments: 'Unique identifier for healthcare member',
    tgt_mapping: null,
  },
  {
    src_table_name: 'claims_raw',
    src_column_name: 'claim_number',
    src_column_physical_name: 'CLAIM_NBR',
    src_nullable: false,
    src_physical_datatype: 'VARCHAR(20)',
    src_comments: 'Primary claim identifier',
    tgt_mapping: null,
  },
  {
    src_table_name: 'claims_raw',
    src_column_name: 'service_date',
    src_column_physical_name: 'SVC_DT',
    src_nullable: true,
    src_physical_datatype: 'DATE',
    src_comments: 'Date when healthcare service was provided',
    tgt_mapping: null,
  },
  {
    src_table_name: 'provider_raw',
    src_column_name: 'provider_npi',
    src_column_physical_name: 'PROV_NPI',
    src_nullable: false,
    src_physical_datatype: 'VARCHAR(10)',
    src_comments: 'National Provider Identifier',
    tgt_mapping: null,
  },
  {
    src_table_name: 'member_raw',
    src_column_name: 'date_of_birth',
    src_column_physical_name: 'DOB',
    src_nullable: true,
    src_physical_datatype: 'DATE',
    src_comments: 'Member date of birth',
    tgt_mapping: null,
  },
];

// Healthcare-focused mapped fields data
export const dummyMappedFields: MappedField[] = [
  {
    src_table_name: 'claims_raw',
    src_column_name: 'total_amount',
    tgt_mapping: 'claim_amount',
    tgt_table_name: 'claims_processed',
    tgt_column_physical: 'CLAIM_AMT',
    tgt_table_physical: 'CLAIMS_PROCESSED',
  },
  {
    src_table_name: 'member_raw',
    src_column_name: 'first_name',
    tgt_mapping: 'member_first_name',
    tgt_table_name: 'member_demographics',
    tgt_column_physical: 'FIRST_NM',
    tgt_table_physical: 'MEMBER_DEMOGRAPHICS',
  },
  {
    src_table_name: 'provider_raw',
    src_column_name: 'provider_name',
    tgt_mapping: 'provider_business_name',
    tgt_table_name: 'provider_directory',
    tgt_column_physical: 'BUS_NM',
    tgt_table_physical: 'PROVIDER_DIRECTORY',
  },
];

// Healthcare semantic records
export const dummySemanticRecords: SemanticRecord[] = [
  {
    tgt_table_name: 'claims_processed',
    tgt_column_name: 'claim_amount',
    semantic_field: 'Financial amount for healthcare claim processing',
  },
  {
    tgt_table_name: 'member_demographics',
    tgt_column_name: 'member_first_name',
    semantic_field: 'Patient first name for identification',
  },
  {
    tgt_table_name: 'provider_directory',
    tgt_column_name: 'provider_business_name',
    semantic_field: 'Healthcare provider organization name',
  },
  {
    tgt_table_name: 'claims_processed',
    tgt_column_name: 'diagnosis_code',
    semantic_field: 'ICD-10 diagnosis code for medical condition',
  },
];

// AI mapping suggestions
export const dummyAIMappings: AIMapping[] = [
  {
    target_table: 'claims_processed',
    target_column: 'member_identifier',
    semantic_field: 'Unique healthcare member identification number',
    confidence: 0.95,
  },
  {
    target_table: 'claims_processed',
    target_column: 'claim_reference_number',
    semantic_field: 'Primary claim tracking identifier',
    confidence: 0.92,
  },
  {
    target_table: 'claims_processed',
    target_column: 'service_provision_date',
    semantic_field: 'Date of healthcare service delivery',
    confidence: 0.88,
  },
];

// Template upload history
export const dummyTemplateRows: TemplateRow[] = [
  {
    src_columns: {
      src_table_name: 'pharmacy_raw',
      src_column_name: 'prescription_id',
      src_column_physical_name: 'RX_ID',
      src_nullable: false,
      src_physical_datatype: 'VARCHAR(20)',
      src_comments: 'Unique prescription identifier',
    },
    tgt_columns: {
      tgt_table_name: 'pharmacy_processed',
      tgt_table_physical_name: 'PHARMACY_PROCESSED',
      tgt_column_name: 'prescription_number',
      tgt_column_physical_name: 'RX_NBR',
    },
  },
];

// Application configuration
export const dummyConfig: AppConfig = {
  database: {
    warehouse_name: 'gia-oztest-dev-data-warehouse',
    mapping_table: 'oztest_dev.source_to_target.mappings',
    semantic_table: 'oztest_dev.source_to_target.silver_semantic_full',
    server_hostname: 'Acuity-oz-test-ue1.cloud.databricks.com',
    http_path: '/sql/1.0/warehouses/173ea239ed13be7d',
  },
  ai_model: {
    previous_mappings_table_name: 'oztest_dev.source_to_target.train_with_comments',
    foundation_model_endpoint: 'databricks-meta-llama-3-3-70b-instruct',
    default_prompt: `You are an expert data mapper for healthcare systems. Given source column information, suggest the most appropriate target mapping based on healthcare data standards, FHIR resources, and common healthcare data patterns. Consider:

1. Healthcare terminology and standards (HL7, FHIR, ICD-10, CPT)
2. Data privacy and security requirements (HIPAA)
3. Common healthcare data transformations
4. Clinical workflow patterns

Provide specific, actionable mapping suggestions with confidence scores.`,
  },
  ui: {
    app_title: 'Source-to-Target Mapping Platform',
    theme_color: '#4a5568',
    sidebar_expanded: true,
  },
  support: {
    support_url: 'https://mygainwell.sharepoint.com',
  },
  vector_search: {
    index_name: 'oztest_dev.source_to_target.silver_semantic_full_vs',
    endpoint_name: 's2t_vsendpoint',
  },
  security: {
    admin_group_name: 'gia-oztest-dev-ue1-data-engineers',
    enable_password_auth: true,
    admin_password_hash: '',
  },
};
