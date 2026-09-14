import React, { forwardRef, useId } from 'react';
import { Label } from './Label';

export const Select = forwardRef(function Select({ label, options = [], children, error, helper, success, required = false, disabled = false, icon: Icon, containerStyle, className = '', id, ...props }, ref) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const message = error || success || helper;
  return <div className={`ui-field form-field cubegears-field-group ${className}`.trim()} style={containerStyle}>
    {label && <Label htmlFor={inputId} required={required}>{label}</Label>}
    <div className={`ui-input-shell form-control${error ? ' ui-input-shell--error has-error' : ''}${success ? ' ui-input-shell--success' : ''}${disabled ? ' ui-input-shell--disabled is-disabled' : ''}`}>
      {Icon && <Icon size={17} aria-hidden="true" />}
      <select ref={ref} id={inputId} className="ui-select" required={required} disabled={disabled} aria-invalid={Boolean(error)} {...props}>
        {children || options.map((option) => {
          const value = typeof option === 'object' ? option.value : option;
          const text = typeof option === 'object' ? option.label : option;
          return <option key={value} value={value}>{text}</option>;
        })}
      </select>
    </div>
    {message && <span className={`ui-field__message${error ? ' ui-field__message--error' : success ? ' ui-field__message--success' : ''}`}>{message}</span>}
  </div>;
});
