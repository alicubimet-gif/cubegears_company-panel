export const GUIDE_VERSION = 3;

const step = (title, body, target = null, action = null) => ({ title, body, target, action });
const guide = (id, title, route, intro, steps) => ({ id, version: GUIDE_VERSION, title, route, intro, steps });

export const roleGuideCopy = {
  SUPER_ADMIN: 'You can see the complete workshop. Use the highlighted controls to understand this page and the next action.',
  ADMIN: 'You can manage the full workshop. Follow the highlighted controls for this page.',
  MECHANIC: 'Focus on assigned Job Cards, work updates, parts, photos and status.',
  SERVICE_ADVISOR: 'Focus on customer and vehicle intake, Job Cards and moving approved work into billing.',
  BILLING: 'Focus on invoices, quotations and payments. Job Cards provide the work reference.',
  STOCK: 'Focus on stock items, stock movements and low-stock alerts.'
};

const dashboard = guide('dashboard', 'Dashboard Guide', '/dashboard', 'Your daily workshop control centre.', [
  step('Welcome to Dashboard', 'This page shows today’s work, customers, billing, stock alerts and the fastest workshop actions.'),
  step('Date and branch', 'Use the date and branch controls to decide which workshop activity you are viewing.'),
  step('New Customer', 'Create a reusable customer profile when you want to keep vehicles, Job Cards and billing history together.', null, '/customers/new'),
  step('New Job Card', 'Create a Job Card when a vehicle enters the workshop. It becomes the ongoing reference until delivery.', null, '/jobs/new'),
  step('Create Invoice', 'Create a direct invoice here, or create one later from a Job Card.', null, '/invoices/new'),
  step('Add Stock', 'Add a workshop part with a simple item name, part number, purchase price, selling price and opening stock.', null, '/stock/new'),
  step('Summary cards', 'Use the summary cards to quickly understand active work, pending items, money and low stock.'),
  step('Recent Job Cards', 'Open recent work to continue updating a vehicle already in the workshop.', null, '/jobs'),
  step('Global Search', 'Use search to quickly find customers, vehicles, Job Cards, invoices and stock.'),
  step('Profile menu', 'Your profile menu contains personal account details, Settings and Logout.', null, '/profile')
]);

const customers = guide('customers', 'Customers Guide', '/customers', 'Find existing customers or create a reusable customer profile.', [
  step('Customer list', 'Use this page to find customers by name or phone and open their workshop history.'),
  step('Search customers', 'Search by customer name or phone number.'),
  step('Add Customer', 'Create a customer when you want to reuse contact, vehicle and billing information.', null, '/customers/new'),
  step('Open a customer', 'Open a profile to see connected vehicles, Job Cards, invoices and payments.'),
  step('Edit or delete', 'Edit customer details when they change. Delete only when the record is genuinely no longer needed.')
]);

const customerCreate = guide('customer-create', 'Create Customer Guide', '/customers/new', 'Create the minimum useful customer profile first.', [
  step('Customer Name', 'Enter the customer’s name. This is the main name shown across vehicles, Job Cards and invoices.'),
  step('Phone', 'Enter the primary phone number used by the workshop.'),
  step('Email', 'Email is optional unless the workshop needs digital invoices or account communication.'),
  step('Customer Type', 'Choose Individual for a normal customer or Business when company and GST billing details are required.'),
  step('Address', 'Address is optional for normal workshop use but useful for billing and customer records.'),
  step('Company and GST details', 'For a business customer, add company name and GSTIN when required.'),
  step('Create Customer', 'Save once the essential details are correct. You can add vehicles and Job Cards next.'),
  step('Cancel', 'Use Cancel or Back to return without creating the customer.', null, '/customers')
]);

