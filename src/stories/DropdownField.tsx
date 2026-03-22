import { useMemo } from 'react';

import { CheckIcon, ChevronDownIcon, ChevronUpIcon, UserIcon } from './icons/Icons';
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
  iconSize?: 16 | 20 | 24;
}

const DEFAULT_OPTIONS: DropdownOption[] = [
  { value: 'one-way', label: 'One-Way' },
  { value: 'round-trip', label: 'Round-Trip' },
  { value: 'multi-city', label: 'Multi-City' },
];

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
  visualState,
  ariaLabel = 'Trip type',
  iconSize = 16,
}: DropdownFieldProps) => {
  const standardVisualState: StandardListState | undefined = useMemo(() => {
    if (visualState === undefined || visualState === 'enabled') {
      return undefined;
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
              <span className="dropdown-field__group dropdown-field__group--left">
                {leftIcon && showIcons ? (
                  <span
                    className="dropdown-field__icon-wrap"
                    aria-hidden="true"
                    style={{ width: iconSize, height: iconSize, flexBasis: iconSize }}
                  >
                    <span
                      style={{
                        width: iconSize,
                        height: iconSize,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                      }}
                    >
                      <UserIcon containerSize={iconSize} className="dropdown-field__icon dropdown-field__icon--user" />
                    </span>
                  </span>
                ) : null}
                <span className="dropdown-field__prefix">1</span>
              </span>

              <span className="dropdown-field__pipe" aria-hidden="true">
                |
              </span>

              <span className="dropdown-field__group dropdown-field__group--right">
                <span className="dropdown-field__label">{selectedOption?.label}</span>
              </span>
            </span>
            <span
              className="dropdown-field__icon-wrap"
              aria-hidden="true"
              style={{ width: iconSize, height: iconSize, flexBasis: iconSize }}
            >
              {open ? (
                <ChevronUpIcon containerSize={iconSize} className="dropdown-field__icon dropdown-field__icon--chevron" />
              ) : (
                <ChevronDownIcon containerSize={iconSize} className="dropdown-field__icon dropdown-field__icon--chevron" />
              )}
            </span>
          </button>
        );
      }}
      renderOption={({ option, isSelected }) => (
        <>
          <span className="dropdown-field__option-label">{option.label}</span>
          {isSelected ? (
            <span
              className="dropdown-field__option-icon-wrap"
              aria-hidden="true"
              style={{ width: iconSize, height: iconSize, flexBasis: iconSize }}
            >
              <CheckIcon containerSize={iconSize} className="dropdown-field__icon dropdown-field__icon--check" />
            </span>
          ) : null}
        </>
      )}
    />
  );
};
