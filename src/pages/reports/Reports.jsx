import React, { useState } from 'react';
import { MobileTabRail } from '../../components/common/MobileTabRail';
import { FilterSheet } from '../../components/common/FilterSheet';
import { Button } from '../../components/common/Button';
import { Filter, Download } from 'lucide-react';

export const Reports = () => {
  const [activeTab, setActiveTab] = useState('finance');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const tabs = [
    { id: 'finance', label: 'Financial Reports' },
    { id: 'operations', label: 'Workshop Operations' },
    { id: 'stock', label: 'Stock Valuation' },
    { id: 'people', label: 'Staff Efficiency' },
    { id: 'branch', label: 'Branch Comparison' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#f8fafc', margin: 0 }}>Business Analytics & BI Reports</h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: '4px 0 0 0' }}>Comprehensive reporting across garage operations, revenue, and inventory.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="outline" size="sm" onClick={() => setIsFilterOpen(true)}>
            <Filter size={16} /> Filters
          </Button>
          <Button variant="primary" size="sm">
            <Download size={16} /> Export PDF
          </Button>
        </div>
      </div>

      <MobileTabRail tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'finance' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '20px' }}>
            <span style={{ fontSize: '13px', color: '#94a3b8' }}>Total Sales (YTD)</span>
            <h2 style={{ fontSize: '28px', color: '#34d399', margin: '8px 0' }}>$45,280.00</h2>
            <span style={{ fontSize: '12px', color: '#34d399' }}>↑ 12.4% vs previous period</span>
          </div>
          <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '20px' }}>
            <span style={{ fontSize: '13px', color: '#94a3b8' }}>Gross Margin</span>
            <h2 style={{ fontSize: '28px', color: '#6366f1', margin: '8px 0' }}>68.5%</h2>
          </div>
        </div>
      )}

      {/* Slide-Up Mobile Filter Sheet */}
      <FilterSheet isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} onApply={() => setIsFilterOpen(false)} onClear={() => setIsFilterOpen(false)}>
        <p style={{ color: '#94a3b8' }}>Select date range, branch, or report category for filtering.</p>
      </FilterSheet>
    </div>
  );
};
