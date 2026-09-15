import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, HelpCircle, X } from 'lucide-react';
import { useGuidance } from './useGuidance';

const emptyRect = { top: 0, left: 0, width: 0, height: 0 };

export function GuidanceWindow() {
  const { activeGuide, stepIndex, closeGuide, next, previous, goToStepAction, roleMessage } = useGuidance();
  const cardRef = useRef(null);
  const [targetRect, setTargetRect] = useState(emptyRect);
  const step = activeGuide?.steps?.[stepIndex];

  const progress = useMemo(() => {
    if (!activeGuide?.steps?.length) return 0;
    return ((stepIndex + 1) / activeGuide.steps.length) * 100;
  }, [activeGuide, stepIndex]);

  useEffect(() => {
    if (!activeGuide) return;
    const previous = document.activeElement;
    const timer = setTimeout(() => cardRef.current?.focus(), 30);
    return () => {
      clearTimeout(timer);
      previous?.focus?.();
    };
  }, [activeGuide]);

  useEffect(() => {
    if (!activeGuide) return;
    const onKey = (event) => {
      if (event.key === 'Escape') closeGuide('skipped');
      if (event.key === 'ArrowRight' && !event.target?.matches?.('input,textarea,select')) next();
      if (event.key === 'ArrowLeft' && !event.target?.matches?.('input,textarea,select')) previous();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeGuide, closeGuide, next, previous]);

  useEffect(() => {
    if (!activeGuide || !step?.target) {
      setTargetRect(emptyRect);
      return;
    }

    let frame;
    const update = () => {
      const el = document.querySelector(step.target);
      if (!el) {
        setTargetRect(emptyRect);
        return;
      }
      const rect = el.getBoundingClientRect();
      if (rect.top < 72 || rect.bottom > window.innerHeight - 80) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
      }
      frame = requestAnimationFrame(() => {
        const nextRect = el.getBoundingClientRect();
        setTargetRect({ top: nextRect.top, left: nextRect.left, width: nextRect.width, height: nextRect.height });
      });
    };

    const timer = setTimeout(update, 120);
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      clearTimeout(timer);
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [activeGuide, step]);

  if (!activeGuide || !step) return null;
  const hasTarget = targetRect.width > 0 && targetRect.height > 0;
  const isLast = stepIndex === activeGuide.steps.length - 1;

  return (
    <div className="guidance-layer" role="presentation">
      <div className="guidance-backdrop" onClick={() => closeGuide('skipped')} />
      {hasTarget && (
        <div
          className="guidance-spotlight"
          style={{
            top: Math.max(6, targetRect.top - 6),
            left: Math.max(6, targetRect.left - 6),
            width: targetRect.width + 12,
            height: targetRect.height + 12
          }}
        />
      )}

      <section className="guidance-window" ref={cardRef} tabIndex={-1} aria-modal="true" role="dialog" aria-labelledby="guidance-title">
        <div className="guidance-window-top">
          <div className="guidance-icon"><HelpCircle size={18} /></div>
          <div className="guidance-heading-copy">
            <span>{activeGuide.title}</span>
            <strong id="guidance-title">{step.title}</strong>
          </div>
          <button type="button" className="guidance-close" onClick={() => closeGuide('skipped')} aria-label="Close guide"><X size={18}/></button>
        </div>

        <div className="guidance-progress-row">
          <span>{stepIndex + 1} of {activeGuide.steps.length}</span>
          <div className="guidance-progress"><i style={{ width: `${progress}%` }} /></div>
        </div>

        <p className="guidance-body">{step.body}</p>
        {stepIndex === 0 && roleMessage && <p className="guidance-role-note">{roleMessage}</p>}
        {step.target && !hasTarget && <p className="guidance-target-note">This screen has changed slightly. The guide will continue without blocking your work.</p>}

        <div className="guidance-actions">
          <button type="button" className="guidance-btn secondary" onClick={() => closeGuide('skipped')}>Skip</button>
          <div className="guidance-actions-right">
            {stepIndex > 0 && <button type="button" className="guidance-icon-btn" onClick={previous} aria-label="Previous step"><ArrowLeft size={17}/></button>}
            {step.action && <button type="button" className="guidance-btn secondary" onClick={goToStepAction}>Open <ExternalLink size={14}/></button>}
            <button type="button" className="guidance-btn primary" onClick={next}>{isLast ? 'Done' : <>Next <ArrowRight size={15}/></>}</button>
          </div>
        </div>
      </section>
    </div>
  );
}
