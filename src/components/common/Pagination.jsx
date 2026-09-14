import React from 'react';

export const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', color: '#94a3b8', fontSize: '13px' }}>
      <span>Page {currentPage} of {totalPages}</span>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          style={{
            backgroundColor: currentPage <= 1 ? '#1e293b' : '#334155',
            color: currentPage <= 1 ? '#64748b' : '#f8fafc',
            border: 'none',
            borderRadius: '6px',
            padding: '6px 12px',
            cursor: currentPage <= 1 ? 'not-allowed' : 'pointer'
          }}
        >
          Previous
        </button>
        <button
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          style={{
            backgroundColor: currentPage >= totalPages ? '#1e293b' : '#334155',
            color: currentPage >= totalPages ? '#64748b' : '#f8fafc',
            border: 'none',
            borderRadius: '6px',
            padding: '6px 12px',
            cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer'
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};
