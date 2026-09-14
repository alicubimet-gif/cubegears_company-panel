import React, { useEffect, useMemo, useState } from 'react';
import { Edit3, Plus, Search, Trash2, X } from 'lucide-react';

const emptyFromFields = (fields) => Object.fromEntries(fields.map((field) => [field.name, field.defaultValue ?? '']));

const formatCell = (value, type) => {
  if (type === 'currency') return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(value || 0));
  if (type === 'date' && value) return new Date(value).toLocaleDateString('en-IN');
  if (type === 'datetime-local' && value) return new Date(value).toLocaleString('en-IN');
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return String(value ?? '—');
};

export function CrudResourcePage({ title, subtitle, service, fields, columns, addLabel = 'Add New', searchPlaceholder = 'Search records…', statCards = [], actions = null }) {
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(() => emptyFromFields(fields));

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await service.list();
      setRows(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.message || 'Unable to load data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => Object.values(row).some((value) => String(value ?? '').toLowerCase().includes(q)));
  }, [rows, query]);

  const startAdd = () => {
    setEditing(null);
    setForm(emptyFromFields(fields));
    setOpen(true);
  };

  const startEdit = (row) => {
    setEditing(row);
    setForm(Object.fromEntries(fields.map((field) => [field.name, row[field.name] ?? field.defaultValue ?? ''])));
    setOpen(true);
  };

  const save = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = { ...form };
      fields.forEach((field) => {
        if (field.type === 'number' || field.type === 'currency') payload[field.name] = Number(payload[field.name] || 0);
        if (field.type === 'checkbox') payload[field.name] = Boolean(payload[field.name]);
      });
      if (editing) await service.update(editing.id, payload);
      else await service.create(payload);
      setOpen(false);
      await load();
    } catch (err) {
      setError(err?.message || 'Unable to save record.');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (row) => {
    if (!window.confirm(`Delete ${row.name || row.title || row.id || 'this record'}?`)) return;
    try {
      await service.remove(row.id);
      await load();
    } catch (err) {
      setError(err?.message || 'Unable to delete record.');
    }
  };

  const resolvedStats = statCards.map((stat) => ({ ...stat, value: typeof stat.value === 'function' ? stat.value(rows) : stat.value }));

  return (
    <>
      <div className="crud-page">
        <div className="crud-heading">
          <div>
            <p className="crud-eyebrow">CUBIXGEAR</p>
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <div className="crud-heading-actions">
            {actions}
            <button type="button" className="crud-btn crud-btn-primary" onClick={startAdd}><Plus size={17} />{addLabel}</button>
          </div>
        </div>

        {resolvedStats.length > 0 && <div className="crud-stats">{resolvedStats.map((stat) => <div className="crud-stat" key={stat.label}><span>{stat.label}</span><strong>{stat.value}</strong></div>)}</div>}

        <div className="crud-toolbar">
          <label className="crud-search"><Search size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={searchPlaceholder} /></label>
          <span className="crud-count">{filtered.length} records</span>
        </div>

        {error && <div className="crud-error">{error}</div>}

        <div className="crud-panel">
          {loading ? <div className="crud-empty">Loading…</div> : filtered.length === 0 ? <div className="crud-empty">No records found.</div> : <>
            <div className="crud-table-wrap">
              <table className="crud-table">
                <thead><tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}<th>Actions</th></tr></thead>
                <tbody>{filtered.map((row) => <tr key={row.id}>
                  {columns.map((column) => <td key={column.key}>{formatCell(row[column.key], column.type)}</td>)}
                  <td><div className="crud-row-actions"><button type="button" onClick={() => startEdit(row)} aria-label="Edit"><Edit3 size={16} /></button><button type="button" className="danger" onClick={() => remove(row)} aria-label="Delete"><Trash2 size={16} /></button></div></td>
                </tr>)}</tbody>
              </table>
            </div>

            <div className="crud-mobile-list">
              {filtered.map((row) => <article className="crud-mobile-card" key={row.id}>
                <div className="crud-mobile-card-head"><strong>{formatCell(row[columns[0]?.key], columns[0]?.type)}</strong><div className="crud-row-actions"><button type="button" onClick={() => startEdit(row)} aria-label="Edit"><Edit3 size={16} /></button><button type="button" className="danger" onClick={() => remove(row)} aria-label="Delete"><Trash2 size={16} /></button></div></div>
                <div className="crud-mobile-fields">{columns.slice(1).map((column) => <div key={column.key}><span>{column.label}</span><b>{formatCell(row[column.key], column.type)}</b></div>)}</div>
              </article>)}
            </div>
          </>}
        </div>
      </div>

      {open && <div className="crud-modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}>
        <form className="crud-modal" onSubmit={save}>
          <div className="crud-modal-head"><div><span>{editing ? 'Edit record' : 'Create record'}</span><h2>{title}</h2></div><button type="button" className="crud-icon-btn" onClick={() => setOpen(false)} aria-label="Close"><X size={19} /></button></div>
          <div className="crud-form-grid">
            {fields.map((field) => <label className={field.full ? 'crud-field full' : 'crud-field'} key={field.name}>
              <span>{field.label}{field.required ? ' *' : ''}</span>
              {field.type === 'select' ? <select required={field.required} value={form[field.name]} onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}><option value="">Select</option>{(field.options || []).map((option) => <option value={typeof option === 'string' ? option : option.value} key={typeof option === 'string' ? option : option.value}>{typeof option === 'string' ? option : option.label}</option>)}</select> : field.type === 'textarea' ? <textarea required={field.required} rows="4" value={form[field.name]} onChange={(e) => setForm({ ...form, [field.name]: e.target.value })} /> : field.type === 'checkbox' ? <input type="checkbox" checked={Boolean(form[field.name])} onChange={(e) => setForm({ ...form, [field.name]: e.target.checked })} /> : <input required={field.required} type={field.type === 'currency' ? 'number' : (field.type || 'text')} min={field.min} step={field.step} value={form[field.name]} onChange={(e) => setForm({ ...form, [field.name]: e.target.value })} />}
            </label>)}
          </div>
          <div className="crud-modal-footer"><button type="button" className="crud-btn" onClick={() => setOpen(false)}>Cancel</button><button className="crud-btn crud-btn-primary" disabled={saving}>{saving ? 'Saving…' : editing ? 'Save changes' : 'Create'}</button></div>
        </form>
      </div>}
    </>
  );
}
