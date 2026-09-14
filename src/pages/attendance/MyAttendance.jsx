import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, History, FileText, PieChart } from 'lucide-react';
import { MobileTabRail } from '../../components/common/MobileTabRail';

import { HolidayCalendar } from '../my-attendance/HolidayCalendar';
import { HistoryLogs } from '../my-attendance/HistoryLogs';
import { LeaveRequests } from '../my-attendance/LeaveRequests';
import { AttendanceSummary } from '../my-attendance/AttendanceSummary';

export const MyAttendance = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine sub tab based on route pathname or local tab state
  const getInitialTab = () => {
    if (location.pathname.includes('/calendar')) return 'calendar';
    if (location.pathname.includes('/leave')) return 'leave';
    if (location.pathname.includes('/summary')) return 'summary';
    return 'history';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab());

  useEffect(() => {
    setActiveTab(getInitialTab());
  }, [location.pathname]);

  const tabs = [
    { id: 'calendar', label: 'Holiday Calendar', icon: Calendar },
    { id: 'history', label: 'History & Logs', icon: History },
    { id: 'leave', label: 'Leave Requests', icon: FileText },
    { id: 'summary', label: 'Summary', icon: PieChart }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'calendar') navigate('/my-attendance/calendar');
    else if (tabId === 'history') navigate('/my-attendance/history');
    else if (tabId === 'leave') navigate('/my-attendance/leave');
    else if (tabId === 'summary') navigate('/my-attendance/summary');
  };

  return (
    <div className="my-attendance-page" style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '100%', minWidth: 0, boxSizing: 'border-box' }}>
      {/* Module Header */}
      <div>
        <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>
          My Attendance
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: '4px 0 0 0' }}>
          View your personal attendance history, shift logs, leave applications and workshop holidays.
        </p>
      </div>

      {/* Desktop Horizontal Tab Bar (>= 768px) */}
      <div className="desktop-table-view" style={{ width: '100%' }}>
        <div style={{
          display: 'flex',
          gap: '8px',
          paddingBottom: '8px',
          borderBottom: '1px solid var(--border)'
        }}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const IconComp = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 18px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--primary)' : 'var(--surface)',
                  border: isActive ? '1px solid var(--primary)' : '1px solid var(--border)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {IconComp && <IconComp size={16} />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Horizontal Scrollable Tab Rail (< 768px) */}
      <div className="mobile-card-view" style={{ width: '100%' }}>
        <MobileTabRail tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      {/* Submenu Views */}
      <div style={{ width: '100%', minWidth: 0 }}>
        {activeTab === 'calendar' && <HolidayCalendar />}
        {activeTab === 'history' && <HistoryLogs />}
        {activeTab === 'leave' && <LeaveRequests />}
        {activeTab === 'summary' && <AttendanceSummary />}
      </div>
    </div>
  );
};
