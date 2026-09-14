import React, { useState, useEffect } from 'react';
import { ResponsiveModalSheet } from '../common/ResponsiveModalSheet';
import { Save } from 'lucide-react';

export const EditSalaryStructureSheet = ({ isOpen, onClose, structure, onSave }) => {
  const [formData, setFormData] = useState({
    staffId: '',
    staffName: '',
    salaryBasis: 'Monthly',
    basicSalary: '',
    allowances: '',
    fixedIncentives: '',
    effectiveDate: new Date().toISOString().split('T')[0],
    endDate: '',
    notes: '',
    status: 'Active'
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (structure) {
      setFormData({
        id: structure.id,
        staffId: structure.staffId || '',
        staffName: structure.staffName || '',
        salaryBasis: structure.salaryBasis || 'Monthly',
        basicSalary: structure.basicSalary || '',
        allowances: structure.allowances || '',
        fixedIncentives: structure.fixedIncentives || '',
        effectiveDate: structure.effectiveDate || new Date().toISOString().split('T')[0],
        endDate: structure.endDate || '',
        notes: structure.notes || '',
        status: structure.status || 'Active'
      });
    }
  }, [structure, isOpen]);

  if (!isOpen || !structure) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving) return;

    setSaving(true);
    try {
      await onSave({
        ...formData,
        basicSalary: Number(formData.basicSalary),
        allowances: Number(formData.allowances),
        fixedIncentives: Number(formData.fixedIncentives)
      });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ResponsiveModalSheet
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit Salary Structure: ${formData.staffName}`}
      maxWidth="600px"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '4px' }}>
            Staff Member
          </label>
          <input
            type="text"
            disabled
            value={formData.staffName}
            style={{ width: '100%', height: '46px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-muted)', fontSize: '14px', boxSizing: 'border-box' }}
          />
        </div>

        <div className="form-row-2col" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '4px' }}>
              Salary Basis *
            </label>
            <select
              required
              value={formData.salaryBasis}
              onChange={(e) => setFormData({ ...formData, salaryBasis: e.target.value })}
              style={{ width: '100%', height: '46px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '14px', boxSizing: 'border-box' }}
            >
              <option value="Monthly">Monthly</option>
              <option value="Daily">Daily</option>
              <option value="Hourly">Hourly</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '4px' }}>
              Basic Salary (₹) *
            </label>
            <input
              type="number"
              required
              value={formData.basicSalary}
              onChange={(e) => setFormData({ ...formData, basicSalary: e.target.value })}
              style={{ width: '100%', height: '46px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        <div className="form-row-2col" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '4px' }}>
              Allowances (₹)
            </label>
            <input
              type="number"
              value={formData.allowances}
              onChange={(e) => setFormData({ ...formData, allowances: e.target.value })}
              style={{ width: '100%', height: '46px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '4px' }}>
              Fixed Incentives (₹)
            </label>
            <input
              type="number"
              value={formData.fixedIncentives}
              onChange={(e) => setFormData({ ...formData, fixedIncentives: e.target.value })}
              style={{ width: '100%', height: '46px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        <div className="form-row-2col" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '4px' }}>
              Effective Date *
            </label>
            <input
              type="date"
              required
              value={formData.effectiveDate}
              onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
              style={{ width: '100%', height: '46px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '4px' }}>
              End Date (Optional)
            </label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              style={{ width: '100%', height: '46px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '4px' }}>
            Structure Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            style={{ width: '100%', height: '46px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '14px', boxSizing: 'border-box' }}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '4px' }}>
            Notes / Adjustments
          </label>
          <textarea
            rows={3}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Reason for salary revision..."
            style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '14px', boxSizing: 'border-box', resize: 'vertical' }}
          />
        </div>

        {/* Sticky Action Footer */}
        <div style={{
          display: 'flex',
          gap: '12px',
          paddingTop: '12px',
          borderTop: '1px solid var(--border)',
          paddingBottom: 'calc(12px + env(safe-area-inset-bottom))',
          position: 'sticky',
          bottom: 0,
          backgroundColor: 'var(--surface)'
        }}>
          <button
            type="button"
            onClick={onClose}
            style={{ flex: 1, height: '46px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            style={{ flex: 1, height: '46px', borderRadius: '10px', border: 'none', backgroundColor: 'var(--primary)', color: '#ffffff', fontSize: '14px', fontWeight: '700', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </ResponsiveModalSheet>
  );
};
