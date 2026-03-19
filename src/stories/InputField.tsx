import { useRef, useState } from 'react';
import type { MouseEvent } from 'react';

import { InputFieldBase } from './InputFieldBase';
import './InputField.css';

export interface InputFieldProps {
  state?: 'default' | 'hover' | 'focused' | 'filled' | 'error' | 'disabled';
  theme?: 'light' | 'dark';
  size?: 48 | 60;
  label?: string;
  value?: string;
  defaultValue?: string;
  errorText?: string;
  className?: string;
}

const ClearStatusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="input-field__status-svg">
    <circle cx="8" cy="8" r="7.2" />
    <path d="M5.3 5.3L10.7 10.7M10.7 5.3L5.3 10.7" />
  </svg>
);

const ErrorStatusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="input-field__status-svg">
    <circle cx="8" cy="8" r="7.2" />
    <path d="M8 4.4V8.8M8 11.3V11.7" />
  </svg>
);

export const InputField = ({
  state = 'default',
  theme = 'light',
  size = 48,
  label = 'Label',
  value,
  defaultValue = '',
  errorText = 'Please enter your email address',
  className,
}: InputFieldProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue);

  const hasExplicitState = state !== 'default';
  const internalState: InputFieldProps['state'] = isFocused
    ? 'focused'
    : isHovered
      ? 'hover'
      : inputValue.trim().length > 0
        ? 'filled'
        : 'default';

  const effectiveState = hasExplicitState ? state : internalState;

  const isError = effectiveState === 'error';
  const isHover = effectiveState === 'hover';
  const isFocusedVisual = effectiveState === 'focused';
  const isFilled = effectiveState === 'filled';
  const isDisabled = effectiveState === 'disabled';
  const inputDisplayValue = hasExplicitState ? value ?? '' : inputValue;
  const resolvedValue =
    hasExplicitState && effectiveState === 'filled' ? value ?? 'Input Text' : inputDisplayValue;
  const showClear = isFocused === true && inputValue.length > 0;

  const baseType = isFilled ? (size === 60 ? 'semiBold' : 'filled') : 'empty';
  const baseState = isDisabled ? 'disabled' : isFocusedVisual || isError ? 'action' : isHover ? 'hover' : 'active';

  const handleClear = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setInputValue('');
    setIsFocused(false);
    setIsHovered(false);
    inputRef.current?.blur();
  };

  return (
    <div
      className={[
        'input-field',
        `input-field--${theme}`,
        `input-field--h${size}`,
        `input-field--${effectiveState}`,
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      onMouseEnter={() => {
        if (!hasExplicitState) {
          setIsHovered(true);
        }
      }}
      onMouseLeave={() => {
        if (!hasExplicitState) {
          setIsHovered(false);
        }
      }}
      onMouseDown={(event) => {
        if (isDisabled) {
          return;
        }
        event.preventDefault();
        inputRef.current?.focus();
      }}
    >
      <div className="input-field__body">
        <InputFieldBase
          type={baseType}
          state={baseState}
          label={label}
          value={resolvedValue}
          inputValue={inputDisplayValue}
          inputDisabled={isDisabled}
          inputRef={inputRef}
          onInputFocus={() => {
            setIsFocused(true);
          }}
          onInputBlur={() => {
            setIsFocused(false);
          }}
          onInputChange={(nextValue) => {
            setInputValue(nextValue);
          }}
          className="input-field__base"
        />

        <span className="input-field__status" data-clear-condition={showClear ? 'true' : 'false'}>
          <button
            type="button"
            className={['input-field__clear-btn', !showClear ? 'input-field__clear-btn--hidden' : '']
              .filter(Boolean)
              .join(' ')}
            onMouseDown={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
            onClick={handleClear}
            aria-label="Clear input"
            aria-hidden={!showClear}
            tabIndex={showClear ? 0 : -1}
          >
            <ClearStatusIcon />
          </button>
          {isError ? <ErrorStatusIcon /> : null}
        </span>
      </div>

      {isError ? <p className="input-field__error-text">{errorText}</p> : null}
    </div>
  );
};
