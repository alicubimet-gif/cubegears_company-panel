import React, { useState, useEffect } from 'react';
import { Save, Clock, ShieldAlert } from 'lucide-react';
import { attendanceManagerService } from '../../services/attendanceManager.service';

export const RulesSettings = () => {
  const [initialRules, setInitialRules] = useState(null);
  const [rules, setRules] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    setLoading(true);
    try {
      const data = await attendanceManagerService.getRules();
      setInitialRules(data);
      setRules({ ...data });
      setIsDirty(false);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    const updated = { ...rules, [field]: value };
    setRules(updated);
    const dirty = JSON.stringify(updated) !== JSON.stringify(initialRules);
    setIsDirty(dirty);
  };

  const handleSaveRules = async (e) => {
    if (e) e.preventDefault();
    if (!isDirty || saving) return;

    setSaving(true);
    try {
      await attendanceManagerService.saveRules(rules);
      setInitialRules({ ...rules });
      setIsDirty(false);
      setToastMsg('Attendance rules saved successfully.');
      setTimeout(() => setToastMsg(''), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !rules) {
    return <div style={{ padding: '20px', color: 'var(--text-muted)' }}>Loading attendance rules...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%', maxWidth: '100%', minWidth: 0, boxSizing: 'border-box' }}>
      {/* Toast Feedback */}
      {toastMsg && (
        <div style={{
          backgroundColor: 'var(--success)',
          color: '#ffffff',
          padding: '10px 14px',
          borderRadius: '10px',
          fontSize: '13px',
          fontWeight: '600',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
          {toastMsg}
        </div>
      )}

      {/* Header layout */}
      <div className="rules-header" style={{
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', margin: 0, lineHeight: 1.25 }}>
              Shift & Attendance Rules Config
            </h3>
            {isDirty && (
              <span style={{ fontSize: '11px', fontWeight: '700', backgroundColor: 'var(--warning-soft)', color: 'var(--warning)', padding: '2px 6px', borderRadius: '4px' }}>
                Unsaved changes
              </span>
            )}
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0 0 0', lineHeight: 1.5, width: '100%', maxWidth: '100%' }}>
            Grouped category configuration for shifts, grace time, and approval permissions.
          </p>
        </div>

        <button
          type="button"
          disabled={!isDirty || saving}
          onClick={handleSaveRules}
          className="save-rules-btn"
          style={{
            height: '46px',
            padding: '0 16px',
            whiteSpace: 'nowrap',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            borderRadius: '10px',
            backgroundColor: 'var(--primary)',
            color: '#ffffff',
            border: 'none',
            fontSize: '13px',
            fontWeight: '700',
            cursor: isDirty && !saving ? 'pointer' : 'not-allowed',
            opacity: isDirty && !saving ? 1 : 0.6
          }}
        >
          <Save size={16} /> {saving ? 'Saving...' : 'Save Rules'}
        </button>
      </div>

      {/* Grouped Settings Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px', width: '100%' }}>
        {/* Category 1: Shift & Grace */}
        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={16} style={{ color: 'var(--primary)' }} /> Shift Timing & Grace Minutes
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontWeight: '600', marginBottom: '4px' }}>Shift Start Time</label>
              <input
                type="text"
                value={rules.startTime || ''}
                onChange={(e) => handleChange('startTime', e.target.value)}
                style={{ width: '100%', height: '40px', padding: '0 10px', borderRadius: '8px', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontWeight: '600', marginBottom: '4px' }}>Shift End Time</label>
              <input
                type="text"
                value={rules.endTime || ''}
                onChange={(e) => handleChange('endTime', e.target.value)}
                style={{ width: '100%', height: '40px', padding: '0 10px', borderRadius: '8px', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontWeight: '600', marginBottom: '4px' }}>Late Grace Minutes</label>
              <input
                type="number"
                value={rules.lateGraceMinutes || 15}
                onChange={(e) => handleChange('lateGraceMinutes', Number(e.target.value))}
                style={{ width: '100%', height: '40px', padding: '0 10px', borderRadius: '8px', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
              />
            </div>
          </div>
        </div>

        {/* Category 2: Missing Punch Policy */}
        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={16} style={{ color: 'var(--warning)' }} /> Missing Punch Rules
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontWeight: '600', marginBottom: '4px' }}>Missing Punch Policy</label>
              <input
                type="text"
                value={rules.missingPunchPolicy || ''}
                onChange={(e) => handleChange('missingPunchPolicy', e.target.value)}
                style={{ width: '100%', height: '40px', padding: '0 10px', borderRadius: '8px', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
              />
            </div>
          </div>
        </div>

        {/* Category 3: Permissions Guard */}
        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldAlert size={16} style={{ color: 'var(--danger)' }} /> Approval Permissions Guard
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: 'var(--surface-2)', borderRadius: '8px' }}>
              <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Prevent Manager Self-Approval</span>
              <input
                type="checkbox"
                checked={!rules.allowSelfApproval}
                onChange={(e) => handleChange('allowSelfApproval', !e.target.checked)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};
