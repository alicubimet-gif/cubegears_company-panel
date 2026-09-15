import React from 'react';
import { ArrowRight, HelpCircle, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function EmptyStateGuide({ title = 'Nothing here yet', body, actionLabel = 'Create first record', actionPath, secondaryLabel = 'Learn how this works', onSecondary }) {
  const navigate = useNavigate();
  return (
    <div className="empty-guide">
      <div className="empty-guide-icon"><HelpCircle size={22}/></div>
      <div className="empty-guide-copy">
        <h3>{title}</h3>
        <p>{body || 'Start with the primary action. CubixGear will guide you through the rest of the workflow.'}</p>
      </div>
      <div className="empty-guide-actions">
        {actionPath && <button type="button" className="guidance-btn primary" onClick={() => navigate(actionPath)}><Plus size={15}/>{actionLabel}</button>}
        {onSecondary && <button type="button" className="guidance-btn secondary" onClick={onSecondary}>{secondaryLabel}<ArrowRight size={14}/></button>}
      </div>
    </div>
  );
}
