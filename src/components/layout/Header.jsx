import React, { useState, useRef, useEffect } from 'react';
import { Bell, Sun, Moon, Monitor, ChevronDown, User, Settings, LogOut, Check } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { useNavigate } from 'react-router-dom';
import { GlobalSearch } from '../common/GlobalSearch';

export const Header = () => {
  const { user, logout } = useAuth();
  const { themeMode, setThemeMode } = useTheme();
  const navigate = useNavigate();

  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const themeRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (themeRef.current && !themeRef.current.contains(e.target)) {
        setThemeDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Theme Icon helper
  const getThemeIcon = () => {
    if (themeMode === 'light') return <Sun size={17} />;
    if (themeMode === 'dark') return <Moon size={17} />;
    return <Monitor size={17} />;
  };

  return (
    <header className="header" style={{ position: 'sticky', top: 0, zIndex: 40 }}>
      {/* DESKTOP SINGLE ROW HEADER (>= 768px) */}
      <div className="desktop-table-view" style={{ width: '100%' }}>
        <div style={{
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          width: '100%',
          boxSizing: 'border-box',
          background: 'var(--surface)',
          borderBottom: '1px solid var(--border)'
        }}>
          {/* Left Side: Brand Logo & Workspace Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, marginRight: '16px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: 'var(--primary)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              color: '#ffffff',
              fontSize: '13px',
              flexShrink: 0,
              boxShadow: 'var(--shadow-sm)'
            }}>
              CG
            </div>
            <h2 style={{
              fontSize: '14px',
              fontWeight: '600',
              color: 'var(--text-primary)',
              margin: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              lineHeight: 1.2
            }}>
              CubeGears Workspace
            </h2>
          </div>

          {/* Desktop Global Search Bar */}
          <div className="header-search-area">
            <GlobalSearch isMobileView={false} />
          </div>

          {/* Flexible Space */}
          <div style={{ flex: 1 }} />

          {/* Right Controls Container */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {/* Theme Dropdown Button (38px × 38px) */}
            <div ref={themeRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                className="header-btn"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '9px',
                  backgroundColor: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'background-color 0.15s ease'
                }}
                title={`Theme Mode: ${themeMode}`}
              >
                {getThemeIcon()}
              </button>

              {themeDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  right: 0,
                  width: '145px',
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  boxShadow: 'var(--shadow-md)',
                  padding: '5px',
                  zIndex: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '3px'
                }}>
                  <button onClick={() => { setThemeMode('light'); setThemeDropdownOpen(false); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 9px', borderRadius: '7px', border: 'none', backgroundColor: themeMode === 'light' ? 'var(--surface-2)' : 'transparent', color: 'var(--text-primary)', fontSize: '13px', cursor: 'pointer', fontWeight: themeMode === 'light' ? '600' : '400' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Sun size={15} /> Light</div>
                    {themeMode === 'light' && <Check size={14} style={{ color: 'var(--primary)' }} />}
                  </button>
                  <button onClick={() => { setThemeMode('dark'); setThemeDropdownOpen(false); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 9px', borderRadius: '7px', border: 'none', backgroundColor: themeMode === 'dark' ? 'var(--surface-2)' : 'transparent', color: 'var(--text-primary)', fontSize: '13px', cursor: 'pointer', fontWeight: themeMode === 'dark' ? '600' : '400' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Moon size={15} /> Dark</div>
                    {themeMode === 'dark' && <Check size={14} style={{ color: 'var(--primary)' }} />}
                  </button>
                  <button onClick={() => { setThemeMode('system'); setThemeDropdownOpen(false); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 9px', borderRadius: '7px', border: 'none', backgroundColor: themeMode === 'system' ? 'var(--surface-2)' : 'transparent', color: 'var(--text-primary)', fontSize: '13px', cursor: 'pointer', fontWeight: themeMode === 'system' ? '600' : '400' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Monitor size={15} /> System</div>
                    {themeMode === 'system' && <Check size={14} style={{ color: 'var(--primary)' }} />}
                  </button>
                </div>
              )}
            </div>

            {/* Notification Bell Button (38px × 38px) */}
            <button
              onClick={() => navigate('/notifications')}
              className="header-btn"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '9px',
                backgroundColor: 'var(--surface-2)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'background-color 0.15s ease'
              }}
              title="Notifications"
            >
              <Bell size={17} />
              <span style={{
                position: 'absolute',
                top: '9px',
                right: '9px',
                width: '6px',
                height: '6px',
                backgroundColor: 'var(--danger)',
                borderRadius: '50%',
                border: '1px solid var(--surface)'
              }} />
            </button>

            {/* Profile Section Button */}
            <div ref={profileRef} style={{ position: 'relative', marginLeft: '4px' }}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="header-profile-btn"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '4px 8px',
                  borderRadius: '9px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  flexShrink: 0,
                  transition: 'background-color 0.15s ease'
                }}
              >
                <img src={user?.avatar} alt="Avatar" style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--border)', flexShrink: 0 }} />
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1.2 }}>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                    {user?.name || 'Alex Rivera'}
                  </span>
                  <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
                    {user?.role === 'ADMIN' ? 'SUPER ADMIN' : (user?.role || 'SERVICE ADVISOR').toUpperCase()}
                  </span>
                </div>
                <ChevronDown size={14} style={{ color: 'var(--text-muted)', marginLeft: '2px', flexShrink: 0 }} />
              </button>

              {profileDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  right: 0,
                  width: '180px',
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  boxShadow: 'var(--shadow-md)',
                  padding: '5px',
                  zIndex: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '3px'
                }}>
                  <button onClick={() => { navigate('/settings'); setProfileDropdownOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '7px 9px', borderRadius: '7px', border: 'none', backgroundColor: 'transparent', color: 'var(--text-primary)', fontSize: '13px', cursor: 'pointer' }}><User size={15} /> Profile & Account</button>
                  <button onClick={() => { navigate('/settings'); setProfileDropdownOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '7px 9px', borderRadius: '7px', border: 'none', backgroundColor: 'transparent', color: 'var(--text-primary)', fontSize: '13px', cursor: 'pointer' }}><Settings size={15} /> Settings</button>
                  <div style={{ height: '1px', backgroundColor: 'var(--border)', margin: '3px 0' }} />
                  <button onClick={() => { logout(); setProfileDropdownOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '7px 9px', borderRadius: '7px', border: 'none', backgroundColor: 'transparent', color: 'var(--danger)', fontSize: '13px', cursor: 'pointer', fontWeight: '600' }}><LogOut size={15} /> Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE TWO-ROW HEADER (< 768px) */}
      <div className="mobile-card-view mobile-header" style={{
        width: '100%',
        backgroundColor: 'var(--header-bg)',
        borderBottom: '1px solid var(--border)',
        padding: '10px 12px 12px',
        boxSizing: 'border-box'
      }}>
        {/* ROW 1: Logo + Workspace + Controls */}
        <div className="mobile-header-top" style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          minWidth: 0,
          gap: '8px',
          marginBottom: '10px'
        }}>
          {/* Logo + Workspace Name (Shrinks with ellipsis first) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: 'var(--primary)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              color: '#ffffff',
              fontSize: '13px',
              flexShrink: 0
            }}>
              CG
            </div>
            <h2 style={{
              fontSize: '15px',
              fontWeight: '700',
              color: 'var(--text-primary)',
              margin: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              lineHeight: 1.2
            }}>
              CubeGears
            </h2>
          </div>

          {/* Controls: Theme, Bell, Avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
            {/* Theme Dropdown Toggle */}
            <div ref={themeRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                {getThemeIcon()}
              </button>

              {themeDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  right: 0,
                  width: '140px',
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  boxShadow: 'var(--shadow-md)',
                  padding: '4px',
                  zIndex: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px'
                }}>
                  <button onClick={() => { setThemeMode('light'); setThemeDropdownOpen(false); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 8px', borderRadius: '6px', border: 'none', backgroundColor: themeMode === 'light' ? 'var(--surface-2)' : 'transparent', color: 'var(--text-primary)', fontSize: '12px', cursor: 'pointer' }}><Sun size={14} /> Light</button>
                  <button onClick={() => { setThemeMode('dark'); setThemeDropdownOpen(false); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 8px', borderRadius: '6px', border: 'none', backgroundColor: themeMode === 'dark' ? 'var(--surface-2)' : 'transparent', color: 'var(--text-primary)', fontSize: '12px', cursor: 'pointer' }}><Moon size={14} /> Dark</button>
                  <button onClick={() => { setThemeMode('system'); setThemeDropdownOpen(false); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 8px', borderRadius: '6px', border: 'none', backgroundColor: themeMode === 'system' ? 'var(--surface-2)' : 'transparent', color: 'var(--text-primary)', fontSize: '12px', cursor: 'pointer' }}><Monitor size={14} /> System</button>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <button
              onClick={() => navigate('/notifications')}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'var(--surface-2)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Bell size={17} />
              <span style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                width: '6px',
                height: '6px',
                backgroundColor: 'var(--danger)',
                borderRadius: '50%'
              }} />
            </button>

            {/* Avatar Profile */}
            <button
              onClick={() => navigate('/settings')}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', flexShrink: 0 }}
            >
              <img
                src={user?.avatar}
                alt="Avatar"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '1.5px solid var(--border)'
                }}
              />
            </button>
          </div>
        </div>

        {/* ROW 2: Full-Width Global Search Input */}
        <div className="mobile-search-row">
          <GlobalSearch isMobileView={false} />
        </div>
      </div>
    </header>
  );
};
