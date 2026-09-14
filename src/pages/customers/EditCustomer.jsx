import React from 'react';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useNavigate, useParams } from 'react-router-dom';

export const EditCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', border: '1px solid #334155' }}>
      <h2 style={{ color: '#f8fafc', marginBottom: '20px' }}>Edit Customer {id}</h2>
      <form onSubmit={(e) => { e.preventDefault(); navigate('/customers'); }}>
        <Input label="Full Name" defaultValue="Sarah Jenkins" required />
        <Input label="Email Address" type="email" defaultValue="sarah.j@example.com" required />
        <Input label="Phone Number" defaultValue="+1 555-0192" required />
        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
          <Button type="submit" variant="primary">Update Customer</Button>
          <Button type="button" variant="outline" onClick={() => navigate('/customers')}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};
