import React from 'react';
export const PageContainer = ({ children, className = '' }) => <div className={`ui-page-container ${className}`.trim()}>{children}</div>;
