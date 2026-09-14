import React from 'react';
import { Bell } from 'lucide-react';

export const Notifications = () => {
  const alerts = [
    { id: 1, title: 'Low Stock Alert', desc: 'Brake Pads stock dropped below threshold (5 items left).', time: '10 mins ago' },
    { id: 2, title: 'Job Completed', desc: 'Job Card #JOB-9022 completed by Dan Miller.', time: '1 hour ago' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h1 style={{ color: '#f8fafc', fontSize: '24px', fontWeight: '700', margin: 0 }}>System Notifications</h1>
      {alerts.map((a) => (
        <div key={a.id} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <Bell size={20} color="#6366f1" style={{ marginTop: '2px' }} />
          <div>
            <h4 style={{ color: '#f8fafc', margin: '0 0 4px 0' }}>{a.title}</h4>
            <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>{a.desc}</p>
            <span style={{ color: '#64748b', fontSize: '12px', marginTop: '4px', display: 'block' }}>{a.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
