import type { RefObject } from 'react';

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
  inputDisabled?: boolean;
  inputRef?: RefObject<HTMLInputElement | null>;
}

const PlusIcon = ({ tone }: { tone: 'active-empty' | 'default' | 'disabled' }) => (
  <span className={['input-field-base__icon', `input-field-base__icon--${tone}`].join(' ')} aria-hidden="true">
    <svg width="24" height="24" viewBox="0 0 24 24" className="input-field-base__icon-svg">
      <g transform="translate(3 3)">
        <svg width="18" height="18" viewBox="0 0 18 18">
          <path d="M9 2.5V15.5M2.5 9H15.5" />
        </svg>
      </g>
    </svg>
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
  inputDisabled = false,
  inputRef,
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
      {showIcon ? <PlusIcon tone={iconTone} /> : null}

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
        />
      </div>
    </div>
  );
};
