import { useState } from 'react';

import { InputFieldBase } from './InputFieldBase';
import './DateInput.css';

export type DateInputMode = 'two-field' | 'single-field';
export type DateInputState = 'default' | 'hover' | 'focused' | 'pressed' | 'error' | 'disabled';
export type DateInputBackground = 'light' | 'dark';

interface DateInputFieldProps {
  structure: 'single' | 'split-left' | 'split-right';
  background: DateInputBackground;
  state?: DateInputState;
  disabled?: boolean;
  label: string;
  value?: string;
  defaultValue?: string;
  className?: string;
  errorText?: string;
  showErrorText?: boolean;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  showClearControl?: boolean;
  onFieldClick?: () => void;
}

export interface DateInputProps {
  mode?: DateInputMode;
  background?: DateInputBackground;
  state?: DateInputState;
  disabled?: boolean;
  className?: string;
  errorText?: string;
  departureLabel?: string;
  returnLabel?: string;
  departureValue?: string;
  returnValue?: string;
  defaultDepartureValue?: string;
  defaultReturnValue?: string;
  onDepartureChange?: (value: string) => void;
  onReturnChange?: (value: string) => void;
  singleLabel?: string;
  singleValue?: string;
  defaultSingleValue?: string;
  onSingleChange?: (value: string) => void;
  readOnly?: boolean;
  showClearControl?: boolean;
  onDepartureFieldClick?: () => void;
  onReturnFieldClick?: () => void;
  onSingleFieldClick?: () => void;
}

const asComparableDate = (value: string): number | null => {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? null : parsed;
};

