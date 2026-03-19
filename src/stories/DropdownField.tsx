import { useMemo } from 'react';

import { StandardList } from './StandardList';
import type { StandardListState } from './StandardList';
import './dropdown-field.css';

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownFieldProps {
  options?: DropdownOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  theme?: 'light' | 'dark';
  leftIcon?: boolean;
  showIcons?: boolean;
  className?: string;
  initialOpen?: boolean;
  visualState?: 'enabled' | 'hover' | 'open' | 'disabled';
  ariaLabel?: string;
}

const DEFAULT_OPTIONS: DropdownOption[] = [
  { value: 'one-way', label: 'One-Way' },
  { value: 'round-trip', label: 'Round-Trip' },
  { value: 'multi-city', label: 'Multi-City' },
];

const USER_ICON_PATH =
  'M5 0C5.66304 0 6.29893 0.263392 6.76777 0.732233C7.23661 1.20107 7.5 1.83696 7.5 2.5C7.5 3.16304 7.23661 3.79893 6.76777 4.26777C6.29893 4.73661 5.66304 5 5 5C4.33696 5 3.70107 4.73661 3.23223 4.26777C2.76339 3.79893 2.5 3.16304 2.5 2.5C2.5 1.83696 2.76339 1.20107 3.23223 0.732233C3.70107 0.263392 4.33696 0 5 0ZM5 6.25C7.7625 6.25 10 8.75 10 8.75V10H0V8.75C0 8.75 2.2375 6.25 5 6.25Z';
const CHEVRON_DOWN_PATH = 'M4 6L8 10L12 6';
const CHEVRON_UP_PATH = 'M4 10L8 6L12 10';
const CHECK_PATH = 'M4 12.5L9.5 18L20 7.5';

export const DropdownField = ({
  options = DEFAULT_OPTIONS,
  value,
  defaultValue = 'round-trip',
  onChange,
  onOpenChange,
  disabled = false,
  theme = 'light',
  leftIcon = true,
  showIcons = true,
  className,
  initialOpen = false,
  visualState = 'enabled',
  ariaLabel = 'Trip type',
}: DropdownFieldProps) => {
  const standardVisualState: StandardListState = useMemo(() => {
    if (visualState === 'enabled') {
      return 'default';
    }
    return visualState;
  }, [visualState]);

  return (
    <StandardList<DropdownOption>
      options={options}
      getOptionValue={(option) => option.value}
      value={value}
      defaultValue={defaultValue}
      onChange={(nextValue) => onChange?.(nextValue)}
      onOpenChange={onOpenChange}
      disabled={disabled}
      theme={theme}
      visualState={standardVisualState}
      initialOpen={initialOpen}
      className={['dropdown-field', `dropdown-field--${theme}`, className ?? ''].filter(Boolean).join(' ')}
      menuClassName="dropdown-field__menu"
      optionsClassName="dropdown-field__options"
      optionClassName="dropdown-field__option"
      optionActiveClassName="dropdown-field__option--active"
      optionSelectedClassName="dropdown-field__option--selected"
      ariaLabel={ariaLabel}
      renderTrigger={({ open, selectedOption, stateClass, triggerProps }) => {
        const mappedStateClass = stateClass === 'default' ? 'enabled' : stateClass;
        return (
          <button
            {...triggerProps}
            className={[
              'dropdown-field__trigger',
              `dropdown-field__trigger--${mappedStateClass}`,
              `dropdown-field__trigger--${theme}`,
            ].join(' ')}
          >
            <span className="dropdown-field__value-wrap">
              {leftIcon && showIcons ? (
                <span className="dropdown-field__icon-wrap" aria-hidden="true">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    className="dropdown-field__icon dropdown-field__icon--user"
                  >
                    <g transform="translate(3, 3)">
                      <svg width="10" height="10" viewBox="0 0 10 10">
                        <path d={USER_ICON_PATH} />
                      </svg>
                    </g>
                  </svg>
                </span>
              ) : null}
              <span className="dropdown-field__prefix">1</span>
              <span className="dropdown-field__pipe">|</span>
              <span className="dropdown-field__label">{selectedOption?.label}</span>
            </span>
            <span className="dropdown-field__icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 16 16" className="dropdown-field__icon dropdown-field__icon--chevron">
                <path d={open ? CHEVRON_UP_PATH : CHEVRON_DOWN_PATH} />
              </svg>
            </span>
          </button>
        );
      }}
      renderOption={({ option, isSelected }) => (
        <>
          <span className="dropdown-field__option-label">{option.label}</span>
          {isSelected ? (
            <span className="dropdown-field__option-icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="dropdown-field__icon dropdown-field__icon--check">
                <path d={CHECK_PATH} />
              </svg>
            </span>
          ) : null}
        </>
      )}
    />
  );
};
