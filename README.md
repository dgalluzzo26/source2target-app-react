# Source-to-Target Mapping Platform (React + FastAPI)

A modern React-based implementation of the Source-to-Target Mapping Platform, designed specifically for Databricks Apps deployment with FastAPI backend support.

## 🚀 Features

- **React 18** with TypeScript for modern, type-safe frontend development
- **Vite** for fast development and optimized production builds
- **Healthcare-focused** dummy data and workflows
- **Gainwell branding** with professional styling
- **Admin authentication** system matching the original Streamlit app
- **Chart.js integration** ready for mapping statistics visualization
- **Frontend-only mode** for standalone deployment

## 📁 Project Structure

```
source2target-app-react/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   │   ├── Header.tsx      # Application header with branding
│   │   │   ├── Sidebar.tsx     # Navigation sidebar
│   │   │   └── LoadingSpinner.tsx
│   │   ├── pages/              # Main application pages
│   │   │   ├── IntroductionPage.tsx
│   │   │   ├── MappingPage.tsx # Core mapping interface
│   │   │   └── ConfigPage.tsx  # Admin-only configuration
│   │   ├── hooks/              # Custom React hooks
│   │   │   └── useAppData.ts   # Data management hook
│   │   ├── types/              # TypeScript type definitions
│   │   │   └── index.ts        # All app types
│   │   ├── utils/              # Utility functions
│   │   │   └── dummyData.ts    # Healthcare dummy data
│   │   ├── App.tsx             # Main application component
│   │   ├── App.css             # Gainwell brand styling
│   │   └── main.tsx            # Application entry point
│   ├── public/                 # Static assets
│   │   └── gainwell-logo.png   # Gainwell Technologies logo
│   └── index.html              # HTML template
├── package.json                # Dependencies and scripts
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/dgalluzzo26/source2target-app-react.git
cd source2target-app-react

# Install dependencies
npm install
```

### Development Server

```bash
# Start development server (http://localhost:3000)
npm run dev
```

### Build for Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏥 Healthcare Data Focus

The application is designed specifically for healthcare data mapping with:

- **Claims data** (member_id, claim_number, service_date)
- **Provider data** (NPI, provider names, business information)
- **Member demographics** (names, dates of birth, identifiers)
- **Healthcare standards** (FHIR, HL7, ICD-10, CPT compliance)
- **HIPAA considerations** built into the data model

## 🎨 Gainwell Branding

The application uses the official Gainwell Technologies color palette:

- **Primary**: `#4a5568` (Dark gray from logo)
- **Secondary**: `#38a169` (Green from logo)  
- **Light**: `#f7fafc` (Light gray background)
- **Accent**: `#2d3748` (Darker gray for text)

## 🔐 Admin Features

Following the original Streamlit app structure:

- **Configuration page** - Admin-only access for database, AI, and system settings
- **Semantic management** - Admin-only tab in the mapping interface
- **No separate admin panel** - Admin features integrated into existing pages

## 📊 Core Functionality

### Field Mapping Interface
- **Unmapped Fields** tab - Source columns needing target mappings
- **Mapped Fields** tab - Completed mappings with unmap functionality  
- **Semantic Management** tab - Admin-only semantic field descriptions

### AI-Powered Suggestions
- Healthcare-focused AI mapping recommendations
- Confidence scoring for suggestions
- Manual search through semantic records

### Template System
- CSV upload/download for bulk mapping operations
- Healthcare data structure preservation
- Validation and error handling

### Configuration Management
- Database connection settings (Databricks)
- AI model configuration (Foundation Models)
- Vector search settings
- UI customization options
- Security and support settings

## 🚀 Databricks Deployment

This application is optimized for Databricks Apps deployment:

### Build for Databricks
```bash
npm run build
```

### Deployment Options

1. **Upload dist/ folder** to Databricks workspace
2. **Use Databricks Repos** for git-based deployment
3. **Databricks Apps** for managed deployment

The built application is completely self-contained with no external dependencies required.

## 🔧 Configuration

The application uses dummy data by default but is structured to easily connect to:

- **Databricks SQL Warehouse** for data queries
- **Databricks Foundation Models** for AI suggestions  
- **Vector Search** for semantic matching
- **Unity Catalog** for metadata discovery

## 📈 Future Enhancements

- FastAPI backend integration for real data connections
- Chart.js visualizations for mapping statistics
- Real-time collaboration features
- Advanced healthcare data validation
- Integration with additional healthcare standards

## 🤝 Contributing

This project follows the same data structures and workflows as the original Streamlit application to ensure consistency and easy migration.

## 📞 Support

For deployment and configuration support, refer to the Gainwell Technologies SharePoint portal or contact the development team.

---

**Built with ❤️ for Healthcare Data Teams**
