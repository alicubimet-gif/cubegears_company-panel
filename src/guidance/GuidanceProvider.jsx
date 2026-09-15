import React, { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getGuideForPath, guides, roleGuideCopy } from './guides';
import {
  buildContextGuide,
  buildPageGuide,
  contextSignature,
  getVisibleContextContainers
} from './pageGuideBuilder';

export const GuidanceContext = createContext(null);

const defaultState = {
  showTips: true,
  demoModeEnabled: false
};

export function GuidanceProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [state, setState] = useState(defaultState);
  const [activeGuide, setActiveGuide] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [launcherEl, setLauncherEl] = useState(null);
  const [currentPageGuide, setCurrentPageGuide] = useState(null);
  const contextSeenRef = useRef(new Set());
  const routeVisitRef = useRef('');

  const routeGuide = useMemo(() => getGuideForPath(location.pathname), [location.pathname]);
  const routeVisitKey = `${location.key}:${location.pathname}${location.search}`;

  const openGuide = useCallback((guide, startAt = 0, opener = null) => {
    if (!guide?.steps?.length) return;
    setLauncherEl(opener || document.activeElement);
    setActiveGuide(guide);
    setStepIndex(Math.min(Math.max(Number(startAt || 0), 0), guide.steps.length - 1));
  }, []);

  const closeGuide = useCallback(() => {
    setActiveGuide(null);
    setStepIndex(0);
    setTimeout(() => launcherEl?.focus?.(), 0);
  }, [launcherEl]);

  const next = useCallback(() => {
    if (!activeGuide) return;
    if (stepIndex >= activeGuide.steps.length - 1) {
      closeGuide();
      return;
    }
    setStepIndex((value) => value + 1);
  }, [activeGuide, closeGuide, stepIndex]);

  const previous = useCallback(() => setStepIndex((value) => Math.max(0, value - 1)), []);

  const goToStepAction = useCallback(() => {
    const action = activeGuide?.steps?.[stepIndex]?.action;
    if (!action) return;
    closeGuide();
    navigate(action);
  }, [activeGuide, closeGuide, navigate, stepIndex]);

  const buildAndOpenCurrentPage = useCallback((opener = null) => {
    if (!routeGuide) return;
    const built = buildPageGuide(routeGuide, location.pathname);
    setCurrentPageGuide(built);
    openGuide(built, 0, opener);
  }, [location.pathname, openGuide, routeGuide]);

  const restartTour = useCallback(() => {
    if (location.pathname === '/dashboard') {
      const built = buildPageGuide(guides.dashboard, '/dashboard');
      setCurrentPageGuide(built);
      openGuide(built, 0);
    } else {
      navigate('/dashboard');
    }
  }, [location.pathname, navigate, openGuide]);

  const restartCurrentGuide = useCallback((opener = null) => {
    buildAndOpenCurrentPage(opener);
  }, [buildAndOpenCurrentPage]);

  const resumeCurrentGuide = restartCurrentGuide;
  const resetDismissedTips = useCallback(() => {}, []);
  const setShowTips = useCallback(() => {}, []);
  const setDemoMode = useCallback((value) => setState((prev) => ({ ...prev, demoModeEnabled: Boolean(value) })), []);

  // Every route visit gets its complete guide again. Nothing is written to cookies/localStorage.
  useEffect(() => {
    if (!isAuthenticated || !user?.id || !routeGuide) return;
    if (routeVisitRef.current === routeVisitKey) return;

    routeVisitRef.current = routeVisitKey;
    contextSeenRef.current = new Set();
    setActiveGuide(null);
    setStepIndex(0);

    const timer = setTimeout(() => {
      const root = document.querySelector('.main-content');
      getVisibleContextContainers(root).forEach((el) => contextSeenRef.current.add(contextSignature(el)));
      const built = buildPageGuide(routeGuide, location.pathname, root);
      setCurrentPageGuide(built);
      openGuide(built, 0);
    }, 550);

    return () => clearTimeout(timer);
  }, [isAuthenticated, location.pathname, openGuide, routeGuide, routeVisitKey, user?.id]);

  // If a button opens a new form/modal on the same route, guide that newly opened UI as well.
  useEffect(() => {
    if (!isAuthenticated || !user?.id) return;
    const root = document.querySelector('.main-content');
    if (!root) return;

    let debounce;
    const inspect = () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        if (activeGuide) return;
        const containers = getVisibleContextContainers(root);
        for (const container of containers) {
          const signature = contextSignature(container);
          if (!signature || contextSeenRef.current.has(signature)) continue;
          contextSeenRef.current.add(signature);
          const guide = buildContextGuide(container, location.pathname);
          if (guide) {
            openGuide(guide, 0);
            break;
          }
        }
      }, 180);
    };

    const observer = new MutationObserver(inspect);
    observer.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style', 'open', 'aria-hidden'] });
    return () => {
      clearTimeout(debounce);
      observer.disconnect();
    };
  }, [activeGuide, isAuthenticated, location.pathname, openGuide, user?.id]);

  const value = {
    state,
    activeGuide,
    stepIndex,
    routeGuide: currentPageGuide || routeGuide,
    routeGuideState: null,
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
