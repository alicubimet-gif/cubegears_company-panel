import React from 'react';
export const Section = ({ title, description, children, className = '' }) => <section className={`ui-section ${className}`.trim()}>{(title || description) && <header className="ui-section__header">{title && <h2>{title}</h2>}{description && <p>{description}</p>}</header>}{children}</section>;
