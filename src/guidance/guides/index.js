export const GUIDE_VERSION = 2;

const step = (title, body, target = null, action = null) => ({ title, body, target, action });
const guide = (id, title, route, intro, steps) => ({ id, version: GUIDE_VERSION, title, route, intro, steps });

const crudListGuide = (id, singular, plural, route, createRoute, extra = '') => guide(
  id,
  `${plural} guide`,
  route,
  `Use ${plural} to find, create and maintain ${singular.toLowerCase()} records.${extra ? ` ${extra}` : ''}`,
  [
    step(`Browse ${plural}`, `Use search and the record list to quickly find the ${singular.toLowerCase()} you need.`),
    step(`Create ${singular}`, `Use the main Add / New button to open a dedicated full-page form.`, null, createRoute),
    step('Open a record', 'Open a row or card to view its full details and connected information.'),
    step('Edit safely', 'Use Edit from the record page. Changes are saved against the record ID in the URL.'),
    step('Delete only when needed', 'Delete uses a separate confirmation route so accidental removal is less likely.')
  ]
);

const crudCreateGuide = (id, singular, route, listRoute, hints = []) => guide(
  id,
  `Create ${singular} guide`,
  route,
  `This is the dedicated ${singular.toLowerCase()} creation page. Fill the minimum useful information first; optional details can be added later.`,
  [
    step(`Create ${singular}`, `Enter the main ${singular.toLowerCase()} information. Required fields are marked clearly.`),
    ...hints.map((hint) => step(hint.title, hint.body)),
    step('Save the record', `Save once the information is correct. CubixGear will create the record and open its page.`),
    step('Cancel without saving', `Use Cancel or Back to return to the ${singular.toLowerCase()} list.`, null, listRoute)
  ]
);

