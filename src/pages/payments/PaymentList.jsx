import React from 'react';
import { Table } from '../../components/common/Table';

export const PaymentList = () => {
  const payments = [
    { id: 'PAY-801', method: 'Credit Card (Stripe)', amount: '$450.00', date: 'Sep 10, 2026', ref: 'ch_3M89...' },
    { id: 'PAY-802', method: 'Cash', amount: '$85.00', date: 'Sep 11, 2026', ref: 'REC-9002' }
  ];

  const columns = [
    { key: 'id', label: 'Payment ID' },
    { key: 'method', label: 'Payment Method' },
    { key: 'amount', label: 'Amount' },
    { key: 'date', label: 'Date' },
    { key: 'ref', label: 'Reference #' }
  ];

  return (
    <div>
      <h1 style={{ color: '#f8fafc', marginBottom: '20px' }}>Payment Transactions</h1>
      <Table
        columns={columns}
        data={payments}
        renderRow={(item) => (
          <>
            <td style={{ padding: '12px 16px', color: '#6366f1', fontWeight: '600' }}>{item.id}</td>
            <td style={{ padding: '12px 16px', color: '#f8fafc' }}>{item.method}</td>
            <td style={{ padding: '12px 16px', color: '#34d399', fontWeight: '600' }}>{item.amount}</td>
            <td style={{ padding: '12px 16px', color: '#cbd5e1' }}>{item.date}</td>
            <td style={{ padding: '12px 16px', color: '#cbd5e1' }}>{item.ref}</td>
          </>
        )}
      />
    </div>
  );
};
