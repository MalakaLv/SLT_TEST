import { useRef, useState } from 'react';
import type { CSSProperties, MouseEvent } from 'react';

import { ClearIcon, ErrorIcon } from './icons/Icons';
import { InputFieldBase } from './InputFieldBase';
import './InputField.css';

export interface InputFieldProps {
  state?: 'default' | 'hover' | 'focused' | 'filled' | 'error' | 'disabled';
  theme?: 'light' | 'dark';
  size?: 48 | 60;
  label?: string;
  value?: string;
  inputText?: string;
  defaultValue?: string;
  errorText?: string;
  className?: string;
  iconSize?: 16 | 20 | 24;
  showIcon?: boolean;
}

export const InputField = ({
  state = 'default',
  theme = 'light',
  size = 48,
  label = 'Label',
  value,
  inputText = 'Input Text',
  defaultValue = '',
  errorText = 'Please enter your email address',
  className,
  iconSize = 24,
  showIcon = true,
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
  const inputDisplayValue = hasExplicitState ? value : inputValue;
  const resolvedValue = hasExplicitState && effectiveState === 'filled' ? inputText : (inputDisplayValue ?? '');
  const forwardedInputValue =
    hasExplicitState && effectiveState === 'filled' ? undefined : (inputDisplayValue ?? '');
  const showClear = isFocused === true && inputValue.length > 0;

  const baseType = isFilled ? (size === 60 ? 'semiBold' : 'filled') : 'empty';
  const baseState = isDisabled ? 'disabled' : isFocusedVisual || isError ? 'action' : isHover ? 'hover' : 'active';
  const iconSizeStyle = {
    '--input-field-icon-size': `${iconSize}px`,
  } as CSSProperties;

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
      style={iconSizeStyle}
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
          inputValue={forwardedInputValue}
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
          showIcon={showIcon}
          iconSize={iconSize}
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
            <ClearIcon containerSize={iconSize} className="input-field__status-svg" />
          </button>
          {isError ? <ErrorIcon containerSize={iconSize} className="input-field__status-svg" /> : null}
        </span>
      </div>

      {isError ? <p className="input-field__error-text">{errorText}</p> : null}
    </div>
  );
};