const DateInputField = ({
  structure,
  background,
  state = 'default',
  disabled = false,
  label,
  value,
  defaultValue = '',
  className,
  errorText = 'Error message',
  showErrorText,
  onChange,
  readOnly = false,
  showClearControl = true,
  onFieldClick,
}: DateInputFieldProps) => {
  const [localValue, setLocalValue] = useState(defaultValue);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isControlled = value !== undefined;
  const actualValue = isControlled ? value ?? '' : localValue;
  const hasValue = actualValue.trim().length > 0;

  const forcedState = disabled ? 'disabled' : state;
  const effectiveState: DateInputState =
    forcedState === 'disabled'
      ? 'disabled'
      : forcedState === 'error'
        ? 'error'
        : forcedState === 'focused' || forcedState === 'pressed'
          ? 'focused'
          : forcedState === 'hover'
            ? 'hover'
            : isFocused
              ? 'focused'
              : isHovered
                ? 'hover'
                : 'default';

  const baseState =
    effectiveState === 'disabled'
      ? 'disabled'
      : effectiveState === 'focused' || effectiveState === 'error'
        ? 'action'
        : effectiveState === 'hover'
          ? 'hover'
          : 'active';

  const baseType = hasValue || effectiveState === 'focused' ? 'semiBold' : 'empty';
  const shouldShowErrorText = showErrorText ?? effectiveState === 'error';

  return (
    <div
      className={[
        'date-input',
        `date-input--${structure}`,
        `date-input--${effectiveState}`,
        `date-input--${background}`,
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      onMouseEnter={() => {
        if (forcedState === 'default' && !disabled) {
          setIsHovered(true);
        }
      }}
      onMouseLeave={() => {
        if (forcedState === 'default' && !disabled) {
          setIsHovered(false);
        }
      }}
    >
      <div className="date-input__body">
        <InputFieldBase
          type={baseType}
          state={baseState}
          label={label}
          value={actualValue}
          inputValue={actualValue}
          showIcon={false}
          showClearControl={showClearControl && !readOnly}
          iconSize={16}
          inputDisabled={disabled || effectiveState === 'disabled'}
          inputReadOnly={readOnly}
          className="date-input__base"
          onInputClick={onFieldClick}
          onInputFocus={() => {
            if (forcedState === 'default' && !disabled) {
              setIsFocused(true);
            }
          }}
          onInputBlur={() => {
            if (forcedState === 'default' && !disabled) {
              setIsFocused(false);
            }
          }}
          onInputChange={(nextValue) => {
            if (!isControlled) {
              setLocalValue(nextValue);
            }
            onChange?.(nextValue);
          }}
        />
      </div>

      {shouldShowErrorText ? <p className="date-input__error">{errorText}</p> : null}
    </div>
  );
};

export const DateInput = ({
  mode = 'two-field',
  background = 'light',
  state = 'default',
  disabled = false,
  className,
  errorText = 'Return date must be on or after departure date',
  departureLabel = 'Departure Date',
  returnLabel = 'Return Date',
  departureValue,
  returnValue,
  defaultDepartureValue = '',
  defaultReturnValue = '',
  onDepartureChange,
  onReturnChange,
  singleLabel = 'Departure Date',
  singleValue,
  defaultSingleValue = '',
  onSingleChange,
  readOnly = false,
  showClearControl = true,
  onDepartureFieldClick,
  onReturnFieldClick,
  onSingleFieldClick,
}: DateInputProps) => {
  const [localDeparture, setLocalDeparture] = useState(defaultDepartureValue);
  const [localReturn, setLocalReturn] = useState(defaultReturnValue);

  const isDepartureControlled = departureValue !== undefined;
  const isReturnControlled = returnValue !== undefined;
  const departure = isDepartureControlled ? departureValue ?? '' : localDeparture;
  const returnDate = isReturnControlled ? returnValue ?? '' : localReturn;

  if (mode === 'single-field') {
    return (
      <DateInputField
        structure="single"
        background={background}
        state={state}
        disabled={disabled}
        label={singleLabel}
        value={singleValue}
        defaultValue={defaultSingleValue}
        errorText={errorText}
        className={className}
        readOnly={readOnly}
        showClearControl={showClearControl}
        onFieldClick={onSingleFieldClick}
        onChange={onSingleChange}
      />
    );
  }

  const departureComparable = asComparableDate(departure);
  const returnComparable = asComparableDate(returnDate);
  const isInvalidRange =
    departureComparable !== null &&
    returnComparable !== null &&
    returnComparable < departureComparable;

  return (
    <div
      className={['date-input-range', `date-input-range--${background}`, className ?? '']
        .filter(Boolean)
        .join(' ')}
    >
      <div className="date-input-range__fields">
        <DateInputField
          structure="split-left"
          background={background}
          state={state === 'disabled' ? 'disabled' : 'default'}
          disabled={disabled || state === 'disabled'}
          label={departureLabel}
          value={departure}
          readOnly={readOnly}
          showClearControl={showClearControl}
          onFieldClick={onDepartureFieldClick}
          onChange={(nextValue) => {
            if (!isDepartureControlled) {
              setLocalDeparture(nextValue);

              const nextDepartureComparable = asComparableDate(nextValue);
              const localReturnComparable = asComparableDate(localReturn);

              if (
                !isReturnControlled &&
                nextDepartureComparable !== null &&
                localReturnComparable !== null &&
                localReturnComparable < nextDepartureComparable
              ) {
                setLocalReturn(nextValue);
                onReturnChange?.(nextValue);
              }
            }
            onDepartureChange?.(nextValue);
          }}
        />

        <span className="date-input-range__divider" aria-hidden="true" />

        <DateInputField
          structure="split-right"
          background={background}
          state={state === 'disabled' ? 'disabled' : isInvalidRange ? 'error' : 'default'}
          disabled={disabled || state === 'disabled'}
          label={returnLabel}
          value={returnDate}
          showErrorText={false}
          readOnly={readOnly}
          showClearControl={showClearControl}
          onFieldClick={onReturnFieldClick}
          onChange={(nextValue) => {
            if (!isReturnControlled) {
              setLocalReturn(nextValue);
            }
            onReturnChange?.(nextValue);
          }}
        />
      </div>

      {!disabled && state !== 'disabled' && isInvalidRange ? (
        <p className="date-input-range__error">{errorText}</p>
      ) : null}
    </div>
  );
};
