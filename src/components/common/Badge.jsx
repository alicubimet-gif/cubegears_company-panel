import React from 'react';

export const Badge = ({ children, variant = 'info' }) => {
  const styles = {
    info: { backgroundColor: 'var(--info-soft)', color: 'var(--info)', border: '1px solid var(--info)' },
    success: { backgroundColor: 'var(--success-soft)', color: 'var(--success)', border: '1px solid var(--success)' },
    warning: { backgroundColor: 'var(--warning-soft)', color: 'var(--warning)', border: '1px solid var(--warning)' },
    danger: { backgroundColor: 'var(--danger-soft)', color: 'var(--danger)', border: '1px solid var(--danger)' }
  };

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '3px 10px',
      borderRadius: '9999px',
      fontSize: '11px',
      fontWeight: '700',
      letterSpacing: '0.02em',
      ...styles[variant]
    }}>
      {children}
    </span>
  );
};
