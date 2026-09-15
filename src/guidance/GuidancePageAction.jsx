import React, { useState } from 'react';
import { FlaskConical, HelpCircle, PlayCircle, RotateCcw, Settings2, X } from 'lucide-react';
import { useGuidance } from './useGuidance';

export function GuidancePageAction() {
  const {
    routeGuide,
    routeGuideState,
    resumeCurrentGuide,
    restartCurrentGuide,
    state,
    restartTour,
    resetDismissedTips,
    setShowTips,
    setDemoMode
  } = useGuidance();
  const [open, setOpen] = useState(false);

  if (!routeGuide) return null;

  const resumable = routeGuideState?.status === 'active' && routeGuideState?.guideVersion === routeGuide.version;
  const completed = routeGuideState?.status === 'completed' && routeGuideState?.guideVersion === routeGuide.version;

  return (
    <div className="guidance-page-action-wrap">
      <button
        type="button"
        className="guidance-page-action"
        onClick={(event) => resumable ? resumeCurrentGuide(event.currentTarget) : restartCurrentGuide(event.currentTarget)}
        aria-label={`Open ${routeGuide.title}`}
        title={routeGuide.title}
      >
        <HelpCircle size={16}/>
        <span>{resumable ? 'Resume Guide' : 'Guide'}</span>
        {completed && <span className="guidance-page-done" aria-label="Guide completed">✓</span>}
      </button>

      <button type="button" className="guidance-page-more" onClick={() => setOpen((value) => !value)} aria-label="Guidance options">
        <Settings2 size={15}/>
      </button>

      {open && (
        <div className="guidance-page-menu">
          <div className="guidance-page-menu-head">
            <div><strong>Help & Guidance</strong><small>{routeGuide.title}</small></div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close guidance options"><X size={15}/></button>
          </div>

          <label className="guidance-toggle-row">
            <span>Show first-run guidance</span>
            <input type="checkbox" checked={state.showTips} onChange={(e) => setShowTips(e.target.checked)}/>
          </label>

          <button type="button" onClick={(event) => { restartCurrentGuide(event.currentTarget); setOpen(false); }}>
            <RotateCcw size={15}/> Restart this page guide
          </button>
          <button type="button" onClick={() => { restartTour(); setOpen(false); }}>
            <PlayCircle size={15}/> Restart full product tour
          </button>
          <button type="button" onClick={() => { setDemoMode(true); setOpen(false); }}>
            <FlaskConical size={15}/> Open demo workspace
          </button>
          <button type="button" onClick={() => { resetDismissedTips(); setOpen(false); }}>
            <PlayCircle size={15}/> Reset dismissed tips
          </button>
        </div>
      )}
    </div>
  );
}
