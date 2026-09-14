import React from 'react';

export const PhoneInput = ({
  label,
  error,
  helper,
  required = false,
  disabled = false,
  countryCode = '+91',
  containerStyle = {},
  style = {},
  className = '',
  id,
  ...props
}) => {
  return (
    <div className={`form-field cubegears-field-group ${className}`} style={{ display: 'flex', flexDirection: 'column', gap: '0', width: '100%', boxSizing: 'border-box', ...containerStyle }}>
      {label && (
        <label htmlFor={id} className="form-label cubegears-label">
          <span>{label}</span>
          {required && <span className="required cubegears-required-asterisk">*</span>}
        </label>
      )}
      <div className={`form-control ${error ? 'has-error cubegears-field-error' : ''} ${disabled ? 'is-disabled' : ''}`}>
        <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', paddingRight: '8px', borderRight: '1px solid var(--border)', flexShrink: 0 }}>
          {countryCode}
        </span>
        <input
          id={id}
          type="tel"
          disabled={disabled}
          style={style}
          {...props}
        />
      </div>
      {helper && !error && <span className="form-helper">{helper}</span>}
      {error && <span className="form-error cubegears-error-text">{error}</span>}
    </div>
  );
};
