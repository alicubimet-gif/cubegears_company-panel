import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getGuideForPath, guides, roleGuideCopy } from './guides';

export const GuidanceContext = createContext(null);

const storageKey = (userId) => `cubixgear:guidance:${userId || 'guest'}`;
const defaultState = {
  showTips: true,
  demoModeEnabled: false,
  guides: {},
  dismissedTips: []
};

function readState(userId) {
  try {
    const raw = localStorage.getItem(storageKey(userId));
    return raw ? { ...defaultState, ...JSON.parse(raw) } : { ...defaultState };
  } catch {
    return { ...defaultState };
  }
}

export function GuidanceProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [state, setState] = useState(() => readState(user?.id));
  const [activeGuide, setActiveGuide] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [launcherEl, setLauncherEl] = useState(null);

  useEffect(() => {
    setState(readState(user?.id));
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id) return;
    localStorage.setItem(storageKey(user.id), JSON.stringify(state));
  }, [state, user?.id]);

  const routeGuide = useMemo(() => getGuideForPath(location.pathname), [location.pathname]);
  const routeGuideState = routeGuide ? state.guides?.[routeGuide.id] : null;

  const openGuide = useCallback((guide = routeGuide, startAt = 0, opener = null) => {
    if (!guide) return;
    setLauncherEl(opener || document.activeElement);
    setActiveGuide(guide);
    const safeIndex = Math.min(Math.max(Number(startAt || 0), 0), Math.max(guide.steps.length - 1, 0));
    setStepIndex(safeIndex);
    setState((prev) => ({
      ...prev,
      guides: {
        ...prev.guides,
        [guide.id]: {
          guideVersion: guide.version,
          status: 'active',
          lastStep: safeIndex,
          completedAt: null
        }
      }
    }));
  }, [routeGuide]);

  const closeGuide = useCallback((status = 'skipped') => {
    if (activeGuide) {
      setState((prev) => ({
        ...prev,
        guides: {
          ...prev.guides,
          [activeGuide.id]: {
            guideVersion: activeGuide.version,
            status,
            lastStep: stepIndex,
            completedAt: status === 'completed' ? new Date().toISOString() : null
          }
        }
      }));
    }
    setActiveGuide(null);
    setStepIndex(0);
    setTimeout(() => launcherEl?.focus?.(), 0);
  }, [activeGuide, launcherEl, stepIndex]);

  const next = useCallback(() => {
    if (!activeGuide) return;
    if (stepIndex >= activeGuide.steps.length - 1) {
      closeGuide('completed');
      return;
    }
    const nextIndex = stepIndex + 1;
    setStepIndex(nextIndex);
    setState((prev) => ({
      ...prev,
      guides: {
        ...prev.guides,
        [activeGuide.id]: {
          ...(prev.guides?.[activeGuide.id] || {}),
          guideVersion: activeGuide.version,
          status: 'active',
          lastStep: nextIndex
        }
      }
    }));
  }, [activeGuide, closeGuide, stepIndex]);

  const previous = useCallback(() => setStepIndex((value) => Math.max(0, value - 1)), []);

  const goToStepAction = useCallback(() => {
    const action = activeGuide?.steps?.[stepIndex]?.action;
    if (!action) return;
    closeGuide('completed');
    navigate(action);
  }, [activeGuide, closeGuide, navigate, stepIndex]);

  const restartTour = useCallback(() => {
    setState((prev) => ({ ...prev, guides: {} }));
    openGuide(guides.dashboard, 0);
  }, [openGuide]);

  const restartCurrentGuide = useCallback((opener = null) => {
    if (!routeGuide) return;
    openGuide(routeGuide, 0, opener);
  }, [openGuide, routeGuide]);

  const resumeCurrentGuide = useCallback((opener = null) => {
    if (!routeGuide) return;
    const saved = state.guides?.[routeGuide.id];
    const startAt = saved?.guideVersion === routeGuide.version ? Number(saved.lastStep || 0) : 0;
    openGuide(routeGuide, startAt, opener);
  }, [openGuide, routeGuide, state.guides]);

  const resetDismissedTips = useCallback(() => setState((prev) => ({ ...prev, dismissedTips: [] })), []);
  const setShowTips = useCallback((value) => setState((prev) => ({ ...prev, showTips: Boolean(value) })), []);
  const setDemoMode = useCallback((value) => setState((prev) => ({ ...prev, demoModeEnabled: Boolean(value) })), []);

  useEffect(() => {
    if (!activeGuide) return;
    const stillMatchesRoute = getGuideForPath(location.pathname)?.id === activeGuide.id;
    if (!stillMatchesRoute) {
      setActiveGuide(null);
      setStepIndex(0);
    }
  }, [activeGuide, location.pathname]);

  useEffect(() => {
    if (!isAuthenticated || !user?.id || location.pathname !== '/dashboard' || activeGuide || !state.showTips) return;
    const guideState = state.guides?.dashboard;
    const shouldShow = !guideState || guideState.guideVersion !== guides.dashboard.version || guideState.status === 'not_started';
    if (shouldShow) {
      const timer = setTimeout(() => openGuide(guides.dashboard, 0), 500);
      return () => clearTimeout(timer);
    }
  }, [activeGuide, isAuthenticated, location.pathname, openGuide, state.guides, state.showTips, user?.id]);

  const value = {
    state,
    activeGuide,
    stepIndex,
    routeGuide,
    routeGuideState,
    roleMessage: roleGuideCopy[user?.role] || roleGuideCopy.ADMIN,
    openGuide,
    closeGuide,
    next,
    previous,
    goToStepAction,
    restartTour,
    restartCurrentGuide,
    resumeCurrentGuide,
    resetDismissedTips,
    setShowTips,
    setDemoMode
  };

  return <GuidanceContext.Provider value={value}>{children}</GuidanceContext.Provider>;
}
