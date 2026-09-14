import React from 'react';
import { Table } from '../../components/common/Table';
import { Badge } from '../../components/common/Badge';

export const InvoiceList = () => {
  const invoices = [
    { id: 'INV-2026-01', customer: 'Sarah Jenkins', date: 'Sep 10, 2026', total: '$450.00', status: 'paid' },
    { id: 'INV-2026-02', customer: 'Michael Chang', date: 'Sep 11, 2026', total: '$280.00', status: 'pending' }
  ];

  const columns = [
    { key: 'id', label: 'Invoice #' },
    { key: 'customer', label: 'Customer' },
    { key: 'date', label: 'Billing Date' },
    { key: 'total', label: 'Total Amount' },
    { key: 'status', label: 'Payment Status' }
  ];

  return (
    <div>
      <h1 style={{ color: '#f8fafc', marginBottom: '20px' }}>Invoices & Billing</h1>
      <Table
        columns={columns}
        data={invoices}
        renderRow={(item) => (
          <>
            <td style={{ padding: '12px 16px', color: '#6366f1', fontWeight: '600' }}>{item.id}</td>
            <td style={{ padding: '12px 16px', color: '#f8fafc' }}>{item.customer}</td>
            <td style={{ padding: '12px 16px', color: '#cbd5e1' }}>{item.date}</td>
            <td style={{ padding: '12px 16px', color: '#f8fafc', fontWeight: '600' }}>{item.total}</td>
            <td style={{ padding: '12px 16px' }}>
              <Badge variant={item.status === 'paid' ? 'success' : 'warning'}>{item.status.toUpperCase()}</Badge>
            </td>
          </>
        )}
      />
    </div>
  );
};