const customerDetail = guide('customer-detail', 'Customer Profile Guide', '/customers/:id', 'This page is the customer’s workshop profile.', [
  step('Customer identity', 'Start with the customer name, phone and billing details.'),
  step('Connected vehicles', 'These are the vehicles linked to this customer.'),
  step('Workshop history', 'Use recent Job Cards to understand previous and ongoing work.'),
  step('Invoices and balance', 'Review invoices and any outstanding payment connected to this customer.'),
  step('Edit Customer', 'Update contact, company or GST details when required.'),
  step('Add Vehicle / New Job Card', 'Add a vehicle or start a new Job Card when the customer returns.', null, '/jobs/new')
]);

const vehicles = guide('vehicles', 'Vehicles Guide', '/vehicles', 'Find and manage workshop vehicles.', [
  step('Find a vehicle', 'Search using registration number, customer or vehicle model.'),
  step('Add Vehicle', 'Create a vehicle record when you want a reusable registration and ownership profile.', null, '/vehicles/new'),
  step('Open vehicle', 'Open the vehicle record to review identity and workshop history.'),
  step('Edit vehicle', 'Update owner, registration or vehicle information when it changes.')
]);

const vehicleCreate = guide('vehicle-create', 'Create Vehicle Guide', '/vehicles/new', 'Register a vehicle quickly for workshop use.', [
  step('Registration Number', 'Enter the vehicle registration first. This is the fastest workshop identifier.'),
  step('Customer / Owner', 'Connect the vehicle to the correct customer when available.'),
  step('Make and Model', 'Enter the vehicle make and model for quick identification.'),
  step('Year', 'Vehicle year is optional.'),
  step('Odometer', 'Store the current odometer reading when useful for service history.'),
  step('VIN / Chassis', 'VIN or chassis number is optional and should not block quick check-in.'),
  step('Notes', 'Add only useful vehicle-specific notes.'),
  step('Save Vehicle', 'Save the vehicle once the main identity is correct.')
]);

const vehicleDetail = guide('vehicle-detail', 'Vehicle Profile Guide', '/vehicles/:id', 'Use this page as the vehicle’s workshop record.', [
  step('Vehicle identity', 'Confirm registration, make, model and owner before starting new work.'),
  step('Workshop history', 'Review previous Job Cards and invoices as the vehicle service history.'),
  step('Create Job Card', 'When the vehicle returns, create a new Job Card for the current visit.', null, '/jobs/new')
]);

const services = guide('services', 'Services Guide', '/services', 'Maintain reusable service and labour names without forcing fixed pricing.', [
  step('Service list', 'Use this list for reusable service or labour names.'),
  step('Add Service', 'Create a service name or category for reuse.'),
  step('Keep pricing flexible', 'Final service and labour amounts can be entered manually during Job Card or invoice work.'),
  step('Edit or delete', 'Maintain service names as your workshop offering changes.')
]);

const jobs = guide('jobs', 'Job Cards Guide', '/jobs', 'A Job Card is an ongoing workshop reference, not the final customer bill.', [
  step('Job Card purpose', 'Use one Job Card for one vehicle visit to collect complaints, work, parts, costs, photos and status.'),
  step('New Job Card', 'Create a Job Card when a vehicle enters the workshop.', null, '/jobs/new'),
  step('Search and filters', 'Find active work by job number, customer, vehicle or status.'),
  step('Customer and vehicle', 'Use customer and vehicle information to identify the work quickly.'),
  step('Assigned staff', 'Assigned staff helps larger workshops know who is responsible for the job.'),
  step('Status', 'Status tells the team whether work is waiting, in progress or ready.'),
  step('Open', 'Open a Job Card to continue adding costs, work updates, photos and later create the invoice.')
]);

