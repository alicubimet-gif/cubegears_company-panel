import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { jobService } from '../../services/job.service';

export const JobCreatePage = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    customerName: '', customerPhone: '', vehicleReg: '', vehicleInfo: '', kilometre: '', complaint: '',
    assignedEmployeeName: '', priority: 'Medium', status: 'Checked In', branch: 'Main Garage Branch', notes: ''
  });

  const set = (key, value) => setForm((old) => ({ ...old, [key]: value }));

  const submit = async (event) => {
    event.preventDefault();
    if (!form.customerName.trim() || !form.vehicleReg.trim()) {
      setError('Customer name and vehicle registration are required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const created = await jobService.createJob({
        ...form,
        customerComplaints: form.complaint ? [{ id: `CMP-${Date.now()}`, description: form.complaint, status: 'Open' }] : [],
        services: [], partsUsed: [], outsidePurchases: [], workUpdates: [], photos: [], billing: { advancePaid: 0 }
      });
      navigate(`/jobs/${created.id}`, { replace: true });
    } catch (err) {
      setError(err?.message || 'Unable to create job card.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="job-create-page">
      <div className="job-create-head">
        <div>
          <button type="button" className="simple-back-btn" onClick={() => navigate('/jobs')}><ArrowLeft size={16}/> Back</button>
          <span className="job-create-kicker">NEW JOB CARD</span>
          <h1>Create Job Card</h1>
          <p>Keep it simple. Add the vehicle, complaint and assigned staff. Costs can be added later inside the job card.</p>
        </div>
      </div>

      {error && <div className="job-create-error">{error}</div>}

      <form className="job-create-form" onSubmit={submit}>
        <section className="job-create-card">
          <h2>Customer & Vehicle</h2>
          <div className="job-create-grid">
            <label><span>Customer Name *</span><input value={form.customerName} onChange={(e) => set('customerName', e.target.value)} placeholder="Customer name"/></label>
            <label><span>Phone</span><input value={form.customerPhone} onChange={(e) => set('customerPhone', e.target.value)} placeholder="Phone number"/></label>
            <label><span>Vehicle Registration *</span><input value={form.vehicleReg} onChange={(e) => set('vehicleReg', e.target.value)} placeholder="KL 08 AB 1234"/></label>
            <label><span>Vehicle / Model</span><input value={form.vehicleInfo} onChange={(e) => set('vehicleInfo', e.target.value)} placeholder="Toyota Innova"/></label>
            <label><span>Odometer</span><input inputMode="numeric" value={form.kilometre} onChange={(e) => set('kilometre', e.target.value)} placeholder="52400"/></label>
            <label><span>Branch</span><select value={form.branch} onChange={(e) => set('branch', e.target.value)}><option>Main Garage Branch</option><option>Kochi South Branch</option></select></label>
          </div>
        </section>

        <section className="job-create-card">
          <h2>Work Information</h2>
          <div className="job-create-grid">
            <label className="wide"><span>Customer Complaint / Work Needed</span><textarea rows="4" value={form.complaint} onChange={(e) => set('complaint', e.target.value)} placeholder="Example: Brake noise, AC cooling low..."/></label>
            <label><span>Assigned Staff</span><input value={form.assignedEmployeeName} onChange={(e) => set('assignedEmployeeName', e.target.value)} placeholder="Mechanic / staff name"/></label>
            <label><span>Priority</span><select value={form.priority} onChange={(e) => set('priority', e.target.value)}><option>Low</option><option>Medium</option><option>High</option></select></label>
            <label><span>Status</span><select value={form.status} onChange={(e) => set('status', e.target.value)}><option>Checked In</option><option>Inspection</option><option>In Progress</option><option>Waiting for Parts</option></select></label>
            <label className="wide"><span>Notes</span><textarea rows="3" value={form.notes} onChange={(e) => set('notes', e.target.value)} placeholder="Optional internal notes"/></label>
          </div>
        </section>

        <div className="job-create-footer">
          <button type="button" className="job-secondary-btn" onClick={() => navigate('/jobs')}>Cancel</button>
          <button className="job-primary-btn" disabled={saving}><CheckCircle2 size={17}/>{saving ? 'Creating…' : 'Create Job Card'}</button>
        </div>
      </form>
    </div>
  );
};
