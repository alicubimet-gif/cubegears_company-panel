import React, { useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export const PayrollTabRail = () => {
  const railRef = useRef(null);
  const location = useLocation();

  const tabs = [
    { label: 'Dashboard', path: '/payroll' },
    { label: 'Salary Structure', path: '/payroll/salary-structure' },
    { label: 'Monthly Payroll', path: '/payroll/monthly' },
    { label: 'Approvals', path: '/payroll/approvals' },
    { label: 'Disbursal', path: '/payroll/disbursal' },
    { label: 'Advances', path: '/payroll/advances' },
    { label: 'Payslips', path: '/payroll/payslips' },
    { label: 'Reports', path: '/payroll/reports' }
  ];

  useEffect(() => {
    // Smooth scroll the active tab to the center when location/route changes
    const timer = setTimeout(() => {
      if (railRef.current) {
        const activeTab = railRef.current.querySelector('.payroll-subnav-item.active');
        if (activeTab) {
          activeTab.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
          });
        }
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div style={{ width: '100%', borderBottom: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}>
      <div
        ref={railRef}
        className="payroll-subnav"
        style={{
          padding: '0 12px'
        }}
      >
        {tabs.map((t, idx) => (
          <NavLink
            key={idx}
            to={t.path}
            end={t.path === '/payroll'}
            className={({ isActive }) => `payroll-subnav-item ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              padding: '10px 14px',
              fontSize: '13px',
              fontWeight: isActive ? '700' : '500',
              color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
              borderBottom: isActive ? '2px solid var(--primary)' : '2px solid transparent',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              display: 'inline-flex',
              alignItems: 'center'
            })}
          >
            {t.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};
