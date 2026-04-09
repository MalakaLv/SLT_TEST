import { useRef, useState } from 'react';
import type { CSSProperties, MouseEvent, RefObject } from 'react';
import type { KeyboardEvent } from 'react';

import { ClearIcon, PlusIcon as SharedPlusIcon } from './icons/Icons';
import './InputFieldBase.css';

export interface InputFieldBaseProps {
  type?: 'empty' | 'filled' | 'semiBold';
  state?: 'active' | 'hover' | 'action' | 'disabled';
  label?: string;
  value?: string;
  showIcon?: boolean;
  className?: string;
  inputValue?: string;
  onInputFocus?: () => void;
  onInputBlur?: () => void;
  onInputChange?: (value: string) => void;
  onInputKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onInputClick?: () => void;
  inputDisabled?: boolean;
  inputReadOnly?: boolean;
  inputRef?: RefObject<HTMLInputElement | null>;
  iconSize?: 16 | 20 | 24;
  showClearControl?: boolean;
}

const PlusIcon = ({ tone, size }: { tone: 'active-empty' | 'default' | 'disabled'; size: 16 | 20 | 24 }) => (
  <span
    className={['input-field-base__icon', `input-field-base__icon--${tone}`].join(' ')}
    aria-hidden="true"
    style={
      {
        '--input-field-base-icon-size': `${size}px`,
      } as CSSProperties
    }
  >
    <SharedPlusIcon containerSize={size} className="input-field-base__icon-svg" />
  </span>
);

export const InputFieldBase = ({
  type = 'empty',
  state,
  label = 'Label',
  value = 'Input Text',
  showIcon = true,
  className,
  inputValue,
  onInputFocus,
  onInputBlur,
  onInputChange,
  onInputKeyDown,
  onInputClick,
  inputDisabled = false,
  inputReadOnly = false,
  inputRef,
  iconSize = 24,
  showClearControl = false,
}: InputFieldBaseProps) => {
  const localInputRef = useRef<HTMLInputElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [localValue, setLocalValue] = useState(type === 'empty' ? '' : value);

  const visualState = state ?? 'active';
  const isEmpty = type === 'empty';
  const isSemiBold = type === 'semiBold';
  const isDisabled = visualState === 'disabled' || inputDisabled;

  const effectiveState: NonNullable<InputFieldBaseProps['state']> = isDisabled
    ? 'disabled'
    : isFocused
      ? 'action'
      : isHovered && visualState === 'active'
        ? 'hover'
        : visualState;

  const isInputControlled = inputValue !== undefined;
  const actualInputValue = isInputControlled ? inputValue : localValue;
  const shouldRevealInput = !isEmpty || effectiveState === 'action' || actualInputValue.trim().length > 0;
  const labelSize = isEmpty && !shouldRevealInput ? 'large' : 'small';
  const displayValue = shouldRevealInput ? actualInputValue : '';
  const showClear = showClearControl && !isDisabled && isFocused && actualInputValue.length > 0;

  const iconTone = isDisabled ? 'disabled' : isEmpty && effectiveState === 'active' ? 'active-empty' : 'default';

  const resolvedInputRef = inputRef ?? localInputRef;

  const focusInput = (event: MouseEvent<HTMLDivElement>) => {
    if (isDisabled) {
      return;
    }
    event.preventDefault();
    resolvedInputRef.current?.focus();
  };

  return (
    <div
      className={[
        'input-field-base',
        `input-field-base--${type}`,
        `input-field-base--${effectiveState}`,
        shouldRevealInput ? 'input-field-base--interactive' : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      onMouseDown={focusInput}
      onMouseEnter={() => {
        if (!isDisabled) {
          setIsHovered(true);
        }
      }}
      onMouseLeave={() => {
        if (!isDisabled) {
          setIsHovered(false);
        }
      }}
    >
      {showIcon ? <PlusIcon tone={iconTone} size={iconSize} /> : null}

      <div className="input-field-base__text">
        <span className={['input-field-base__label', `input-field-base__label--${labelSize}`].join(' ')}>
          {label}
        </span>

        <input
          ref={resolvedInputRef}
          type="text"
          className={[
            'input-field-base__native-input',
            isSemiBold ? 'input-field-base__native-input--semibold' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          value={displayValue}
          disabled={isDisabled}
          readOnly={inputReadOnly}
          onClick={() => onInputClick?.()}
          onFocus={() => {
            setIsFocused(true);
            onInputFocus?.();
          }}
          onBlur={() => {
            setIsFocused(false);
            onInputBlur?.();
          }}
          onChange={(e) => {
            if (!isInputControlled) {
              setLocalValue(e.target.value);
            }
            onInputChange?.(e.target.value);
          }}
          onKeyDown={onInputKeyDown}
        />
      </div>

      <span className="input-field-base__status" data-clear-condition={showClear ? 'true' : 'false'}>
        <button
          type="button"
          className={['input-field-base__clear-btn', !showClear ? 'input-field-base__clear-btn--hidden' : '']
            .filter(Boolean)
            .join(' ')}
          onMouseDown={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            if (!isInputControlled) {
              setLocalValue('');
            }
            onInputChange?.('');
            resolvedInputRef.current?.focus();
          }}
          aria-label="Clear input"
          aria-hidden={!showClear}
          tabIndex={showClear ? 0 : -1}
        >
          <ClearIcon containerSize={iconSize} className="input-field-base__status-svg" />
        </button>
      </span>
    </div>
  );
};
