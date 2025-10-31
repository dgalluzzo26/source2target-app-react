import React from 'react';
import { User } from '../types';

interface HeaderProps {
  user: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-logo">
          <img src="/gainwell-logo.png" alt="Gainwell Technologies" className="logo" />
          <h1 className="app-title">Source-to-Target Mapping Platform</h1>
        </div>
        
        <div className="header-user">
          <div className="user-info">
            <span className="user-name">{user.display_name}</span>
            <span className="user-email">{user.email}</span>
            <span className={`user-badge ${user.role}`}>
              {user.is_admin ? 'Admin' : user.is_platform_user ? 'Platform User' : 'User'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
