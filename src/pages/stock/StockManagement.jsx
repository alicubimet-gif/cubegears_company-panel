import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { stockService as stockSvc } from '../../services/stock.service';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Textarea } from '../../components/common/Textarea';
import { Search } from '../../components/common/Search';
import { ResponsiveModalSheet } from '../../components/common/ResponsiveModalSheet';
import {
  Boxes,
  ArrowDownRight,
  ArrowUpRight,
  Plus,
  RefreshCw,
  AlertTriangle,
  ClipboardList,
  CheckCircle2,
  Package,
  Layers,
  ShoppingBag,
  Truck,
  FileText,
  Clock,
  ArrowLeftRight,
  ShieldAlert,
  BarChart3,
  Search as SearchIcon,
  Filter,
  Check,
  X,
  FileSpreadsheet,
  Edit,
  Eye,
  Building
} from 'lucide-react';

export const StockManagement = ({ section = 'dashboard' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const tabRailRef = useRef(null);

  // Active section mapping from URL path or prop
  const currentPath = location.pathname;
  const activeSection = currentPath.startsWith('/stock/items') ? 'items'
    : currentPath.startsWith('/stock/in') ? 'in'
    : currentPath.startsWith('/stock/issue') ? 'issue'
    : currentPath.startsWith('/stock/return') ? 'return'
    : currentPath.startsWith('/stock/transfer') ? 'transfer'
    : currentPath.startsWith('/stock/adjustments') ? 'adjustments'
    : currentPath.startsWith('/stock/reservations') ? 'reservations'
    : currentPath.startsWith('/stock/low-stock') ? 'low-stock'
    : currentPath.startsWith('/stock/ledger') ? 'ledger'
    : currentPath.startsWith('/stock/suppliers') ? 'suppliers'
    : currentPath.startsWith('/stock/purchases') ? 'purchases'
    : currentPath.startsWith('/stock/count') ? 'count'
    : currentPath.startsWith('/stock/reports') ? 'reports'
    : 'dashboard';

  // Core Data States
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState('');
  const [dashboardData, setDashboardData] = useState(null);
  const [stockItems, setStockItems] = useState([]);
  const [ledger, setLedger] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [counts, setCounts] = useState([]);

  // Search & Filters
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Modal Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 'in', 'issue', 'return', 'transfer', 'adjustment', 'supplier'

  // Form Inputs
  const [formPartId, setFormPartId] = useState('');
  const [formQty, setFormQty] = useState('1');
  const [formJobRef, setFormJobRef] = useState('JOB-00251');
  const [formSupplier, setFormSupplier] = useState('Global Oil Distributors');
  const [formCost, setFormCost] = useState('');
  const [formSelling, setFormSelling] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [formCondition, setFormCondition] = useState('Reusable');
  const [formAdjType, setFormAdjType] = useState('Increase');
  const [formToBranch, setFormToBranch] = useState('Kochi South Branch');

  useEffect(() => {
    loadModuleData();
  }, [activeSection, search, categoryFilter]);

  const loadModuleData = async () => {
    setLoading(true);
    try {
      const dash = await stockSvc.getStockDashboard();
      setDashboardData(dash);

      const items = await stockSvc.getStockItems({ search, category: categoryFilter });
      setStockItems(items);

      const led = await stockSvc.getMovementLedger({ search });
      setLedger(led);

      const sups = await stockSvc.getSuppliers();
      setSuppliers(sups);

      const purch = await stockSvc.getPurchases();
      setPurchases(purch);

      const res = await stockSvc.getReservations();
      setReservations(res);

      const trf = await stockSvc.getTransfers();
      setTransfers(trf);

      const cnt = await stockSvc.getStockCounts();
      setCounts(cnt);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val || 0);
  };

  const handleTabClick = (path, event) => {
    navigate(path);
    if (event && event.currentTarget && tabRailRef.current) {
      event.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  const openFormModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'in') {
        await stockSvc.receiveStock({
          itemId: formPartId || stockItems[0]?.id,
          quantity: Number(formQty),
          supplier: formSupplier,
          notes: formNotes
        });
        showToast('Stock received & ledger updated.');
      } else if (modalType === 'issue') {
        await stockSvc.issueStock({
          itemId: formPartId || stockItems[0]?.id,
          quantity: Number(formQty),
          jobId: formJobRef,
          notes: formNotes
        });
        showToast(`Stock issued to ${formJobRef}.`);
      } else if (modalType === 'return') {
        await stockSvc.returnStock({
          itemId: formPartId || stockItems[0]?.id,
          quantity: Number(formQty),
          jobId: formJobRef,
          condition: formCondition,
          notes: formNotes
        });
        showToast(`Stock return logged (${formCondition}).`);
      } else if (modalType === 'transfer') {
        await stockSvc.createTransfer({
          item: formPartId ? stockItems.find(i => i.id === formPartId)?.partName : 'Engine Oil',
          quantity: Number(formQty),
          toBranch: formToBranch
        });
        showToast(`Transfer requested to ${formToBranch}.`);
      } else if (modalType === 'adjustment') {
        await stockSvc.createAdjustment({
          itemId: formPartId || stockItems[0]?.id,
          quantity: Number(formQty),
          adjustmentType: formAdjType,
          reason: formNotes
        });
        showToast(`Stock adjustment (${formAdjType}) logged.`);
      }
      setIsModalOpen(false);
      loadModuleData();
    } catch (err) {
      console.error(err);
    }
  };

  // Submenu tabs
  const submenus = [
    { id: 'dashboard', label: 'Dashboard', path: '/stock', icon: Boxes },
    { id: 'items', label: `Stock Items (${stockItems.length})`, path: '/stock/items', icon: Package },
    { id: 'in', label: 'Stock In', path: '/stock/in', icon: ArrowDownRight },
    { id: 'issue', label: 'Stock Issue', path: '/stock/issue', icon: ArrowUpRight },
    { id: 'return', label: 'Stock Return', path: '/stock/return', icon: RefreshCw },
    { id: 'transfer', label: 'Stock Transfer', path: '/stock/transfer', icon: ArrowLeftRight },
    { id: 'adjustments', label: 'Stock Adjustment', path: '/stock/adjustments', icon: Layers },
    { id: 'reservations', label: `Reservations (${reservations.length})`, path: '/stock/reservations', icon: Clock },
    { id: 'low-stock', label: 'Low Stock', path: '/stock/low-stock', icon: AlertTriangle },
    { id: 'ledger', label: 'Movement Ledger', path: '/stock/ledger', icon: ClipboardList },
    { id: 'suppliers', label: 'Suppliers', path: '/stock/suppliers', icon: Truck },
    { id: 'purchases', label: 'Purchase Records', path: '/stock/purchases', icon: ShoppingBag },
    { id: 'count', label: 'Stock Count', path: '/stock/count', icon: CheckCircle2 },
    { id: 'reports', label: 'Reports', path: '/stock/reports', icon: BarChart3 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%', maxWidth: '100%', boxSizing: 'border-box', paddingBottom: '90px' }}>
      
      {/* Toast Feedback */}
      {toastMsg && (
        <div style={{ backgroundColor: 'var(--success)', color: '#ffffff', padding: '10px 14px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={16} />
          {toastMsg}
        </div>
      )}

      {/* HEADER BAR */}
      <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>
            Stock Management & Operations
          </h1>
          <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
            Single unified stock ledger for receiving, job issues, transfers, and inventory control.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => openFormModal('in')}
            style={{ height: '38px', padding: '0 14px', borderRadius: '10px', backgroundColor: 'var(--primary)', color: '#ffffff', border: 'none', fontSize: '12.5px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={15} /> Receive Stock
          </button>

          <button
            onClick={() => openFormModal('issue')}
            style={{ height: '38px', padding: '0 14px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '12.5px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <ArrowUpRight size={15} /> Issue Stock
          </button>
        </div>
      </div>

      {/* HORIZONTALLY SCROLLABLE MODULE TABS RAIL */}
      <div style={{ width: '100%', borderBottom: '1px solid var(--border)', backgroundColor: 'var(--surface)', borderRadius: '12px', overflow: 'hidden' }}>
        <div
          ref={tabRailRef}
          style={{ display: 'flex', alignItems: 'center', gap: '4px', overflowX: 'auto', padding: '4px 8px', whiteSpace: 'nowrap' }}
          className="scroll-hidden"
        >
          {submenus.map((s) => {
            const Icon = s.icon;
            const isActive = activeSection === s.id;
            return (
              <button
                key={s.id}
                onClick={(e) => handleTabClick(s.path, e)}
                style={{
                  padding: '10px 14px',
                  fontSize: '12.5px',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                  borderBottom: isActive ? '2px solid var(--primary)' : '2px solid transparent',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 160ms ease'
                }}
              >
                <Icon size={14} />
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION VIEW RENDERERS */}

      {/* 1. STOCK DASHBOARD */}
      {activeSection === 'dashboard' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          {/* KPI 4-Column Desktop / 2x2 Mobile Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '10px' }} className="stock-kpi-grid">
            <style>{`
              @media (max-width: 767px) {
                .stock-kpi-grid {
                  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                }
              }
            `}</style>

            <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px' }}>
              <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Stock Items</span>
              <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>{dashboardData?.totalItems || stockItems.length}</div>
            </div>

            <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px' }}>
              <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Stock Value</span>
              <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary)', marginTop: '4px' }}>{formatINR(dashboardData?.totalValue || 124500)}</div>
            </div>

            <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px' }}>
              <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Low / Out of Stock</span>
              <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--danger)', marginTop: '4px' }}>{dashboardData?.lowStock || 2} Items</div>
            </div>

            <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px' }}>
              <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Reserved For Jobs</span>
              <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--warning)', marginTop: '4px' }}>{dashboardData?.reservedStock || 7} Qty</div>
            </div>
          </div>

          {/* Quick Action Grid */}
          <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>Stock Operations Shortcuts</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0, 1fr))', gap: '10px' }} className="stock-actions-grid">
              <style>{`
                @media (max-width: 1024px) {
                  .stock-actions-grid {
                    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
                  }
                }
                @media (max-width: 600px) {
                  .stock-actions-grid {
                    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                  }
                }
              `}</style>

              <button onClick={() => openFormModal('in')} style={{ padding: '12px', borderRadius: '11px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--primary)', fontWeight: '700', fontSize: '12.5px', cursor: 'pointer' }}>
                + Stock In
              </button>
              <button onClick={() => openFormModal('issue')} style={{ padding: '12px', borderRadius: '11px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontWeight: '700', fontSize: '12.5px', cursor: 'pointer' }}>
                Issue Stock
              </button>
              <button onClick={() => openFormModal('return')} style={{ padding: '12px', borderRadius: '11px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontWeight: '700', fontSize: '12.5px', cursor: 'pointer' }}>
                Return Stock
              </button>
              <button onClick={() => openFormModal('transfer')} style={{ padding: '12px', borderRadius: '11px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontWeight: '700', fontSize: '12.5px', cursor: 'pointer' }}>
                Transfer Stock
              </button>
              <button onClick={() => openFormModal('adjustment')} style={{ padding: '12px', borderRadius: '11px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontWeight: '700', fontSize: '12.5px', cursor: 'pointer' }}>
                Adjust Stock
              </button>
              <button onClick={() => navigate('/stock/purchases')} style={{ padding: '12px', borderRadius: '11px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--success)', fontWeight: '700', fontSize: '12.5px', cursor: 'pointer' }}>
                New Purchase
              </button>
            </div>
          </div>

          {/* Low Stock Alerts & Recent Movements Stream */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="stock-dash-dual">
            <style>{`
              @media (max-width: 767px) {
                .stock-dash-dual {
                  grid-template-columns: 1fr !important;
                }
              }
            `}</style>

            <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertTriangle size={16} style={{ color: 'var(--danger)' }} /> Critical Low Stock Alerts
                </h3>
                <button onClick={() => navigate('/stock/low-stock')} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
                  View All →
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {stockItems.filter(i => (i.onHand - i.reserved) <= i.minimumStock).map(item => (
                  <div key={item.id} style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '10px', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{item.partName}</strong>
                      <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>SKU: {item.sku} • Location: {item.location}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '11px', fontWeight: '700', padding: '2px 7px', borderRadius: '6px', backgroundColor: 'var(--danger-soft)', color: 'var(--danger)' }}>
                        {item.onHand === 0 ? 'Out of Stock' : 'Low Stock'}
                      </span>
                      <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>Available: <strong>{item.onHand - item.reserved}</strong> / Min: {item.minimumStock}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ClipboardList size={16} style={{ color: 'var(--primary)' }} /> Recent Stock Movements
                </h3>
                <button onClick={() => navigate('/stock/ledger')} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
                  Ledger →
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {ledger.slice(0, 4).map(mov => (
                  <div key={mov.id} style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '10px', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12.5px' }}>
                    <div>
                      <strong style={{ color: 'var(--text-primary)' }}>{mov.partName}</strong>
                      <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{mov.type} • Ref: {mov.jobRef}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <strong style={{ color: mov.type.includes('In') || mov.type.includes('Return') ? 'var(--success)' : 'var(--danger)', fontSize: '13.5px' }}>
                        {mov.type.includes('In') || mov.type.includes('Return') ? `+${mov.qtyIn}` : `-${mov.qtyOut}`}
                      </strong>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>After: {mov.balanceAfter}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. STOCK ITEMS (CATALOG) */}
      {(activeSection === 'items' || activeSection === 'low-stock') && (
        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <Search value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search item name, SKU, brand, or category..." />

            <div style={{ display: 'flex', gap: '8px' }}>
              <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} containerStyle={{ width: '170px' }}>
                <option value="All">All Categories</option>
                <option value="Engine Oil">Engine Oil</option>
                <option value="Filters">Filters</option>
                <option value="Brake Parts">Brake Parts</option>
                <option value="Fluids">Fluids</option>
                <option value="Electrical">Electrical</option>
              </Select>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {stockItems
              .filter(i => activeSection !== 'low-stock' || (i.onHand - i.reserved) <= i.minimumStock)
              .map(item => {
                const available = Math.max(0, item.onHand - item.reserved);
                const isLow = available <= item.minimumStock;

                return (
                  <div key={item.id} style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '15px', fontWeight: '800', color: 'var(--primary)' }}>{item.sku}</span>
                        <span style={{ fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '6px', backgroundColor: isLow ? 'var(--danger-soft)' : 'var(--success-soft)', color: isLow ? 'var(--danger)' : 'var(--success)' }}>
                          {isLow ? (available === 0 ? 'Out of Stock' : 'Low Stock') : 'In Stock'}
                        </span>
                      </div>
                      <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', margin: '2px 0 0 0' }}>{item.partName}</h4>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                        Category: {item.category} • Brand: {item.brand} • Unit: {item.unit || 'Piece'} • Rack: {item.location}
                      </div>
                    </div>

                    {/* Available Stock Calculations: Available = On Hand - Reserved */}
                    <div style={{ textAlign: 'right', display: 'flex', gap: '16px', alignItems: 'center', marginLeft: 'auto' }}>
                      <div style={{ fontSize: '12px', textAlign: 'right' }}>
                        <div>On Hand: <strong style={{ color: 'var(--text-primary)' }}>{item.onHand}</strong></div>
                        <div>Reserved: <strong style={{ color: 'var(--warning)' }}>{item.reserved}</strong></div>
                        <div style={{ marginTop: '2px' }}>Available: <strong style={{ color: 'var(--success)', fontSize: '14px' }}>{available}</strong></div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Selling Price</div>
                        <strong style={{ fontSize: '15px', color: 'var(--text-primary)' }}>{formatINR(item.sellingPrice)}</strong>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setIsDetailOpen(true);
                        }}
                        style={{ height: '34px', padding: '0 12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--primary)', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}
                      >
                        View 360°
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* 3. STOCK IN / RECEIVE */}
      {activeSection === 'in' && (
        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>Receive Stock (Stock In)</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>Increases On Hand stock and records entry in unified ledger</p>
          </div>

          <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '600px' }}>
            <Select label="Select Stock Item" required value={formPartId} onChange={(e) => setFormPartId(e.target.value)}>
              {stockItems.map(i => <option key={i.id} value={i.id}>{i.partName} ({i.sku})</option>)}
            </Select>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <Input label="Quantity Received" type="number" required value={formQty} onChange={(e) => setFormQty(e.target.value)} />
              <Select label="Supplier" value={formSupplier} onChange={(e) => setFormSupplier(e.target.value)}>
                {suppliers.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
              </Select>
            </div>

            <Textarea label="Purchase / Receipt Notes" rows={2} value={formNotes} onChange={(e) => setFormNotes(e.target.value)} placeholder="Invoice #, batch details..." />

            <button type="submit" style={{ height: '44px', borderRadius: '11px', border: 'none', backgroundColor: 'var(--primary)', color: '#ffffff', fontWeight: '700', cursor: 'pointer' }}>
              Process Stock Receipt
            </button>
          </form>
        </div>
      )}

      {/* 4. STOCK ISSUE */}
      {activeSection === 'issue' && (
        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>Issue Stock to Job Card</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>Deducts On Hand stock and attaches parts to Job Card</p>
          </div>

          <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '600px' }}>
            <Input label="Job Card Reference" required value={formJobRef} onChange={(e) => setFormJobRef(e.target.value)} placeholder="JOB-00251" />

            <Select label="Select Part to Issue" required value={formPartId} onChange={(e) => setFormPartId(e.target.value)}>
              {stockItems.map(i => <option key={i.id} value={i.id}>{i.partName} (Avail: {i.onHand - i.reserved})</option>)}
            </Select>

            <Input label="Quantity to Issue" type="number" required value={formQty} onChange={(e) => setFormQty(e.target.value)} />

            <Textarea label="Mechanic / Job Notes" rows={2} value={formNotes} onChange={(e) => setFormNotes(e.target.value)} placeholder="Issued to technician..." />

            <button type="submit" style={{ height: '44px', borderRadius: '11px', border: 'none', backgroundColor: 'var(--primary)', color: '#ffffff', fontWeight: '700', cursor: 'pointer' }}>
              Confirm Job Issue
            </button>
          </form>
        </div>
      )}

      {/* 5. STOCK RETURN */}
      {activeSection === 'return' && (
        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>Job Stock Return</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>Unused reusable parts return back to On Hand stock</p>
          </div>

          <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '600px' }}>
            <Input label="Job Card Reference" required value={formJobRef} onChange={(e) => setFormJobRef(e.target.value)} />

            <Select label="Returned Part" required value={formPartId} onChange={(e) => setFormPartId(e.target.value)}>
              {stockItems.map(i => <option key={i.id} value={i.id}>{i.partName}</option>)}
            </Select>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <Input label="Return Qty" type="number" required value={formQty} onChange={(e) => setFormQty(e.target.value)} />
              <Select label="Part Condition" value={formCondition} onChange={(e) => setFormCondition(e.target.value)}>
                <option value="Reusable">Reusable (Adds to Stock)</option>
                <option value="Damaged">Damaged (Scrap)</option>
                <option value="Waste">Waste</option>
              </Select>
            </div>

            <button type="submit" style={{ height: '44px', borderRadius: '11px', border: 'none', backgroundColor: 'var(--primary)', color: '#ffffff', fontWeight: '700', cursor: 'pointer' }}>
              Submit Stock Return
            </button>
          </form>
        </div>
      )}

      {/* 10. MOVEMENT LEDGER */}
      {activeSection === 'ledger' && (
        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>Stock Movement Audit Ledger</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>Immutable log of every single stock movement across the workshop</p>
            </div>
            <Search value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search ledger..." />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {ledger.map((mov) => (
              <div key={mov.id} style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: '700', padding: '2px 7px', borderRadius: '6px', backgroundColor: 'var(--surface-3)', color: 'var(--text-primary)' }}>
                      {mov.type}
                    </span>
                    <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{mov.partName}</strong>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Time: {mov.date} • Ref: {mov.jobRef} • User: {mov.user}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <strong style={{ fontSize: '16px', color: mov.type.includes('In') || mov.type.includes('Return') ? 'var(--success)' : 'var(--danger)' }}>
                    {mov.type.includes('In') || mov.type.includes('Return') ? `+${mov.qtyIn}` : `-${mov.qtyOut}`}
                  </strong>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Balance After: <strong style={{ color: 'var(--text-primary)' }}>{mov.balanceAfter}</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 11. SUPPLIERS */}
      {activeSection === 'suppliers' && (
        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>Parts & Oil Suppliers</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
            {suppliers.map(sup => (
              <div key={sup.id} style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <strong style={{ fontSize: '15px', color: 'var(--primary)' }}>{sup.name}</strong>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>GST: {sup.gstNo}</div>
                <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>{sup.phone} • {sup.email}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{sup.address}</div>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span>Purchases: <strong>{formatINR(sup.totalPurchases)}</strong></span>
                  <span>Due: <strong style={{ color: 'var(--danger)' }}>{formatINR(sup.outstanding)}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL SHEET FOR OPERATIONS */}
      <ResponsiveModalSheet
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalType === 'in' ? 'Stock In Receipt' : modalType === 'issue' ? 'Issue Stock to Job Card' : modalType === 'return' ? 'Job Stock Return' : modalType === 'transfer' ? 'Transfer Stock' : 'Stock Adjustment'}
        maxWidth="500px"
      >
        <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Select label="Stock Item" value={formPartId} onChange={(e) => setFormPartId(e.target.value)}>
            {stockItems.map(i => <option key={i.id} value={i.id}>{i.partName} ({i.sku})</option>)}
          </Select>

          <Input label="Quantity" type="number" required value={formQty} onChange={(e) => setFormQty(e.target.value)} />

          {modalType === 'issue' && (
            <Input label="Job Card Reference" required value={formJobRef} onChange={(e) => setFormJobRef(e.target.value)} />
          )}

          {modalType === 'transfer' && (
            <Select label="Destination Branch" value={formToBranch} onChange={(e) => setFormToBranch(e.target.value)}>
              <option value="Kochi South Branch">Kochi South Branch</option>
              <option value="Calicut Hub Branch">Calicut Hub Branch</option>
            </Select>
          )}

          {modalType === 'adjustment' && (
            <Select label="Adjustment Direction" value={formAdjType} onChange={(e) => setFormAdjType(e.target.value)}>
              <option value="Increase">Increase (+) Stock</option>
              <option value="Decrease">Decrease (-) Stock</option>
            </Select>
          )}

          <Textarea label="Notes / Reason" rows={2} value={formNotes} onChange={(e) => setFormNotes(e.target.value)} />

          <button type="submit" style={{ height: '44px', borderRadius: '11px', border: 'none', backgroundColor: 'var(--primary)', color: '#ffffff', fontWeight: '700', cursor: 'pointer', marginTop: '6px' }}>
            Save Stock Operation
          </button>
        </form>
      </ResponsiveModalSheet>

    </div>
  );
};
