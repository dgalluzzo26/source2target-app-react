// Data types matching the original Streamlit app structure

export interface SourceColumn {
  src_table_name: string;
  src_column_name: string;
  src_column_physical_name: string;
  src_nullable: boolean;
  src_physical_datatype: string;
  src_comments: string;
  tgt_mapping?: string | null;
}

export interface MappedField {
  src_table_name: string;
  src_column_name: string;
  tgt_mapping: string;
  tgt_table_name: string;
  tgt_column_physical: string;
  tgt_table_physical: string;
}

export interface SemanticRecord {
  tgt_table_name: string;
  tgt_column_name: string;
  semantic_field: string;
}

export interface AIMapping {
  target_table: string;
  target_column: string;
  semantic_field: string;
  confidence?: number;
}

export interface TemplateRow {
  src_columns: {
    src_table_name: string;
    src_column_name: string;
    src_column_physical_name: string;
    src_nullable: boolean;
    src_physical_datatype: string;
    src_comments: string;
  };
  tgt_columns: {
    tgt_table_name: string;
    tgt_table_physical_name: string;
    tgt_column_name: string;
    tgt_column_physical_name: string;
  };
}

export interface User {
  email: string;
  display_name: string;
  role: 'admin' | 'platform_user' | 'user';
  is_admin: boolean;
  is_platform_user: boolean;
}

export interface AppConfig {
  database: {
    warehouse_name: string;
    mapping_table: string;
    semantic_table: string;
    server_hostname: string;
    http_path: string;
  };
  ai_model: {
    previous_mappings_table_name: string;
    foundation_model_endpoint: string;
    default_prompt: string;
  };
  ui: {
    app_title: string;
    theme_color: string;
    sidebar_expanded: boolean;
  };
  support: {
    support_url: string;
  };
  vector_search: {
    index_name: string;
    endpoint_name: string;
  };
  security: {
    admin_group_name: string;
    enable_password_auth: boolean;
    admin_password_hash: string;
  };
}

