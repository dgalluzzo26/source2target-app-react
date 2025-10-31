import React from 'react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isAdmin: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, isAdmin }) => {
  const menuItems = [
    { id: 'introduction', label: 'Introduction', icon: '🏠' },
    { id: 'mapping', label: 'Field Mapping', icon: '🔗' },
  ];

  // Configuration is admin-only (like the original app)
  if (isAdmin) {
    menuItems.push({ id: 'config', label: 'Configuration', icon: '⚙️' });
  }

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.id} className="nav-item">
              <button
                className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => onTabChange(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;