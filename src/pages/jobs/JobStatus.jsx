import React from 'react';
import { Badge } from '../../components/common/Badge';

export const JobStatus = () => {
  return (
    <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px' }}>
      <h2 style={{ color: '#f8fafc' }}>Job Status Timeline</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
        <p style={{ color: '#34d399' }}>✓ Inspection Received</p>
        <p style={{ color: '#34d399' }}>✓ Parts Allocated</p>
        <p style={{ color: '#fbbf24' }}>⚙ In Service Repair</p>
      </div>
    </div>
  );
};
