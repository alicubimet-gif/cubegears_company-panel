import React from 'react';
import { Table } from '../../components/common/Table';

export const InventoryList = () => {
  const items = [
    { id: 'SKU-001', name: 'Brake Pads (Ceramic)', category: 'Parts', stock: 42, unitPrice: '$45.00' },
    { id: 'SKU-002', name: 'Synthetic Oil 5W-30 (1L)', category: 'Fluids', stock: 120, unitPrice: '$12.50' }
  ];

  const columns = [
    { key: 'id', label: 'SKU' },
    { key: 'name', label: 'Item Name' },
    { key: 'category', label: 'Category' },
    { key: 'stock', label: 'In Stock' },
    { key: 'unitPrice', label: 'Unit Price' }
  ];

  return (
    <div>
      <h1 style={{ color: '#f8fafc', marginBottom: '20px' }}>Inventory Catalog</h1>
      <Table
        columns={columns}
        data={items}
        renderRow={(item) => (
          <>
            <td style={{ padding: '12px 16px', color: '#6366f1', fontWeight: '600' }}>{item.id}</td>
            <td style={{ padding: '12px 16px', color: '#f8fafc' }}>{item.name}</td>
            <td style={{ padding: '12px 16px', color: '#cbd5e1' }}>{item.category}</td>
            <td style={{ padding: '12px 16px', color: '#cbd5e1' }}>{item.stock}</td>
            <td style={{ padding: '12px 16px', color: '#f8fafc', fontWeight: '600' }}>{item.unitPrice}</td>
          </>
        )}
      />
    </div>
  );
};

export const InventoryDetails = () => <div style={{ color: '#fff' }}>Inventory Details</div>;
