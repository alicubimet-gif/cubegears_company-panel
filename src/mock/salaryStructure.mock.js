export let mockSalaryStructures = [
  {
    id: "STR-001",
    staffId: "EMP-0012",
    staffName: "Ajmal K",
    salaryBasis: "Monthly",
    basicSalary: 18000,
    allowances: 6000,
    fixedIncentives: 4000,
    effectiveDate: "2025-01-12",
    status: "Active",
    notes: "Lead mechanic baseline structure."
  },
  {
    id: "STR-002",
    staffId: "EMP-0014",
    staffName: "Rajesh V",
    salaryBasis: "Monthly",
    basicSalary: 30000,
    allowances: 10000,
    fixedIncentives: 8000,
    effectiveDate: "2024-03-01",
    status: "Active",
    notes: "Branch Manager baseline structure."
  }
];

export let mockSalaryPayments = [
  {
    id: "PMT-001",
    payrollId: "PAY-2026-08-01",
    staffId: "EMP-0012",
    staffName: "Ajmal K",
    period: "August 2026",
    amount: 12000,
    method: "UPI",
    reference: "UTR98127391",
    date: "2026-09-01",
    remarks: "Advance salary transfer",
    recordedBy: "Accountant",
    transferStatus: "Successful"
  }
];

export let mockSalaryAdvances = [
  {
    id: "ADV-001",
    staffId: "EMP-0012",
    staffName: "Ajmal K",
    advanceDate: "2026-08-10",
    advanceAmount: 10000,
    recoveredAmount: 4000,
    outstandingBalance: 6000,
    monthlyRecovery: 2000,
    reason: "Emergency medical expense",
    recoveryStartMonth: "September 2026",
    recoveryMethod: "Payroll Deduction",
    notes: "Approved by Workshop Manager",
    approvalStatus: "Approved",
    status: "Active", // Active | Fully Recovered | Paused | Cancelled
    recoveryHistory: [
      { id: "REC-101", date: "2026-09-01", amount: 2000, month: "August 2026", recordedBy: "Payroll System", reference: "PAY-2026-08-01" },
      { id: "REC-102", date: "2026-08-15", amount: 2000, month: "Direct Deposit", recordedBy: "Ajmal K", reference: "CASH-REC-01" }
    ]
  }
];
