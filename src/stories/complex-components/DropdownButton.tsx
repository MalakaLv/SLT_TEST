import { useMemo, useState } from 'react';

import { Button } from '../Button';
import { ChevronDownIcon, ChevronUpIcon, PlusIcon, UserIcon } from '../icons/Icons';
import { StandardList } from '../StandardList';
import type { StandardListState } from '../StandardList';
import './dropdown-button.css';

type TripOption = {
  value: string;
  label: string;
};

const TRIP_OPTIONS: TripOption[] = [
  { value: 'one-way', label: 'One-Way' },
  { value: 'round-trip', label: 'Round-Trip' },
  { value: 'multi-city', label: 'Multi-City' },
];

const INFO_PLACEHOLDER = [{ value: 'panel', label: 'panel' }];

export interface DropdownButtonProps {
  variant?: 'text-only' | 'info';
  listType?: 'standard' | 'additional-info';
  theme?: 'light' | 'dark';
  disabled?: boolean;
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
  visualState?: 'enabled' | 'hover' | 'open' | 'disabled';
  ariaLabel?: string;
}

export const DropdownButton = ({
  variant = 'text-only',
  listType = 'standard',
  theme = 'light',
  disabled = false,
  className,
  value,
  defaultValue = 'round-trip',
  onChange,
  onOpenChange,
  visualState,
  ariaLabel = 'Dropdown button',
}: DropdownButtonProps) => {
  const [passengers, setPassengers] = useState(1);
  const [cabin, setCabin] = useState<'business' | 'first' | 'premium'>('business');

  const standardVisualState: StandardListState | undefined = useMemo(() => {
    if (visualState === undefined || visualState === 'enabled') {
      return undefined;
    }
    return visualState;
  }, [visualState]);

  const isInfo = variant === 'info';
  const isAdditionalInfoList = listType === 'additional-info';

  return (
    <StandardList<TripOption>
      options={isAdditionalInfoList ? INFO_PLACEHOLDER : TRIP_OPTIONS}
      getOptionValue={(option) => option.value}
      value={isAdditionalInfoList ? undefined : value}
      defaultValue={isAdditionalInfoList ? undefined : defaultValue}
      onChange={(nextValue) => {
        if (!isAdditionalInfoList) {
          onChange?.(nextValue);
        }
      }}
      onOpenChange={onOpenChange}
      disabled={disabled}
      theme={theme}
      visualState={standardVisualState}
      className={[
        'complex-dropdown-button',
        `complex-dropdown-button--${theme}`,
        `complex-dropdown-button--${variant}`,
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      menuClassName={[
        'complex-dropdown-button__menu',
        isAdditionalInfoList ? 'complex-dropdown-button__menu--info' : 'complex-dropdown-button__menu--default',
      ].join(' ')}
      optionsClassName={[
        'complex-dropdown-button__options',
        isAdditionalInfoList ? 'complex-dropdown-button__options--empty' : 'complex-dropdown-button__options--default',
      ].join(' ')}
      optionClassName="complex-dropdown-button__option"
      optionSelectedClassName="complex-dropdown-button__option--selected"
      optionActiveClassName="complex-dropdown-button__option--active"
      ariaLabel={ariaLabel}
      renderTrigger={({ open, selectedOption, stateClass, triggerProps }) => {
        const mappedStateClass = stateClass === 'default' ? 'enabled' : stateClass;

        return (
          <button
            {...triggerProps}
            className={[
              'complex-dropdown-button__trigger',
              `complex-dropdown-button__trigger--${mappedStateClass}`,
              `complex-dropdown-button__trigger--${theme}`,
              isInfo ? 'complex-dropdown-button__trigger--info' : 'complex-dropdown-button__trigger--text-only',
            ].join(' ')}
          >
            {isInfo ? (
              <span className="complex-dropdown-button__value-wrap complex-dropdown-button__value-wrap--info">
                <span className="complex-dropdown-button__group complex-dropdown-button__group--left">
                  <span className="complex-dropdown-button__icon-wrap" aria-hidden="true">
                    <UserIcon containerSize={16} className="complex-dropdown-button__icon complex-dropdown-button__icon--user" />
                  </span>
                  <span className="complex-dropdown-button__prefix">1</span>
                </span>
                <span className="complex-dropdown-button__pipe" aria-hidden="true">
                  |
                </span>
                <span className="complex-dropdown-button__group complex-dropdown-button__group--right">
                  <span className="complex-dropdown-button__label">Business</span>
                </span>
              </span>
            ) : (
              <span className="complex-dropdown-button__value-wrap complex-dropdown-button__value-wrap--text-only">
                <span className="complex-dropdown-button__label">{selectedOption?.label ?? 'Round-Trip'}</span>
              </span>
            )}

            <span className="complex-dropdown-button__icon-wrap" aria-hidden="true">
              {open ? (
                <ChevronUpIcon containerSize={16} className="complex-dropdown-button__icon complex-dropdown-button__icon--chevron" />
              ) : (
                <ChevronDownIcon containerSize={16} className="complex-dropdown-button__icon complex-dropdown-button__icon--chevron" />
              )}
            </span>
          </button>
        );
      }}
      renderMenuHeader={
        isAdditionalInfoList
          ? () => (
              <div className="complex-dropdown-button__additional-info">
                <section className="complex-dropdown-button__section">
                  <h3 className="complex-dropdown-button__title">Travelers</h3>
                  <div className="complex-dropdown-button__traveler-row">
                    <p className="complex-dropdown-button__text">Passenger</p>
                    <div className="complex-dropdown-button__counter">
                      <button
                        type="button"
                        className="complex-dropdown-button__icon-button complex-dropdown-button__icon-button--sub"
                        aria-label="Decrease passenger count"
                        onClick={() => setPassengers((prev) => Math.max(1, prev - 1))}
                      >
                        <span className="complex-dropdown-button__minus" aria-hidden="true" />
                      </button>
                      <span className="complex-dropdown-button__count">{passengers}</span>
                      <button
                        type="button"
                        className="complex-dropdown-button__icon-button"
                        aria-label="Increase passenger count"
                        onClick={() => setPassengers((prev) => Math.min(9, prev + 1))}
                      >
                        <PlusIcon containerSize={20} className="complex-dropdown-button__plus" />
                      </button>
                    </div>
                  </div>
                </section>

                <div className="complex-dropdown-button__divider" aria-hidden="true" />

                <section className="complex-dropdown-button__section">
                  <h3 className="complex-dropdown-button__title">Cabin Class</h3>
                  <div className="complex-dropdown-button__chips">
                    <button
                      type="button"
                      className={[
                        'complex-dropdown-button__chip',
                        cabin === 'business' ? 'complex-dropdown-button__chip--selected' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={() => setCabin('business')}
                    >
                      Business Class
                    </button>
                    <button
                      type="button"
                      className={[
                        'complex-dropdown-button__chip',
                        cabin === 'first' ? 'complex-dropdown-button__chip--selected' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={() => setCabin('first')}
                    >
                      First Class
                    </button>
                    <button
                      type="button"
                      className={[
                        'complex-dropdown-button__chip',
                        cabin === 'premium' ? 'complex-dropdown-button__chip--selected' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={() => setCabin('premium')}
                    >
                      Premium Economy
                    </button>
                  </div>
                </section>

                <Button leftIcon={false} rightIcon={false} fullWidth className="complex-dropdown-button__done">
                  Done
                </Button>
              </div>
            )
          : undefined
      }
      renderOption={({ option, isSelected }) => {
        if (isAdditionalInfoList) {
          return null;
        }

        return (
          <>
            <span className="complex-dropdown-button__option-label">{option.label}</span>
            {isSelected ? <span className="complex-dropdown-button__check">✓</span> : null}
          </>
        );
      }}
    />
  );
};
