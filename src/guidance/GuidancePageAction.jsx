import React, { useState } from 'react';
import { FlaskConical, HelpCircle, RotateCcw, Settings2, X } from 'lucide-react';
import { useGuidance } from './useGuidance';

export function GuidancePageAction() {
  const { routeGuide, restartCurrentGuide, restartTour, setDemoMode } = useGuidance();
  const [open, setOpen] = useState(false);

  if (!routeGuide) return null;

  return (
    <div className="guidance-page-action-wrap">
      <button
        type="button"
        className="guidance-page-action"
        onClick={(event) => restartCurrentGuide(event.currentTarget)}
        aria-label={`Open ${routeGuide.title}`}
        title={routeGuide.title}
      >
        <HelpCircle size={16}/>
        <span>Guide</span>
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

          <div className="guidance-menu-note">Guidance opens automatically every time you enter a route. Nothing is stored as completed.</div>

          <button type="button" onClick={(event) => { restartCurrentGuide(event.currentTarget); setOpen(false); }}>
            <RotateCcw size={15}/> Restart this page guide
          </button>
          <button type="button" onClick={() => { restartTour(); setOpen(false); }}>
            <RotateCcw size={15}/> Open dashboard guide
          </button>
          <button type="button" onClick={() => { setDemoMode(true); setOpen(false); }}>
            <FlaskConical size={15}/> Open demo workspace
          </button>
        </div>
      )}
    </div>
  );
}
