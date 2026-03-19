import { useMemo, useState } from 'react';

import { StandardList } from './StandardList';
import type { StandardListState } from './StandardList';
import './country-selector.css';

export interface CountryOption {
  iso2: string;
  name: string;
  dialCode: string;
  flag: string;
}

export interface CountrySelectorProps {
  countries?: CountryOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (iso2: string) => void;
  onOpenChange?: (open: boolean) => void;
  visualState?: StandardListState;
  disabled?: boolean;
  theme?: 'light' | 'dark';
  className?: string;
  searchPlaceholder?: string;
  ariaLabel?: string;
}

const DEFAULT_COUNTRIES: CountryOption[] = [
  { iso2: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸' },
  { iso2: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
  { iso2: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
  { iso2: 'LV', name: 'Latvija', dialCode: '+371', flag: '🇱🇻' },
];

const CHEVRON_DOWN_PATH = 'M4 6L8 10L12 6';
const CHEVRON_UP_PATH = 'M4 10L8 6L12 10';

export const CountrySelector = ({
  countries = DEFAULT_COUNTRIES,
  value,
  defaultValue = 'US',
  onChange,
  onOpenChange,
  visualState,
  disabled = false,
  theme = 'light',
  className,
  searchPlaceholder = 'Search',
  ariaLabel = 'Country code',
}: CountrySelectorProps) => {
  const [query, setQuery] = useState('');

  const filteredCountries = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) {
      return countries;
    }
    return countries.filter((country) => {
      return (
        country.name.toLowerCase().includes(term) ||
        country.iso2.toLowerCase().includes(term) ||
        country.dialCode.toLowerCase().includes(term)
      );
    });
  }, [countries, query]);

  return (
    <StandardList<CountryOption>
      options={filteredCountries}
      getOptionValue={(country) => country.iso2}
      value={value}
      defaultValue={defaultValue}
      onChange={(nextIso2) => {
        onChange?.(nextIso2);
        setQuery('');
      }}
      onOpenChange={onOpenChange}
      disabled={disabled}
      theme={theme}
      visualState={visualState ?? 'default'}
      className={['country-selector', `country-selector--${theme}`, className ?? ''].filter(Boolean).join(' ')}
      menuClassName="country-selector__menu"
      optionsClassName="country-selector__list"
      optionClassName="country-selector__item"
      optionSelectedClassName="country-selector__item--selected"
      ariaLabel={ariaLabel}
      renderTrigger={({ open, selectedOption, stateClass, triggerProps }) => (
        <button
          {...triggerProps}
          className={['country-selector__trigger', `country-selector__trigger--${stateClass}`].join(' ')}
        >
          <span className="country-selector__value-wrap">
            <span className="country-selector__flag" aria-hidden="true">
              {selectedOption?.flag}
            </span>
            <span className="country-selector__chevron" aria-hidden="true">
              <svg viewBox="0 0 16 16" className="country-selector__chevron-svg">
                <path d={open ? CHEVRON_UP_PATH : CHEVRON_DOWN_PATH} />
              </svg>
            </span>
          </span>
          <span className="country-selector__separator" aria-hidden="true" />
        </button>
      )}
      renderMenuHeader={() => (
        <div className="country-selector__search-wrap">
          <span className="country-selector__search-icon" aria-hidden="true">
            ⌕
          </span>
          <input
            type="text"
            className="country-selector__search-input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={searchPlaceholder}
          />
        </div>
      )}
      renderOption={({ option, isSelected }) => (
        <>
          <span className="country-selector__item-main">
            <span className="country-selector__flag" aria-hidden="true">
              {option.flag}
            </span>
            <span className="country-selector__item-label">
              {option.name} ({option.iso2}) {option.dialCode}
            </span>
          </span>
          {isSelected ? (
            <span className="country-selector__check" aria-hidden="true">
              ✓
            </span>
          ) : null}
        </>
      )}
    />
  );
};
