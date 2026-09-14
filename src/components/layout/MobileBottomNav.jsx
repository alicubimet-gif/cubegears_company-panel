import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { mobilePrimaryRoutes, mobileMoreRoutes } from '../../routes/routeConfig';
import { MoreHorizontal } from 'lucide-react';
import { MobileSlideSidebar } from './MobileSlideSidebar';

export const MobileBottomNav = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Check if current route is inside More menu
  const isMoreActive = mobileMoreRoutes.some(r => location.pathname.startsWith(r.path));

  return (
    <>
      <nav
        className="mobile-only-bottom-nav"
        style={{
          display: 'none',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 'calc(var(--mobile-bottom-nav-height) + env(safe-area-inset-bottom))',
          paddingBottom: 'env(safe-area-inset-bottom)',
          backgroundColor: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          justifyContent: 'space-around',
          alignItems: 'center',
          zIndex: 50
        }}
      >
        {mobilePrimaryRoutes.map((route) => {
          const IconComp = route.icon;
          const isActive = location.pathname.startsWith(route.path);

          return (
            <NavLink
              key={route.id}
              to={route.path}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                flex: 1,
                height: '100%',
                textDecoration: 'none',
                color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{
                padding: '4px 12px',
                borderRadius: '16px',
                backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <IconComp size={20} color={isActive ? 'var(--primary)' : 'var(--text-secondary)'} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: isActive ? '600' : '500' }}>{route.label}</span>
            </NavLink>
          );
        })}

        {/* The 5th and LAST button: MORE */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            flex: 1,
            height: '100%',
            background: 'none',
            border: 'none',
            color: isMoreActive ? 'var(--primary)' : 'var(--text-secondary)',
            cursor: 'pointer',
            padding: 0
          }}
        >
          <div style={{
            padding: '4px 12px',
            borderRadius: '16px',
            backgroundColor: isMoreActive ? 'var(--primary-light)' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <MoreHorizontal size={20} color={isMoreActive ? 'var(--primary)' : 'var(--text-secondary)'} />
          </div>
          <span style={{ fontSize: '11px', fontWeight: isMoreActive ? '600' : '500' }}>More</span>
        </button>
      </nav>

      {/* Full-Height Right-to-Left Mobile Slide Sidebar */}
      <MobileSlideSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};
