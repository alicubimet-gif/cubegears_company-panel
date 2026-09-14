import { useEffect, useMemo, useState } from 'react';
import { HardDrive, Upload, Trash2, ReceiptText, Users, CalendarDays, ShieldCheck } from 'lucide-react';
import { saasAccountService } from '../../services/saasAccount.service';

const money = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 });
const date = new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

function BillingView({ billing, onSeatsChange }) {
  const estimate = useMemo(() => saasAccountService.calculateMonthlyEstimate(billing), [billing]);
  return (
    <div className="saas-grid">
      <section className="saas-card saas-plan-card">
        <div className="saas-card-head"><div><span className="saas-kicker">CURRENT PLAN</span><h2>{billing.plan.name}</h2></div><span className="saas-status">{billing.plan.status}</span></div>
        <div className="saas-price">{money.format(billing.plan.basePrice)}<span>/month</span></div>
        <div className="saas-details-grid">
          <div><span>Included storage</span><strong>{billing.plan.includedStorageGb} GB</strong></div>
          <div><span>Included users</span><strong>{billing.plan.includedSeats}</strong></div>
          <div><span>Next bill</span><strong>{date.format(new Date(billing.plan.nextBillingDate))}</strong></div>
          <div><span>Billing cycle</span><strong>Monthly</strong></div>
        </div>
      </section>

      <section className="saas-card">
        <div className="saas-card-head"><div><span className="saas-kicker">MONTHLY ESTIMATE</span><h2>{money.format(estimate.total)}</h2></div><ReceiptText size={22} /></div>
        <div className="saas-breakdown">
          <div><span>Plan</span><strong>{money.format(estimate.base)}</strong></div>
          <div><span>Extra storage ({estimate.extraStorageGb.toFixed(1)} GB)</span><strong>{money.format(estimate.storageCharge)}</strong></div>
          <div><span>Extra users ({estimate.extraSeats})</span><strong>{money.format(estimate.seatCharge)}</strong></div>
          <div><span>GST estimate</span><strong>{money.format(estimate.tax)}</strong></div>
          <div className="total"><span>Estimated total</span><strong>{money.format(estimate.total)}</strong></div>
        </div>
      </section>

      <section className="saas-card">
        <div className="saas-card-head"><div><span className="saas-kicker">USAGE</span><h2>Account limits</h2></div><Users size={22} /></div>
        <label className="saas-field"><span>Active users</span><input type="number" min="1" value={billing.usage.seatsUsed} onChange={(e) => onSeatsChange(Number(e.target.value))} /></label>
        <div className="saas-meter"><div style={{ width: `${Math.min(100, (billing.usage.seatsUsed / billing.plan.includedSeats) * 100)}%` }} /></div>
        <p className="saas-muted">Extra users are added to the next monthly estimate. Plan rates should be controlled by the SaaS backend, not editable by client users.</p>
      </section>

      <section className="saas-card saas-wide">
        <div className="saas-card-head"><div><span className="saas-kicker">BILL HISTORY</span><h2>Subscription invoices</h2></div><CalendarDays size={22} /></div>
        <div className="saas-table-wrap"><table className="saas-table"><thead><tr><th>Invoice</th><th>Period</th><th>Amount</th><th>Status</th><th>Paid</th></tr></thead><tbody>{billing.invoices.map((item) => <tr key={item.id}><td>{item.id}</td><td>{item.period}</td><td>{money.format(item.amount)}</td><td><span className="saas-status">{item.status}</span></td><td>{date.format(new Date(item.paidAt))}</td></tr>)}</tbody></table></div>
      </section>
    </div>
  );
}