export const guides = {
  dashboard: guide('dashboard', 'Dashboard guide', '/dashboard', 'Start here. CubixGear keeps daily workshop actions, status and money in one place.', [
    step('Welcome to CubixGear', 'The dashboard shows today’s work, collections, stock alerts and the fastest actions for your role.'),
    step('Create a Job Card', 'Use New Job Card when a vehicle arrives. It becomes the running reference for costs, work updates and photos.', '.quick-actions-grid button:nth-child(2)', '/jobs/new'),
    step('Create an Invoice', 'Use Create Invoice for direct billing, or create it later from a Job Card.', '.quick-actions-grid button:nth-child(3)', '/invoices/new'),
    step('Manage stock', 'Add and issue workshop parts from Stock. Daily stock entry is intentionally simple.', '.quick-actions-grid button:nth-child(4)', '/stock'),
    step('Open recent work', 'Recent Job Cards let you jump back into vehicles already in the workshop.', '.ui-table-wrap', '/jobs')
  ]),

  customers: crudListGuide('customers', 'Customer', 'Customers', '/customers', '/customers/new', 'Customer profiles connect contact, vehicle and billing history.'),
  customerCreate: crudCreateGuide('customer-create', 'Customer', '/customers/new', '/customers', [
    { title: 'Start with name and phone', body: 'Name and phone are the daily essentials. WhatsApp can use the same number if needed.' },
    { title: 'Business customer', body: 'Select Business / Company only when company name, GSTIN and billing details are required.' }
  ]),
  customerDetail: guide('customer-detail', 'Customer profile guide', '/customers/:id', 'This page is the customer’s workshop profile.', [
    step('Customer identity', 'Confirm phone, contact and billing details before creating new work.'),
    step('Connected vehicles', 'Use the customer profile as the reference for their registered vehicles and workshop history.'),
    step('Edit customer', 'Use Edit when contact, company or GST information changes.'),
    step('Start new work', 'Create a Job Card when the customer brings a vehicle for service.', null, '/jobs/new')
  ]),

  vehicles: crudListGuide('vehicles', 'Vehicle', 'Vehicles', '/vehicles', '/vehicles/new', 'Registration number is the fastest workshop identifier.'),
  vehicleCreate: crudCreateGuide('vehicle-create', 'Vehicle', '/vehicles/new', '/vehicles', [
    { title: 'Registration first', body: 'Enter the vehicle registration clearly. Add customer, make and model for quick identification.' },
    { title: 'VIN is optional', body: 'VIN / chassis can be stored when available, but should not block quick check-in.' }
  ]),
  vehicleDetail: guide('vehicle-detail', 'Vehicle record guide', '/vehicles/:id', 'Use the vehicle record to identify the car and connect workshop history.', [
    step('Confirm the vehicle', 'Check registration, customer, make and model before creating work.'),
    step('Open history', 'Use connected Job Cards and invoices as the service history reference.'),
    step('Create a Job Card', 'When the vehicle arrives again, start a new Job Card.', null, '/jobs/new')
  ]),

  services: crudListGuide('services', 'Service', 'Services', '/services', '/services/new', 'Service and labour prices can still be entered manually during billing.'),
  serviceCreate: crudCreateGuide('service-create', 'Service', '/services/new', '/services', [
    { title: 'Keep pricing flexible', body: 'Create the service name/category for reuse. Workshop staff can enter the actual charge manually when billing.' }
  ]),

  jobs: guide('jobs', 'Job Cards guide', '/jobs', 'A Job Card is the ongoing workshop reference for one vehicle. It is not the final customer bill.', [
    step('Create the Job Card', 'Create one when the vehicle enters the workshop. Add customer, vehicle, complaint and assigned staff.', null, '/jobs/new'),
    step('Open active work', 'Search by job number, vehicle registration or customer to reopen ongoing work.'),
    step('Track several days', 'Open the same Job Card repeatedly and add parts, expenses, work notes and photos as the job progresses.'),
    step('Track internal cost', 'Job Card cost is the workshop’s actual cost reference. Selling price is decided during billing.'),
    step('Create the final invoice', 'Create an invoice from the Job Card when work is complete.', null, '/invoices/new')
  ]),
  jobCreate: guide('job-create', 'Create Job Card guide', '/jobs/new', 'Create a simple reference for the vehicle entering the workshop.', [
    step('Customer and vehicle', 'Enter customer name/phone and vehicle registration/model. Keep check-in fast.'),
    step('Customer complaint', 'Write what the customer reported. This is the starting reference for workshop work.'),
    step('Assign staff', 'Assign staff when the workshop uses mechanic/service-advisor responsibility. It can remain simple in smaller workshops.'),
    step('Create the Job Card', 'Save to create the Job Card, then add costs, work updates and photos over time.'),
    step('Do not estimate everything now', 'You do not need to know every cost at check-in. Add parts and expenses later as they happen.')
  ]),
  jobDetail: guide('job-detail', 'Job Card workspace guide', '/jobs/:id', 'This is the live working reference for a vehicle until delivery.', [
    step('Overview', 'Check customer, vehicle, complaint, assigned staff and current status.'),
    step('Add Parts & Costs', 'Repeatedly add parts, consumables, outside work or other expenses with actual cost price.'),
    step('Add work updates', 'Record important work progress so another staff member can understand what has happened.'),
    step('Add photos', 'Capture or upload before, during and after repair photos when useful.'),
    step('Create Invoice', 'When the job is ready, create an invoice from this Job Card. Cost stays internal; selling prices remain editable.', null, '/invoices/new')
  ]),

  inventory: crudListGuide('inventory', 'Inventory Item', 'Inventory', '/inventory', '/inventory/new', 'Use Inventory for reusable item details; Stock focuses on live quantity movement.'),
  inventoryCreate: crudCreateGuide('inventory-create', 'Inventory Item', '/inventory/new', '/inventory', [
    { title: 'Part identity', body: 'Use item name and SKU / part number so staff can find it quickly.' },
    { title: 'Prices', body: 'Store purchase cost and selling price as defaults. Billing can still override selling price.' }
  ]),

  stock: guide('stock', 'Stock guide', '/stock', 'Daily stock work stays simple even though advanced stock controls are available.', [
    step('Add a stock item', 'For daily entry use Item / Part Name, Part No / Code, Purchase Price, Selling Price and Quantity.', null, '/stock/new'),
    step('Stock In', 'Use Stock In when parts or consumables are received or purchased.', null, '/stock/in'),
    step('Stock Out / Issue', 'Use Stock Issue when inventory leaves outside automatic invoice deduction.', null, '/stock/issue'),
    step('Low stock', 'Low Stock highlights items at or below the configured minimum.', null, '/stock/low-stock'),
    step('Advanced controls', 'Ledger, transfers, adjustments, reservations, purchases and counts are available when a larger workshop needs them.')
  ]),
  stockCreate: crudCreateGuide('stock-create', 'Stock Item', '/stock/new', '/stock', [
    { title: 'Use a simple format', body: 'Item / Part Name, Part No / Code, Purchase Price, Selling Price and Opening Quantity are the core fields.' }
  ]),
  stockIn: guide('stock-in', 'Stock In guide', '/stock/in', 'Record quantity entering the workshop inventory.', [
    step('Choose the item', 'Select the part or consumable being received.'),
    step('Enter quantity', 'Record the received quantity and reference date.'),
    step('Cost reference', 'Use purchase cost/supplier reference when your workshop tracks purchasing.'),
    step('Save stock movement', 'Saving increases available stock and adds an audit movement.')
  ]),
  stockIssue: guide('stock-issue', 'Stock Issue guide', '/stock/issue', 'Use manual Stock Issue when stock leaves outside the normal invoice-finalization flow.', [
    step('Select item', 'Choose the stock item being issued.'),
    step('Enter quantity and reason', 'Record quantity and the job/use reference.'),
    step('Avoid duplicate deduction', 'If a finalized invoice already deducts the item automatically, do not issue it again manually.')
  ]),
  stockLow: guide('stock-low', 'Low Stock guide', '/stock/low-stock', 'Use this view to identify parts that need replenishment.', [
    step('Review low items', 'Items at or below minimum stock appear here.'),
    step('Prioritize critical parts', 'Check frequently used parts first, then create purchase/replenishment work.'),
    step('Update minimum level', 'Adjust the minimum only when workshop usage patterns change.')
  ]),
  stockLedger: guide('stock-ledger', 'Stock Ledger guide', '/stock/ledger', 'The ledger is the audit trail for quantity changes.', [
    step('Read movement history', 'See stock in, issue, invoice deduction, return and adjustments in time order.'),
    step('Trace a quantity difference', 'Use the ledger when physical stock does not match the system.'),
    step('Daily staff can stay simple', 'Most staff do not need this screen for normal part entry or billing.')
  ]),
  stockAdvanced: guide('stock-advanced', 'Advanced Stock guide', '/stock', 'This area is for larger-workshop controls such as transfer, return, adjustment, reservations and counts.', [
    step('Use only when needed', 'Small workshops can work with Add Item, Stock In, Stock Issue and Low Stock.'),
    step('Keep an audit reason', 'For adjustments, returns and transfers, always store a clear reason/reference.'),
    step('Confirm quantities', 'Advanced stock actions affect live inventory, so verify item and quantity before saving.')
  ]),

  billing: guide('billing', 'Billing & invoice guide', '/invoices', 'Billing supports direct manual documents and invoices created from a Job Card.', [
    step('Invoices and estimates', 'Use the document tabs/list to find invoices and quotations/estimates.'),
    step('Create direct bill', 'Create a bill without a Job Card when the workshop needs fast manual billing.', null, '/invoices/new'),
    step('Create from Job Card', 'For workshop repair work, open the Job Card and create the invoice from its recorded work/cost reference.'),
    step('Finalize carefully', 'Draft does not reduce stock. Finalizing a Stock Part invoice deducts the quantity.'),
    step('Print / Save PDF', 'PDF output should contain only the fixed invoice document, not the app header/sidebar.')
  ]),
  invoiceCreate: guide('invoice-create', 'Create Invoice guide', '/invoices/new', 'Build the customer-facing invoice while keeping workshop cost separate from selling price.', [
    step('Choose bill type', 'Use Regular Invoice or GST Tax Invoice depending on the customer and compliance requirement.'),
    step('Customer details', 'Select or enter customer/company, vehicle and Job Card reference when available.'),
    step('Add items', 'Add Stock Part, Outside Purchase, Labour, Service, Consumable or Custom items.'),
    step('Cost vs selling', 'Purchase / Cost Price is internal. Selling / Rate is what the customer is charged.'),
    step('Save Draft or Finalize', 'Draft remains editable and does not deduct stock. Finalize only when the bill is ready.')
  ]),
  invoiceDetail: guide('invoice-detail', 'Invoice details guide', '/invoices/:id', 'Review the saved customer document and its payment/finalization state.', [
    step('Check customer and items', 'Verify customer, vehicle, line items, tax and totals before finalization.'),
    step('Edit a draft', 'Draft invoices can be edited from their ID-based edit route.'),
    step('Finalize once ready', 'Finalizing confirms the document and applies stock deduction for linked Stock Parts.'),
    step('Print / Save PDF', 'Use the invoice print action to create a clean customer document.')
  ]),
  quotation: guide('quotation', 'Quotation / Estimate guide', '/quotations', 'An estimate is the proposed customer price before final billing.', [
    step('Use Job Card as reference', 'Read the Job Card complaints, work and recorded costs first.'),
    step('Set customer prices', 'Enter the proposed selling prices for parts, service and labour.'),
    step('Share the estimate', 'Print or save the estimate using the same consistent document style.'),
    step('Convert when approved', 'After customer approval, use the accepted estimate as the basis for the final invoice.')
  ]),

  payments: crudListGuide('payments', 'Payment', 'Payments', '/payments', '/payments/new', 'Payments should be linked to an invoice or advance reference when possible.'),
  paymentCreate: crudCreateGuide('payment-create', 'Payment', '/payments/new', '/payments', [
    { title: 'Link the invoice', body: 'Choose the invoice/advance reference so balance due stays understandable.' },
    { title: 'Record method', body: 'Store Cash, UPI, Card, Bank Transfer or Cheque plus the reference when available.' }
  ]),

  expenses: crudListGuide('expenses', 'Expense', 'Expenses', '/expenses', '/expenses/new', 'Business expenses are separate from customer Job Card costs.'),
  expenseCreate: crudCreateGuide('expense-create', 'Expense', '/expenses/new', '/expenses', [
    { title: 'Choose a clear category', body: 'Record enough information to understand what the business spent and why.' }
  ]),

  reports: guide('reports', 'Reports guide', '/reports', 'Reports summarize workshop operations and finance without changing live records.', [
    step('Choose the report', 'Start from the business question: jobs, revenue, payments, stock or staff.'),
    step('Set period/filters', 'Choose the date range, branch or status before reading totals.'),
    step('Drill into details', 'Use linked records when a report number needs investigation.'),
    step('Export only when needed', 'Use export/download for sharing or accounting, not as the main daily workflow.')
  ]),

  notifications: guide('notifications', 'Notifications guide', '/notifications', 'Notifications surface items that need attention.', [
    step('Read by priority', 'Start with critical stock, approvals, overdue or operational alerts.'),
    step('Open the source', 'Use the linked module/record to resolve the notification.'),
    step('Keep alerts actionable', 'Avoid creating alerts that do not lead to a clear workshop action.')
  ]),

  attendance: guide('attendance', 'My Attendance guide', '/my-attendance', 'Use My Attendance for your own work-day records.', [
    step('Today', 'Check today’s clock-in/out and worked time.'),
    step('Calendar', 'Use the calendar to understand working days, holidays and approved leave.', null, '/my-attendance/calendar'),
    step('History', 'Review previous punch records and corrections.', null, '/my-attendance/history'),
    step('Leave', 'Apply for leave and review its status.', null, '/my-attendance/leave'),
    step('Summary', 'See monthly presence, leave, late days and worked-hours summary.', null, '/my-attendance/summary')
  ]),
  attendanceManager: guide('attendance-manager', 'Attendance Manager guide', '/attendance-manager', 'Managers review team attendance, approvals and attendance rules here.', [
    step('Approvals', 'Review pending attendance corrections and requests first.', null, '/attendance-manager/approvals'),
    step('Team review', 'Open staff/day records when a specific attendance issue needs investigation.', null, '/attendance-manager/team-review'),
    step('Master records', 'Use master records for management-level audit and correction workflows.', null, '/attendance-manager/master-records'),
    step('Holidays and leave types', 'Configure operational calendars and valid leave types.'),
    step('Rules', 'Keep attendance rules clear and consistent across branches.', null, '/attendance-manager/rules')
  ]),

  staff: guide('staff', 'Staff Management guide', '/staff-management', 'Use Staff Management for people, roles and access responsibilities.', [
    step('Staff', 'Create and maintain staff profiles, branch and working status.', null, '/staff-management/staff'),
    step('Roles', 'Grant only the modules and actions each role needs.', null, '/staff-management/roles'),
    step('Role-based simplicity', 'Mechanics should primarily see their Jobs; billing staff should focus on invoices/payments; stock staff on inventory.'),
    step('Payroll', 'Open Payroll for salary structure, monthly processing and disbursal.', null, '/payroll')
  ]),

  payroll: guide('payroll', 'Payroll guide', '/payroll', 'Payroll keeps salary setup, monthly processing, approvals, disbursal and payslips together.', [
    step('Salary Structure', 'Set the employee salary components before monthly payroll.', null, '/payroll/salary-structure'),
    step('Monthly Payroll', 'Generate or review the payroll period for staff.', null, '/payroll/monthly'),
    step('Approvals', 'Review exceptions and approve payroll before payment.', null, '/payroll/approvals'),
    step('Disbursal', 'Record salary payment/disbursal after approval.', null, '/payroll/disbursal'),
    step('Payslips & Reports', 'Generate employee payslips and payroll reports after processing.')
  ]),

  profile: guide('profile', 'Profile guide', '/profile', 'Your profile shows the signed-in user identity and role.', [
    step('Identity', 'Confirm your name, role and account details.'),
    step('Role controls visibility', 'The system should show only the modules/actions relevant to your permissions.'),
    step('Settings', 'Open Settings for company/application preferences.', null, '/settings')
  ]),

  settings: guide('settings', 'Settings guide', '/settings', 'Configure workshop-wide behavior here. Daily staff normally do not need this page.', [
    step('Company & Locale', 'Maintain business identity, address, timezone/currency and locale.'),
    step('Workshop Operations', 'Set operational defaults used by Job Cards and daily workshop workflows.'),
    step('Billing & Tax', 'Configure invoice, tax and document defaults. Keep legal/tax values controlled by administrators.'),
    step('Inventory & Permissions', 'Set stock defaults and access permissions without making daily workflows complicated.'),
    step('Appearance & Integrations', 'Theme and integrations are preferences; they should not block core workshop work.')
  ]),

  accountBilling: guide('account-billing', 'SaaS Billing & Plan guide', '/account/billing', 'This page is for the CubixGear subscription account, not customer workshop invoices.', [
    step('Current plan', 'See subscription status, billing cycle and included/usage-based items.'),
    step('Usage charges', 'Review usage-based charges such as storage before the next SaaS invoice.'),
    step('Invoice history', 'Open previous CubixGear subscription invoices and payment status.'),
    step('Keep customer billing separate', 'Workshop customer invoices remain in Invoices & Billing, not this SaaS account page.')
  ]),

  storage: guide('storage', 'Photo & storage guide', '/account/storage', 'Upload and capture workshop photos, then review storage usage for any interval.', [
    step('Upload or capture', 'Use Upload Photos on desktop or Take Photo on mobile. Job photos should be linked to the Job Card and stage.'),
    step('Unlimited storage pricing', 'Current product direction uses unlimited storage billed at ₹2 per GB per day.'),
    step('Usage interval', 'Choose a date interval to see each day’s usage and storage charge.', null, '/account/storage/history'),
    step('Open a day', 'Click a day to open its snapshot and see the files recorded for that date.'),
    step('Audit actions', 'Uploads, deletes and settings changes should be recorded with user and timestamp.')
  ]),
  storageHistory: guide('storage-history', 'Storage History guide', '/account/storage/history', 'Review storage usage and charge across a selected interval.', [
    step('Choose interval', 'Use quick presets or custom From/To dates.'),
    step('Read totals', 'Review days, average GB, peak GB and total storage charge for the interval.'),
    step('Open any day', 'Select a day to inspect its storage snapshot and files.'),
    step('Understand billing', 'Daily storage usage × ₹2 per GB forms the daily storage charge in the current product model.')
  ]),
  storageDay: guide('storage-day', 'Daily Storage Snapshot guide', '/account/storage/history/:date', 'This page shows the recorded storage snapshot for one date.', [
    step('Daily usage', 'See the GB recorded for this date and its daily charge.'),
    step('Files', 'Review the files included in the snapshot for that day.'),
    step('Historical integrity', 'Deleting a file later should not rewrite an already-recorded billing snapshot in the production backend.'),
    step('Back to interval', 'Return to history to compare this day with other dates.', null, '/account/storage/history')
  ])
};

