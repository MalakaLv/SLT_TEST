import type { ButtonHTMLAttributes, ReactNode } from 'react';

import './button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Legacy alias for the primary variant */
  primary?: boolean;
  /** Figma accent variant */
  accent?: 'primary' | 'secondary' | 'stroke';
  /** Legacy alias for accent */
  variant?: 'primary' | 'secondary' | 'stroke' | 'ghost';
  /** Figma interaction state (for Storybook previews) */
  state?: 'default' | 'hovered' | 'pressed' | 'focused' | 'disabled';
  /** Legacy size prop (kept for compatibility) */
  size?: 'small' | 'medium' | 'large';
  /** Stretches button to parent width */
  fullWidth?: boolean;
  /** Show left icon */
  leftIcon?: boolean;
  /** Show right icon */
  rightIcon?: boolean;
  /** Optional legacy label prop for existing stories/components */
  label?: string;
  /** Button contents */
  children?: ReactNode;
}

export const Button = ({
  primary = false,
  accent = 'primary',
  variant,
  state = 'default',
  size = 'medium',
  fullWidth = false,
  leftIcon = true,
  rightIcon = true,
  label,
  children,
  className,
  type = 'button',
  disabled,
  ...props
}: ButtonProps) => {
  const legacyVariant = variant === 'ghost' ? 'stroke' : variant;
  const resolvedAccent = primary ? 'primary' : legacyVariant ?? accent;
  const resolvedState = disabled ? 'disabled' : state;
  const content = children ?? label ?? 'Button';

  return (
    <button
      type={type}
      className={[
        'storybook-button',
        `storybook-button--${resolvedAccent}`,
        `storybook-button--${resolvedState}`,
        `storybook-button--legacy-size-${size}`,
        fullWidth ? 'storybook-button--full-width' : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      disabled={resolvedState === 'disabled'}
      {...props}
    >
      {leftIcon ? <span className="storybook-button__icon" aria-hidden="true" /> : null}
      <span className="storybook-button__label">{content}</span>
      {rightIcon ? <span className="storybook-button__icon" aria-hidden="true" /> : null}
    </button>
  );
};
