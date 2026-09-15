import React, { useMemo, useState } from 'react';
import { CheckCircle2, FlaskConical, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useGuidance } from './useGuidance';

const tasks = [
  'Create sample Job Card',
  'Add Engine Mount cost',
  'Add work update',
  'Add sample photo',
  'Create invoice from Job Card',
  'Finalize demo invoice preview'
];

export function DemoModeBanner() {
  const { user } = useAuth();
  const { state, setDemoMode } = useGuidance();
  const key = useMemo(() => `cubixgear:guidance-demo:${user?.id || 'guest'}`, [user?.id]);
  const [progress, setProgress] = useState(() => {
    try { return Number(localStorage.getItem(key) || 0); } catch { return 0; }
  });

  if (!state.demoModeEnabled) return null;

  const advance = () => {
    const next = Math.min(tasks.length, progress + 1);
    setProgress(next);
    try { localStorage.setItem(key, String(next)); } catch { /* noop */ }
  };

  return (
    <aside className="demo-mode-shell" aria-label="Demo workspace">
      <div className="demo-mode-banner">
        <div><FlaskConical size={17}/><strong>Demo Workspace</strong><span>Safe walkthrough only. No live workshop records, stock or invoices are changed.</span></div>
        <button type="button" onClick={() => setDemoMode(false)} aria-label="Exit demo"><X size={17}/></button>
      </div>
      <div className="demo-mode-card">
        <div className="demo-mode-progress"><span>{Math.min(progress + 1, tasks.length)} of {tasks.length}</span><strong>{tasks[Math.min(progress, tasks.length - 1)]}</strong></div>
        <p>{progress >= tasks.length ? 'Demo complete. You can now start with your real workshop.' : 'This guided demo uses isolated local guidance state. Continue to simulate the next workshop step.'}</p>
        <div className="demo-mode-actions">
          {progress < tasks.length ? <button type="button" className="guidance-btn primary" onClick={advance}>Complete demo step</button> : <button type="button" className="guidance-btn primary" onClick={() => setDemoMode(false)}><CheckCircle2 size={15}/> Start with my real workshop</button>}
          <button type="button" className="guidance-btn secondary" onClick={() => { setProgress(0); try { localStorage.setItem(key, '0'); } catch { /* noop */ } }}>Restart demo</button>
        </div>
      </div>
    </aside>
  );
}
