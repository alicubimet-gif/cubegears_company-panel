import React, { forwardRef, useId } from 'react';
import { Label } from './Label';

export const Input = forwardRef(function Input({ label, error, helper, success, required = false, disabled = false, icon: Icon, rightIcon: RightIcon, containerStyle, style, className = '', id, ...props }, ref) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const message = error || success || helper;
  return (
    <div className={`ui-field form-field cubegears-field-group ${className}`.trim()} style={containerStyle}>
      {label && <Label htmlFor={inputId} required={required}>{label}</Label>}
      <div className={`ui-input-shell form-control${error ? ' ui-input-shell--error has-error' : ''}${success ? ' ui-input-shell--success' : ''}${disabled ? ' ui-input-shell--disabled is-disabled' : ''}`}>
        {Icon && <Icon size={17} aria-hidden="true" />}
        <input ref={ref} id={inputId} className="ui-input" required={required} disabled={disabled} aria-invalid={Boolean(error)} aria-describedby={message ? `${inputId}-message` : undefined} style={style} {...props} />
        {RightIcon && <RightIcon size={17} aria-hidden="true" />}
      </div>
      {message && <span id={`${inputId}-message`} className={`ui-field__message${error ? ' ui-field__message--error' : success ? ' ui-field__message--success' : ''}`}>{message}</span>}
    </div>
  );
});
