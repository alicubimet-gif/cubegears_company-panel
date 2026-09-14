import React from 'react';
export const Card = ({ title, description, action, children, className = '', ...props }) => <article className={`ui-card ${className}`.trim()} {...props}>
  {(title || description || action) && <header className="ui-card__header"><div>{title && <h3 className="ui-card__title">{title}</h3>}{description && <p className="ui-card__description">{description}</p>}</div>{action}</header>}
  {children}
</article>;
