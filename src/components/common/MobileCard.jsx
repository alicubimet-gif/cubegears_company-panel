import React from 'react';

export const MobileCard = ({ title, subtitle, badge, fields = [], actions }) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h4 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>{title}</h4>
          {subtitle && <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{subtitle}</span>}
        </div>
        {badge}
      </div>

      {fields.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '10px 0' }}>
          {fields.map((f, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '500' }}>{f.label}</span>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500' }}>{f.value}</span>
            </div>
          ))}
        </div>
      )}

      {actions && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', alignItems: 'center' }}>
          {actions}
        </div>
      )}
    </div>
  );
};
