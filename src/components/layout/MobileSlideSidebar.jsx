import React, { useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { routeConfig, ROUTE_SECTIONS } from '../../routes/routeConfig';
import { X, Sun, Moon, Laptop, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';

export const MobileSlideSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { themeMode, setThemeMode } = useTheme();
  const activeItemRef = useRef(null);
  const containerRef = useRef(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Auto-scroll active route into view when sidebar opens
  useEffect(() => {
    if (isOpen && activeItemRef.current && containerRef.current) {
      setTimeout(() => {
        activeItemRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);
    }
  }, [isOpen, location.pathname]);

  const sections = Object.values(ROUTE_SECTIONS);

  return (
    <>
      {/* Semi-transparent Backdrop */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(4px)',
          zIndex: 90,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.25s ease'
        }}
        onClick={onClose}
      />

      {/* Right-to-Left Slide-In Mobile Sidebar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'min(88vw, 360px)',
          height: '100dvh',
          backgroundColor: 'var(--surface)',
          borderLeft: '1px solid var(--border)',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: '-8px 0 24px rgba(0,0,0,0.3)'
        }}
      >
        {/* Header: Brand & Close Button */}
        <div style={{
          height: '64px',
          padding: '0 20px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '34px',
              height: '34px',
              backgroundColor: 'var(--primary)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              color: '#ffffff',
              fontSize: '16px'
            }}>
              CG
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: '700', fontSize: '16px', color: 'var(--text-primary)', lineHeight: 1.2 }}>CubeGears</span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Garage Workspace</span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '6px'
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Scrollable Navigation Area (Visually Hidden Scrollbar) */}
        <div
          ref={containerRef}
          className="scroll-hidden"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          {sections.map((sec) => {
            const items = routeConfig.filter(r => r.section === sec);
            if (items.length === 0) return null;

            return (
              <div key={sec} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{
                  padding: '0 8px 4px 8px',
                  fontSize: '11px',
                  fontWeight: '700',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {sec}
                </span>
                {items.map((route) => {
                  const IconComp = route.icon;
                  const isActive = location.pathname.startsWith(route.path);

                  return (
                    <NavLink
                      key={route.id}
                      to={route.path}
                      onClick={onClose}
                      ref={isActive ? activeItemRef : null}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: isActive ? '600' : '500',
                        textDecoration: 'none',
                        color: isActive ? '#ffffff' : 'var(--text-secondary)',
                        backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <IconComp size={18} style={{ flexShrink: 0 }} />
                      <span>{route.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Bottom Section: Theme Switcher & User Profile */}
        <div style={{
          padding: '16px',
          borderTop: '1px solid var(--border)',
          backgroundColor: 'var(--surface)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          flexShrink: 0
        }}>
          {/* Theme Switcher Widget */}
          <div style={{
            display: 'flex',
            backgroundColor: 'var(--surface-secondary)',
            borderRadius: '8px',
            padding: '4px',
            gap: '4px'
          }}>
            <button
              onClick={() => setThemeMode('light')}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '6px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: themeMode === 'light' ? 'var(--surface)' : 'transparent',
                color: themeMode === 'light' ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: '600',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              <Sun size={14} /> Light
            </button>
            <button
              onClick={() => setThemeMode('dark')}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '6px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: themeMode === 'dark' ? 'var(--surface)' : 'transparent',
                color: themeMode === 'dark' ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: '600',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              <Moon size={14} /> Dark
            </button>
            <button
              onClick={() => setThemeMode('system')}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '6px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: themeMode === 'system' ? 'var(--surface)' : 'transparent',
                color: themeMode === 'system' ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: '600',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              <Laptop size={14} /> System
            </button>
          </div>

          {/* Profile & Logout */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src={user?.avatar} alt="User" style={{ width: '34px', height: '34px', borderRadius: '50%' }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>{user?.name}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{user?.role}</span>
              </div>
            </div>
            <button onClick={logout} style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '6px' }} title="Log out">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