function StorageView({ storage, setStorage }) {
  const [selected, setSelected] = useState([]);
  const [category, setCategory] = useState('Job Card');
  const usage = Math.min(100, (Number(storage.usedGb || 0) / Number(storage.quotaGb || 1)) * 100);

  const upload = async (event) => {
    const files = Array.from(event.target.files || []);
    const valid = files.filter((file) => storage.settings.allowedTypes.includes(file.type) && file.size <= storage.settings.maxFileMb * 1024 * 1024);
    if (!valid.length) return;
    const next = await saasAccountService.uploadMediaFiles(valid, category);
    setStorage(next);
    event.target.value = '';
  };

  const remove = async (ids) => {
    if (!ids.length || !window.confirm(`Delete ${ids.length} photo(s)? This cannot be undone.`)) return;
    const next = await saasAccountService.deleteMediaFiles(ids);
    setStorage(next);
    setSelected((old) => old.filter((id) => !ids.includes(id)));
  };

  const setting = async (key, value) => {
    const next = await saasAccountService.updateStorageSettings({ [key]: value });
    setStorage(next);
  };

  return (
    <div className="saas-grid">
      <section className="saas-card saas-wide">
        <div className="saas-card-head"><div><span className="saas-kicker">MEDIA STORAGE</span><h2>{storage.usedGb} GB of {storage.quotaGb} GB used</h2></div><HardDrive size={22} /></div>
        <div className="saas-meter large"><div style={{ width: `${usage}%` }} /></div>
        <div className="saas-storage-actions">
          <select value={category} onChange={(e) => setCategory(e.target.value)}><option>Job Card</option><option>Inspection</option><option>Invoice</option><option>Delivery</option><option>General</option></select>
          <label className="saas-button"><Upload size={18} /> Upload photos<input hidden multiple type="file" accept="image/jpeg,image/png,image/webp" onChange={upload} /></label>
          <button className="saas-button danger" disabled={!selected.length} onClick={() => remove(selected)}><Trash2 size={18} /> Delete selected</button>
        </div>
        <p className="saas-muted">Accepted: JPG, PNG, WebP. Maximum {storage.settings.maxFileMb} MB per file. Upload/delete permissions can be controlled below.</p>
      </section>

      <section className="saas-card">
        <div className="saas-card-head"><div><span className="saas-kicker">STORAGE SETTINGS</span><h2>Upload policy</h2></div><ShieldCheck size={22} /></div>
        {[
          ['autoCompress', 'Compress uploads'],
          ['keepOriginals', 'Keep original files'],
          ['allowStaffUpload', 'Staff can upload'],
          ['allowStaffDelete', 'Staff can delete']
        ].map(([key, label]) => <label className="saas-toggle" key={key}><span>{label}</span><input type="checkbox" checked={Boolean(storage.settings[key])} onChange={(e) => setting(key, e.target.checked)} /></label>)}
        <label className="saas-field"><span>Auto-delete after days (0 = never)</span><input type="number" min="0" value={storage.settings.retentionDays} onChange={(e) => setting('retentionDays', Number(e.target.value))} /></label>
      </section>

      <section className="saas-card saas-wide">
        <div className="saas-card-head"><div><span className="saas-kicker">FILES</span><h2>Uploaded photos</h2></div><span>{storage.files.length} files</span></div>
        <div className="saas-media-list">{storage.files.map((file) => <article className="saas-media-row" key={file.id}><input type="checkbox" checked={selected.includes(file.id)} onChange={(e) => setSelected((old) => e.target.checked ? [...old, file.id] : old.filter((id) => id !== file.id))} /><div className="saas-file-icon">IMG</div><div className="saas-file-main"><strong>{file.name}</strong><span>{file.category} · {file.sizeMb} MB · {file.uploadedBy}</span></div><span className="saas-file-date">{date.format(new Date(file.uploadedAt))}</span><button className="saas-icon-button" aria-label={`Delete ${file.name}`} onClick={() => remove([file.id])}><Trash2 size={17} /></button></article>)}</div>
      </section>
    </div>
  );
}

export function SaaSAccount({ section = 'billing' }) {
  const [billing, setBilling] = useState(null);
  const [storage, setStorage] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([saasAccountService.getSubscriptionBilling(), saasAccountService.getStorageAccount()])
      .then(([billingData, storageData]) => { setBilling(billingData); setStorage(storageData); })
      .catch(() => setError('Could not load SaaS account data.'));
  }, []);

  const seats = async (value) => setBilling(await saasAccountService.updateSeatCount(value));
  if (error) return <div className="saas-page"><div className="saas-error">{error}</div></div>;
  if (!billing || !storage) return <div className="saas-page"><div className="saas-loading">Loading account…</div></div>;

  billing.usage.storageUsedGb = storage.usedGb;

  return <div className="saas-page"><header className="saas-page-head"><div><span className="saas-kicker">CUBIXGEAR SaaS</span><h1>{section === 'storage' ? 'Media Storage' : 'Billing & Plan'}</h1><p>{section === 'storage' ? 'Manage workshop photo uploads, storage limits and deletion permissions.' : 'Track the monthly software bill, usage, plan limits and bill history.'}</p></div></header>{section === 'storage' ? <StorageView storage={storage} setStorage={setStorage} /> : <BillingView billing={billing} onSeatsChange={seats} />}</div>;
}
