import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, Users, Database, Layers, Calendar, Settings } from 'lucide-react';
import { MobileTabRail } from '../../components/common/MobileTabRail';

import { Approvals } from '../attendance-manager/Approvals';
import { TeamReview } from '../attendance-manager/TeamReview';
import { MasterRecords } from '../attendance-manager/MasterRecords';
import { LeaveTypes } from '../attendance-manager/LeaveTypes';
import { Holidays } from '../attendance-manager/Holidays';
import { RulesSettings } from '../attendance-manager/RulesSettings';

export const AttendanceManager = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getInitialTab = () => {
    if (location.pathname.includes('/team-review')) return 'team-review';
    if (location.pathname.includes('/master-records')) return 'master-records';
    if (location.pathname.includes('/leave-types')) return 'leave-types';
    if (location.pathname.includes('/holidays')) return 'holidays';
    if (location.pathname.includes('/rules')) return 'rules';
    return 'approvals';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab());

  useEffect(() => {
    setActiveTab(getInitialTab());
  }, [location.pathname]);

  const tabs = [
    { id: 'approvals', label: 'Approvals', icon: CheckCircle2 },
    { id: 'team-review', label: 'Team Review', mobileLabel: 'Team', icon: Users },
    { id: 'master-records', label: 'Master Records', mobileLabel: 'Records', icon: Database },
    { id: 'leave-types', label: 'Leave Types', mobileLabel: 'Leave Types', icon: Layers },
    { id: 'holidays', label: 'Holidays', mobileLabel: 'Holidays', icon: Calendar },
    { id: 'rules', label: 'Rules & Settings', mobileLabel: 'Rules', icon: Settings }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    navigate(`/attendance-manager/${tabId}`);
  };

  return (
    <div className="attendance-manager-page" style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '100%', minWidth: 0, boxSizing: 'border-box' }}>
      {/* Page Header */}
      <div>
        <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>
          Attendance Manager
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: '4px 0 0 0' }}>
          Review team attendance, approvals, leave, corrections and company attendance rules.
        </p>
      </div>

      {/* Desktop Horizontal Tab Bar (>= 768px) */}
      <div className="desktop-table-view" style={{ width: '100%' }}>
        <div style={{
          display: 'flex',
          gap: '8px',
          paddingBottom: '8px',
          borderBottom: '1px solid var(--border)',
          overflowX: 'auto'
        }} className="attendance-filter-scroll scroll-hidden">
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
                  whiteSpace: 'nowrap',
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

      {/* Mobile Horizontally Scrollable Tab Rail (< 768px) */}
      <div className="mobile-card-view" style={{ width: '100%' }}>
        <MobileTabRail
          tabs={tabs.map(t => ({ id: t.id, label: t.mobileLabel || t.label, icon: t.icon }))}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>

      {/* Submenu View Routing */}
      <div style={{ width: '100%', minWidth: 0 }}>
        {activeTab === 'approvals' && <Approvals />}
        {activeTab === 'team-review' && <TeamReview />}
        {activeTab === 'master-records' && <MasterRecords />}
        {activeTab === 'leave-types' && <LeaveTypes />}
        {activeTab === 'holidays' && <Holidays />}
        {activeTab === 'rules' && <RulesSettings />}
      </div>
    </div>
  );
};
