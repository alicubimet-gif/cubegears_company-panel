import React, { useState } from 'react';
import { MoreHorizontal, Plus, Wrench } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { IconButton } from '../../components/ui/IconButton';
import { Input } from '../../components/ui/Input';
import { PhoneInput } from '../../components/ui/PhoneInput';
import { SearchInput } from '../../components/ui/SearchInput';
import { Textarea } from '../../components/ui/Textarea';
import { Select } from '../../components/ui/Select';
import { Checkbox } from '../../components/ui/Checkbox';
import { Radio } from '../../components/ui/Radio';
import { Switch } from '../../components/ui/Switch';
import { DatePicker } from '../../components/ui/DatePicker';
import { FileUpload } from '../../components/ui/FileUpload';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Tooltip } from '../../components/ui/Tooltip';
import { Divider } from '../../components/ui/Divider';
import { Spinner } from '../../components/ui/Spinner';
import { Skeleton } from '../../components/ui/Skeleton';
import { FormSection } from '../../components/form/FormSection';
import { FormActions } from '../../components/form/FormActions';
import { FormError } from '../../components/form/FormError';
import { FormSuccess } from '../../components/form/FormSuccess';
import { Card } from '../../components/cards/Card';
import { StatCard } from '../../components/cards/StatCard';
import { InfoCard } from '../../components/cards/InfoCard';
import { CustomerCard } from '../../components/cards/CustomerCard';
import { VehicleCard } from '../../components/cards/VehicleCard';
import { DataTable } from '../../components/data-display/DataTable';
import { EmptyState } from '../../components/data-display/EmptyState';
import { StatusBadge } from '../../components/data-display/StatusBadge';
import { KeyValueList } from '../../components/data-display/KeyValueList';
import { Alert } from '../../components/feedback/Alert';
import { Toast } from '../../components/feedback/Toast';
import { Modal } from '../../components/feedback/Modal';
import { Drawer } from '../../components/feedback/Drawer';
import { ConfirmDialog } from '../../components/feedback/ConfirmDialog';
import { Breadcrumb } from '../../components/navigation/Breadcrumb';
import { Tabs } from '../../components/navigation/Tabs';
import { DropdownMenu } from '../../components/navigation/DropdownMenu';
import { PageHeader } from '../../components/layout/PageHeader';
import { PageContainer } from '../../components/layout/PageContainer';
import { Section } from '../../components/layout/Section';
import { Grid } from '../../components/layout/Grid';
import { Panel } from '../../components/layout/Panel';
import { componentTableColumns, componentTableRows } from '../../mock-data/components.mock';

const statuses = ['Pending', 'Active', 'In Progress', 'Completed', 'Cancelled', 'Paid', 'Unpaid', 'Overdue'];

