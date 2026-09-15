const isVisible = (el) => {
  if (!el || !(el instanceof HTMLElement)) return false;
  const style = window.getComputedStyle(el);
  const rect = el.getBoundingClientRect();
  return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity || 1) !== 0 && rect.width > 0 && rect.height > 0;
};

const cleanText = (value = '') => String(value).replace(/\s+/g, ' ').trim();

const readableName = (el, index) => {
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
  const placeholder = cleanText(el.getAttribute?.('placeholder'));
  if (placeholder) return placeholder;
  const text = cleanText(el.textContent);
  if (text) return text;
  const name = cleanText(el.getAttribute?.('name'));
  if (name) return name.replace(/[-_]/g, ' ');
  return `Control ${index + 1}`;
};

const describeControl = (el, label) => {
  const tag = el.tagName?.toLowerCase();
  const type = String(el.getAttribute?.('type') || '').toLowerCase();
  if (tag === 'select') return `Choose the correct option for ${label}.`;
  if (tag === 'textarea') return `Enter the required details for ${label}.`;
  if (tag === 'input') {
    if (type === 'checkbox' || type === 'radio') return `Use this control to set ${label}.`;
    if (type === 'file') return `Use ${label} to select or upload the required file.`;
    if (type === 'date' || type === 'datetime-local') return `Select the required date for ${label}.`;
    return `Enter ${label}. Complete this field with the workshop information required for this record.`;
  }
  if (tag === 'a') return `${label} opens the related page or workflow.`;
  if (tag === 'button' || el.getAttribute?.('role') === 'button') return `Use ${label} to continue this workflow or perform the shown action.`;
  return `This section is used for ${label}.`;
};

const assignTarget = (el, prefix, index) => {
  const token = `${prefix}-${index}`.replace(/[^a-zA-Z0-9_-]/g, '-');
  el.setAttribute('data-guidance-auto', token);
  return `[data-guidance-auto="${token}"]`;
};

const collectControls = (root, prefix) => {
  const selector = [
    'form',
    'input:not([type="hidden"])',
    'select',
    'textarea',
    'button',
    'a[href]',
    '[role="button"]'
  ].join(',');

  const seen = new Set();
  return Array.from(root.querySelectorAll(selector))
    .filter((el) => {
      if (!isVisible(el)) return false;
      if (el.closest('.guidance-page-action-wrap,.guidance-layer,.header,.sidebar,.mobile-bottom-nav')) return false;
      if (seen.has(el)) return false;
      seen.add(el);
      return true;
    })
    .map((el, index) => {
      const label = readableName(el, index);
      const target = assignTarget(el, prefix, index);
      const tag = el.tagName.toLowerCase();
      const title = tag === 'form' ? `${label || 'Form'} form` : label;
      return {
        title,
        body: tag === 'form'
          ? 'Complete the fields in this form, then use its main action button to save or continue.'
          : describeControl(el, label),
        target
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
    title: baseGuide.title,
    steps: [
      ...(baseGuide.steps || []),
      ...autoSteps
    ]
  };
}

export function buildContextGuide(container, pathname) {
  if (!container || !isVisible(container)) return null;
  const heading = cleanText(container.querySelector('h1,h2,h3,[role="heading"]')?.textContent) || 'Opened panel';
  const prefix = `context-${Date.now()}`;
  const steps = [
    {
      title: heading,
      body: 'This panel has just opened. Follow the highlighted controls to complete it.',
      target: assignTarget(container, prefix, 0)
    },
    ...collectControls(container, `${prefix}-control`)
  ];
  return {
    id: `context:${pathname}:${heading}:${Date.now()}`,
    version: 1,
    title: `${heading} guidance`,
    route: pathname,
    steps
  };
}

export function getVisibleContextContainers(root = document.querySelector('.main-content')) {
  if (!root) return [];
  const selectors = [
    '[role="dialog"]:not(.guidance-window)',
    '.modal',
    '.modal-content',
    '.responsive-modal-sheet',
    '.bottom-sheet',
    'form'
  ];
  return Array.from(root.querySelectorAll(selectors.join(','))).filter(isVisible);
}

export function contextSignature(el) {
  if (!el) return '';
  const heading = cleanText(el.querySelector('h1,h2,h3,[role="heading"]')?.textContent);
  const fieldNames = Array.from(el.querySelectorAll('input:not([type="hidden"]),select,textarea,button'))
    .filter(isVisible)
    .map((item, index) => readableName(item, index))
    .join('|');
  return `${el.tagName}:${heading}:${fieldNames}`;
}