export const roleGuideCopy = {
  SUPER_ADMIN: 'You can see the complete workshop. Start with Job Cards for daily operations, Billing for customer documents and Stock for parts.',
  ADMIN: 'You can manage the full workshop. Start with Job Cards, Billing and Stock.',
  MECHANIC: 'Your daily focus is assigned Job Cards: work notes, parts/cost entries, photos and status updates.',
  SERVICE_ADVISOR: 'Start with customer/vehicle intake and Job Cards, then move completed work into billing.',
  BILLING: 'Your daily focus is invoices, quotations and payments. Job Cards provide the work reference.',
  STOCK: 'Your daily focus is stock items, stock in/out and low-stock alerts.'
};

const isRecordPath = (pathname, base) => {
  const rest = pathname.slice(base.length).split('/').filter(Boolean);
  return rest.length >= 1 && !['new', 'add', 'in', 'issue', 'return', 'transfer', 'adjustments', 'reservations', 'low-stock', 'ledger', 'suppliers', 'purchases', 'count', 'reports'].includes(rest[0]);
};

export function getGuideForPath(pathname) {
  if (pathname === '/dashboard') return guides.dashboard;

  if (pathname === '/customers/new' || pathname === '/customers/add') return guides.customerCreate;
  if (isRecordPath(pathname, '/customers')) return guides.customerDetail;
  if (pathname.startsWith('/customers')) return guides.customers;

  if (pathname === '/vehicles/new' || pathname === '/vehicles/add') return guides.vehicleCreate;
  if (isRecordPath(pathname, '/vehicles')) return guides.vehicleDetail;
  if (pathname.startsWith('/vehicles')) return guides.vehicles;

  if (pathname === '/services/new') return guides.serviceCreate;
  if (pathname.startsWith('/services')) return guides.services;

  if (pathname === '/jobs/new' || pathname === '/jobs/add') return guides.jobCreate;
  if (isRecordPath(pathname, '/jobs')) return guides.jobDetail;
  if (pathname.startsWith('/jobs')) return guides.jobs;

  if (pathname === '/inventory/new') return guides.inventoryCreate;
  if (pathname.startsWith('/inventory')) return guides.inventory;

  if (pathname === '/stock/new') return guides.stockCreate;
  if (pathname.startsWith('/stock/in')) return guides.stockIn;
  if (pathname.startsWith('/stock/issue')) return guides.stockIssue;
  if (pathname.startsWith('/stock/low-stock')) return guides.stockLow;
  if (pathname.startsWith('/stock/ledger')) return guides.stockLedger;
  if (/^\/stock\/(return|transfer|adjustments|reservations|suppliers|purchases|count|reports)/.test(pathname)) return guides.stockAdvanced;
  if (pathname.startsWith('/stock')) return guides.stock;

  if (pathname === '/invoices/new' || pathname === '/invoices/create') return guides.invoiceCreate;
  if (isRecordPath(pathname, '/invoices')) return guides.invoiceDetail;
  if (pathname.startsWith('/invoices')) return guides.billing;
  if (pathname.startsWith('/quotations')) return guides.quotation;

  if (pathname === '/payments/new') return guides.paymentCreate;
  if (pathname.startsWith('/payments')) return guides.payments;

  if (pathname === '/expenses/new') return guides.expenseCreate;
  if (pathname.startsWith('/expenses')) return guides.expenses;

  if (pathname.startsWith('/reports')) return guides.reports;
  if (pathname.startsWith('/notifications')) return guides.notifications;

  if (pathname.startsWith('/my-attendance')) return guides.attendance;
  if (pathname.startsWith('/attendance-manager')) return guides.attendanceManager;
  if (pathname.startsWith('/staff-management')) return guides.staff;
  if (pathname.startsWith('/payroll')) return guides.payroll;

  if (pathname === '/profile') return guides.profile;
  if (pathname === '/settings') return guides.settings;

  if (pathname === '/account/billing' || pathname === '/account') return guides.accountBilling;
  if (/^\/account\/storage\/history\/[^/]+$/.test(pathname)) return guides.storageDay;
  if (pathname === '/account/storage/history') return guides.storageHistory;
  if (pathname.startsWith('/account/storage')) return guides.storage;

  return null;
}
