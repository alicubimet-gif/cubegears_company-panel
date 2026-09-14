import React from 'react';

export const Textarea = ({
  label,
  error,
  helper,
  required = false,
  disabled = false,
  rows = 3,
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
      <textarea
        id={id}
        rows={rows}
        disabled={disabled}
        className={`form-textarea-control cubegears-textarea ${error ? 'has-error cubegears-field-error' : ''}`}
        style={style}
        {...props}
      />
      {helper && !error && <span className="form-helper">{helper}</span>}
      {error && <span className="form-error cubegears-error-text">{error}</span>}
    </div>
  );
};

