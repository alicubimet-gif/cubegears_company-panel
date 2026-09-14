import React, { useState } from 'react';
import { FormSection } from '../../components/common/forms/FormSection';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Textarea } from '../../components/common/Textarea';
import { PhoneInput } from '../../components/common/PhoneInput';
import { Switch } from '../../components/common/Switch';
import { Checkbox } from '../../components/common/Checkbox';
import { FileUpload } from '../../components/common/forms/FileUpload';
import { Building, Clock, CreditCard, Shield, Bell, CheckCircle2, Globe, Users, Boxes, Receipt } from 'lucide-react';

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('company');
  const [toastMsg, setToastMsg] = useState('');

  // Form states
  const [companyName, setCompanyName] = useState('CubeGears Garage Enterprise');
  const [phone, setPhone] = useState('9876543210');
  const [email, setEmail] = useState('admin@cubegears.com');
  const [gstNo, setGstNo] = useState('32AAAAA0000A1Z5');
  const [address, setAddress] = useState('NH Bypass, Vyttila, Kochi, Kerala - 682019');
  
  const [currency, setCurrency] = useState('INR (₹)');
  const [timezone, setTimezone] = useState('Asia/Kolkata (IST)');
  const [taxRate, setTaxRate] = useState('18');
  
  const [allowOnlineBooking, setAllowOnlineBooking] = useState(true);
  const [enableLowStockAlert, setEnableLowStockAlert] = useState(true);
  const [sendPaymentReminder, setSendPaymentReminder] = useState(true);
  const [autoInvoiceEmail, setAutoInvoiceEmail] = useState(true);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Settings saved successfully.');
  };

  const settingsMenu = [
    { id: 'company', label: 'Company Profile', icon: Building },
    { id: 'branches', label: 'Branches', icon: Globe },
    { id: 'tax', label: 'Billing & Tax', icon: Receipt },
    { id: 'inventory', label: 'Inventory Settings', icon: Boxes },
    { id: 'attendance', label: 'Attendance Rules', icon: Clock },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '1100px', margin: '0 auto' }}>
      
      {toastMsg && (
        <div style={{ backgroundColor: 'var(--success)', color: '#ffffff', padding: '10px 14px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={16} />
          {toastMsg}
        </div>
      )}

      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>System Settings</h1>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Manage workshop company profile, billing defaults, tax rates, and system automation.</p>
      </div>

      {/* Left Navigation + Right Form Content Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '24px' }} className="settings-layout-grid">
        <style>{`
          @media (max-width: 767px) {
            .settings-layout-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>

        {/* Left Side Settings Navigation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '8px', height: 'fit-content' }}>
          {settingsMenu.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--primary-soft)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 160ms ease'
                }}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right Content Form Section */}
        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '24px' }}>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {activeTab === 'company' && (
              <FormSection
                title="Company Workspace Profile"
                description="Legal entity details, contact information, and branding."
              >
                <div className="form-grid-full">
                  <Input
                    label="Company / Workshop Name"
                    required
                    icon={Building}
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>

                <PhoneInput
                  label="Contact Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                <Input
                  label="Official Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  label="GSTIN / Tax Number"
                  value={gstNo}
                  onChange={(e) => setGstNo(e.target.value)}
                />

                <Select
                  label="Base Currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="INR (₹)">Indian Rupee (₹)</option>
                  <option value="USD ($)">US Dollar ($)</option>
                  <option value="AED (AED)">UAE Dirham (AED)</option>
                </Select>

                <div className="form-grid-full">
                  <Textarea
                    label="Registered Address"
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="form-grid-full">
                  <FileUpload label="Company Logo / Invoice Header" />
                </div>
              </FormSection>
            )}

            {activeTab === 'tax' && (
              <FormSection
                title="Tax & Billing Configuration"
                description="Default GST rates, invoice numbering prefixes, and invoice disclaimers."
              >
                <Input
                  label="Default GST Rate (%)"
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                />

                <Input
                  label="Invoice Number Prefix"
                  defaultValue="INV-2026-"
                />

                <div className="form-grid-full">
                  <Textarea
                    label="Terms & Conditions (Printed on Invoices)"
                    rows={3}
                    defaultValue="1. Goods once sold cannot be returned. 2. Vehicle warranty applicable as per OEM terms."
                  />
                </div>
              </FormSection>
            )}

            {activeTab === 'inventory' && (
              <FormSection
                title="Inventory & Stock Rules"
                description="Stock threshold alerts, auto-reservation, and purchase order rules."
              >
                <div className="form-grid-full" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <Switch
                    label="Enable Low Stock Automated Alerts"
                    active={enableLowStockAlert}
                    onChange={setEnableLowStockAlert}
                  />
                  <Switch
                    label="Allow Online Vehicle Booking & Reservation"
                    active={allowOnlineBooking}
                    onChange={setAllowOnlineBooking}
                  />
                </div>
              </FormSection>
            )}

            {activeTab === 'notifications' && (
              <FormSection
                title="Customer & Staff Automation"
                description="Configure automated WhatsApp and email notifications."
              >
                <div className="form-grid-full" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <Switch
                    label="Send Payment Reminders via WhatsApp"
                    active={sendPaymentReminder}
                    onChange={setSendPaymentReminder}
                  />
                  <Switch
                    label="Automatically Email PDF Invoice on Generation"
                    active={autoInvoiceEmail}
                    onChange={setAutoInvoiceEmail}
                  />
                </div>
              </FormSection>
            )}

            {activeTab === 'branches' && (
              <FormSection
                title="Workshop Branches"
                description="Active garage branches."
              >
                <div className="form-grid-full" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                    <strong>Main Garage Branch</strong> — Vyttila, Kochi
                  </div>
                  <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                    <strong>Kochi South Branch</strong> — Ravipuram, Kochi
                  </div>
                </div>
              </FormSection>
            )}

            {activeTab === 'attendance' && (
              <FormSection
                title="Attendance & Shift Configuration"
                description="Work hours, lunch breaks, and overtime rules."
              >
                <Input label="Regular Shift Start Time" defaultValue="09:00 AM" />
                <Input label="Regular Shift End Time" defaultValue="06:30 PM" />
                <Input label="Grace Period (Minutes)" defaultValue="15" />
                <Input label="Overtime Hourly Multiplier" defaultValue="1.5x" />
              </FormSection>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
              <button
                type="submit"
                style={{ height: '42px', padding: '0 24px', borderRadius: '10px', backgroundColor: 'var(--primary)', color: '#ffffff', border: 'none', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}
              >
                Save Settings
              </button>
            </div>

          </form>
        </div>

      </div>

    </div>
  );
};