const jobCreate = guide('job-create', 'Create Job Card Guide', '/jobs/new', 'Create a simple vehicle intake record. You do not need to know every cost yet.', [
  step('Customer', 'Select an existing customer or enter the customer used for this vehicle visit.'),
  step('Phone', 'Enter the main contact number.'),
  step('Vehicle Registration', 'Enter the registration number used to identify the vehicle.'),
  step('Vehicle / Model', 'Enter the vehicle name or model.'),
  step('Odometer', 'Record the odometer if useful for the workshop.'),
  step('Customer Complaint', 'Write what the customer reported. This becomes the starting workshop reference.'),
  step('Assigned Staff', 'Assign staff when your workshop uses mechanic or service-advisor responsibility.'),
  step('Priority', 'Set priority when the workshop needs to distinguish urgent work.'),
  step('Status', 'Choose the starting job status.'),
  step('Notes', 'Add any useful check-in note.'),
  step('Create Job Card', 'Create the Job Card now. Add parts and expenses later as they happen.')
]);

const jobDetail = guide('job-detail', 'Job Card Workspace Guide', '/jobs/:id', 'This is the live workshop reference for a vehicle until delivery.', [
  step('Job Card header', 'Confirm Job Card number, vehicle, customer and current status.'),
  step('Overview', 'Use Overview to understand the customer complaint and current job information.'),
  step('Parts & Costs', 'Add parts, consumables, outside work and other costs repeatedly across multiple days.'),
  step('Add Part / Expense', 'For every purchase or outside cost, add Type, Item, Qty, Cost Price, optional Supplier and Notes.'),
  step('Work Updates', 'Record useful technician progress so another staff member can understand what has happened.'),
  step('Photos', 'Take or upload Before, During or After repair photos when useful.'),
  step('History', 'Use History as the audit trail for changes and work events.'),
  step('Running Internal Cost', 'This total is the workshop’s actual internal cost. It is not the final customer invoice amount.'),
  step('Create Invoice', 'When work is ready, create the invoice from this Job Card. Selling prices remain editable.', null, '/invoices/new')
]);

const inventory = guide('inventory', 'Inventory Guide', '/inventory', 'Review reusable part and item details.', [
  step('Inventory catalogue', 'Use this page for reusable item identity and pricing information.'),
  step('Find an item', 'Search by item name or part number.'),
  step('Purchase and selling price', 'Purchase price is your cost reference. Selling price is the normal customer-facing reference.'),
  step('Open Stock', 'Use Stock when you need live quantity movement and low-stock management.', null, '/stock')
]);

const stock = guide('stock', 'Stock Guide', '/stock', 'Daily stock work should stay simple.', [
  step('Stock summary', 'Start with total items and low-stock information.'),
  step('Search parts', 'Search using item name or part number.'),
  step('Add Item', 'Create a stock item using Item Name, Part No, Purchase Price, Selling Price and Quantity.', null, '/stock/new'),
  step('Stock In', 'Use Stock In when parts or consumables are received.', null, '/stock/in'),
  step('Stock Out / Issue', 'Use Stock Out when inventory leaves outside automatic invoice deduction.', null, '/stock/issue'),
  step('Purchase Price', 'Purchase price records the workshop cost.'),
  step('Selling Price', 'Selling price is the default customer-facing price and can still be changed in billing.'),
  step('Current Stock', 'Current stock shows how many units are available.'),
  step('Advanced Stock', 'Ledger, transfers, adjustments, suppliers, purchases and stock count are advanced tools when needed.')
]);

const stockCreate = guide('stock-create', 'Add Stock Item Guide', '/stock/new', 'Create a stock item with the smallest practical form.', [
  step('Item / Part Name', 'Enter the workshop item or part name.'),
  step('Part No / Code', 'Enter the supplier part number, SKU or code when available.'),
  step('Purchase Price', 'Enter how much the workshop pays for one unit.'),
  step('Selling Price', 'Enter the normal selling reference. Billing can override it.'),
  step('Opening Stock', 'Enter the quantity currently available.'),
  step('Minimum Stock', 'Set a reorder/minimum level only if your workshop uses low-stock alerts.'),
  step('Save Item', 'Save once the item identity, prices and quantity are correct.')
]);

