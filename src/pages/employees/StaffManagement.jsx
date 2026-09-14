import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { StaffManagementTabs } from '../../components/staff-management/StaffManagementTabs';
import { Staff } from '../staff-management/Staff';
import { UserRoles } from '../staff-management/UserRoles';

export const StaffManagement = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getSubmenu = () => {
    if (location.pathname.includes('/roles')) return 'roles';
    return 'staff';
  };

  const activeSubmenu = getSubmenu();

  useEffect(() => {
    if (location.pathname === '/staff-management' || location.pathname === '/staff' || location.pathname === '/staff/') {
      navigate('/staff-management/staff', { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      width: '100%',
      maxWidth: '100%',
      minWidth: 0,
      boxSizing: 'border-box'
    }}>
      {/* Module Header */}
      <div style={{
        padding: '16px 16px 12px 16px',
        backgroundColor: 'var(--surface)',
        borderBottom: '1px solid var(--border)'
      }}>
        <h1 style={{ fontSize: '20px', fontWeight: '800', margin: 0, color: 'var(--text-primary)', lineHeight: 1.2 }}>
          Staff Management
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
          Manage company staff profiles, employment details, user roles, and permission access guards.
        </p>
      </div>

      {/* Responsive Horizontal Tab Rail */}
      <StaffManagementTabs />

      {/* Submenu Inner Content */}
      <div style={{ padding: '16px 12px', width: '100%', maxWidth: '100%', minWidth: 0, boxSizing: 'border-box', flex: 1 }}>
        {activeSubmenu === 'staff' && <Staff />}
        {activeSubmenu === 'roles' && <UserRoles />}
      </div>
    </div>
  );
};
