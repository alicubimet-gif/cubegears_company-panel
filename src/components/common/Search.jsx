import React from 'react';
import { Search as SearchIcon, X } from 'lucide-react';

export const Search = ({
  placeholder = 'Search...',
  value = '',
  onChange,
  onClear,
  className = '',
}) => {
  const handleClear = () => {
    if (onClear) {
      onClear();
      return;
    }

    onChange?.({
      target: { value: '' },
    });
  };

  return (
    <div className={`app-search ${className}`}>
      <SearchIcon
        size={17}
        className="app-search__icon"
      />

      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="app-search__input"
      />

      {value && (
        <button
          type="button"
          className="app-search__clear"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
};