const stockMovement = (id, title, route, intro, effect) => guide(id, title, route, intro, [
  step('Select Item', 'Choose the correct stock item.'),
  step('Movement Type', `This action will ${effect}.`),
  step('Quantity', 'Enter the quantity for this stock movement.'),
  step('Reason / Reference', 'Store a clear job, supplier, branch or reason reference when relevant.'),
  step('Date', 'Confirm the movement date.'),
  step('Review Result', 'Check the item and resulting quantity before saving.'),
  step('Save Transaction', 'Save to record the movement in the stock audit trail.')
]);

const stockLow = guide('stock-low', 'Low Stock Guide', '/stock/low-stock', 'Find parts that need replenishment.', [
  step('Reorder threshold', 'Items at or below their configured minimum level appear here.'),
  step('Prioritize parts', 'Check frequently used or critical parts first.'),
  step('Open Item', 'Open the item to review quantity and replenishment information.')
]);

const stockLedger = guide('stock-ledger', 'Stock Ledger Guide', '/stock/ledger', 'The ledger is the chronological audit trail for quantity changes.', [
  step('Movement history', 'Read stock in, issue, invoice deduction, return and adjustment entries in time order.'),
  step('Trace a difference', 'Use the ledger when physical quantity does not match the system.'),
  step('Filter', 'Use filters to narrow the audit history to an item, date or movement type.')
]);

const stockAdvanced = guide('stock-advanced', 'Advanced Stock Guide', '/stock', 'Use these tools when the workshop needs audit and management controls beyond daily stock entry.', [
  step('Suppliers', 'Maintain supplier records used for purchasing.'),
  step('Purchases', 'Track purchase references and stock received.'),
  step('Stock Count', 'Reconcile physical count with system quantity.'),
  step('Reports', 'Review stock value and movement reports.'),
  step('Audit reason', 'For adjustments, returns and transfers, always keep a clear reference or reason.')
]);

const invoices = guide('billing', 'Invoices Guide', '/invoices', 'Browse customer invoices and estimates.', [
  step('Invoices and Estimates', 'Use the document type to understand whether the record is a final bill or proposed estimate.'),
  step('New Invoice', 'Create a direct manual bill when needed.', null, '/invoices/new'),
  step('Invoice information', 'Use invoice number, customer, date, amount and status to identify each document.'),
  step('View', 'Open the invoice to review the complete customer document.'),
  step('Edit', 'Edit only when the invoice status allows changes.'),
  step('Delete', 'Hard delete should be limited to draft or cancelled documents.'),
  step('Finalized', 'Finalized means the customer bill is confirmed and linked Stock Parts may already be deducted.')
]);

const invoiceCreate = guide('invoice-create', 'Create Invoice Guide', '/invoices/new', 'Create a direct bill or a Job Card-based invoice.', [
  step('Document Type', 'Choose Regular Bill, GST Tax Invoice or Estimate.'),
  step('Customer and Vehicle', 'Select or enter the customer, phone and vehicle number.'),
  step('Job Card Reference', 'When this invoice comes from workshop work, keep the Job Card reference.'),
  step('GST Billing Details', 'For GST/business billing, add company name, billing address, GSTIN and place of supply.'),
  step('Add Items', 'Add Stock Part, Outside Purchase, Labour, Service, Consumable or Custom items.'),
  step('Description and Part No', 'Describe the billed item clearly and include the part number when useful.'),
  step('Quantity', 'Enter the billed quantity.'),
  step('Purchase Price / Cost', 'Cost price is an internal workshop reference.'),
  step('Selling Price / Rate', 'Selling or Rate is the amount charged to the customer.'),
  step('Discount', 'Apply discount only when required.'),
  step('GST', 'Use CGST + SGST for applicable intra-state billing or IGST where applicable in your configured workflow.'),
  step('Totals', 'Review subtotal, tax, grand total, paid amount and balance.'),
  step('Save Draft', 'Draft remains editable and must not reduce stock.'),
  step('Finalize Invoice', 'Finalize only when the customer document is ready. Linked Stock Parts are deducted at this point.')
]);

