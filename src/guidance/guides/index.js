export const GUIDE_VERSION = 1;

const step = (title, body, target = null, action = null) => ({ title, body, target, action });

export const guides = {
  dashboard: {
    id: 'dashboard', version: GUIDE_VERSION, title: 'Dashboard guide', route: '/dashboard',
    intro: 'Start here. CubixGear keeps the daily workshop actions in one place.',
    steps: [
      step('Welcome to CubixGear', 'The dashboard shows today’s work, collections, stock alerts and the fastest actions for your role.'),
      step('Create a Job Card', 'Use New Job Card when a vehicle arrives. The Job Card becomes the ongoing reference for costs, work updates and photos.', '.quick-actions-grid button:nth-child(2)', '/jobs/new'),
      step('Create an Invoice', 'Use Create Invoice for direct billing, or create it later from an active Job Card.', '.quick-actions-grid button:nth-child(3)', '/invoices/new'),
      step('Manage stock', 'Add and issue workshop parts from Stock. Daily stock entry is intentionally kept simple.', '.quick-actions-grid button:nth-child(4)', '/stock'),
      step('Open recent work', 'Recent Job Cards let you jump back into vehicles already in the workshop.', '.ui-table-wrap', '/jobs')
    ]
  },
  jobs: {
    id: 'jobs', version: GUIDE_VERSION, title: 'Job Cards guide', route: '/jobs',
    intro: 'A Job Card is the ongoing workshop reference for one vehicle. It is not the final customer bill.',
    steps: [
      step('Create the Job Card', 'Create one when the vehicle enters the workshop. Add the customer, vehicle, complaint and assigned staff.', null, '/jobs/new'),
      step('Track work over several days', 'Open a Job Card and repeatedly add parts, outside purchases, work notes and photos as the job progresses.'),
      step('Track internal cost', 'Parts & Costs stores the actual workshop cost. Selling price can be decided later during billing.'),
      step('Add photos', 'Use Upload Photos or Take Photo. Label the stage as Before Repair, During Repair, After Repair or another workshop stage.'),
      step('Create the customer invoice', 'When the work is ready, create an invoice from the Job Card. Job references are pre-filled; customer selling prices remain editable.', null, '/invoices/new')
    ]
  },
  billing: {
    id: 'billing', version: GUIDE_VERSION, title: 'Billing & invoice guide', route: '/invoices',
    intro: 'Billing supports both direct manual invoices and invoices created from a Job Card.',
    steps: [
      step('Choose the document', 'Create a regular bill, GST Tax Invoice or quotation/estimate depending on the customer need.'),
      step('Add bill items', 'Items can be Stock Part, Outside Purchase, Labour, Service, Consumable or Custom.'),
      step('Cost vs selling price', 'Cost price is an internal reference. Selling / Rate is the amount charged to the customer.'),
      step('Draft is safe', 'Saving a draft does not reduce stock. Stock Part quantity is deducted only when the invoice is finalized.'),
      step('Print / Save PDF', 'PDF output should contain only the fixed invoice document — never the app header, sidebar or navigation.')
    ]
  },
  stock: {
    id: 'stock', version: GUIDE_VERSION, title: 'Stock guide', route: '/stock',
    intro: 'Daily stock work stays simple even though advanced inventory tools are available.',
    steps: [
      step('Add a stock item', 'For normal daily entry use Item / Part Name, Part No / Code, Purchase Price, Selling Price and Quantity.', null, '/stock/new'),
      step('Stock In', 'Use Stock In when parts or consumables are received or purchased.'),
      step('Stock Out / Issue', 'Use Stock Out when inventory leaves outside automatic invoice deduction.'),
      step('Low stock', 'Low Stock highlights items at or below the configured minimum level.'),
      step('Ledger is for audit', 'The stock ledger is an advanced audit view. Daily users do not need it to add or sell a part.')
    ]
  },
  storage: {
    id: 'storage', version: GUIDE_VERSION, title: 'Photo & storage guide', route: '/account/storage',
    intro: 'Upload and capture workshop photos, then review storage usage for any interval.',
    steps: [
      step('Upload or capture', 'Use Upload Photos on desktop or Take Photo on mobile. Job photos should be linked to the Job Card and stage.'),
      step('Unlimited storage pricing', 'Current product direction uses unlimited storage billed at ₹2 per GB per day.'),
      step('Usage interval', 'Choose a date interval to see each day’s usage and storage charge.'),
      step('Open a day', 'Click a day to open its snapshot and see the files recorded for that date.'),
      step('Audit actions', 'Uploads, deletes and settings changes should be recorded with the user and timestamp.')
    ]
  },
  customers: {
    id: 'customers', version: GUIDE_VERSION, title: 'Customers guide', route: '/customers',
    intro: 'Customer profiles keep contact, billing and vehicle relationships together.',
    steps: [
      step('Create a customer', 'Add a customer before a Job Card when you need a reusable customer profile.', null, '/customers/new'),
      step('Keep only useful details', 'Name and phone are the daily essentials. Company/GST details can be added when required for business billing.'),
      step('Open the profile', 'Use the customer profile to see connected vehicles and workshop history.')
    ]
  }
};

export const roleGuideCopy = {
  SUPER_ADMIN: 'You can see the complete workshop. Start with Job Cards for daily operations, Billing for customer documents and Stock for parts.',
  ADMIN: 'You can manage the full workshop. Start with Job Cards, Billing and Stock.',
  MECHANIC: 'Your daily focus is assigned Job Cards: work notes, parts used, photos and status updates.',
  SERVICE_ADVISOR: 'Start with customer/vehicle intake and Job Cards, then move completed work into billing.',
  BILLING: 'Your daily focus is invoices, quotations and payments. Job Cards provide the work reference.',
  STOCK: 'Your daily focus is stock items, stock in/out and low-stock alerts.'
};

export function getGuideForPath(pathname) {
  if (pathname.startsWith('/jobs')) return guides.jobs;
  if (pathname.startsWith('/invoices') || pathname.startsWith('/quotations')) return guides.billing;
  if (pathname.startsWith('/stock') || pathname.startsWith('/inventory')) return guides.stock;
  if (pathname.startsWith('/account/storage')) return guides.storage;
  if (pathname.startsWith('/customers')) return guides.customers;
  if (pathname === '/dashboard') return guides.dashboard;
  return null;
}
