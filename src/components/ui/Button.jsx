import React from 'react';

export const Button = ({ children, variant = 'primary', size = 'md', loading = false, block = false, className = '', type = 'button', disabled, ...props }) => (
  <button
    type={type}
    className={`ui-button ui-button--${variant} ui-button--${size}${block ? ' ui-button--block' : ''} ${className}`.trim()}
    disabled={disabled || loading}
    {...props}
  >
    {loading && <span className="ui-button__spinner" aria-hidden="true" />}
    {children}
  </button>
);
