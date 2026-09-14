import React from 'react';
export const Grid = ({ columns = 2, children, className = '' }) => <div className={`ui-grid ui-grid--${columns} ${className}`.trim()}>{children}</div>;
