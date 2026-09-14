import React, { forwardRef, useId } from 'react';
import { Label } from './Label';

export const Textarea = forwardRef(function Textarea({ label, error, helper, success, required = false, disabled = false, rows = 3, containerStyle, className = '', id, ...props }, ref) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const message = error || success || helper;
  return <div className={`ui-field form-field cubegears-field-group ${className}`.trim()} style={containerStyle}>
    {label && <Label htmlFor={inputId} required={required}>{label}</Label>}
    <textarea ref={ref} id={inputId} rows={rows} required={required} disabled={disabled} aria-invalid={Boolean(error)} className={`ui-textarea form-textarea-control cubegears-textarea${error ? ' ui-textarea--error has-error' : ''}`} {...props} />
    {message && <span className={`ui-field__message${error ? ' ui-field__message--error' : success ? ' ui-field__message--success' : ''}`}>{message}</span>}
  </div>;
});
