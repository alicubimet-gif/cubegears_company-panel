import React from 'react';
import { Table } from '../../components/common/Table';

export const VehicleList = () => {
  const vehicles = [
    { id: 'VEH-101', make: 'Toyota', model: 'Camry 2022', plate: 'ABC-1234', owner: 'Sarah Jenkins' },
    { id: 'VEH-102', make: 'BMW', model: 'X5 2021', plate: 'XYZ-9876', owner: 'Michael Chang' }
  ];

  const columns = [
    { key: 'id', label: 'Vehicle ID' },
    { key: 'make', label: 'Make' },
    { key: 'model', label: 'Model' },
    { key: 'plate', label: 'License Plate' },
    { key: 'owner', label: 'Owner' }
  ];

  return (
    <div>
      <h1 style={{ color: '#f8fafc', marginBottom: '20px' }}>Vehicle Registry</h1>
      <Table
        columns={columns}
        data={vehicles}
        renderRow={(item) => (
          <>
            <td style={{ padding: '12px 16px', color: '#6366f1', fontWeight: '600' }}>{item.id}</td>
            <td style={{ padding: '12px 16px', color: '#f8fafc' }}>{item.make}</td>
            <td style={{ padding: '12px 16px', color: '#cbd5e1' }}>{item.model}</td>
            <td style={{ padding: '12px 16px', color: '#cbd5e1' }}>{item.plate}</td>
            <td style={{ padding: '12px 16px', color: '#cbd5e1' }}>{item.owner}</td>
          </>
        )}
      />
    </div>
  );
};

export const AddVehicle = () => <div style={{ color: '#fff' }}>Add Vehicle Form</div>;
export const VehicleDetails = () => <div style={{ color: '#fff' }}>Vehicle Details View</div>;
