const isVisible = (el) => {
  if (!el || !(el instanceof HTMLElement)) return false;
  const style = window.getComputedStyle(el);
  const rect = el.getBoundingClientRect();
  return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity || 1) !== 0 && rect.width > 0 && rect.height > 0;
};

const cleanText = (value = '') => String(value).replace(/\s+/g, ' ').trim();
const normalize = (value = '') => cleanText(value).toLowerCase();

const readableName = (el, index) => {
  const authored = cleanText(el.getAttribute?.('data-guide-title'));
  if (authored) return authored;

  const aria = cleanText(el.getAttribute?.('aria-label'));
  if (aria) return aria;

  const labelledBy = el.getAttribute?.('aria-labelledby');
  if (labelledBy) {
    const labelled = document.getElementById(labelledBy);
    if (labelled) return cleanText(labelled.textContent);
  }

  const id = el.id;
  if (id) {
    const label = document.querySelector(`label[for="${CSS.escape(id)}"]`);
    if (label) return cleanText(label.textContent);
  }

  const parentLabel = el.closest?.('label');
  if (parentLabel) {
    const text = cleanText(parentLabel.textContent);
    if (text) return text.replace(cleanText(el.value || ''), '').trim();
  }

  const nearbyLabel = el.parentElement?.querySelector?.(':scope > label, :scope > .field-label, :scope > .form-label');
  if (nearbyLabel) {
    const text = cleanText(nearbyLabel.textContent);
    if (text) return text;
  }

  const placeholder = cleanText(el.getAttribute?.('placeholder'));
  if (placeholder) return placeholder;

  const text = cleanText(el.textContent);
  if (text) return text;

  const name = cleanText(el.getAttribute?.('name'));
  if (name) return name.replace(/[-_]/g, ' ');

  return `Control ${index + 1}`;
};

const fieldPurpose = (label) => {
  const value = normalize(label);

  if (value.includes('customer name') || value === 'customer') return 'Choose or enter the customer connected to this workshop record.';
  if (value.includes('phone') || value.includes('mobile')) return 'Enter the primary contact number used by the workshop.';
  if (value.includes('email')) return 'Enter the email only when the workshop needs digital communication or billing.';
  if (value.includes('registration')) return 'Enter the vehicle registration number used to identify this vehicle in the workshop.';
  if (value.includes('vehicle') && value.includes('model')) return 'Enter the vehicle make or model so staff can identify it quickly.';
  if (value.includes('odometer')) return 'Record the current odometer reading when useful for service history.';
  if (value.includes('vin') || value.includes('chassis')) return 'Enter VIN or chassis number when available. It is optional for quick workshop check-in.';
  if (value.includes('complaint')) return 'Write what the customer reported. This becomes the starting reference for the Job Card.';
  if (value.includes('assigned') || value.includes('mechanic') || value.includes('service advisor')) return 'Choose the staff member responsible for this work when your workshop uses assignments.';
  if (value.includes('priority')) return 'Use priority to distinguish urgent workshop work from normal jobs.';
  if (value.includes('status')) return 'Choose the current workflow status so the team knows what should happen next.';
  if (value.includes('item name') || value.includes('part name')) return 'Enter the part or item name staff will recognize in Stock and billing.';
  if (value.includes('part no') || value.includes('part number') || value.includes('sku') || value.includes('code')) return 'Enter the supplier part number, SKU or internal code when available.';
  if (value.includes('purchase price') || value.includes('cost price') || value === 'cost') return 'Enter the workshop’s internal cost for this item or purchase.';
  if (value.includes('selling price') || value.includes('sell price') || value.includes('rate')) return 'Enter the amount normally charged to the customer. Billing can adjust it when needed.';
  if (value.includes('quantity') || value === 'qty') return 'Enter the quantity used, received or billed.';
  if (value.includes('opening stock')) return 'Enter the quantity already available when this stock item is created.';
  if (value.includes('minimum stock') || value.includes('reorder')) return 'Set the low-stock threshold used for replenishment alerts.';
  if (value.includes('gstin')) return 'Enter the GSTIN used for business or GST billing.';
  if (value.includes('place of supply')) return 'Choose the place of supply used by the GST billing workflow.';
  if (value.includes('billing address') || value === 'address') return 'Enter the address used for the customer or billing document when required.';
  if (value.includes('discount')) return 'Enter a discount only when the customer document requires one.';
  if (value.includes('paid amount') || value === 'paid') return 'Enter how much money has already been received for this document.';
  if (value.includes('payment mode')) return 'Choose how the customer paid, such as Cash, UPI, Card or Bank Transfer.';
  if (value.includes('reference')) return 'Store the relevant transaction, supplier, job or payment reference.';
  if (value.includes('supplier')) return 'Choose or enter the supplier connected to this purchase or stock movement.';
  if (value.includes('notes') || value.includes('description')) return 'Enter only the useful detail another staff member will need to understand this record.';
  if (value.includes('date')) return 'Select the date used for this workshop record or transaction.';
  if (value.includes('profile photo') || value.includes('avatar')) return 'Choose the account photo shown in the workspace.';
  if (value.includes('display name') || value.includes('full name')) return 'Enter the name shown for this account across CubixGear.';
  if (value.includes('role')) return 'The role controls or describes the user’s workshop responsibility and access.';
  if (value.includes('branch')) return 'Choose the workshop branch connected to this record or user.';

  return '';
};

