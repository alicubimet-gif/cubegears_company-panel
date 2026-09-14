import React from 'react';

export const Checkbox = ({
  label,
  checked = false,
  onChange,
  disabled = false,
  className = '',
  id
}) => {
  return (
    <label htmlFor={id} className={`custom-checkbox-wrapper ${className}`} style={{ opacity: disabled ? 0.6 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}>
      <div className={`custom-checkbox ${checked ? 'checked' : ''}`}>
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        style={{ display: 'none' }}
      />
      {label && <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)' }}>{label}</span>}
    </label>
  );
};
