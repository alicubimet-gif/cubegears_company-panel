export let mockRolesList = [
  {
    id: "ROLE-01",
    name: "Company Owner",
    description: "Full administrative access across all company modules, financial data, and branch scopes.",
    usersCount: 1,
    branchScope: "All Permitted Company Branches",
    isProtected: true,
    status: "Active",
    permissions: {
      customers: { view: true, create: true, edit: true, archive: true, approve: true, export: true },
      jobs: { view: true, create: true, edit: true, archive: true, approve: true, export: true },
      payroll: { view: true, create: true, edit: true, archive: true, approve: true, export: true },
      attendance: { view: true, create: true, edit: true, archive: true, approve: true, export: true },
      staff: { view: true, create: true, edit: true, archive: true, approve: true, export: true }
    }
  },
  {
    id: "ROLE-02",
    name: "Branch Manager",
    description: "Operational management for assigned branch, staff scheduling, job card approvals, and attendance management.",
    usersCount: 2,
    branchScope: "Assigned Branch Only",
    isProtected: false,
    status: "Active",
    permissions: {
      customers: { view: true, create: true, edit: true, archive: false, approve: true, export: true },
      jobs: { view: true, create: true, edit: true, archive: false, approve: true, export: true },
      payroll: { view: true, create: false, edit: false, archive: false, approve: false, export: false },
      attendance: { view: true, create: true, edit: true, archive: false, approve: true, export: true },
      staff: { view: true, create: true, edit: true, archive: false, approve: false, export: true }
    }
  },
  {
    id: "ROLE-03",
    name: "Reception",
    description: "Customer intake, service booking creation, and job card status tracking.",
    usersCount: 3,
    branchScope: "Assigned Branch Only",
    isProtected: false,
    status: "Active",
    permissions: {
      customers: { view: true, create: true, edit: true, archive: false, approve: false, export: false },
      jobs: { view: true, create: true, edit: false, archive: false, approve: false, export: false },
      payroll: { view: false, create: false, edit: false, archive: false, approve: false, export: false },
      attendance: { view: true, create: false, edit: false, archive: false, approve: false, export: false },
      staff: { view: true, create: false, edit: false, archive: false, approve: false, export: false }
    }
  },
  {
    id: "ROLE-04",
    name: "Mechanic",
    description: "Job card task updates, spare parts requests, and personal attendance tracking.",
    usersCount: 8,
    branchScope: "Assigned Branch Only",
    isProtected: false,
    status: "Active",
    permissions: {
      customers: { view: false, create: false, edit: false, archive: false, approve: false, export: false },
      jobs: { view: true, create: false, edit: true, archive: false, approve: false, export: false },
      payroll: { view: false, create: false, edit: false, archive: false, approve: false, export: false },
      attendance: { view: true, create: false, edit: false, archive: false, approve: false, export: false },
      staff: { view: false, create: false, edit: false, archive: false, approve: false, export: false }
    }
  },
  {
    id: "ROLE-05",
    name: "Accountant",
    description: "Invoicing, payment records, expense tracking, and payroll processing permissions.",
    usersCount: 1,
    branchScope: "All Permitted Company Branches",
    isProtected: false,
    status: "Active",
    permissions: {
      customers: { view: true, create: true, edit: true, archive: false, approve: false, export: true },
      jobs: { view: true, create: false, edit: false, archive: false, approve: false, export: true },
      payroll: { view: true, create: true, edit: true, archive: false, approve: true, export: true },
      attendance: { view: true, create: false, edit: false, archive: false, approve: false, export: true },
      staff: { view: true, create: false, edit: false, archive: false, approve: false, export: true }
    }
  },
  {
    id: "ROLE-06",
    name: "Storekeeper",
    description: "Inventory stock in/out ledger, spare parts threshold management, and supplier records.",
    usersCount: 2,
    branchScope: "Assigned Branch Only",
    isProtected: false,
    status: "Active",
    permissions: {
      customers: { view: false, create: false, edit: false, archive: false, approve: false, export: false },
      jobs: { view: true, create: false, edit: true, archive: false, approve: false, export: false },
      payroll: { view: false, create: false, edit: false, archive: false, approve: false, export: false },
      attendance: { view: true, create: false, edit: false, archive: false, approve: false, export: false },
      staff: { view: false, create: false, edit: false, archive: false, approve: false, export: false }
    }
  }
];
