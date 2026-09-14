import React, { useState } from 'react';
import { Table } from '../../components/common/Table';
import { ResponsiveModalSheet } from '../../components/common/ResponsiveModalSheet';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Textarea } from '../../components/common/Textarea';
import { AmountInput } from '../../components/common/AmountInput';
import { FileUpload } from '../../components/common/forms/FileUpload';
import { Plus, Calendar, FileText, CheckCircle2 } from 'lucide-react';

export const ExpenseList = () => {
  const [expenses, setExpenses] = useState([
    { id: 'EXP-101', category: 'Utility / Electricity', amount: 8500, date: '2026-09-01', vendor: 'KSEB Power Board', method: 'Bank Transfer' },
    { id: 'EXP-102', category: 'Equipment Repair', amount: 12000, date: '2026-09-05', vendor: 'Apex Lift Services', method: 'UPI' }
  ]);

  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Form State
  const [expDate, setExpDate] = useState('2026-09-14');
  const [expCategory, setExpCategory] = useState('Utility / Electricity');
  const [expVendor, setExpVendor] = useState('');
  const [expDesc, setExpDesc] = useState('');
  const [expAmount, setExpAmount] = useState('');
  const [expMethod, setExpMethod] = useState('UPI');
  const [expRef, setExpRef] = useState('');
  const [expNotes, setExpNotes] = useState('');

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val || 0);
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!expAmount || Number(expAmount) <= 0) return;

    const newExp = {
      id: `EXP-${Date.now().toString().slice(-4)}`,
      category: expCategory,
      amount: Number(expAmount),
      date: expDate,
      vendor: expVendor || 'General Supplier',
      method: expMethod
    };

    setExpenses([newExp, ...expenses]);
    setToastMsg('Expense recorded successfully.');
    setIsAddExpenseOpen(false);
    setExpAmount('');
    setExpVendor('');
    setExpDesc('');
    setTimeout(() => setToastMsg(''), 3000);
  };

  const columns = [
    { key: 'id', label: 'Expense ID' },
    { key: 'date', label: 'Date' },
    { key: 'category', label: 'Category' },
    { key: 'vendor', label: 'Vendor / Payable To' },
    { key: 'method', label: 'Payment Method' },
    { key: 'amount', label: 'Amount' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {toastMsg && (
        <div style={{ backgroundColor: 'var(--success)', color: '#ffffff', padding: '10px 14px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={16} />
          {toastMsg}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>Company Expenses</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Track workshop operational costs, utilities, vendor bills, and daily payouts.</p>
        </div>

        <button
          onClick={() => setIsAddExpenseOpen(true)}
          style={{ height: '40px', padding: '0 16px', borderRadius: '10px', backgroundColor: 'var(--primary)', color: '#ffffff', border: 'none', fontWeight: '700', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={16} /> Add Expense
        </button>
      </div>

      <Table
        columns={columns}
        data={expenses}
        renderRow={(item) => (
          <>
            <td style={{ padding: '12px 16px', color: 'var(--primary)', fontWeight: '600' }}>{item.id}</td>
            <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>{item.date}</td>
            <td style={{ padding: '12px 16px', color: 'var(--text-primary)', fontWeight: '600' }}>{item.category}</td>
            <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>{item.vendor}</td>
            <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>{item.method}</td>
            <td style={{ padding: '12px 16px', color: 'var(--danger)', fontWeight: '700' }}>{formatINR(item.amount)}</td>
          </>
        )}
      />

      {/* MODAL SHEET: ADD EXPENSE FORM */}
      <ResponsiveModalSheet
        isOpen={isAddExpenseOpen}
        onClose={() => setIsAddExpenseOpen(false)}
        title="Record New Workshop Expense"
        maxWidth="500px"
      >
        <form onSubmit={handleAddExpense} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <Input
              label="Expense Date"
              type="date"
              required
              icon={Calendar}
              value={expDate}
              onChange={(e) => setExpDate(e.target.value)}
            />
            <Select
              label="Category"
              required
              value={expCategory}
              onChange={(e) => setExpCategory(e.target.value)}
            >
              <option value="Utility / Electricity">Utility / Electricity</option>
              <option value="Equipment Repair">Equipment Repair</option>
              <option value="Consumables & Tools">Consumables & Tools</option>
              <option value="Staff Refreshments">Staff Refreshments</option>
              <option value="Rent & Lease">Rent & Lease</option>
              <option value="Marketing & Ads">Marketing & Ads</option>
            </Select>
          </div>

          <Input
            label="Vendor / Payable To"
            placeholder="e.g. KSEB Power Board"
            value={expVendor}
            onChange={(e) => setExpVendor(e.target.value)}
          />

          <AmountInput
            label="Expense Amount"
            required
            placeholder="5000"
            value={expAmount}
            onChange={(e) => setExpAmount(e.target.value)}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <Select
              label="Payment Method"
              value={expMethod}
              onChange={(e) => setExpMethod(e.target.value)}
            >
              <option value="UPI">UPI / QR</option>
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Card">Card Swipe</option>
              <option value="Cheque">Cheque</option>
            </Select>

            <Input
              label="Reference / Bill Number"
              placeholder="REF-90812"
              value={expRef}
              onChange={(e) => setExpRef(e.target.value)}
            />
          </div>

          <Textarea
            label="Expense Description & Notes"
            rows={2}
            placeholder="Details of expense..."
            value={expDesc}
            onChange={(e) => setExpDesc(e.target.value)}
          />

          <FileUpload label="Attach Receipt / Bill Image" />

          <button
            type="submit"
            style={{ height: '44px', borderRadius: '11px', border: 'none', backgroundColor: 'var(--primary)', color: '#ffffff', fontWeight: '700', cursor: 'pointer', marginTop: '4px' }}
          >
            Save Expense Record
          </button>
        </form>
      </ResponsiveModalSheet>

    </div>
  );
};
