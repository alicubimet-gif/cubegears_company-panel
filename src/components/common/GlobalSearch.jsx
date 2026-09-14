import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { searchWorkspace } from '../../services/globalSearch.service';
import {
  Search,
  X,
  Users,
  Car,
  Calendar,
  ClipboardList,
  FileText,
  DollarSign,
  Package,
  Wrench,
  UserCheck,
  Truck,
  Clock
} from 'lucide-react';

const RECENT_SEARCHES_KEY = 'cubegears_recent_searches';

export const GlobalSearch = ({ isMobileView = false, onMobileClose = null }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState([]);

  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  // Load Recent Searches on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load recent searches", e);
    }
  }, []);

  // Save Recent Search item
  const saveRecentSearch = (item) => {
    try {
      const newRecent = [item, ...recentSearches.filter(r => r.id !== item.id)].slice(0, 5);
      setRecentSearches(newRecent);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(newRecent));
    } catch (e) {
      console.error("Failed to save recent search", e);
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  };

  // Keyboard Shortcuts (Ctrl+K / Cmd+K & Esc)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        setSelectedIndex(-1);
        if (isMobileView && onMobileClose) onMobileClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileView, onMobileClose]);

  // Click Outside Listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced Search Handler (250ms)
  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    setSelectedIndex(-1);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!val.trim() || val.trim().length < 2) {
      setResults([]);
      setLoading(false);
      setIsOpen(true);
      return;
    }

    setLoading(true);
    setIsOpen(true);

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await searchWorkspace(val);
        setResults(res);
      } catch (err) {
        console.error("Global search error:", err);
      } finally {
        setLoading(false);
      }
    }, 250);
  };

  // Keyboard Navigation Handling (ArrowUp, ArrowDown, Enter)
  const handleKeyDownInput = (e) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && selectedIndex < results.length) {
        e.preventDefault();
        handleSelectResult(results[selectedIndex]);
      }
    }
  };

  const handleSelectResult = (item) => {
    saveRecentSearch(item);
    setIsOpen(false);
    setQuery('');
    setResults([]);
    if (isMobileView && onMobileClose) onMobileClose();
    if (item.path) navigate(item.path);
  };

  const getModuleIcon = (group) => {
    switch (group?.toLowerCase()) {
      case 'customers': return <Users size={16} className="text-muted" />;
      case 'vehicles': return <Car size={16} className="text-muted" />;
      case 'jobs': return <ClipboardList size={16} className="text-muted" />;
      case 'invoices': return <FileText size={16} className="text-muted" />;
      case 'stock': return <Package size={16} className="text-muted" />;
      case 'services': return <Wrench size={16} className="text-muted" />;
      case 'employees': return <UserCheck size={16} className="text-muted" />;
      default: return <Search size={16} className="text-muted" />;
    }
  };

  // Grouping results by module
  const groupedResults = results.reduce((acc, current) => {
    const groupName = current.group || current.type || 'Other';
    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push(current);
    return acc;
  }, {});

  return (
    <div className="global-search-wrapper" ref={containerRef}>
      <div className="global-search">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDownInput}
          placeholder="Search customer, vehicle, job, invoice, stock..."
        />

        {query ? (
          <button
            type="button"
            className="global-search-clear"
            onClick={() => {
              setQuery('');
              setResults([]);
              inputRef.current?.focus();
            }}
          >
            <X size={15} />
          </button>
        ) : (
          <span className="search-shortcut">
            Ctrl K
          </span>
        )}

        <button
          type="button"
          className="global-search-button"
          onClick={() => {
            if (query.trim()) {
              setIsOpen(true);
            } else {
              inputRef.current?.focus();
            }
          }}
          title="Search"
        >
          <Search size={17} />
        </button>
      </div>

      {/* Floating Results Panel */}
      {isOpen && (
        <div className="global-search-results scroll-hidden">
          {loading && (
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[1, 2, 3].map((i) => (
                <div key={`skel-${i}`} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'var(--surface-3)', opacity: 0.6 }} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ width: '40%', height: '12px', borderRadius: '4px', backgroundColor: 'var(--surface-3)', opacity: 0.6 }} />
                    <div style={{ width: '60%', height: '10px', borderRadius: '4px', backgroundColor: 'var(--surface-3)', opacity: 0.4 }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && query.trim().length >= 2 && results.length === 0 && (
            <div style={{ padding: '24px 16px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
                No matching records found
              </p>
              <p style={{ fontSize: '12px', margin: 0 }}>
                Try searching customer, phone, vehicle registration or job number.
              </p>
            </div>
          )}

          {!loading && query.trim().length < 2 && recentSearches.length > 0 && (
            <div style={{ padding: '4px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 12px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Recent Searches
                </span>
                <button
                  type="button"
                  onClick={clearRecentSearches}
                  style={{ background: 'none', border: 'none', fontSize: '11px', color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }}
                >
                  Clear
                </button>
              </div>
              {recentSearches.map((item) => (
                <div
                  key={`recent-${item.id}`}
                  className="search-result-item"
                  onClick={() => handleSelectResult(item)}
                >
                  <Clock size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.title}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', flexShrink: 0 }}>{item.type}</span>
                </div>
              ))}
            </div>
          )}

          {!loading && results.length > 0 && (
            <div style={{ padding: '4px 0' }}>
              {Object.keys(groupedResults).map((group) => (
                <div key={`group-${group}`} style={{ marginBottom: '8px' }}>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    color: 'var(--primary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    padding: '6px 12px 4px 12px'
                  }}>
                    {group} ({groupedResults[group].length})
                  </div>
                  {groupedResults[group].map((item) => {
                    const globalIdx = results.findIndex(r => r.id === item.id);
                    const isSelected = globalIdx === selectedIndex;
                    return (
                      <div
                        key={item.id}
                        className={`search-result-item ${isSelected ? 'active' : ''}`}
                        onClick={() => handleSelectResult(item)}
                      >
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          backgroundColor: 'var(--surface-2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          {getModuleIcon(group)}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {item.title}
                          </div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {item.subtitle}
                          </div>
                        </div>
                        {item.status && (
                          <span style={{
                            fontSize: '10px',
                            fontWeight: '600',
                            padding: '2px 8px',
                            borderRadius: '6px',
                            backgroundColor: 'var(--surface-2)',
                            color: 'var(--text-primary)',
                            flexShrink: 0
                          }}>
                            {item.status}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