export const ComponentsPage = () => {
  const [search, setSearch] = useState('');
  const [checked, setChecked] = useState(true);
  const [radio, setRadio] = useState('individual');
  const [enabled, setEnabled] = useState(true);
  const [tab, setTab] = useState('overview');
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [toast, setToast] = useState(false);
  const [formSaved, setFormSaved] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', service: '', notes: '' });

  const resetForm = () => { setForm({ name: '', phone: '', service: '', notes: '' }); setFormSaved(false); };
  const submitForm = (event) => { event.preventDefault(); if (!form.name.trim()) return; setFormSaved(true); setToast(true); };

  return <PageContainer className="components-page">
    <Breadcrumb items={[{ label: 'System' }, { label: 'Components' }]} />
    <PageHeader title="Component Library" description="Internal reference for CubixGear’s reusable UI and interaction patterns." actions={<Button><Plus size={16} /> Example action</Button>} />

    <Section title="Buttons" description="Shared actions with consistent states, sizes and focus treatment.">
      <Panel><div className="component-demo-row">
        <Button>Primary</Button><Button variant="secondary">Secondary</Button><Button variant="outline">Outline</Button><Button variant="ghost">Ghost</Button><Button variant="danger">Danger</Button><Button variant="success">Success</Button><Button size="sm">Small</Button><Button size="lg">Large</Button><IconButton label="More options"><MoreHorizontal size={17} /></IconButton><Button disabled>Disabled</Button><Button loading>Loading</Button>
      </div></Panel>
    </Section>

    <Section title="Form controls" description="Normal, required, disabled, error and success states.">
      <Panel><Grid columns={3}>
        <Input label="Customer name" placeholder="Enter full name" />
        <Input label="Email" type="email" placeholder="customer@example.com" success="Email looks valid." />
        <Input label="Required field" required error="This field is required." />
        <Input label="Number" type="number" placeholder="0" />
        <Input label="Password" type="password" value="workshop" readOnly />
        <Input label="Disabled" value="Not editable" disabled readOnly />
        <PhoneInput label="Phone number" value="98765 43210" readOnly />
        <DatePicker label="Booking date" />
        <Select label="Service category" defaultValue="general"><option value="general">General Service</option><option value="engine">Engine</option><option value="brake">Brake</option></Select>
      </Grid><Divider /><div className="mt-4"><Grid columns={2}><SearchInput value={search} onChange={(event) => setSearch(event.target.value)} onClear={() => setSearch('')} placeholder="Search customer, vehicle or job..." /><FileUpload label="Vehicle document" helper="PDF, JPG or PNG up to 10 MB." /></Grid></div><div className="mt-4"><Textarea label="Customer complaint" placeholder="Describe the reported issue..." /></div><div className="component-demo-row mt-3.5"><Checkbox label="Send WhatsApp update" checked={checked} onChange={(event) => setChecked(event.target.checked)} /><Radio name="customer-type" label="Individual" value="individual" checked={radio === 'individual'} onChange={(event) => setRadio(event.target.value)} /><Radio name="customer-type" label="Business" value="business" checked={radio === 'business'} onChange={(event) => setRadio(event.target.value)} /><Switch label="Low stock alerts" checked={enabled} onChange={setEnabled} /></div></Panel>
    </Section>

    <Section title="Cards"><Grid columns={3}><Card title="Basic card" description="Flexible container for module content."><p className="text-xs text-secondary">Use cards only when content needs visual grouping.</p></Card><StatCard title="Active Jobs" value="18" change="+3 since yesterday" icon="Wrench" /><InfoCard icon={Wrench} title="Quality check required" description="JOB-00251 · Toyota Innova" /><CustomerCard name="Rahul Kumar" phone="+91 98765 43210" vehicles={2} /><VehicleCard registration="KL 07 CQ 2210" make="Toyota" model="Innova" owner="Rahul Kumar" /><Card title="Avatar & tooltip"><div className="component-demo-row"><Avatar name="Amnas Cubimet" /><Tooltip content="Workshop administrator"><Badge variant="info">Hover for role</Badge></Tooltip></div></Card></Grid></Section>

    <Section title="Status badges"><Panel><div className="component-demo-row">{statuses.map((status) => <StatusBadge key={status} status={status} />)}</div></Panel></Section>

    <Section title="Data table" description="Search, filter, sorting, selection, pagination, actions and empty-state support."><DataTable columns={componentTableColumns.map((column) => column.key === 'status' ? { ...column, render: (value) => <StatusBadge status={value} /> } : column)} data={componentTableRows} filters={['Active', 'Pending', 'In Progress', 'Completed', 'Overdue']} pageSize={4} /></Section>

    <Section title="Navigation"><Panel><div className="component-demo-stack"><Breadcrumb items={[{ label: 'Customers', href: '/customers' }, { label: 'Rahul Kumar' }]} /><Tabs items={[{ label: 'Overview', value: 'overview' }, { label: 'Vehicles', value: 'vehicles' }, { label: 'Invoices', value: 'invoices' }]} value={tab} onChange={setTab} /><DropdownMenu trigger={<Button variant="outline">Open menu</Button>} items={[{ label: 'Edit record' }, { label: 'Export details' }, { label: 'Archive' }]} /><PageHeader title="Customers" description="Manage customer profiles and workshop relationships." actions={<><Button variant="outline">Export</Button><Button>Add Customer</Button></>} /></div></Panel></Section>

    <Section title="Feedback"><div className="component-demo-stack"><Alert variant="success" title="Saved">Customer information was updated.</Alert><Alert variant="warning" title="Low stock">Three workshop parts are below minimum stock.</Alert><Alert variant="info" title="Service update">JOB-00251 moved to quality check.</Alert><Alert variant="error" title="Payment failed">The transaction could not be recorded.</Alert><div className="component-demo-row"><Button onClick={() => setModal(true)}>Open Modal</Button><Button variant="outline" onClick={() => setDrawer(true)}>Open Drawer</Button><Button variant="danger" onClick={() => setConfirm(true)}>Confirm Delete</Button><Button variant="secondary" onClick={() => setToast(true)}>Show Toast</Button></div></div></Section>

    <Section title="Loading and empty states"><Grid columns={3}><Panel><div className="component-demo-row"><Spinner /><span className="text-muted">Loading records</span></div></Panel><Panel><div className="component-demo-stack"><Skeleton width="45%" height={16} /><Skeleton /><Skeleton width="75%" /></div></Panel><Panel className="p-0"><EmptyState title="No results" description="No records match the current filters." /></Panel></Grid></Section>

    <Section title="Information list"><Panel><KeyValueList items={[{ label: 'Workshop', value: 'CubixGear Kochi' }, { label: 'Branch', value: 'Main Garage' }, { label: 'Tax mode', value: 'GST enabled' }, { label: 'Currency', value: 'INR (₹)' }]} /></Panel></Section>

    <Section title="Complete form" description="A reusable section-based form with validation, reset and save actions."><Panel><form onSubmit={submitForm}>
      {formSaved && <FormSuccess>Example customer saved successfully.</FormSuccess>}
      {!form.name && <div className="mt-2.5"><FormError>Customer name is required before saving.</FormError></div>}
      <div className="mt-[18px]"><FormSection title="Customer details" description="Basic details used across jobs and billing."><Input label="Customer name" required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} error={!form.name ? 'Enter the customer name.' : undefined} /><PhoneInput label="Phone number" required value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /><Select label="Preferred service" value={form.service} onChange={(event) => setForm({ ...form, service: event.target.value })}><option value="">Select service</option><option>General Service</option><option>Brake Service</option></Select><div className="form-grid-full"><Textarea label="Notes" value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} /></div></FormSection></div>
      <FormActions onCancel={() => setFormSaved(false)} onReset={resetForm} submitLabel="Save customer" />
    </form></Panel></Section>

    <Modal open={modal} onClose={() => setModal(false)} title="Example modal" footer={<Button onClick={() => setModal(false)}>Done</Button>}><p className="m-0 text-secondary">Use a modal for a focused, short task.</p></Modal>
    <Drawer open={drawer} onClose={() => setDrawer(false)} title="Job quick details"><KeyValueList items={[{ label: 'Job', value: 'JOB-00251' }, { label: 'Vehicle', value: 'KL 07 CQ 2210' }, { label: 'Status', value: 'In Progress' }]} /></Drawer>
    <ConfirmDialog open={confirm} onClose={() => setConfirm(false)} onConfirm={() => { setConfirm(false); setToast(true); }} title="Delete example record?" description="This demonstrates the shared destructive-action confirmation." confirmLabel="Delete record" />
    <Toast open={toast} onClose={() => setToast(false)} message="Action completed successfully." />
  </PageContainer>;
};
