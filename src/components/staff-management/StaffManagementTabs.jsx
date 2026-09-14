import React, { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export const StaffManagementTabs = () => {
  const tabsRef = useRef(null);
  const activeTabRef = useRef(null);

  const tabs = [
    { label: "Staff", path: "/staff-management/staff" },
    { label: "User Roles", path: "/staff-management/roles" }
  ];

  useEffect(() => {
    if (activeTabRef.current && tabsRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  }, []);

  return (
    <div style={{ width: '100%', borderBottom: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}>
      <div
        ref={tabsRef}
        className="scroll-hidden"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          padding: '0 16px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {tabs.map((tab, idx) => (
          <NavLink
            key={idx}
            to={tab.path}
            ref={(el) => {
              if (el && el.classList.contains('active')) {
                activeTabRef.current = el;
              }
            }}
            style={({ isActive }) => ({
              padding: '12px 16px',
              fontSize: '14px',
              fontWeight: isActive ? '700' : '500',
              color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
              borderBottom: isActive ? '2px solid var(--primary)' : '2px solid transparent',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              display: 'inline-flex',
              alignItems: 'center'
            })}
          >
            {tab.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};
