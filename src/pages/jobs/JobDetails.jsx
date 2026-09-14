import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobService } from '../../services/job.service';
import { jobInspectionService, DEFAULT_INSPECTION_CATEGORIES } from '../../services/jobInspection.service';
import { ResponsiveModalSheet } from '../../components/common/ResponsiveModalSheet';
import {
  ClipboardCheck,
  Wrench,
  Camera,
  DollarSign,
  CheckCircle2,
  Clock,
  Plus,
  ArrowLeft,
  FileText,
  Edit,
  RotateCcw,
  Truck,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  HelpCircle,
  FileCode,
  Paperclip,
  CheckSquare,
  Link,
  PlusCircle,
  Trash2,
  UserCheck
} from 'lucide-react';

export const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [toastMsg, setToastMsg] = useState('');
  const activeTabRef = useRef(null);

  // Status Change State
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  // Inspection Data & State
  const [inspectionData, setInspectionData] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({ engine: true, brakes: true });
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [selectedIssueItem, setSelectedIssueItem] = useState('');
  const [issueCategory, setIssueCategory] = useState('ENGINE');
  
  // Issue Found Form State
  const [issueTitle, setIssueTitle] = useState('');
  const [issueSeverity, setIssueSeverity] = useState('Medium');
  const [issueFinding, setIssueFinding] = useState('');
  const [issueAction, setIssueAction] = useState('');
  const [issueLabourTime, setIssueLabourTime] = useState('1 Hour');
  const [issueLabourCharge, setIssueLabourCharge] = useState('');
  const [issueRequiredParts, setIssueRequiredParts] = useState('');
  const [issuePartCharge, setIssuePartCharge] = useState('');
  const [issuePhotoUrl, setIssuePhotoUrl] = useState('');
  const [issueComplaintId, setIssueComplaintId] = useState('');
  const [issueNotes, setIssueNotes] = useState('');

  // Diagnostic Scan Modal State
  const [isDiagnosticModalOpen, setIsDiagnosticModalOpen] = useState(false);
  const [obdCode, setObdCode] = useState('');
  const [obdSystem, setObdSystem] = useState('Engine');
  const [obdDescription, setObdDescription] = useState('');
  const [obdStatus, setObdStatus] = useState('Active');

  // Modals for Actions
  const [isAddFindingOpen, setIsAddFindingOpen] = useState(false);
  const [isAddPhotoOpen, setIsAddPhotoOpen] = useState(false);
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [isAddPartOpen, setIsAddPartOpen] = useState(false);
  const [isAddOutsidePurchaseOpen, setIsAddOutsidePurchaseOpen] = useState(false);
  const [isAddWorkUpdateOpen, setIsAddWorkUpdateOpen] = useState(false);
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);
  const [isEditJobInfoOpen, setIsEditJobInfoOpen] = useState(false);

  // New Finding State
  const [findingDesc, setFindingDesc] = useState('');
  const [findingSeverity, setFindingSeverity] = useState('Medium');
  const [findingAction, setFindingAction] = useState('');
  const [findingCost, setFindingCost] = useState('');

  // New Photo State
  const [photoStage, setPhotoStage] = useState('During');
  const [photoUrl] = useState('https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400');
  const [photoCaption, setPhotoCaption] = useState('');

  // New Service Form State
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceCategory] = useState('Mechanical Works');
  const [newServiceRate, setNewServiceRate] = useState('1500');
  const [newServiceStaff] = useState('Ajmal K');

  // New Part Form State
  const [newPartName, setNewPartName] = useState('');
  const [newPartQty, setNewPartQty] = useState('1');
  const [newPartPrice, setNewPartPrice] = useState('850');

  // New Outside Purchase Form State
  const [opSupplier] = useState('ABC Auto Parts');
  const [opPartName, setOpPartName] = useState('');
  const [opCost, setOpCost] = useState('1000');
  const [opSelling, setOpSelling] = useState('1400');
  const [opBillNo] = useState('');

  // New Work Update State
  const [workNote, setWorkNote] = useState('');

  // Payment Recording State
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('UPI / QR');

  // Edit Job State
  const [editKm, setEditKm] = useState('');
  const [editFuel, setEditFuel] = useState('50%');
  const [editDelivery, setEditDelivery] = useState('');
  const [editNotes, setEditNotes] = useState('');

  useEffect(() => {
    loadJobDetails();
  }, [id]);

  useEffect(() => {
    if (activeTabRef.current) {
      activeTabRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeTab]);

  const loadJobDetails = async () => {
    setLoading(true);
    try {
      const targetId = id || 'JOB-00251';
      const data = await jobService.getJobById(targetId);
      if (data) {
        setJob(data);
        setEditKm(data.kilometre || '');
        setEditFuel(data.fuelLevel || '50%');
        setEditDelivery(data.expectedDeliveryDate || '');
        setEditNotes(data.notes || '');
        
        // Fetch Vehicle Inspection Data
        const insp = await jobInspectionService.getInspection(targetId);
        setInspectionData(insp);
      }
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

  const toggleCategory = (catId) => {
    setExpandedCategories(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  const handleChecklistStatusChange = async (itemName, status, catName) => {
    if (!job) return;
    const updatedInsp = await jobInspectionService.updateChecklistItem(job.id, itemName, status);
    setInspectionData(updatedInsp);

    if (status === 'Issue Found') {
      setSelectedIssueItem(itemName);
      setIssueCategory(catName);
      setIssueTitle(`${itemName} Fault`);
      setIssueFinding(`Discovered abnormality during ${itemName} check.`);
      setIssueAction(`Inspect & replace ${itemName.toLowerCase()}`);
      setIsIssueModalOpen(true);
    }
  };

  const handleSaveIssueFinding = async (e) => {
    e.preventDefault();
    if (!job) return;
    const payload = {
      title: issueTitle || selectedIssueItem,
      category: issueCategory,
      description: issueFinding,
      severity: issueSeverity,
      technicianFinding: issueFinding,
      recommendedAction: issueAction,
      estimatedLabourTime: issueLabourTime,
      estimatedLabourCharge: issueLabourCharge,
      requiredParts: issueRequiredParts,
      estimatedPartCharge: issuePartCharge,
      photos: issuePhotoUrl ? [issuePhotoUrl] : [],
      complaintId: issueComplaintId || null,
      notes: issueNotes
    };
    await jobInspectionService.addFinding(job.id, payload);
    setIsIssueModalOpen(false);
    resetIssueForm();
    showToast(`Finding logged for ${selectedIssueItem}`);
    loadJobDetails();
  };

  const resetIssueForm = () => {
    setSelectedIssueItem('');
    setIssueTitle('');
    setIssueFinding('');
    setIssueAction('');
    setIssueLabourCharge('');
    setIssueRequiredParts('');
    setIssuePartCharge('');
    setIssuePhotoUrl('');
    setIssueComplaintId('');
    setIssueNotes('');
  };

  const handleAddDiagnosticCodeSubmit = async (e) => {
    e.preventDefault();
    if (!job) return;
    await jobInspectionService.addDiagnosticCode(job.id, {
      code: obdCode,
      system: obdSystem,
      description: obdDescription,
      status: obdStatus
    });
    setIsDiagnosticModalOpen(false);
    setObdCode('');
    setObdDescription('');
    showToast('Diagnostic scan code added');
    loadJobDetails();
  };

  const handleAddToEstimate = async (findingId) => {
    if (!job) return;
    await jobInspectionService.addFindingToEstimate(job.id, findingId);
    showToast('Finding converted to Estimate Line Item!');
    loadJobDetails();
  };

  const handleCompleteInspectionAction = async () => {
    if (!job) return;
    const hasFindings = (inspectionData?.findings || []).length > 0;
    const res = await jobInspectionService.completeInspection(job.id, hasFindings);
    showToast(`Inspection completed! Job status: ${res.newJobStatus}`);
    loadJobDetails();
  };

  if (loading) return <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading job card details...</div>;
  if (!job) return <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>Job Card record not found.</div>;

  // Financial Summaries
  const servicesTotal = (job.services || []).reduce((acc, s) => acc + (s.labourRate || 0), 0);
  const partsTotal = (job.partsUsed || []).reduce((acc, p) => acc + (p.total || 0), 0);
  const outsidePurchasesSellingTotal = (job.outsidePurchases || []).reduce((acc, op) => acc + (op.sellingPrice || 0), 0);
  const grossJobTotal = servicesTotal + partsTotal + outsidePurchasesSellingTotal;
  const advancePaidVal = job.billing?.advancePaid || 0;
  const balanceDueVal = Math.max(0, grossJobTotal - advancePaidVal);

  // Inspection Checklist Stats Calculation
  let totalChecksCount = 0;
  let goodCount = 0;
  let needsAttentionCount = 0;
  let issuesFoundCount = 0;
  let criticalCount = 0;

  if (inspectionData?.checklist) {
    Object.values(inspectionData.checklist).forEach(st => {
      if (st !== 'Not Checked') totalChecksCount++;
      if (st === 'Good') goodCount++;
      if (st === 'Needs Attention') needsAttentionCount++;
      if (st === 'Issue Found') issuesFoundCount++;
    });
  }
  if (inspectionData?.findings) {
    criticalCount = inspectionData.findings.filter(f => f.severity === 'High' || f.severity === 'Critical').length;
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: ClipboardCheck },
    { id: 'inspection', label: 'Inspection', icon: Wrench },
    { id: 'photos', label: 'Photos', icon: Camera },
    { id: 'estimate', label: 'Estimate', icon: DollarSign },
    { id: 'services', label: 'Services', icon: Wrench },
    { id: 'parts', label: 'Parts & Stock', icon: Package },
    { id: 'work-updates', label: 'Work Updates', icon: Clock },
    { id: 'quality-check', label: 'Quality Check', icon: CheckCircle2 },
    { id: 'billing', label: 'Billing', icon: FileText },
    { id: 'delivery', label: 'Delivery', icon: Truck },
    { id: 'timeline', label: 'Timeline', icon: Clock }
  ];

  // Primary Action Logic based on Job Status
  const getPrimaryMobileAction = () => {
    switch (job.status) {
      case 'Inspection':
        return { label: 'Perform Inspection', icon: Wrench, action: () => setActiveTab('inspection') };
      case 'Awaiting Approval':
        return { label: 'Review Estimate', icon: DollarSign, action: () => setActiveTab('estimate') };
      case 'In Progress':
        return { label: 'Add Work Update', icon: Clock, action: () => setIsAddWorkUpdateOpen(true) };
      case 'Quality Check':
        return { label: 'Complete Quality Check', icon: CheckCircle2, action: () => setActiveTab('quality-check') };
      case 'Ready for Delivery':
        return { label: 'Deliver Vehicle', icon: Truck, action: () => setActiveTab('delivery') };
      default:
        return { label: 'Update Status', icon: RotateCcw, action: () => setIsStatusModalOpen(true) };
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    await jobService.updateJobStatus(job.id, newStatus);
    showToast(`Job status updated to ${newStatus}.`);
    setIsStatusModalOpen(false);
    loadJobDetails();
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    const updatedServices = [
      ...(job.services || []),
      {
        id: `SRV-${Date.now()}`,
        serviceCategory: 'Mechanical Works',
        serviceName: newServiceName,
        qty: 1,
        labourRate: Number(newServiceRate),
        assignedStaff: 'Ajmal K',
        estimatedDuration: '2 Hours',
        status: 'In Progress'
      }
    ];
    await jobService.updateJob(job.id, { services: updatedServices });
    showToast('Service added to job card.');
    setIsAddServiceOpen(false);
    setNewServiceName('');
    loadJobDetails();
  };

  const handleAddPart = async (e) => {
    e.preventDefault();
    const updatedParts = [
      ...(job.partsUsed || []),
      {
        id: `P-${Date.now()}`,
        partId: `STK-${Date.now().toString().slice(-4)}`,
        name: newPartName,
        sku: `SKU-${Date.now().toString().slice(-4)}`,
        qty: Number(newPartQty),
        unitPrice: Number(newPartPrice),
        total: Number(newPartQty) * Number(newPartPrice),
        status: 'Issued',
        source: 'Inventory'
      }
    ];
    await jobService.updateJob(job.id, { partsUsed: updatedParts });
    showToast('Inventory part issued to job.');
    setIsAddPartOpen(false);
    setNewPartName('');
    loadJobDetails();
  };

  const handleAddOutsidePurchase = async (e) => {
    e.preventDefault();
    const updatedPurchases = [
      ...(job.outsidePurchases || []),
      {
        id: `OP-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        supplier: 'ABC Auto Parts',
        partName: opPartName,
        partNumber: `EXT-${Date.now().toString().slice(-4)}`,
        qty: 1,
        purchasePrice: Number(opCost),
        sellingPrice: Number(opSelling),
        markup: `${Math.round(((opSelling - opCost) / opCost) * 100)}%`,
        billNo: `BILL-${Date.now().toString().slice(-4)}`,
        paymentStatus: 'Paid',
        status: 'Purchased'
      }
    ];
    await jobService.updateJob(job.id, { outsidePurchases: updatedPurchases });
    showToast('Outside purchase logged to job.');
    setIsAddOutsidePurchaseOpen(false);
    setOpPartName('');
    loadJobDetails();
  };

  const handleAddWorkUpdate = async (e) => {
    e.preventDefault();
    const updatedUpdates = [
      {
        id: `UPD-${Date.now()}`,
        staff: 'Current Manager',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'Work Progress',
        note: workNote,
        status: job.status
      },
      ...(job.workUpdates || [])
    ];
    await jobService.updateJob(job.id, { workUpdates: updatedUpdates });
    showToast('Work update posted.');
    setIsAddWorkUpdateOpen(false);
    setWorkNote('');
    loadJobDetails();
  };

  const handleAddInspectionFinding = async (e) => {
    e.preventDefault();
    const newFinding = {
      title: findingDesc,
      category: 'GENERAL',
      description: findingDesc,
      severity: findingSeverity,
      technicianFinding: findingDesc,
      recommendedAction: findingAction,
      estimatedLabourTime: '1 Hour',
      estimatedLabourCharge: Number(findingCost || 0),
      requiredParts: findingAction,
      estimatedPartCharge: 0
    };
    await jobInspectionService.addFinding(job.id, newFinding);
    showToast('Inspection finding logged.');
    setIsAddFindingOpen(false);
    setFindingDesc('');
    setFindingAction('');
    setFindingCost('');
    loadJobDetails();
  };

  const handleAddPhoto = async (e) => {
    e.preventDefault();
    const newPh = {
      id: `PH-${Date.now()}`,
      stage: photoStage,
      url: photoUrl,
      caption: photoCaption || 'Inspection photo',
      uploadedBy: 'Service Advisor',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const updatedPhotos = [...(job.photos || []), newPh];
    await jobService.updateJob(job.id, { photos: updatedPhotos });
    showToast('Photo uploaded.');
    setIsAddPhotoOpen(false);
    setPhotoCaption('');
    loadJobDetails();
  };

  const handleRecordPayment = async (e) => {
    e.preventDefault();
    const newTotalPaid = (job.billing?.advancePaid || 0) + Number(paymentAmount);
    const newStatus = newTotalPaid >= grossJobTotal ? 'Paid' : 'Partially Paid';
    await jobService.updateJob(job.id, {
      billing: {
        ...job.billing,
        advancePaid: newTotalPaid,
        paidAmount: newTotalPaid,
        outstandingBalance: Math.max(0, grossJobTotal - newTotalPaid)
      },
      paymentStatus: newStatus
    });
    showToast(`Payment of ${formatINR(paymentAmount)} recorded.`);
    setIsRecordPaymentOpen(false);
    setPaymentAmount('');
    loadJobDetails();
  };

  const handleSaveEditJobInfo = async (e) => {
    e.preventDefault();
    await jobService.updateJob(job.id, {
      kilometre: editKm,
      fuelLevel: editFuel,
      expectedDeliveryDate: editDelivery,
      notes: editNotes
    });
    showToast('Job information updated.');
    setIsEditJobInfoOpen(false);
    loadJobDetails();
  };

  const handleEstimateAction = async (newApprovalStatus) => {
    await jobService.updateJob(job.id, { approvalStatus: newApprovalStatus });
    showToast(`Estimate status updated to ${newApprovalStatus}.`);
    loadJobDetails();
  };

  const primaryMobile = getPrimaryMobileAction();
  const PrimaryMobileIcon = primaryMobile.icon;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%', maxWidth: '100%', minWidth: 0, boxSizing: 'border-box', paddingBottom: '70px' }}>
      
      {/* Toast Feedback Banner */}
      {toastMsg && (
        <div style={{ backgroundColor: 'var(--success)', color: '#ffffff', padding: '10px 14px', borderRadius: '10px', fontSize: '13px', fontWeight: '600' }}>
          {toastMsg}
        </div>
      )}

      {/* SINGLE UNIFIED RESPONSIVE JOB CARD HEADER */}
      <div style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '14px',
        padding: '12px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => navigate('/jobs')}
              style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <ArrowLeft size={16} />
            </button>
            <strong style={{ fontSize: '16px', fontWeight: '800', color: 'var(--primary)' }}>{job.jobNumber}</strong>
          </div>
          <span style={{ fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '6px', backgroundColor: 'var(--primary-soft)', color: 'var(--primary)' }}>
            {job.status}
          </span>
        </div>

        <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>
          {job.vehicleInfo} <span style={{ color: 'var(--primary)', fontWeight: '600' }}>({job.vehicleReg})</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
          <span>Customer: <strong style={{ color: 'var(--text-primary)' }}>{job.customerName}</strong></span>
          <span>Expected: <strong style={{ color: 'var(--text-primary)' }}>Today 5:30 PM</strong></span>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
          <button
            onClick={primaryMobile.action}
            style={{ flex: 1, height: '40px', borderRadius: '10px', backgroundColor: 'var(--primary)', color: '#ffffff', border: 'none', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
          >
            <PrimaryMobileIcon size={16} /> {primaryMobile.label}
          </button>
          <button
            onClick={() => setIsMoreMenuOpen(true)}
            style={{ width: '40px', height: '40px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* JOB TABS RAIL (11 TABS) */}
      <div style={{ width: '100%', borderBottom: '1px solid var(--border)', backgroundColor: 'var(--surface)', borderRadius: '12px', overflow: 'hidden' }}>
        <div
          className="scroll-hidden"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            padding: '4px 8px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                ref={isActive ? activeTabRef : null}
                onClick={() => setActiveTab(t.id)}
                style={{
                  padding: '9px 12px',
                  fontSize: '12.5px',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                  borderBottom: isActive ? '2px solid var(--primary)' : '2px solid transparent',
                  background: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderTop: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={14} />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN LAYOUT CONTENT */}
      <div className="job-details-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', minWidth: 0 }}>
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>Vehicle Check-In & Customer Info</h3>
                <button
                  onClick={() => setIsEditJobInfoOpen(true)}
                  style={{ fontSize: '12px', fontWeight: '600', color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Edit size={14} /> Edit Info
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', fontSize: '13px' }}>
                <div style={{ backgroundColor: 'var(--surface-2)', padding: '10px 12px', borderRadius: '10px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Customer Details</span>
                  <strong>{job.customerName}</strong>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{job.customerPhone} • {job.customerEmail}</div>
                </div>
                <div style={{ backgroundColor: 'var(--surface-2)', padding: '10px 12px', borderRadius: '10px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Vehicle & Registration</span>
                  <strong>{job.vehicleInfo}</strong>
                  <div style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: '700' }}>{job.vehicleReg}</div>
                </div>
                <div style={{ backgroundColor: 'var(--surface-2)', padding: '10px 12px', borderRadius: '10px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Odometer & Fuel</span>
                  <strong>{job.kilometre}</strong>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Fuel Level: {job.fuelLevel}</div>
                </div>
                <div style={{ backgroundColor: 'var(--surface-2)', padding: '10px 12px', borderRadius: '10px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Staff & Advisor</span>
                  <strong>Lead: {job.assignedEmployeeName}</strong>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>SA: {job.serviceAdvisor}</div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>Customer Reported Complaints</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {job.complaints?.map((c) => (
                    <div key={c.id} style={{ backgroundColor: 'var(--surface-2)', padding: '10px 12px', borderRadius: '8px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong style={{ color: 'var(--text-primary)' }}>{c.description}</strong>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>"{c.wording}"</div>
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '6px', backgroundColor: 'var(--primary-soft)', color: 'var(--primary)' }}>{c.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COMPLETE VEHICLE INSPECTION & DIAGNOSTIC SYSTEM */}
          {activeTab === 'inspection' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* INSPECTION HEADER & STATUS BANNER */}
              <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Wrench size={18} style={{ color: 'var(--primary)' }} /> Vehicle Diagnostic Inspection
                    </h3>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Inspector: <strong>{inspectionData?.technician || job.assignedEmployeeName}</strong> • Status: <span style={{ fontWeight: '700', color: inspectionData?.status === 'Completed' ? 'var(--success)' : 'var(--primary)' }}>{inspectionData?.status || 'In Progress'}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={handleCompleteInspectionAction}
                      style={{ padding: '8px 14px', borderRadius: '10px', backgroundColor: 'var(--success)', color: '#fff', border: 'none', fontSize: '12.5px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <CheckCircle2 size={16} /> Complete Inspection
                    </button>
                  </div>
                </div>

                {/* 6. INSPECTION SUMMARY METRICS */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '8px', paddingTop: '6px' }}>
                  <div style={{ backgroundColor: 'var(--surface-2)', padding: '10px', borderRadius: '10px', textAlign: 'center', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Total Checks</div>
                    <strong style={{ fontSize: '16px', color: 'var(--text-primary)' }}>{totalChecksCount}</strong>
                  </div>
                  <div style={{ backgroundColor: 'var(--success-soft)', padding: '10px', borderRadius: '10px', textAlign: 'center', border: '1px solid var(--success-soft)' }}>
                    <div style={{ fontSize: '11px', color: 'var(--success)' }}>Good</div>
                    <strong style={{ fontSize: '16px', color: 'var(--success)' }}>{goodCount}</strong>
                  </div>
                  <div style={{ backgroundColor: 'var(--warning-soft)', padding: '10px', borderRadius: '10px', textAlign: 'center', border: '1px solid var(--warning-soft)' }}>
                    <div style={{ fontSize: '11px', color: 'var(--warning)' }}>Attention</div>
                    <strong style={{ fontSize: '16px', color: 'var(--warning)' }}>{needsAttentionCount}</strong>
                  </div>
                  <div style={{ backgroundColor: 'var(--danger-soft)', padding: '10px', borderRadius: '10px', textAlign: 'center', border: '1px solid var(--danger-soft)' }}>
                    <div style={{ fontSize: '11px', color: 'var(--danger)' }}>Issues Found</div>
                    <strong style={{ fontSize: '16px', color: 'var(--danger)' }}>{issuesFoundCount}</strong>
                  </div>
                  <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', padding: '10px', borderRadius: '10px', textAlign: 'center', border: '1px solid var(--danger)' }}>
                    <div style={{ fontSize: '11px', color: 'var(--danger)' }}>Critical</div>
                    <strong style={{ fontSize: '16px', color: 'var(--danger)' }}>{criticalCount}</strong>
                  </div>
                  <div style={{ backgroundColor: 'var(--primary-soft)', padding: '10px', borderRadius: '10px', textAlign: 'center', border: '1px solid var(--primary-soft)' }}>
                    <div style={{ fontSize: '11px', color: 'var(--primary)' }}>Repairs Rec.</div>
                    <strong style={{ fontSize: '16px', color: 'var(--primary)' }}>{(inspectionData?.findings || []).length}</strong>
                  </div>
                </div>
              </div>

              {/* 1. CUSTOMER COMPLAINTS LINKING SECTION */}
              <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Link size={16} style={{ color: 'var(--primary)' }} /> Customer Complaints & Verification
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {job.complaints?.map((c) => (
                    <div key={c.id} style={{ backgroundColor: 'var(--surface-2)', padding: '12px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                      <div>
                        <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{c.description}</strong>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Customer statement: "{c.wording}"</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <select
                          value={c.status}
                          onChange={async (e) => {
                            const updatedComplaints = job.complaints.map(item => item.id === c.id ? { ...item, status: e.target.value } : item);
                            await jobService.updateJob(job.id, { complaints: updatedComplaints });
                            loadJobDetails();
                            showToast(`Complaint status set to ${e.target.value}`);
                          }}
                          style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}
                        >
                          <option value="Pending Check">Pending Check</option>
                          <option value="Issue Confirmed">Issue Confirmed</option>
                          <option value="No Issue Found">No Issue Found</option>
                          <option value="Resolved Later">Resolved Later</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. VEHICLE INSPECTION CHECKLIST (10 CATEGORIES) */}
              <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckSquare size={16} style={{ color: 'var(--primary)' }} /> Category Checklist Inspection
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {DEFAULT_INSPECTION_CATEGORIES.map((cat) => {
                    const isExpanded = !!expandedCategories[cat.id];
                    let catIssuesCount = 0;
                    cat.items.forEach(item => {
                      if (inspectionData?.checklist?.[item] === 'Issue Found') catIssuesCount++;
                    });

                    return (
                      <div key={cat.id} style={{ border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden', backgroundColor: 'var(--surface-2)' }}>
                        <div
                          onClick={() => toggleCategory(cat.id)}
                          style={{ padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', backgroundColor: 'var(--surface)', userSelect: 'none' }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <strong style={{ fontSize: '13px', letterSpacing: '0.5px', color: 'var(--text-primary)' }}>{cat.name}</strong>
                            {catIssuesCount > 0 ? (
                              <span style={{ fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '999px', backgroundColor: 'var(--danger-soft)', color: 'var(--danger)' }}>
                                {catIssuesCount} Issue{catIssuesCount > 1 ? 's' : ''}
                              </span>
                            ) : (
                              <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--success)' }}>All Good</span>
                            )}
                          </div>
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>

                        {isExpanded && (
                          <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--border)' }}>
                            {cat.items.map((item) => {
                              const currStatus = inspectionData?.checklist?.[item] || 'Not Checked';

                              return (
                                <div key={item} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', padding: '6px 8px', borderRadius: '8px', backgroundColor: 'var(--surface)' }}>
                                  <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)' }}>{item}</span>
                                  
                                  {/* COMPACT SEGMENTED STATUS SELECTOR */}
                                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                    {[
                                      { key: 'Not Checked', label: 'Unchecked', color: 'var(--text-muted)', bg: 'transparent' },
                                      { key: 'Good', label: 'Good ✓', color: 'var(--success)', bg: 'var(--success-soft)' },
                                      { key: 'Needs Attention', label: 'Attention ⚠️', color: 'var(--warning)', bg: 'var(--warning-soft)' },
                                      { key: 'Issue Found', label: 'Issue ❌', color: 'var(--danger)', bg: 'var(--danger-soft)' },
                                      { key: 'Not Applicable', label: 'N/A', color: 'var(--text-muted)', bg: 'var(--surface-2)' }
                                    ].map(stOpt => {
                                      const isSel = currStatus === stOpt.key;
                                      return (
                                        <button
                                          key={stOpt.key}
                                          onClick={() => handleChecklistStatusChange(item, stOpt.key, cat.name)}
                                          style={{
                                            padding: '4px 8px',
                                            fontSize: '11px',
                                            fontWeight: isSel ? '700' : '500',
                                            borderRadius: '6px',
                                            border: isSel ? `1px solid ${stOpt.color}` : '1px solid var(--border)',
                                            backgroundColor: isSel ? stOpt.bg : 'var(--surface-2)',
                                            color: isSel ? stOpt.color : 'var(--text-secondary)',
                                            cursor: 'pointer'
                                          }}
                                        >
                                          {stOpt.label}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* PROBLEM FINDING CARDS & RECOMMENDED REPAIRS */}
              <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <AlertTriangle size={16} style={{ color: 'var(--danger)' }} /> Discovered Vehicle Problems ({inspectionData?.findings?.length || 0})
                  </h4>
                  <button
                    onClick={() => {
                      setSelectedIssueItem('General Issue');
                      setIssueCategory('ENGINE');
                      setIsIssueModalOpen(true);
                    }}
                    style={{ padding: '6px 10px', borderRadius: '8px', backgroundColor: 'var(--primary)', color: '#fff', border: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Plus size={14} /> Add Problem
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {(!inspectionData?.findings || inspectionData.findings.length === 0) ? (
                    <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                      No mechanical issues logged yet. Mark items as "Issue Found" to record findings.
                    </div>
                  ) : (
                    inspectionData.findings.map((f) => (
                      <div key={f.id} style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                          <div>
                            <span style={{ fontSize: '10px', fontWeight: '700', padding: '2px 6px', borderRadius: '4px', backgroundColor: 'var(--primary-soft)', color: 'var(--primary)' }}>
                              {f.category}
                            </span>
                            <h5 style={{ fontSize: '14.5px', fontWeight: '800', color: 'var(--text-primary)', margin: '4px 0 2px 0' }}>{f.title}</h5>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Finding: {f.technicianFinding}</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <span style={{ fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '6px', backgroundColor: f.severity === 'High' || f.severity === 'Critical' ? 'var(--danger-soft)' : 'var(--warning-soft)', color: f.severity === 'High' || f.severity === 'Critical' ? 'var(--danger)' : 'var(--warning)' }}>
                              Severity: {f.severity}
                            </span>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Tech: {f.technician}</div>
                          </div>
                        </div>

                        <div style={{ backgroundColor: 'var(--surface)', padding: '10px', borderRadius: '8px', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <div><strong>Recommended Action:</strong> {f.recommendedAction}</div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginTop: '2px' }}>
                            <span>Labour: {formatINR(f.estimatedLabourCharge)} ({f.estimatedLabourTime})</span>
                            <span>Parts: {formatINR(f.estimatedPartCharge)}</span>
                          </div>
                        </div>

                        {/* ACTIONS FOOTER ON FINDING CARD */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', paddingTop: '4px', borderTop: '1px solid var(--border)' }}>
                          <span style={{ fontSize: '11.5px', fontWeight: '600', color: f.addedToEstimate ? 'var(--success)' : 'var(--warning)' }}>
                            {f.addedToEstimate ? '✓ Added to Estimate' : 'Pending Estimate'}
                          </span>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            {!f.addedToEstimate && (
                              <button
                                onClick={() => handleAddToEstimate(f.id)}
                                style={{ padding: '6px 12px', borderRadius: '8px', backgroundColor: 'var(--primary)', color: '#fff', border: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                              >
                                <PlusCircle size={14} /> Add to Estimate
                              </button>
                            )}
                            <button
                              onClick={() => jobInspectionService.deleteFinding(job.id, f.id).then(() => loadJobDetails())}
                              style={{ padding: '6px 10px', borderRadius: '8px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--danger)', fontSize: '12px', cursor: 'pointer' }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* 3. DIAGNOSTIC OBD SCAN SECTION */}
              <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FileCode size={16} style={{ color: 'var(--primary)' }} /> OBD Diagnostic Scan (Optional)
                    </h4>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      Scanner: {inspectionData?.diagnosticScan?.scannerTool || 'Launch X431 Pro'}
                    </div>
                  </div>
                  <button
                    onClick={() => setIsDiagnosticModalOpen(true)}
                    style={{ padding: '6px 12px', borderRadius: '8px', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-primary)', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    + Add Fault Code
                  </button>
                </div>

                {(!inspectionData?.diagnosticScan?.codes || inspectionData.diagnosticScan.codes.length === 0) ? (
                  <div style={{ padding: '12px', backgroundColor: 'var(--surface-2)', borderRadius: '10px', fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center' }}>
                    No diagnostic trouble codes (DTC) recorded for this job.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {inspectionData.diagnosticScan.codes.map((cd) => (
                      <div key={cd.id} style={{ backgroundColor: 'var(--surface-2)', padding: '10px 12px', borderRadius: '8px', fontSize: '12.5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <strong style={{ color: 'var(--danger)', fontSize: '13px' }}>{cd.code}</strong> - <span style={{ fontWeight: '600' }}>{cd.system}</span>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{cd.description}</div>
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: '700', padding: '2px 6px', borderRadius: '4px', backgroundColor: 'var(--danger-soft)', color: 'var(--danger)' }}>{cd.status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 3: PHOTOS */}
          {activeTab === 'photos' && (
            <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>Vehicle Condition & Workshop Photos</h3>
                <button
                  onClick={() => setIsAddPhotoOpen(true)}
                  style={{ padding: '6px 12px', borderRadius: '8px', backgroundColor: 'var(--primary)', color: '#fff', border: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Camera size={14} /> Add Photo
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                {job.photos?.map((p) => (
                  <div key={p.id} style={{ backgroundColor: 'var(--surface-2)', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                    <img src={p.url} alt={p.caption} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                    <div style={{ padding: '10px', fontSize: '12px' }}>
                      <strong style={{ display: 'block', color: 'var(--text-primary)' }}>{p.stage}: {p.caption}</strong>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>By {p.uploadedBy} • {p.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ESTIMATE */}
          {activeTab === 'estimate' && (
            <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>Customer Work Estimate</h3>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>Version: {job.estimates?.[0]?.version || 'Estimate V1'}</div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleEstimateAction('Approved')}
                    style={{ padding: '6px 12px', borderRadius: '8px', backgroundColor: 'var(--success)', color: '#fff', border: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleEstimateAction('Rejected')}
                    style={{ padding: '6px 12px', borderRadius: '8px', backgroundColor: 'var(--danger-soft)', color: 'var(--danger)', border: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                  >
                    Reject
                  </button>
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--surface-2)', padding: '14px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Services Labour Subtotal:</span><strong>{formatINR(servicesTotal)}</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Inventory Parts Subtotal:</span><strong>{formatINR(partsTotal)}</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Outside Purchases Billed:</span><strong>{formatINR(outsidePurchasesSellingTotal)}</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: '800', color: 'var(--primary)', borderTop: '1px solid var(--border)', paddingTop: '8px', marginTop: '4px' }}>
                  <span>Grand Total Estimate:</span>
                  <span>{formatINR(grossJobTotal)}</span>
                </div>
              </div>

              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Approval Status: <strong style={{ color: job.approvalStatus === 'Approved' ? 'var(--success)' : 'var(--warning)' }}>{job.approvalStatus}</strong> (Approved by: {job.estimates?.[0]?.approvedBy || 'Customer Phone Approval'})
              </div>
            </div>
          )}

          {/* TAB 5: SERVICES */}
          {activeTab === 'services' && (
            <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>Job Services & Staff Labour</h3>
                <button
                  onClick={() => setIsAddServiceOpen(true)}
                  style={{ padding: '6px 12px', borderRadius: '8px', backgroundColor: 'var(--primary)', color: '#fff', border: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Plus size={14} /> Add Service
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {job.services?.map((s) => (
                  <div key={s.id} style={{ backgroundColor: 'var(--surface-2)', padding: '12px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{s.serviceName}</strong>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Staff: {s.assignedStaff} • {s.serviceCategory}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--success)', display: 'block' }}>{s.status}</span>
                      <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{formatINR(s.labourRate)}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: PARTS */}
          {activeTab === 'parts' && (
            <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>Inventory Parts & Outside Purchases</h3>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => setIsAddPartOpen(true)}
                    style={{ padding: '6px 10px', borderRadius: '8px', backgroundColor: 'var(--primary)', color: '#fff', border: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                  >
                    + Issue Stock
                  </button>
                  <button
                    onClick={() => setIsAddOutsidePurchaseOpen(true)}
                    style={{ padding: '6px 10px', borderRadius: '8px', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-primary)', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                  >
                    + Outside Purchase
                  </button>
                </div>
              </div>

              <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>A. Workshop Inventory Parts</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {job.partsUsed?.map((p) => (
                  <div key={p.id} style={{ backgroundColor: 'var(--surface-2)', padding: '10px 12px', borderRadius: '8px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong>{p.name}</strong> ({p.sku})
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Qty: {p.qty} × {formatINR(p.unitPrice)}</div>
                    </div>
                    <strong style={{ color: 'var(--primary)' }}>{formatINR(p.total)}</strong>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '8px' }}>B. Vehicle Outside Purchases</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {job.outsidePurchases?.map((op) => (
                  <div key={op.id} style={{ backgroundColor: 'var(--surface-2)', padding: '10px 12px', borderRadius: '8px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong>{op.partName}</strong> (Bill #{op.billNo})
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Supplier: {op.supplier} • Cost: {formatINR(op.purchasePrice)}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Markup: {op.markup}</span>
                      <strong style={{ color: 'var(--success)' }}>Billed: {formatINR(op.sellingPrice)}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: WORK UPDATES */}
          {activeTab === 'work-updates' && (
            <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>Workshop Work Log</h3>
                <button
                  onClick={() => setIsAddWorkUpdateOpen(true)}
                  style={{ padding: '6px 12px', borderRadius: '8px', backgroundColor: 'var(--primary)', color: '#fff', border: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                >
                  + Post Update
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {job.workUpdates?.map((u) => (
                  <div key={u.id} style={{ backgroundColor: 'var(--surface-2)', padding: '12px', borderRadius: '10px', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700' }}>
                      <span>{u.staff} ({u.type})</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{u.time}</span>
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>{u.note}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: QUALITY CHECK */}
          {activeTab === 'quality-check' && (
            <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>Quality Check Checklist</h3>
                <span style={{ fontSize: '12px', fontWeight: '700', padding: '4px 10px', borderRadius: '8px', backgroundColor: job.qualityCheck?.status === 'Pass' ? 'var(--success-soft)' : 'var(--warning-soft)', color: job.qualityCheck?.status === 'Pass' ? 'var(--success)' : 'var(--warning)' }}>
                  QC Status: {job.qualityCheck?.status || 'Pending'}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {job.qualityCheck?.checklist?.map((item, idx) => (
                  <div key={idx} style={{ backgroundColor: 'var(--surface-2)', padding: '10px 12px', borderRadius: '8px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{item.item}</span>
                    <span style={{ fontWeight: '700', color: item.status === 'Pass' ? 'var(--success)' : 'var(--warning)' }}>{item.status} ({item.remark})</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: BILLING */}
          {activeTab === 'billing' && (
            <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>Billing Summary</h3>
                <button
                  onClick={() => setIsRecordPaymentOpen(true)}
                  style={{ padding: '6px 12px', borderRadius: '8px', backgroundColor: 'var(--success)', color: '#fff', border: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                >
                  Record Payment
                </button>
              </div>

              <div style={{ backgroundColor: 'var(--surface-2)', padding: '14px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Services Subtotal:</span><strong>{formatINR(servicesTotal)}</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Inventory Parts Subtotal:</span><strong>{formatINR(partsTotal)}</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Outside Purchases Billed:</span><strong>{formatINR(outsidePurchasesSellingTotal)}</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--success)' }}><span>Total Paid / Advance:</span><strong>-{formatINR(advancePaidVal)}</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: '800', color: 'var(--primary)', borderTop: '1px solid var(--border)', paddingTop: '8px', marginTop: '4px' }}>
                  <span>Outstanding Balance Due:</span>
                  <span>{formatINR(balanceDueVal)}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: DELIVERY */}
          {activeTab === 'delivery' && (
            <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>Vehicle Handover & Delivery</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', fontSize: '13px' }}>
                <div style={{ backgroundColor: 'var(--surface-2)', padding: '10px 12px', borderRadius: '10px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Delivery Status</span>
                  <strong>{job.delivery?.readyStatus || 'Pending'}</strong>
                </div>
                <div style={{ backgroundColor: 'var(--surface-2)', padding: '10px 12px', borderRadius: '10px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Final Odometer</span>
                  <strong>{job.delivery?.finalKm || job.kilometre}</strong>
                </div>
                <div style={{ backgroundColor: 'var(--surface-2)', padding: '10px 12px', borderRadius: '10px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Customer Acknowledgement</span>
                  <strong>{job.delivery?.acknowledgedBy || 'Pending Sign-off'}</strong>
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: TIMELINE */}
          {activeTab === 'timeline' && (
            <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>Activity Timeline</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative', paddingLeft: '20px' }}>
                <div style={{ position: 'absolute', left: '7px', top: '8px', bottom: '8px', width: '2px', backgroundColor: 'var(--border)' }} />
                {job.timeline?.map((t, idx) => (
                  <div key={idx} style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '-20px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--primary)' }} />
                    <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--primary)' }}>{t.time}</span>
                    <h4 style={{ fontSize: '13.5px', fontWeight: '600', color: 'var(--text-primary)', margin: '2px 0' }}>{t.title}</h4>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* MODAL / SHEET: ISSUE FOUND DETAIL FORM */}
      <ResponsiveModalSheet
        isOpen={isIssueModalOpen}
        onClose={() => setIsIssueModalOpen(false)}
        title={`Log Vehicle Issue (${selectedIssueItem})`}
        maxWidth="520px"
      >
        <form onSubmit={handleSaveIssueFinding} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Problem Title *</label>
            <input type="text" required value={issueTitle} onChange={(e) => setIssueTitle(e.target.value)} placeholder="e.g. Engine Mount Damaged" style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '13px' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Category</label>
              <input type="text" value={issueCategory} readOnly style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-muted)', fontSize: '13px' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Severity</label>
              <select value={issueSeverity} onChange={(e) => setIssueSeverity(e.target.value)} style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '13px' }}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Technician Finding Details *</label>
            <textarea rows={2} required value={issueFinding} onChange={(e) => setIssueFinding(e.target.value)} placeholder="e.g. Excessive engine movement found during idling test." style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '13px', resize: 'vertical' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Recommended Repair Action *</label>
            <input type="text" required value={issueAction} onChange={(e) => setIssueAction(e.target.value)} placeholder="e.g. Replace engine mounting assembly" style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '13px' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Labour Charge (₹)</label>
              <input type="number" value={issueLabourCharge} onChange={(e) => setIssueLabourCharge(e.target.value)} placeholder="800" style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '13px' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Part Est. Charge (₹)</label>
              <input type="number" value={issuePartCharge} onChange={(e) => setIssuePartCharge(e.target.value)} placeholder="2200" style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '13px' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Link Customer Complaint</label>
            <select value={issueComplaintId} onChange={(e) => setIssueComplaintId(e.target.value)} style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '13px' }}>
              <option value="">-- None --</option>
              {job.complaints?.map(c => (
                <option key={c.id} value={c.id}>{c.description}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
            <button type="button" onClick={() => setIsIssueModalOpen(false)} style={{ flex: 1, height: '44px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-primary)', fontWeight: '600' }}>Cancel</button>
            <button type="submit" style={{ flex: 1, height: '44px', borderRadius: '10px', border: 'none', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: '700' }}>Save Finding</button>
          </div>
        </form>
      </ResponsiveModalSheet>

      {/* MODAL / SHEET: DIAGNOSTIC OBD CODE FORM */}
      <ResponsiveModalSheet
        isOpen={isDiagnosticModalOpen}
        onClose={() => setIsDiagnosticModalOpen(false)}
        title="Add OBD Diagnostic Trouble Code"
        maxWidth="460px"
      >
        <form onSubmit={handleAddDiagnosticCodeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>DTC Code *</label>
            <input type="text" required value={obdCode} onChange={(e) => setObdCode(e.target.value)} placeholder="e.g. P0301" style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '13px' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>System Component</label>
            <input type="text" value={obdSystem} onChange={(e) => setObdSystem(e.target.value)} placeholder="e.g. Engine / Transmission / ABS" style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '13px' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Description *</label>
            <input type="text" required value={obdDescription} onChange={(e) => setObdDescription(e.target.value)} placeholder="e.g. Cylinder 1 Misfire Detected" style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '13px' }} />
          </div>
          <button type="submit" style={{ height: '44px', borderRadius: '10px', border: 'none', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: '700', marginTop: '4px' }}>Save Fault Code</button>
        </form>
      </ResponsiveModalSheet>

      {/* MODAL / SHEET: CHANGE STATUS */}
      <ResponsiveModalSheet
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        title="Update Job Status"
        maxWidth="480px"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {['Draft', 'Checked In', 'Inspection', 'Awaiting Approval', 'In Progress', 'Waiting for Parts', 'Quality Check', 'Ready for Delivery', 'Delivered', 'Cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => handleUpdateStatus(st)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                border: '1px solid var(--border)',
                backgroundColor: job.status === st ? 'var(--primary-soft)' : 'var(--surface-2)',
                color: job.status === st ? 'var(--primary)' : 'var(--text-primary)',
                fontWeight: '700',
                fontSize: '13.5px',
                textAlign: 'left',
                cursor: 'pointer'
              }}
            >
              {st} {job.status === st && '✓'}
            </button>
          ))}
        </div>
      </ResponsiveModalSheet>

      {/* MODAL / SHEET: MORE ACTIONS */}
      <ResponsiveModalSheet
        isOpen={isMoreMenuOpen}
        onClose={() => setIsMoreMenuOpen(false)}
        title="Job Card Quick Actions"
        maxWidth="420px"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button onClick={() => { setIsMoreMenuOpen(false); setIsStatusModalOpen(true); }} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontWeight: '600', textAlign: 'left', cursor: 'pointer' }}>
            🔄 Change Status
          </button>
          <button onClick={() => { setIsMoreMenuOpen(false); setIsAddServiceOpen(true); }} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontWeight: '600', textAlign: 'left', cursor: 'pointer' }}>
            🛠️ Add Service
          </button>
          <button onClick={() => { setIsMoreMenuOpen(false); setIsAddPartOpen(true); }} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontWeight: '600', textAlign: 'left', cursor: 'pointer' }}>
            📦 Issue Stock Part
          </button>
          <button onClick={() => { setIsMoreMenuOpen(false); setIsAddOutsidePurchaseOpen(true); }} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontWeight: '600', textAlign: 'left', cursor: 'pointer' }}>
            🛒 Outside Purchase
          </button>
          <button onClick={() => { setIsMoreMenuOpen(false); setIsRecordPaymentOpen(true); }} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontWeight: '600', textAlign: 'left', cursor: 'pointer' }}>
            💳 Record Payment
          </button>
          <button onClick={() => { setIsMoreMenuOpen(false); navigate(`/invoices/create?jobId=${job.id}`); }} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: 'none', backgroundColor: 'var(--primary)', color: '#ffffff', fontWeight: '700', textAlign: 'left', cursor: 'pointer' }}>
            📄 Generate Invoice
          </button>
        </div>
      </ResponsiveModalSheet>

      {/* MODAL / SHEET: ADD INSPECTION FINDING */}
      <ResponsiveModalSheet
        isOpen={isAddFindingOpen}
        onClose={() => setIsAddFindingOpen(false)}
        title="Add Technician Finding"
        maxWidth="500px"
      >
        <form onSubmit={handleAddInspectionFinding} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Issue Description *</label>
            <input type="text" required value={findingDesc} onChange={(e) => setFindingDesc(e.target.value)} placeholder="e.g. Worn out front brake pads" style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '13px' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Severity</label>
            <select value={findingSeverity} onChange={(e) => setFindingSeverity(e.target.value)} style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '13px' }}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High (Critical)</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Recommended Action *</label>
            <input type="text" required value={findingAction} onChange={(e) => setFindingAction(e.target.value)} placeholder="e.g. Replace front brake pads & skim discs" style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '13px' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Estimated Cost (₹)</label>
            <input type="number" value={findingCost} onChange={(e) => setFindingCost(e.target.value)} placeholder="2800" style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '13px' }} />
          </div>
          <button type="submit" style={{ height: '46px', borderRadius: '12px', border: 'none', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: '700', cursor: 'pointer', marginTop: '6px' }}>Save Finding</button>
        </form>
      </ResponsiveModalSheet>

      {/* MODAL / SHEET: ADD PHOTO */}
      <ResponsiveModalSheet
        isOpen={isAddPhotoOpen}
        onClose={() => setIsAddPhotoOpen(false)}
        title="Upload Inspection / Work Photo"
        maxWidth="500px"
      >
        <form onSubmit={handleAddPhoto} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Repair Stage</label>
            <select value={photoStage} onChange={(e) => setPhotoStage(e.target.value)} style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '13px' }}>
              <option value="Before">Before Repair</option>
              <option value="During">During Repair</option>
              <option value="After">After Repair</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Photo Caption *</label>
            <input type="text" required value={photoCaption} onChange={(e) => setPhotoCaption(e.target.value)} placeholder="e.g. Engine mount crack detail" style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '13px' }} />
          </div>
          <button type="submit" style={{ height: '46px', borderRadius: '12px', border: 'none', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: '700', cursor: 'pointer', marginTop: '6px' }}>Upload Photo</button>
        </form>
      </ResponsiveModalSheet>

      {/* MODAL / SHEET: RECORD PAYMENT */}
      <ResponsiveModalSheet
        isOpen={isRecordPaymentOpen}
        onClose={() => setIsRecordPaymentOpen(false)}
        title="Record Customer Payment"
        maxWidth="480px"
      >
        <form onSubmit={handleRecordPayment} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Payment Amount (₹) *</label>
            <input type="number" required value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} placeholder="e.g. 5000" style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '13px' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Payment Mode</label>
            <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)} style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '13px' }}>
              <option value="UPI / QR">UPI / QR Code</option>
              <option value="Cash">Cash</option>
              <option value="Credit / Debit Card">Credit / Debit Card</option>
              <option value="Bank Transfer (NEFT/IMPS)">Bank Transfer (NEFT/IMPS)</option>
            </select>
          </div>
          <button type="submit" style={{ height: '46px', borderRadius: '12px', border: 'none', backgroundColor: 'var(--success)', color: '#fff', fontWeight: '700', cursor: 'pointer', marginTop: '6px' }}>Save Payment</button>
        </form>
      </ResponsiveModalSheet>

      {/* MODAL / SHEET: EDIT JOB INFO */}
      <ResponsiveModalSheet
        isOpen={isEditJobInfoOpen}
        onClose={() => setIsEditJobInfoOpen(false)}
        title="Edit Job Card Details"
        maxWidth="500px"
      >
        <form onSubmit={handleSaveEditJobInfo} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Odometer Reading *</label>
            <input type="text" required value={editKm} onChange={(e) => setEditKm(e.target.value)} style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '13px' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Fuel Level</label>
            <select value={editFuel} onChange={(e) => setEditFuel(e.target.value)} style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '13px' }}>
              <option value="Reserve">Reserve / Low</option>
              <option value="25%">25% Quarter</option>
              <option value="50%">50% Half</option>
              <option value="75%">75% Three Quarter</option>
              <option value="100%">100% Full Tank</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Expected Delivery Date</label>
            <input type="text" value={editDelivery} onChange={(e) => setEditDelivery(e.target.value)} style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '13px' }} />
          </div>
          <button type="submit" style={{ height: '46px', borderRadius: '12px', border: 'none', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: '700', cursor: 'pointer', marginTop: '6px' }}>Save Changes</button>
        </form>
      </ResponsiveModalSheet>

      {/* MODAL / SHEET: ADD SERVICE */}
      <ResponsiveModalSheet
        isOpen={isAddServiceOpen}
        onClose={() => setIsAddServiceOpen(false)}
        title="Add Service to Job Card"
        maxWidth="500px"
      >
        <form onSubmit={handleAddService} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Service Name *</label>
            <input type="text" required value={newServiceName} onChange={(e) => setNewServiceName(e.target.value)} placeholder="e.g. Wheel Balancing" style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '13px' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Labour Rate (₹) *</label>
            <input type="number" required value={newServiceRate} onChange={(e) => setNewServiceRate(e.target.value)} style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '13px' }} />
          </div>
          <button type="submit" style={{ height: '46px', borderRadius: '12px', border: 'none', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: '700', cursor: 'pointer', marginTop: '6px' }}>Add Service</button>
        </form>
      </ResponsiveModalSheet>

      {/* MODAL / SHEET: ADD PART */}
      <ResponsiveModalSheet
        isOpen={isAddPartOpen}
        onClose={() => setIsAddPartOpen(false)}
        title="Issue Inventory Part"
        maxWidth="500px"
      >
        <form onSubmit={handleAddPart} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Part Name *</label>
            <input type="text" required value={newPartName} onChange={(e) => setNewPartName(e.target.value)} placeholder="e.g. Brake Fluid DOT4" style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '13px' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Quantity *</label>
              <input type="number" required value={newPartQty} onChange={(e) => setNewPartQty(e.target.value)} style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '13px' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Unit Price (₹) *</label>
              <input type="number" required value={newPartPrice} onChange={(e) => setNewPartPrice(e.target.value)} style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '13px' }} />
            </div>
          </div>
          <button type="submit" style={{ height: '46px', borderRadius: '12px', border: 'none', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: '700', cursor: 'pointer', marginTop: '6px' }}>Issue Part</button>
        </form>
      </ResponsiveModalSheet>

      {/* MODAL / SHEET: OUTSIDE PURCHASE */}
      <ResponsiveModalSheet
        isOpen={isAddOutsidePurchaseOpen}
        onClose={() => setIsAddOutsidePurchaseOpen(false)}
        title="Add Outside Purchased Part"
        maxWidth="500px"
      >
        <form onSubmit={handleAddOutsidePurchase} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Part Name *</label>
            <input type="text" required value={opPartName} onChange={(e) => setOpPartName(e.target.value)} placeholder="e.g. Front Shock Absorber" style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '13px' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Purchase Cost (₹) *</label>
              <input type="number" required value={opCost} onChange={(e) => setOpCost(e.target.value)} style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '13px' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Selling Price (₹) *</label>
              <input type="number" required value={opSelling} onChange={(e) => setOpSelling(e.target.value)} style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '13px' }} />
            </div>
          </div>
          <button type="submit" style={{ height: '46px', borderRadius: '12px', border: 'none', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: '700', cursor: 'pointer', marginTop: '6px' }}>Log Purchase</button>
        </form>
      </ResponsiveModalSheet>

      {/* MODAL / SHEET: ADD WORK UPDATE */}
      <ResponsiveModalSheet
        isOpen={isAddWorkUpdateOpen}
        onClose={() => setIsAddWorkUpdateOpen(false)}
        title="Post Technician Work Update"
        maxWidth="500px"
      >
        <form onSubmit={handleAddWorkUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Work Progress Note *</label>
            <textarea rows={3} required value={workNote} onChange={(e) => setWorkNote(e.target.value)} placeholder="Describe work completed or current status..." style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '13px', resize: 'vertical' }} />
          </div>
          <button type="submit" style={{ height: '46px', borderRadius: '12px', border: 'none', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: '700', cursor: 'pointer', marginTop: '6px' }}>Post Update</button>
        </form>
      </ResponsiveModalSheet>
    </div>
  );
};