const invoiceDetail = guide('invoice-detail', 'Invoice Detail Guide', '/invoices/:id', 'Review the customer document, totals, payment state and PDF output.', [
  step('Invoice Header', 'Check invoice number, date, status and Job Card reference.'),
  step('Workshop Details', 'Confirm company name, address, phone and tax details used on the customer document.'),
  step('Customer / Vehicle', 'Confirm the bill-to and vehicle information.'),
  step('Bill Items', 'Review Labour, Parts, Consumables and Outside Purchase items.'),
  step('Tax and Totals', 'Review taxable amount, tax, rounding, grand total, paid and balance.'),
  step('Print / Save PDF', 'Use print/PDF to create the customer-facing document. App header, sidebar and navigation must never appear in the PDF.'),
  step('Record Payment', 'Record payment when money is received against this invoice.', null, '/payments/new')
]);

const quotations = guide('quotation', 'Quotation / Estimate Guide', '/quotations', 'Use an estimate to propose customer pricing before final billing.', [
  step('Use Job Card as reference', 'Read the recorded complaints, work and costs before setting customer prices.'),
  step('Set selling prices', 'Enter proposed part, labour and service amounts.'),
  step('Share Estimate', 'Print or save the estimate using the same consistent document style.'),
  step('Convert when approved', 'Use the accepted estimate as the basis for the final invoice.')
]);

const payments = guide('payments', 'Payments Guide', '/payments', 'Record and review money received from customers.', [
  step('Payment list', 'Search and filter recorded payments.'),
  step('New Payment', 'Create a payment when money is received.', null, '/payments/new'),
  step('Invoice / Customer', 'Link the payment to the correct invoice or customer reference.'),
  step('Amount', 'Record the amount received.'),
  step('Payment Mode', 'Choose Cash, UPI, Card, Bank Transfer, Cheque or the configured method.'),
  step('Reference and Date', 'Store transaction reference and date when available.'),
  step('Save Payment', 'Save to update the payment history and invoice balance where connected.')
]);

const expenses = guide('expenses', 'Expenses Guide', '/expenses', 'Track general business expenses that are separate from Job Card costs.', [
  step('Job Cost vs Business Expense', 'Job Card costs belong to one vehicle job. Use Expenses for general workshop spending.'),
  step('Add Expense', 'Create a new business expense record.', null, '/expenses/new'),
  step('Category', 'Choose a category that makes the spending understandable.'),
  step('Description', 'Write what the business paid for.'),
  step('Amount and Date', 'Record the amount and transaction date.'),
  step('Vendor / Payment Mode', 'Add vendor and payment method when useful.'),
  step('Save', 'Save the expense for business reporting.')
]);

const reports = guide('reports', 'Reports Guide', '/reports', 'Read workshop and finance summaries without changing live records.', [
  step('Report Type', 'Start with the question you want to answer: jobs, revenue, payments, stock or staff.'),
  step('Date Range', 'Choose the reporting period.'),
  step('Branch / Staff Filters', 'Narrow the report when the workshop uses multiple branches or staff responsibility.'),
  step('Summary Cards', 'Use summary totals for a quick overview.'),
  step('Chart / Table', 'Use detailed data to understand why the totals changed.'),
  step('Export', 'Export only when you need to share or use the report outside CubixGear.')
]);

const notifications = guide('notifications', 'Notifications Guide', '/notifications', 'Review stock, job, payment and system alerts.', [
  step('Unread / Read', 'Start with unread notifications that may need action.'),
  step('Alert Category', 'The category tells you whether the alert is about stock, jobs, money or the system.'),
  step('Open', 'Open the notification source to resolve the underlying issue.'),
  step('Mark Read', 'Mark the alert read after you understand or resolve it.'),
  step('Stock Alert', 'For low-stock alerts, open the stock item and review replenishment needs.')
]);

