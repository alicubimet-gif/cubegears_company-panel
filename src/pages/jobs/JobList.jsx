import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobService } from '../../services/job.service';
import { NewJobModal } from '../../components/jobs/NewJobModal';
import { ResponsiveModalSheet } from '../../components/common/ResponsiveModalSheet';
import {
  Search,
  Plus,
  Filter,
  Car,
  User,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Wrench,
  DollarSign,
  ChevronRight,
  X,
  RotateCcw
} from 'lucide-react';

export const JobList = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter States
  const [search, setSearch] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedMechanic, setSelectedMechanic] = useState('All');
  const [selectedDate, setSelectedDate] = useState('');

  // Modals & Bottom Sheets
  const [isNewJobOpen, setIsNewJobOpen] = useState(false);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  useEffect(() => {
    loadJobs();
  }, [selectedBranch, selectedStatus, selectedPaymentStatus, selectedPriority, selectedMechanic]);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const data = await jobService.getJobs();
      setJobs(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val || 0);
  };

  // Helper for Job Status badge styling
  const getJobStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Delivered':
        return { backgroundColor: 'var(--success-soft)', color: 'var(--success)', border: '1px solid var(--success-soft)' };
      case 'In Progress':
        return { backgroundColor: 'var(--primary-soft)', color: 'var(--primary)', border: '1px solid var(--primary-soft)' };
      case 'Waiting for Parts':
        return { backgroundColor: 'var(--warning-soft)', color: 'var(--warning)', border: '1px solid var(--warning-soft)' };
      case 'Quality Check':
        return { backgroundColor: 'var(--info-soft, rgba(59,130,246,0.1))', color: 'var(--info)', border: '1px solid var(--border)' };
      case 'Ready for Delivery':
        return { backgroundColor: 'var(--success-soft)', color: 'var(--success)', border: '1px solid var(--success-soft)' };
      case 'Cancelled':
        return { backgroundColor: 'var(--danger-soft)', color: 'var(--danger)', border: '1px solid var(--danger-soft)' };
      default:
        return { backgroundColor: 'var(--surface-2)', color: 'var(--text-secondary)', border: '1px solid var(--border)' };
    }
  };

  // Helper for Payment Status badge styling
  const getPaymentStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Paid':
        return { backgroundColor: 'var(--success-soft)', color: 'var(--success)' };
      case 'Partially Paid':
        return { backgroundColor: 'var(--warning-soft)', color: 'var(--warning)' };
      default:
        return { backgroundColor: 'var(--danger-soft)', color: 'var(--danger)' };
    }
  };

  // Client-side Filter Logic
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.jobNumber?.toLowerCase().includes(search.toLowerCase()) ||
      job.vehicleReg?.toLowerCase().includes(search.toLowerCase()) ||
      job.vehicleInfo?.toLowerCase().includes(search.toLowerCase()) ||
      job.customerName?.toLowerCase().includes(search.toLowerCase()) ||
      job.customerPhone?.includes(search);

    const matchesBranch = selectedBranch === 'All' || job.branch === selectedBranch;
    const matchesStatus = selectedStatus === 'All' || job.status === selectedStatus;
    const matchesPayment = selectedPaymentStatus === 'All' || job.paymentStatus === selectedPaymentStatus;
    const matchesPriority = selectedPriority === 'All' || job.priority === selectedPriority;
    const matchesMechanic = selectedMechanic === 'All' || job.assignedEmployeeName === selectedMechanic;
    const matchesDate = !selectedDate || job.createdDate === selectedDate;

    return matchesSearch && matchesBranch && matchesStatus && matchesPayment && matchesPriority && matchesMechanic && matchesDate;
  });

  const clearAllFilters = () => {
    setSearch('');
    setSelectedBranch('All');
    setSelectedStatus('All');
    setSelectedPaymentStatus('All');
    setSelectedPriority('All');
    setSelectedMechanic('All');
    setSelectedDate('');
  };

  const activeFilterCount = (selectedBranch !== 'All' ? 1 : 0) +
                            (selectedStatus !== 'All' ? 1 : 0) +
                            (selectedPaymentStatus !== 'All' ? 1 : 0) +
                            (selectedPriority !== 'All' ? 1 : 0) +
                            (selectedMechanic !== 'All' ? 1 : 0) +
                            (selectedDate ? 1 : 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%', maxWidth: '100%', minWidth: 0, boxSizing: 'border-box' }}>
      {/* Top Header & Quick Actions */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>Workshop Job Cards</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>Manage vehicle check-ins, inspection, work progress, and billing</p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setIsNewJobOpen(true)}
            style={{
              height: '42px',
              padding: '0 16px',
              borderRadius: '10px',
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              border: 'none',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap'
            }}
          >
            <Plus size={16} /> New Job Card
          </button>
        </div>
      </div>

      {/* Desktop Search & Filters Bar (Hidden on small screens) */}
      <div className="desktop-table-view" style={{ width: '100%' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', backgroundColor: 'var(--surface)', padding: '12px', borderRadius: '14px', border: '1px solid var(--border)' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search Job #, Vehicle Reg, Customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                height: '40px',
                paddingLeft: '36px',
                paddingRight: '12px',
                borderRadius: '10px',
                backgroundColor: 'var(--surface-2)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                fontSize: '13px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Branch Filter */}
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            style={{ height: '40px', padding: '0 10px', borderRadius: '10px', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-primary)', fontSize: '13px' }}
          >
            <option value="All">All Branches</option>
            <option value="Main Garage Branch">Main Garage Branch</option>
            <option value="Kochi South Branch">Kochi South Branch</option>
          </select>

          {/* Job Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{ height: '40px', padding: '0 10px', borderRadius: '10px', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-primary)', fontSize: '13px' }}
          >
            <option value="All">All Job Statuses</option>
            <option value="Checked In">Checked In</option>
            <option value="Inspection">Inspection</option>
            <option value="Awaiting Approval">Awaiting Approval</option>
            <option value="In Progress">In Progress</option>
            <option value="Waiting for Parts">Waiting for Parts</option>
            <option value="Quality Check">Quality Check</option>
            <option value="Ready for Delivery">Ready for Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>

          {/* Payment Status Filter */}
          <select
            value={selectedPaymentStatus}
            onChange={(e) => setSelectedPaymentStatus(e.target.value)}
            style={{ height: '40px', padding: '0 10px', borderRadius: '10px', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-primary)', fontSize: '13px' }}
          >
            <option value="All">All Payment Statuses</option>
            <option value="Unpaid">Unpaid</option>
            <option value="Partially Paid">Partially Paid</option>
            <option value="Paid">Paid</option>
          </select>

          {/* Priority Filter */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            style={{ height: '40px', padding: '0 10px', borderRadius: '10px', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-primary)', fontSize: '13px' }}
          >
            <option value="All">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>

          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              style={{ height: '40px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--danger)', fontSize: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <RotateCcw size={14} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Mobile Search & Filter Toolbar */}
      <div className="mobile-card-view" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ position: 'relative', width: '100%' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              height: '42px',
              paddingLeft: '36px',
              paddingRight: '12px',
              borderRadius: '10px',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              fontSize: '13px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            style={{ flex: 1, height: '40px', padding: '0 10px', borderRadius: '10px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)', fontSize: '13px' }}
          >
            <option value="All">All Branches</option>
            <option value="Main Garage Branch">Main Garage Branch</option>
            <option value="Kochi South Branch">Kochi South Branch</option>
          </select>

          <button
            type="button"
            onClick={() => setIsFilterSheetOpen(true)}
            style={{
              height: '40px',
              padding: '0 14px',
              borderRadius: '10px',
              backgroundColor: activeFilterCount > 0 ? 'var(--primary-soft)' : 'var(--surface)',
              border: '1px solid var(--border)',
              color: activeFilterCount > 0 ? 'var(--primary)' : 'var(--text-primary)',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap'
            }}
          >
            <Filter size={15} /> Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
        </div>
      </div>

      {/* Desktop Responsive Table View (Hidden on mobile) */}
      <div className="desktop-table-view" style={{ width: '100%' }}>
        {loading ? (
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>Loading job cards...</div>
        ) : filteredJobs.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', color: 'var(--text-muted)' }}>
            No job cards match your filter criteria.
          </div>
        ) : (
          <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--surface-2)', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '12px', fontWeight: '700' }}>
                  <th style={{ padding: '12px 14px' }}>Job Number</th>
                  <th style={{ padding: '12px 14px' }}>Customer & Vehicle</th>
                  <th style={{ padding: '12px 14px' }}>Assigned Staff</th>
                  <th style={{ padding: '12px 14px' }}>Priority</th>
                  <th style={{ padding: '12px 14px' }}>Job Status</th>
                  <th style={{ padding: '12px 14px' }}>Payment Status</th>
                  <th style={{ padding: '12px 14px' }}>Delivery</th>
                  <th style={{ padding: '12px 14px', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job) => (
                  <tr
                    key={job.id}
                    onClick={() => navigate(`/jobs/${job.id}`)}
                    style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer', transition: 'background-color 0.15s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-2)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={{ padding: '12px 14px', fontWeight: '800', color: 'var(--primary)' }}>
                      {job.jobNumber}
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '400' }}>{job.createdDate}</div>
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{job.customerName}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{job.vehicleInfo} ({job.vehicleReg})</div>
                    </td>
                    <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>
                      {job.assignedEmployeeName}
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Advisor: {job.serviceAdvisor}</div>
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        backgroundColor: job.priority === 'High' ? 'var(--danger-soft)' : job.priority === 'Medium' ? 'var(--warning-soft)' : 'var(--surface-2)',
                        color: job.priority === 'High' ? 'var(--danger)' : job.priority === 'Medium' ? 'var(--warning)' : 'var(--text-muted)'
                      }}>
                        {job.priority}
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        ...getJobStatusBadgeStyle(job.status)
                      }}>
                        {job.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        ...getPaymentStatusBadgeStyle(job.paymentStatus)
                      }}>
                        {job.paymentStatus}
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {job.expectedDeliveryDate}
                    </td>
                    <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); navigate(`/jobs/${job.id}`); }}
                        style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--primary)', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                      >
                        Open Job
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Mobile Card List View (Strictly no horizontal table overflow) */}
      <div className="mobile-card-view" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {loading ? (
          <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>Loading job cards...</div>
        ) : filteredJobs.length === 0 ? (
          <div style={{ padding: '32px', textAlign: 'center', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', color: 'var(--text-muted)', fontSize: '13px' }}>
            No job cards found matching active filters.
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              onClick={() => navigate(`/jobs/${job.id}`)}
              style={{
                width: '100%',
                minWidth: 0,
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '14px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                boxSizing: 'border-box',
                cursor: 'pointer'
              }}
            >
              {/* Header Row: Job Number + Status Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '15px', fontWeight: '800', color: 'var(--primary)' }}>{job.jobNumber}</span>
                <span style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  ...getJobStatusBadgeStyle(job.status)
                }}>
                  {job.status}
                </span>
              </div>

              {/* Vehicle & Registration */}
              <div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>{job.vehicleInfo}</div>
                <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)' }}>{job.vehicleReg}</div>
              </div>

              {/* Customer & Mechanic info */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)', borderTop: '1px solid var(--border)', paddingTop: '8px' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>Customer</span>
                  <strong>{job.customerName}</strong>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>Assigned Mechanic</span>
                  <strong>{job.assignedEmployeeName}</strong>
                </div>
              </div>

              {/* Delivery & Payment Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--surface-2)', padding: '8px 10px', borderRadius: '8px', fontSize: '12px' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '10px' }}>Expected Delivery</span>
                  <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{job.expectedDeliveryDate}</span>
                </div>
                <span style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  ...getPaymentStatusBadgeStyle(job.paymentStatus)
                }}>
                  {job.paymentStatus}
                </span>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); navigate(`/jobs/${job.id}`); }}
                style={{
                  width: '100%',
                  height: '38px',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--surface-2)',
                  color: 'var(--primary)',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                Open Job Card <ChevronRight size={15} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Mobile Filter Bottom Sheet */}
      <ResponsiveModalSheet
        isOpen={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        title="Filter Job Cards"
        maxWidth="500px"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>Job Lifecycle Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '14px' }}
            >
              <option value="All">All Statuses</option>
              <option value="Checked In">Checked In</option>
              <option value="Inspection">Inspection</option>
              <option value="Awaiting Approval">Awaiting Approval</option>
              <option value="In Progress">In Progress</option>
              <option value="Waiting for Parts">Waiting for Parts</option>
              <option value="Quality Check">Quality Check</option>
              <option value="Ready for Delivery">Ready for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>Payment Status</label>
            <select
              value={selectedPaymentStatus}
              onChange={(e) => setSelectedPaymentStatus(e.target.value)}
              style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '14px' }}
            >
              <option value="All">All Payment Statuses</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Partially Paid">Partially Paid</option>
              <option value="Paid">Paid</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>Assigned Mechanic</label>
            <select
              value={selectedMechanic}
              onChange={(e) => setSelectedMechanic(e.target.value)}
              style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '14px' }}
            >
              <option value="All">All Mechanics</option>
              <option value="Ajmal K">Ajmal K</option>
              <option value="Niyas P">Niyas P</option>
              <option value="Priya Nair">Priya Nair</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>Priority Level</label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '14px' }}
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
            <button
              type="button"
              onClick={clearAllFilters}
              style={{ flex: 1, height: '44px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-secondary)', fontWeight: '600', cursor: 'pointer' }}
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setIsFilterSheetOpen(false)}
              style={{ flex: 1, height: '44px', borderRadius: '10px', border: 'none', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: '700', cursor: 'pointer' }}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </ResponsiveModalSheet>

      {/* New Job Modal Sheet */}
      <NewJobModal
        isOpen={isNewJobOpen}
        onClose={() => setIsNewJobOpen(false)}
        onJobCreated={() => loadJobs()}
      />
    </div>
  );
};
