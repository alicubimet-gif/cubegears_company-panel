import React, { useEffect, useRef, useState } from 'react';
import { Bell, ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { GlobalSearch } from '../common/GlobalSearch';

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const close = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const go = (path) => {
    setProfileDropdownOpen(false);
    navigate(path);
  };

  const profileMenu = (
    <div className="header-profile-menu">
      <button type="button" onClick={() => go('/profile')}><User size={15}/> Profile & Account</button>
      <button type="button" onClick={() => go('/settings')}><Settings size={15}/> Settings</button>
      <div className="header-profile-divider" />
      <button type="button" className="danger" onClick={() => { setProfileDropdownOpen(false); logout(); }}><LogOut size={15}/> Logout</button>
    </div>
  );

  return (
    <header className="header app-header" style={{ position: 'sticky', top: 0, zIndex: 40 }}>
      <div className="desktop-table-view header-desktop-row">
        <button type="button" className="header-brand" onClick={() => navigate('/dashboard')}>
          <span className="header-brand-mark">CG</span>
          <span>CubeGears Workspace</span>
        </button>
        <div className="header-search-area"><GlobalSearch isMobileView={false}/></div>
        <div className="header-spacer" />
        <button type="button" className="header-icon-button" onClick={() => navigate('/notifications')} aria-label="Notifications">
          <Bell size={17}/><span className="header-notification-dot" />
        </button>
        <div className="header-profile-wrap" ref={profileRef}>
          <button type="button" className="header-profile-btn" onClick={() => setProfileDropdownOpen((value) => !value)}>
            <img src={user?.avatar} alt="Avatar" />
            <span className="header-profile-copy"><strong>{user?.name || 'User'}</strong><small>{user?.role || 'ADMIN'}</small></span>
            <ChevronDown size={14}/>
          </button>
          {profileDropdownOpen && profileMenu}
        </div>
      </div>

      <div className="mobile-card-view mobile-header-simple">
        <div className="mobile-header-topline">
          <button type="button" className="header-brand mobile" onClick={() => navigate('/dashboard')}>
            <span className="header-brand-mark">CG</span><span>CubeGears</span>
          </button>
          <div className="mobile-header-actions">
            <button type="button" className="header-icon-button" onClick={() => navigate('/notifications')} aria-label="Notifications"><Bell size={17}/></button>
            <div className="header-profile-wrap" ref={profileRef}>
              <button type="button" className="header-avatar-button" onClick={() => setProfileDropdownOpen((value) => !value)}>
                <img src={user?.avatar} alt="Avatar" />
              </button>
              {profileDropdownOpen && profileMenu}
            </div>
          </div>
        </div>
        <GlobalSearch isMobileView />
      </div>
    </header>
  );
};
