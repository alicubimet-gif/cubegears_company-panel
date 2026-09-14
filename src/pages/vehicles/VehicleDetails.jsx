import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MobileTabRail } from '../../components/common/MobileTabRail';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { formatCurrency } from '../../utils/formatCurrency';
import { Car, User, Wrench, ShoppingBag, DollarSign, Clock, FileText, Package } from 'lucide-react';

export const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Car },
    { id: 'job_history', label: 'Job History', icon: Wrench },
    { id: 'purchase_history', label: 'Purchased Parts History', icon: ShoppingBag },
    { id: 'parts_history', label: 'Stock Parts Used', icon: Package },
    { id: 'invoices', label: 'Invoices & Ledger', icon: FileText }
  ];

  const vehicle = {
    id: id || 'VEH-0001',
    plate: 'KL 10 AB 1234',
    make: 'Toyota',
    model: 'Innova 2.5V',
    year: 2022,
    customerName: 'Rahul Kumar',
    customerId: 'CUS-0001',
    phone: '+91 98765 43210',
    odometer: '1,24,500 km',
    lastServiceDate: '2026-09-12'
  };

  const purchasedParts = [
    { job: 'JOB-00251', partName: 'Engine Mount', supplier: 'ABC Auto Parts', purchaseCost: 3200, billedPrice: 4500, date: '2026-09-12' },
    { job: 'JOB-00251', partName: 'Timing Belt Kit', supplier: 'Global Auto Distributors', purchaseCost: 5800, billedPrice: 7500, date: '2026-09-12' }
  ];

  const stockParts = [
    { job: 'JOB-00251', partName: 'Castrol 5W-30 Motor Oil', source: 'Workshop Stock', internalCost: 1600, billedPrice: 2100, date: '2026-09-12' },
    { job: 'JOB-00251', partName: 'Heavy Duty Oil Filter', source: 'Workshop Stock', internalCost: 350, billedPrice: 550, date: '2026-09-12' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', minWidth: 0 }}>
      {/* Header Banner */}
      <div style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>
              {vehicle.plate} ({vehicle.make} {vehicle.model})
            </h2>
            <Badge variant="info">{vehicle.year}</Badge>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
            Owner: <strong style={{ color: 'var(--primary)', cursor: 'pointer' }} onClick={() => navigate(`/customers/${vehicle.customerId}`)}>{vehicle.customerName}</strong> ({vehicle.phone}) • Odometer: <strong>{vehicle.odometer}</strong>
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={() => navigate('/vehicles')}>
          Back to Vehicles
        </Button>
      </div>

      {/* Tab Rail */}
      <MobileTabRail tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* TAB: OVERVIEW */}
      {activeTab === 'overview' && (
        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>Vehicle Technical Profile</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            <div style={{ padding: '12px', backgroundColor: 'var(--surface-2)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>License Plate</span>
              <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--primary)' }}>{vehicle.plate}</div>
            </div>
            <div style={{ padding: '12px', backgroundColor: 'var(--surface-2)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Make & Model</span>
              <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)' }}>{vehicle.make} {vehicle.model}</div>
            </div>
            <div style={{ padding: '12px', backgroundColor: 'var(--surface-2)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Last Service Date</span>
              <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)' }}>{vehicle.lastServiceDate}</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: PURCHASE HISTORY */}
      {activeTab === 'purchase_history' && (
        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>Outside Purchased Parts Ledger</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {purchasedParts.map((p, idx) => (
              <div key={idx} style={{ padding: '14px', backgroundColor: 'var(--surface-2)', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>{p.partName}</h4>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Job #{p.job} • Supplier: {p.supplier} • Date: {p.date}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Purchased: {formatCurrency(p.purchaseCost)}</span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--primary)' }}>Billed: {formatCurrency(p.billedPrice)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: STOCK PARTS USED */}
      {activeTab === 'parts_history' && (
        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>Workshop Stock Parts Used History</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {stockParts.map((p, idx) => (
              <div key={idx} style={{ padding: '14px', backgroundColor: 'var(--surface-2)', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>{p.partName}</h4>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Source: {p.source} • Job #{p.job}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Internal Cost: {formatCurrency(p.internalCost)}</span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--success)' }}>Billed: {formatCurrency(p.billedPrice)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
