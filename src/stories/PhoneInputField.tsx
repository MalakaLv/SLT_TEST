import { useMemo, useRef, useState } from 'react';
import type { ChangeEvent, MouseEvent } from 'react';

import { CountrySelector } from './CountrySelector';
import type { StandardListState } from './StandardList';
import './phone-input-field.css';

export interface PhoneInputFieldProps {
  state?:
    | 'default'
    | 'hover'
    | 'hover-left'
    | 'hover-right'
    | 'focused'
    | 'focused-left'
    | 'focused-right'
    | 'filled'
    | 'error'
    | 'success'
    | 'disabled';
  theme?: 'light' | 'dark';
  label?: string;
  value?: string;
  defaultValue?: string;
  countryIso2?: string;
  onCountryChange?: (iso2: string) => void;
  onChange?: (value: string) => void;
  errorText?: string;
  className?: string;
}

const ErrorStatusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    aria-hidden="true"
    className="phone-input-field__status-svg phone-input-field__status-svg--error"
  >
    <circle cx="8" cy="8" r="7.2" />
    <path d="M8 4.4V8.8M8 11.3V11.7" />
  </svg>
);

const SuccessStatusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    aria-hidden="true"
    className="phone-input-field__status-svg phone-input-field__status-svg--success"
  >
    <circle cx="8" cy="8" r="7.2" />
    <path d="M4.8 8.2L7.1 10.2L11.2 6.1" />
  </svg>
);

export const PhoneInputField = ({
  state = 'default',
  theme = 'light',
  label = 'Phone number*',
  value,
  defaultValue = '',
  countryIso2 = 'US',
  onCountryChange,
  onChange,
  errorText = 'Please enter the full phone number',
  className,
}: PhoneInputFieldProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [leftHovered, setLeftHovered] = useState(false);
  const [rightHovered, setRightHovered] = useState(false);
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightFocused, setRightFocused] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue);

  const hasLockedState = !['default', 'hover', 'hover-left', 'hover-right'].includes(state);
  const isDisabled = state === 'disabled';
  const isError = state === 'error';
  const isSuccess = state === 'success';

  const displayValue = hasLockedState ? value ?? '' : inputValue;
  const hasValue = displayValue.trim().length > 0;

  const leftState: StandardListState = useMemo(() => {
    if (isDisabled) {
      return 'disabled';
    }
    if (state === 'hover-left') {
      return 'hover';
    }
    if (state === 'focused-left') {
      return 'open';
    }
    if (hasLockedState) {
      return 'default';
    }
    if (leftOpen) {
      return 'open';
    }
    if (leftHovered) {
      return 'hover';
    }
    return 'default';
  }, [hasLockedState, isDisabled, leftHovered, leftOpen, state]);

  const rightState = useMemo(() => {
    if (isDisabled) {
      return 'disabled';
    }
    if (isError) {
      return 'error';
    }
    if (state === 'hover-right') {
      return 'hover';
    }
    if (state === 'focused-right') {
      return 'focused';
    }
    if (hasLockedState) {
      if (state === 'focused') {
        return 'focused';
      }
      return 'default';
    }
    if (rightFocused) {
      return 'focused';
    }
    if (rightHovered) {
      return 'hover';
    }
    return 'default';
  }, [hasLockedState, isDisabled, isError, rightFocused, rightHovered, state]);

  const isLeftHoverActive = leftState === 'hover';
  const isRightHoverActive = rightState === 'hover';
  const isLeftFocusActive = leftState === 'open' && rightState !== 'focused';
  const isRightFocusActive = rightState === 'focused';

  const showSmallLabel =
    rightFocused || hasValue || state === 'filled' || state === 'focused' || state === 'focused-right' || isError || isSuccess;
  const showInputValue = showSmallLabel;

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    if (!hasLockedState) {
      setInputValue(nextValue);
    }
    onChange?.(nextValue);
  };

  const onRightMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (isDisabled) {
      return;
    }
    event.preventDefault();
    inputRef.current?.focus();
  };

  return (
    <div className={['phone-input-field', `phone-input-field--${theme}`, className ?? ''].filter(Boolean).join(' ')}>
      <div
        className={[
          'phone-input-field__row',
          isLeftHoverActive ? 'phone-input-field__row--hover-left' : '',
          isRightHoverActive ? 'phone-input-field__row--hover-right' : '',
          isLeftFocusActive ? 'phone-input-field__row--focused-left' : '',
          isRightFocusActive ? 'phone-input-field__row--focused-right' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div
          className="phone-input-field__left-zone"
          onMouseEnter={() => {
            if (!hasLockedState && !isDisabled) {
              setLeftHovered(true);
            }
          }}
          onMouseLeave={() => {
            setLeftHovered(false);
          }}
        >
          <CountrySelector
            theme={theme}
            disabled={isDisabled}
            visualState={leftState}
            value={countryIso2}
            onChange={onCountryChange}
            onOpenChange={setLeftOpen}
            className="phone-input-field__country"
            ariaLabel="Select country"
          />
        </div>

        <div className="phone-input-field__zone-divider" aria-hidden="true" />

        <div
          className={['phone-input-field__right-zone', `phone-input-field__right-zone--${rightState}`].join(' ')}
          onMouseEnter={() => {
            if (!hasLockedState && !isDisabled) {
              setLeftHovered(false);
              setRightHovered(true);
            }
          }}
          onMouseLeave={() => {
            if (!hasLockedState && !isDisabled) {
              setRightHovered(false);
            }
          }}
          onMouseDown={onRightMouseDown}
        >
          <div className="phone-input-field__text-wrap">
            <span className={['phone-input-field__label', showSmallLabel ? 'phone-input-field__label--small' : ''].filter(Boolean).join(' ')}>
              {label}
            </span>
            {showInputValue ? (
              <input
                ref={inputRef}
                type="tel"
                value={displayValue}
                disabled={isDisabled}
                className="phone-input-field__native-input"
                onFocus={() => setRightFocused(true)}
                onBlur={() => setRightFocused(false)}
                onChange={onInputChange}
              />
            ) : (
              <input
                ref={inputRef}
                type="tel"
                value={displayValue}
                disabled={isDisabled}
                className="phone-input-field__native-input phone-input-field__native-input--hidden"
                onFocus={() => setRightFocused(true)}
                onBlur={() => setRightFocused(false)}
                onChange={onInputChange}
              />
            )}
          </div>

          <span className="phone-input-field__status">
            {isError ? <ErrorStatusIcon /> : null}
            {isSuccess ? <SuccessStatusIcon /> : null}
          </span>
        </div>
      </div>

      {isError ? <p className="phone-input-field__error-text">{errorText}</p> : null}
    </div>
  );
};