const describeControl = (el, label) => {
  const authored = cleanText(el.getAttribute?.('data-guide-help'));
  if (authored) return authored;

  const purpose = fieldPurpose(label);
  if (purpose) return purpose;

  const tag = el.tagName?.toLowerCase();
  const type = String(el.getAttribute?.('type') || '').toLowerCase();

  if (tag === 'select') return `Choose the correct option for ${label}.`;
  if (tag === 'textarea') return `Enter the useful workshop details for ${label}.`;
  if (tag === 'input') {
    if (type === 'checkbox' || type === 'radio') return `Use this control to set ${label}.`;
    if (type === 'file') return `Use ${label} to select or upload the required file.`;
    if (type === 'date' || type === 'datetime-local') return `Select the required date for ${label}.`;
    return `Enter ${label}.`;
  }
  if (tag === 'a') return `${label} opens the related page or workflow.`;
  if (tag === 'button' || el.getAttribute?.('role') === 'button') return `Use ${label} to perform this workshop action.`;
  return `This section is used for ${label}.`;
};

const assignTarget = (el, prefix, index) => {
  const authored = cleanText(el.getAttribute?.('data-guide'));
  if (authored) return `[data-guide="${CSS.escape(authored)}"]`;

  const token = `${prefix}-${index}`.replace(/[^a-zA-Z0-9_-]/g, '-');
  el.setAttribute('data-guidance-auto', token);
  return `[data-guidance-auto="${token}"]`;
};

const isGuideNoise = (el) => {
  if (el.closest('.guidance-page-action-wrap,.guidance-layer,.header,.sidebar,.mobile-bottom-nav')) return true;
  if (el.matches('[disabled],[aria-hidden="true"]')) return true;
  if (el.matches('button') && !cleanText(el.textContent) && !cleanText(el.getAttribute('aria-label')) && !el.hasAttribute('data-guide')) return true;
  return false;
};

const collectControls = (root, prefix) => {
  const selector = [
    '[data-guide]',
    'input:not([type="hidden"])',
    'select',
    'textarea',
    'button',
    'a[href]',
    '[role="button"]',
    '[role="tab"]'
  ].join(',');

  const seen = new Set();
  return Array.from(root.querySelectorAll(selector))
    .filter((el) => {
      if (!isVisible(el) || isGuideNoise(el)) return false;
      if (seen.has(el)) return false;
      seen.add(el);
      return true;
    })
    .map((el, index) => {
      const label = readableName(el, index);
      return {
        title: label,
        body: describeControl(el, label),
        target: assignTarget(el, prefix, index)
      };
    });
};

export function buildPageGuide(baseGuide, pathname, root = document.querySelector('.main-content')) {
  if (!root || !baseGuide) return baseGuide;
  const prefix = `page-${pathname.replace(/[^a-zA-Z0-9]/g, '-')}`;
  const autoSteps = collectControls(root, prefix);

  return {
    ...baseGuide,
    id: `${baseGuide.id}:${pathname}`,
    steps: [
      ...(baseGuide.steps || []),
      ...autoSteps
    ]
  };
}

export function buildContextGuide(container, pathname) {
  if (!container || !isVisible(container)) return null;

  const heading = cleanText(
    container.getAttribute?.('data-guide-title') ||
    container.querySelector('h1,h2,h3,[role="heading"]')?.textContent
  ) || 'Opened panel';

  const prefix = `context-${Date.now()}`;
  const steps = [
    {
      title: heading,
      body: cleanText(container.getAttribute?.('data-guide-help')) || 'This panel has just opened. Follow the highlighted controls to complete this action.',
      target: assignTarget(container, prefix, 0)
    },
    ...collectControls(container, `${prefix}-control`)
  ];

  return {
    id: `context:${pathname}:${heading}:${Date.now()}`,
    version: 1,
    title: `${heading} Guidance`,
    route: pathname,
    steps
  };
}

export function getVisibleContextContainers(root = document.querySelector('.main-content')) {
  if (!root) return [];
  const selectors = [
    '[data-guide-context="true"]',
    '[role="dialog"]:not(.guidance-window)',
    '.modal',
    '.modal-content',
    '.responsive-modal-sheet',
    '.bottom-sheet',
    '.drawer',
    '.sheet'
  ];

  return Array.from(root.querySelectorAll(selectors.join(',')))
    .filter((el, index, list) => isVisible(el) && !list.some((other, otherIndex) => otherIndex !== index && other.contains(el)));
}

export function contextSignature(el) {
  if (!el) return '';
  const heading = cleanText(
    el.getAttribute?.('data-guide-title') ||
    el.querySelector('h1,h2,h3,[role="heading"]')?.textContent
  );
  const fieldNames = Array.from(el.querySelectorAll('[data-guide],input:not([type="hidden"]),select,textarea,button'))
    .filter((item) => isVisible(item) && !isGuideNoise(item))
    .map((item, index) => readableName(item, index))
    .join('|');
  return `${el.tagName}:${heading}:${fieldNames}`;
}
