import type { CSSProperties, RefObject } from 'react';
import type { KeyboardEvent } from 'react';

import { PlusIcon as SharedPlusIcon } from './icons/Icons';
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
  inputDisabled?: boolean;
  inputRef?: RefObject<HTMLInputElement | null>;
  iconSize?: 16 | 20 | 24;
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
  state = 'active',
  label = 'Label',
  value = 'Input Text',
  showIcon = true,
  className,
  inputValue,
  onInputFocus,
  onInputBlur,
  onInputChange,
  onInputKeyDown,
  inputDisabled = false,
  inputRef,
  iconSize = 24,
}: InputFieldBaseProps) => {
  const isEmpty = type === 'empty';
  const isSemiBold = type === 'semiBold';
  const isDisabled = state === 'disabled';
  const isAction = state === 'action';
  const showValue = !isEmpty;
  const labelSize = isEmpty && !isAction ? 'large' : 'small';
  const displayValue = inputValue ?? (showValue ? value : '');

  const iconTone = isDisabled ? 'disabled' : isEmpty && state === 'active' ? 'active-empty' : 'default';

  return (
    <div
      className={[
        'input-field-base',
        `input-field-base--${type}`,
        `input-field-base--${state}`,
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {showIcon ? <PlusIcon tone={iconTone} size={iconSize} /> : null}

      <div className="input-field-base__text">
        <span className={['input-field-base__label', `input-field-base__label--${labelSize}`].join(' ')}>
          {label}
        </span>

        <input
          ref={inputRef}
          type="text"
          className={[
            'input-field-base__native-input',
            isSemiBold ? 'input-field-base__native-input--semibold' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          value={displayValue}
          disabled={inputDisabled}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          onChange={(e) => onInputChange?.(e.target.value)}
          onKeyDown={onInputKeyDown}
        />
      </div>
    </div>
  );
};
