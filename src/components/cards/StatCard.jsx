import React from 'react';
import * as Icons from 'lucide-react';

export const StatCard = ({ title, value, change, context, icon = 'TrendingUp', trend = 'up', isFullWidth = false, className = '' }) => {
  const IconComponent = Icons[icon] || Icons.TrendingUp;

  return (
    <div
      className={`ui-card ui-stat-card summary-card ${isFullWidth ? 'outstanding-card' : ''} ${className}`.trim()}
      style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '14px',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '8px',
        minWidth: 0,
        width: '100%',
        boxSizing: 'border-box',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      {/* Top: Small Label */}
      <span style={{
        fontSize: '12px',
        color: 'var(--text-muted)',
        fontWeight: '500',
        display: 'block',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
        {title}
      </span>

      {/* Bottom Row: Large Value + Small Icon Box */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', minWidth: 0 }}>
        <h3 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: 'var(--text-primary)',
          margin: 0,
          lineHeight: 1.1,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          flex: 1,
          minWidth: 0
        }}>
          {value}
        </h3>

        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          backgroundColor: 'var(--primary-soft)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--primary)',
          flexShrink: 0
        }}>
          <IconComponent size={20} />
        </div>
      </div>
      {(change || context) && <span className="ui-stat-card__context" style={{ color: trend === 'down' ? 'var(--danger)' : undefined }}>{change || context}</span>}
    </div>
  );
};