const attendance = guide('attendance', 'My Attendance Guide', '/my-attendance', 'Use this area for your own attendance, leave and work-day history.', [
  step('Today Status', 'Check today’s attendance state and worked time.'),
  step('Clock In / Clock Out', 'Use the main attendance action at the start and end of the work day.'),
  step('Calendar', 'Review working days, holidays and approved leave.', null, '/my-attendance/calendar'),
  step('History & Logs', 'Review previous clock records and corrections.', null, '/my-attendance/history'),
  step('Leave Requests', 'Apply for leave and track approval status.', null, '/my-attendance/leave'),
  step('Summary', 'Review monthly present days, leave, holidays, hours and late days.', null, '/my-attendance/summary')
]);

const attendanceManager = guide('attendance-manager', 'Attendance Manager Guide', '/attendance-manager', 'Review and approve team attendance.', [
  step('Pending Approvals', 'Start with requests that need manager action.'),
  step('Team Review', 'Review employee attendance records by staff and day.'),
  step('Open Staff / Day', 'Open a staff/day record before approving corrections or changes.'),
  step('Master Records', 'Use master records for the complete attendance view.'),
  step('Leave Types', 'Configure leave categories when required.'),
  step('Holiday Calendar', 'Maintain company and branch holidays.'),
  step('Attendance Rules', 'Configure work-day rules such as timing or lateness.'),
  step('Approve / Reject', 'Review the request details before approving or rejecting.')
]);

const staff = guide('staff', 'Staff & Roles Guide', '/staff-management', 'Manage staff accounts, roles and access.', [
  step('Staff List', 'Review active staff and their assigned branch or role.'),
  step('Add Staff', 'Create a staff account when a new employee needs access.'),
  step('Open Profile', 'Open the staff record to review identity and assignment.'),
  step('Role Assignment', 'Assign the role that matches the employee’s workshop responsibility.'),
  step('Role-based Visibility', 'Roles control which pages and actions the employee should see.'),
  step('Permissions', 'Use permissions only when the default role access needs adjustment.'),
  step('Deactivate', 'Deactivate access when a staff member should no longer use the workspace.')
]);

const payroll = guide('payroll', 'Payroll Guide', '/payroll', 'Follow the salary lifecycle from setup to approval and disbursal.', [
  step('Payroll Dashboard', 'Start with the current payroll period and status.'),
  step('Salary Structure', 'Maintain the salary structure used for payroll calculation.', null, '/payroll/salary-structure'),
  step('Monthly Payroll', 'Generate or review the monthly payroll.', null, '/payroll/monthly'),
  step('Approvals', 'Review payroll before money is released.', null, '/payroll/approvals'),
  step('Disbursal', 'Record the actual salary payment only after approval.', null, '/payroll/disbursal'),
  step('Advances', 'Track salary advances separately.', null, '/payroll/advances'),
  step('Payslips', 'Generate or download employee payslips.', null, '/payroll/payslips'),
  step('Reports', 'Review payroll reports for accounting and management.', null, '/payroll/reports')
]);

const profile = guide('profile', 'Profile Guide', '/profile', 'Understand and update your own CubixGear account profile.', [
  step('Profile Photo', 'This photo or avatar identifies your account in the workspace.'),
  step('Display Name', 'Your name is shown in the header, staff references and account areas.'),
  step('Role / Designation', 'Your role explains your workshop responsibility and may control which pages you can access.'),
  step('Email', 'Review or update the email used for your account.'),
  step('Phone', 'Review or update your contact number.'),
  step('Branch / Workshop', 'This shows the workshop or branch assigned to your account when applicable.'),
  step('Account Security', 'Use password or security controls when available.'),
  step('Save Profile', 'Save after changing editable profile information.')
]);

