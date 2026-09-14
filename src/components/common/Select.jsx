import React from 'react';
import { ChevronDown } from 'lucide-react';

export const Select = ({
  label,
  options = [],
  children,
  error,
  helper,
  required = false,
  disabled = false,
  icon: Icon,
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
        {Icon && <Icon size={18} className="field-icon" />}
        <select
          id={id}
          disabled={disabled}
          style={style}
          {...props}
        >
          {children ? (
            children
          ) : (
            options.map((opt) => {
              const val = typeof opt === 'object' ? opt.value : opt;
              const lbl = typeof opt === 'object' ? opt.label : opt;
              return (
                <option key={val} value={val}>
                  {lbl}
                </option>
              );
            })
          )}
        </select>
        <ChevronDown
          size={16}
          className="field-icon right"
          style={{ pointerEvents: 'none', color: 'var(--text-muted)' }}
        />
      </div>
      {helper && !error && <span className="form-helper">{helper}</span>}
      {error && <span className="form-error cubegears-error-text">{error}</span>}
    </div>
  );
};

