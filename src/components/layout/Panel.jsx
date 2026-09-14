import React from 'react';
export const Panel = ({ children, className = '', ...props }) => <div className={`ui-panel ${className}`.trim()} {...props}>{children}</div>;