const settings = guide('settings', 'Settings Guide', '/settings', 'Configure the workshop by section.', [
  step('Company & Locale', 'Set company identity, address, phone, currency and locale.'),
  step('Workshop Operations', 'Configure operational defaults used across the workshop.'),
  step('Billing & Tax', 'Set GST/tax details, invoice numbering and billing defaults.'),
  step('Inventory Defaults', 'Set stock and reorder defaults.'),
  step('Attendance Rules', 'Configure attendance and work-day rules.'),
  step('Payroll', 'Configure payroll defaults.'),
  step('Notifications', 'Choose which alerts the workspace should show or send.'),
  step('Roles & Security', 'Configure access and security defaults.'),
  step('Integrations', 'Manage connected services when available.'),
  step('Save Settings', 'Save the active settings section after making changes.')
]);

const accountBilling = guide('account-billing', 'SaaS Billing Guide', '/account/billing', 'Understand CubixGear product charges and billing history.', [
  step('Current Plan / Account', 'Review the current account or plan information.'),
  step('Billing Period', 'Check which billing period the charges belong to.'),
  step('Subscription / Base Charges', 'Review any configured base or subscription charge.'),
  step('Storage Charge', 'Review the storage usage charge included in product billing.'),
  step('Payment Status', 'Check whether the product bill is paid or outstanding.'),
  step('Billing History', 'Open previous bills for audit or accounting.'),
  step('Download', 'Download the product bill or receipt when available.')
]);

const storage = guide('storage', 'Media Storage Guide', '/account/storage', 'Understand workshop photo storage, usage and charging.', [
  step('Storage Overview', 'Review current storage usage and account-level media information.'),
  step('Storage Pricing', 'The configured product direction is ₹2 per GB per day. Show the actual configured charge used by the account.'),
  step('Upload Photos', 'Upload workshop photos from the device.'),
  step('Take Photo', 'On mobile, use the camera to capture a workshop photo directly.'),
  step('Photo Stage / Category', 'Label photos with the correct Job Card or repair stage where available.'),
  step('Delete Permissions', 'Only users with permission should be able to remove stored workshop media.'),
  step('Usage Interval', 'Choose a date interval to review storage usage and charges.'),
  step('Storage History', 'Open history to inspect usage day by day.', null, '/account/storage/history')
]);

const storageHistory = guide('storage-history', 'Storage History Guide', '/account/storage/history', 'Review storage usage for an interval and open any day.', [
  step('Date Interval', 'Choose the start and end date for the usage period.'),
  step('Interval Total', 'Review total storage usage and charge for the selected interval.'),
  step('Daily Usage', 'Each row or card shows the storage recorded for that day.'),
  step('Daily Charge', 'Review the day’s calculated storage charge where shown.'),
  step('Open Day', 'Open a date to see the files stored for that snapshot.')
]);

const storageDay = guide('storage-day', 'Daily Storage Snapshot Guide', '/account/storage/history/:date', 'Inspect the files and usage recorded for one day.', [
  step('Selected Date', 'Confirm which daily snapshot you are viewing.'),
  step('Daily Storage', 'Review the total storage recorded for the day.'),
  step('Daily Charge', 'Review the day’s storage charge when shown.'),
  step('File List', 'See the media files included in the daily snapshot.'),
  step('File Source', 'Use the Job Card/customer/source reference to understand where the file came from.'),
  step('Preview', 'Open the file when you need to inspect it.'),
  step('Delete', 'Delete only when you have permission and the file is genuinely no longer required.'),
  step('Back to History', 'Return to Storage History to compare other days.', null, '/account/storage/history')
]);

const pathParts = (pathname) => pathname.split('/').filter(Boolean);
const isIdRoute = (pathname, base) => {
  const parts = pathParts(pathname);
  return parts[0] === base && parts.length >= 2 && !['new', 'add', 'create'].includes(parts[1]);
};

