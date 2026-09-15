import React, { useEffect, useRef, useState } from 'react';
import { Bell, ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { GlobalSearch } from '../common/GlobalSearch';

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const desktopProfileRef = useRef(null);
  const mobileProfileRef = useRef(null);

  useEffect(() => {
    const close = (event) => {
      const inDesktopProfile = desktopProfileRef.current?.contains(event.target);
      const inMobileProfile = mobileProfileRef.current?.contains(event.target);
      if (!inDesktopProfile && !inMobileProfile) setProfileDropdownOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const go = (path) => {
    setProfileDropdownOpen(false);
    navigate(path);
  };

  const renderProfileMenu = () => (
    <div className="header-profile-menu">
      <button type="button" onClick={() => go('/profile')}><User size={15}/> Profile & Account</button>
      <button type="button" onClick={() => go('/settings')}><Settings size={15}/> Settings</button>
      <div className="header-profile-divider" />
      <button type="button" className="danger" onClick={() => { setProfileDropdownOpen(false); logout(); }}><LogOut size={15}/> Logout</button>
    </div>
  );

  return (
    <header className="header app-header">
      <div className="desktop-table-view header-desktop-row">
        <button type="button" className="header-brand" onClick={() => navigate('/dashboard')} aria-label="Go to dashboard">
          <span className="header-brand-mark">CG</span>
          <span className="header-brand-name">CubeGears Workspace</span>
        </button>

        <div className="header-search-area">
          <GlobalSearch isMobileView={false}/>
        </div>

        <div className="header-right-actions">
          <button type="button" className="header-icon-button" onClick={() => navigate('/notifications')} aria-label="Notifications">
            <Bell size={18}/>
            <span className="header-notification-dot" />
          </button>

          <div className="header-profile-wrap" ref={desktopProfileRef}>
            <button type="button" className="header-profile-btn" onClick={() => setProfileDropdownOpen((value) => !value)} aria-expanded={profileDropdownOpen}>
              <img src={user?.avatar} alt="Avatar" />
              <span className="header-profile-copy">
                <strong>{user?.name || 'User'}</strong>
                <small>{user?.role || 'ADMIN'}</small>
              </span>
              <ChevronDown size={14}/>
            </button>
            {profileDropdownOpen && renderProfileMenu()}
          </div>
        </div>
      </div>

      <div className="mobile-card-view mobile-header-simple">
        <div className="mobile-header-topline">
          <button type="button" className="header-brand mobile" onClick={() => navigate('/dashboard')} aria-label="Go to dashboard">
            <span className="header-brand-mark">CG</span>
            <span className="header-brand-name">CubeGears</span>
          </button>

          <div className="mobile-header-actions">
            <button type="button" className="header-icon-button" onClick={() => navigate('/notifications')} aria-label="Notifications">
              <Bell size={17}/>
              <span className="header-notification-dot" />
            </button>

            <div className="header-profile-wrap" ref={mobileProfileRef}>
              <button type="button" className="header-avatar-button" onClick={() => setProfileDropdownOpen((value) => !value)} aria-expanded={profileDropdownOpen}>
                <img src={user?.avatar} alt="Avatar" />
              </button>
              {profileDropdownOpen && renderProfileMenu()}
            </div>
          </div>
        </div>

        <div className="mobile-header-search-row">
          <GlobalSearch isMobileView />
        </div>
      </div>
    </header>
  );
};
