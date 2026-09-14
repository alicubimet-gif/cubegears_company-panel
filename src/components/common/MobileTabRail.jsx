import React, { useRef, useEffect } from 'react';

export const MobileTabRail = ({ tabs = [], activeTab, onTabChange }) => {
  const activeTabRef = useRef(null);
  const railRef = useRef(null);

  useEffect(() => {
    if (activeTabRef.current && railRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  }, [activeTab]);

  return (
    <div
      ref={railRef}
      className="scroll-hidden"
      style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        padding: '4px 0 12px 0',
        width: '100%',
        whiteSpace: 'nowrap',
        borderBottom: '1px solid var(--border)'
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const IconComp = tab.icon;

        return (
          <button
            key={tab.id}
            ref={isActive ? activeTabRef : null}
            onClick={() => onTabChange(tab.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: isActive ? '600' : '500',
              color: isActive ? '#ffffff' : 'var(--text-secondary)',
              backgroundColor: isActive ? 'var(--primary)' : 'var(--surface)',
              border: isActive ? '1px solid var(--primary)' : '1px solid var(--border)',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 0.15s ease'
            }}
          >
            {IconComp && <IconComp size={16} />}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
