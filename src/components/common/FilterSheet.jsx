import React from 'react';
import { X, Filter } from 'lucide-react';
import { Button } from './Button';

export const FilterSheet = ({ isOpen, onClose, title = "Filter Records", children, onApply, onClear }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(4px)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#1e293b',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          borderTop: '1px solid #334155',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          paddingBottom: 'calc(env(safe-area-inset-bottom) + 16px)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: '1px solid #334155'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={18} color="#6366f1" />
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#f8fafc', margin: 0 }}>{title}</h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <div className="custom-scrollbar" style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
          {children}
        </div>

        <div style={{ display: 'flex', gap: '12px', padding: '16px 20px', borderTop: '1px solid #334155' }}>
          <Button variant="primary" style={{ flex: 1 }} onClick={onApply}>Apply Filters</Button>
          <Button variant="outline" style={{ flex: 1 }} onClick={onClear}>Reset</Button>
        </div>
      </div>
    </div>
  );
};
