import apiClient from '../api/apiClient';
import { USE_MOCK_API } from '../api/apiConfig';

const DOCS_KEY = 'cubixgear:billing-documents';
const INVENTORY_KEY = 'cubixgear:inventory';
const STOCK_LEDGER_KEY = 'cubixgear:stock-ledger';

const seedDocuments = [
  {
    id: 'INV-2026-1001',
    number: 'INV-2026-1001',
    kind: 'invoice',
    invoiceType: 'regular',
    status: 'Finalized',
    date: '2026-09-12',
    customer: { name: 'Rahul P', phone: '+91 98765 43210', address: '', gstin: '' },
    vehicle: { registration: 'KL-08-BQ-4581', makeModel: 'Toyota Innova Crysta', odometer: '52,400 km', vin: '' },
    jobCardNo: 'JOB-2048',
    staff: 'Rahul',
    notes: 'Periodic maintenance completed.',
    items: [
      { id: 'L1', type: 'Labour', description: 'Periodic service labour', code: '', qty: 1, purchasePrice: 0, rate: 1200, discount: 0, inventoryId: '' },
      { id: 'P1', type: 'Stock Part', description: 'Oil Filter', code: 'FLT-OIL-02', qty: 1, purchasePrice: 280, rate: 450, discount: 0, inventoryId: 'ITM-1002' }
    ],
    discount: 0,
    taxMode: 'none',
    cgstRate: 0,
    sgstRate: 0,
    igstRate: 0,
    paid: 1650,
    paymentMode: 'UPI',
    paymentTerms: 'C.O.D',
    finalizedAt: '2026-09-12T10:00:00.000Z'
  }
];

