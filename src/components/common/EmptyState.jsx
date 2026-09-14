import React from 'react';
import { PackageOpen } from 'lucide-react';

export const EmptyState = ({ title = 'No Data Found', description = 'There are no records to display at this moment.' }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 16px', color: '#64748b', textAlign: 'center' }}>
      <PackageOpen size={48} style={{ marginBottom: '12px', opacity: 0.7 }} />
      <h4 style={{ color: '#cbd5e1', fontSize: '16px', margin: '0 0 4px 0' }}>{title}</h4>
      <p style={{ fontSize: '13px', margin: 0 }}>{description}</p>
    </div>
  );
};
