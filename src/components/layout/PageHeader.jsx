import React from 'react';
export const PageHeader = ({ title, description, actions, children, className = '' }) => <header className={`ui-page-header ${className}`.trim()}><div><h1>{title}</h1>{description && <p>{description}</p>}{children}</div>{actions && <div className="component-demo-row">{actions}</div>}</header>;