const clone = (value) => JSON.parse(JSON.stringify(value));
const read = (key, fallback = []) => {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch {
    localStorage.removeItem(key);
  }
  localStorage.setItem(key, JSON.stringify(fallback));
  return clone(fallback);
};
const write = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
  return clone(value);
};
const id = (prefix) => `${prefix}-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
const today = () => new Date().toISOString().slice(0, 10);

export const blankBillingDocument = (kind = 'invoice') => ({
  kind,
  invoiceType: 'regular',
  status: 'Draft',
  date: today(),
  customer: { name: '', phone: '', address: '', gstin: '', state: '', stateCode: '', placeOfSupply: '' },
  vehicle: { registration: '', makeModel: '', odometer: '', vin: '' },
  jobCardNo: '',
  staff: '',
  notes: '',
  items: [],
  discount: 0,
  taxMode: 'none',
  cgstRate: 9,
  sgstRate: 9,
  igstRate: 18,
  paid: 0,
  paymentMode: 'Cash',
  paymentTerms: 'C.O.D'
});

export const calculateDocumentTotals = (doc) => {
  const itemSubtotal = (doc.items || []).reduce((sum, item) => {
    const gross = Number(item.qty || 0) * Number(item.rate || 0);
    return sum + Math.max(0, gross - Number(item.discount || 0));
  }, 0);
  const documentDiscount = Number(doc.discount || 0);
  const taxable = Math.max(0, itemSubtotal - documentDiscount);
  const cgst = doc.taxMode === 'cgst_sgst' ? taxable * Number(doc.cgstRate || 0) / 100 : 0;
  const sgst = doc.taxMode === 'cgst_sgst' ? taxable * Number(doc.sgstRate || 0) / 100 : 0;
  const igst = doc.taxMode === 'igst' ? taxable * Number(doc.igstRate || 0) / 100 : 0;
  const beforeRounding = taxable + cgst + sgst + igst;
  const total = Math.round(beforeRounding);
  const rounding = Number((total - beforeRounding).toFixed(2));
  const paid = Number(doc.paid || 0);
  return { itemSubtotal, documentDiscount, taxable, cgst, sgst, igst, rounding, total, paid, balance: Math.max(0, total - paid) };
};

const nextNumber = (kind, docs) => {
  const prefix = kind === 'estimate' ? 'EST' : 'INV';
  const year = new Date().getFullYear();
  const count = docs.filter((d) => d.kind === kind).length + 1;
  return `${prefix}-${year}-${String(count).padStart(4, '0')}`;
};

const applyStockMovement = (doc, direction) => {
  const inventory = read(INVENTORY_KEY, []);
  const ledger = read(STOCK_LEDGER_KEY, []);
  const movements = [];

  for (const item of doc.items || []) {
    if (item.type !== 'Stock Part' || !item.inventoryId) continue;
    const qty = Number(item.qty || 0);
    const index = inventory.findIndex((row) => String(row.id) === String(item.inventoryId));
    if (index < 0) continue;
    const current = Number(inventory[index].onHand || 0);
    const next = direction === 'issue' ? current - qty : current + qty;
    if (direction === 'issue' && next < 0) throw new Error(`${inventory[index].name} has only ${current} in stock.`);
    inventory[index] = { ...inventory[index], onHand: next };
    movements.push({
      id: id('LED'),
      date: new Date().toISOString(),
      documentId: doc.id,
      documentNo: doc.number,
      inventoryId: item.inventoryId,
      itemName: inventory[index].name,
      qty: direction === 'issue' ? -qty : qty,
      action: direction === 'issue' ? 'Invoice Finalized' : 'Invoice Cancelled'
    });
  }

  write(INVENTORY_KEY, inventory);
  write(STOCK_LEDGER_KEY, [...movements, ...ledger]);
};

export const billingService = {
  async list() {
    if (!USE_MOCK_API) return apiClient.get('/billing/documents');
    return read(DOCS_KEY, seedDocuments);
  },

  async get(documentId) {
    if (!USE_MOCK_API) return apiClient.get(`/billing/documents/${documentId}`);
    return read(DOCS_KEY, seedDocuments).find((row) => row.id === documentId) || null;
  },

  async saveDraft(payload) {
    if (!USE_MOCK_API) return apiClient.post('/billing/documents', payload);
    const docs = read(DOCS_KEY, seedDocuments);
    if (payload.id) {
      const next = docs.map((row) => row.id === payload.id ? { ...row, ...payload, updatedAt: new Date().toISOString() } : row);
      write(DOCS_KEY, next);
      return clone(next.find((row) => row.id === payload.id));
    }
    const document = {
      ...blankBillingDocument(payload.kind),
      ...payload,
      id: id(payload.kind === 'estimate' ? 'EST' : 'INV'),
      number: nextNumber(payload.kind || 'invoice', docs),
      status: 'Draft',
      createdAt: new Date().toISOString()
    };
    write(DOCS_KEY, [document, ...docs]);
    return clone(document);
  },

  async finalize(documentId) {
    if (!USE_MOCK_API) return apiClient.post(`/billing/documents/${documentId}/finalize`);
    const docs = read(DOCS_KEY, seedDocuments);
    const doc = docs.find((row) => row.id === documentId);
    if (!doc) throw new Error('Document not found.');
    if (doc.kind === 'invoice' && doc.status !== 'Finalized' && doc.status !== 'Paid') applyStockMovement(doc, 'issue');
    const status = doc.kind === 'estimate' ? 'Issued' : 'Finalized';
    const nextDoc = { ...doc, status, finalizedAt: new Date().toISOString() };
    write(DOCS_KEY, docs.map((row) => row.id === documentId ? nextDoc : row));
    return clone(nextDoc);
  },

  async cancel(documentId) {
    if (!USE_MOCK_API) return apiClient.post(`/billing/documents/${documentId}/cancel`);
    const docs = read(DOCS_KEY, seedDocuments);
    const doc = docs.find((row) => row.id === documentId);
    if (!doc) throw new Error('Document not found.');
    if (doc.kind === 'invoice' && (doc.status === 'Finalized' || doc.status === 'Paid')) applyStockMovement(doc, 'restore');
    const nextDoc = { ...doc, status: 'Cancelled', cancelledAt: new Date().toISOString() };
    write(DOCS_KEY, docs.map((row) => row.id === documentId ? nextDoc : row));
    return clone(nextDoc);
  },

  async convertEstimateToInvoice(estimateId) {
    const estimate = await this.get(estimateId);
    if (!estimate) throw new Error('Estimate not found.');
    const { id: _id, number: _number, status: _status, finalizedAt: _finalizedAt, ...copy } = estimate;
    return this.saveDraft({ ...copy, kind: 'invoice', invoiceType: estimate.invoiceType || 'regular', status: 'Draft' });
  },

  async inventory() {
    if (!USE_MOCK_API) return apiClient.get('/inventory');
    return read(INVENTORY_KEY, []);
  }
};
