import { useContext } from 'react';
import { GuidanceContext } from './GuidanceProvider';

export function useGuidance() {
  const context = useContext(GuidanceContext);
  if (!context) throw new Error('useGuidance must be used inside GuidanceProvider');
  return context;
}
