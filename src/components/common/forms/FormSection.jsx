import React from 'react';

export const FormSection = ({ title, description, children, className = '', style = {} }) => {
  return (
    <div className={`form-section ${className}`} style={style}>
      {title && (
        <div className="form-section-header">
          <h2 className="form-section-title">{title}</h2>
          {description && <p className="form-section-desc">{description}</p>}
        </div>
      )}
      <div className="form-grid-2">
        {children}
      </div>
    </div>
  );
};
