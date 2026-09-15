import React, { useState } from 'react';
import { FlaskConical, HelpCircle, PlayCircle, RotateCcw, Settings2, X } from 'lucide-react';
import { useGuidance } from './useGuidance';

export function GuidancePageAction() {
  const { routeGuide, openGuide, state, restartTour, resetDismissedTips, setShowTips, setDemoMode } = useGuidance();
  const [open, setOpen] = useState(false);

  if (!routeGuide) return null;

  return (
    <div className="guidance-page-action-wrap">
      <button
        type="button"
        className="guidance-page-action"
        onClick={(event) => openGuide(routeGuide, 0, event.currentTarget)}
        aria-label={`Open ${routeGuide.title}`}
      >
        <HelpCircle size={16}/><span>Guide</span>
      </button>
      <button type="button" className="guidance-page-more" onClick={() => setOpen((value) => !value)} aria-label="Guidance options">
        <Settings2 size={15}/>
      </button>
      {open && (
        <div className="guidance-page-menu">
          <div className="guidance-page-menu-head"><strong>Help & Guidance</strong><button type="button" onClick={() => setOpen(false)}><X size={15}/></button></div>
          <label className="guidance-toggle-row"><span>Show guidance tips</span><input type="checkbox" checked={state.showTips} onChange={(e) => setShowTips(e.target.checked)}/></label>
          <button type="button" onClick={() => { restartTour(); setOpen(false); }}><RotateCcw size={15}/> Restart product tour</button>
          <button type="button" onClick={() => { setDemoMode(true); setOpen(false); }}><FlaskConical size={15}/> Open demo workspace</button>
          <button type="button" onClick={() => { resetDismissedTips(); setOpen(false); }}><PlayCircle size={15}/> Reset dismissed tips</button>
        </div>
      )}
    </div>
  );
}
