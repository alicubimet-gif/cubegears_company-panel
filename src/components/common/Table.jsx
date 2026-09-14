import React from 'react';

export const Table = ({ columns = [], data = [], renderRow }) => {
  return (
    <div style={{ width: '100%', overflowX: 'auto', borderRadius: '8px', border: '1px solid var(--border)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', backgroundColor: 'var(--surface)' }}>
        <thead>
          <tr style={{ backgroundColor: 'var(--surface-secondary)', borderBottom: '1px solid var(--border)' }}>
            {columns.map((col) => (
              <th key={col.key || col.label} style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '13px', fontWeight: '600' }}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
                No records found.
              </td>
            </tr>
          ) : (
            data.map((item, idx) => (
              <tr key={item.id || idx} style={{ borderBottom: '1px solid var(--border)' }}>
                {renderRow(item, idx)}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