export function getGuideForPath(pathname) {
  if (pathname === '/dashboard') return dashboard;

  if (pathname === '/customers/new' || pathname === '/customers/add') return customerCreate;
  if (isIdRoute(pathname, 'customers')) return customerDetail;
  if (pathname.startsWith('/customers')) return customers;

  if (pathname === '/vehicles/new' || pathname === '/vehicles/add') return vehicleCreate;
  if (isIdRoute(pathname, 'vehicles')) return vehicleDetail;
  if (pathname.startsWith('/vehicles')) return vehicles;

  if (pathname.startsWith('/services')) return services;

  if (pathname === '/jobs/new' || pathname === '/jobs/add') return jobCreate;
  if (isIdRoute(pathname, 'jobs')) return jobDetail;
  if (pathname.startsWith('/jobs')) return jobs;

  if (pathname.startsWith('/inventory')) return inventory;

  if (pathname === '/stock/new') return stockCreate;
  if (pathname === '/stock/in') return stockMovement('stock-in', 'Stock In Guide', '/stock/in', 'Record quantity entering workshop inventory.', 'increase available stock');
  if (pathname === '/stock/issue') return stockMovement('stock-issue', 'Stock Out / Issue Guide', '/stock/issue', 'Record stock leaving outside automatic invoice deduction.', 'decrease available stock');
  if (pathname === '/stock/return') return stockMovement('stock-return', 'Stock Return Guide', '/stock/return', 'Record stock returning to inventory.', 'increase or reverse previously issued stock');
  if (pathname === '/stock/transfer') return stockMovement('stock-transfer', 'Stock Transfer Guide', '/stock/transfer', 'Move stock between workshop locations or branches.', 'move quantity between locations');
  if (pathname === '/stock/adjustments') return stockMovement('stock-adjustment', 'Stock Adjustment Guide', '/stock/adjustments', 'Correct stock quantity with an audit reason.', 'adjust the recorded quantity');
  if (pathname === '/stock/low-stock') return stockLow;
  if (pathname === '/stock/ledger') return stockLedger;
  if (['/stock/suppliers', '/stock/purchases', '/stock/count', '/stock/reports', '/stock/reservations'].includes(pathname)) return stockAdvanced;
  if (pathname.startsWith('/stock')) return stock;

  if (pathname === '/invoices/new' || pathname === '/invoices/create') return invoiceCreate;
  if (isIdRoute(pathname, 'invoices')) return invoiceDetail;
  if (pathname.startsWith('/quotations')) return quotations;
  if (pathname.startsWith('/invoices')) return invoices;

  if (pathname.startsWith('/payments')) return payments;
  if (pathname.startsWith('/expenses')) return expenses;
  if (pathname.startsWith('/reports')) return reports;
  if (pathname.startsWith('/notifications')) return notifications;

  if (pathname.startsWith('/my-attendance')) return attendance;
  if (pathname.startsWith('/attendance-manager')) return attendanceManager;
  if (pathname.startsWith('/staff-management')) return staff;
  if (pathname.startsWith('/payroll')) return payroll;

  if (pathname === '/profile') return profile;
  if (pathname === '/settings') return settings;
  if (pathname === '/account/billing') return accountBilling;
  if (pathname === '/account/storage/history') return storageHistory;
  if (pathname.startsWith('/account/storage/history/')) return storageDay;
  if (pathname === '/account/storage') return storage;

  return null;
}

export const guides = {
  dashboard,
  customers,
  customerCreate,
  customerDetail,
  vehicles,
  vehicleCreate,
  vehicleDetail,
  services,
  jobs,
  jobCreate,
  jobDetail,
  inventory,
  stock,
  stockCreate,
  billing: invoices,
  invoiceCreate,
  invoiceDetail,
  quotation: quotations,
  payments,
  expenses,
  reports,
  notifications,
  attendance,
  attendanceManager,
  staff,
  payroll,
  profile,
  settings,
  accountBilling,
  storage,
  storageHistory,
  storageDay
};
