import React from 'react';

export const Button = ({ children, variant = 'primary', size = 'md', className = '', style = {}, ...props }) => {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    borderRadius: 'var(--radius-sm)',
    fontWeight: '600',
    fontSize: size === 'sm' ? '13px' : size === 'lg' ? '16px' : '14px',
    padding: size === 'sm' ? '8px 14px' : size === 'lg' ? '12px 24px' : '10px 18px',
    minHeight: '44px',
    transition: 'all 0.15s ease',
    border: 'none',
    cursor: 'pointer',
    boxSizing: 'border-box',
    ...style
  };

  const variants = {
    primary: { backgroundColor: 'var(--primary)', color: '#ffffff' },
    secondary: { backgroundColor: 'var(--surface-2)', color: 'var(--text)', border: '1px solid var(--border)' },
    outline: { backgroundColor: 'transparent', border: '1px solid var(--border-strong)', color: 'var(--text)' },
    ghost: { backgroundColor: 'transparent', color: 'var(--text-muted)' },
    danger: { backgroundColor: 'var(--danger)', color: '#ffffff' },
    success: { backgroundColor: 'var(--success)', color: '#ffffff' }
  };

  return (
    <button style={{ ...baseStyle, ...variants[variant] }} className={className} {...props}>
      {children}
    </button>
  );
};
