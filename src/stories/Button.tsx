import type { ButtonHTMLAttributes, ReactNode } from 'react';

import './button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Legacy alias for the primary variant */
  primary?: boolean;
  /** Visual style of the button */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** Button height and padding */
  size?: 'small' | 'medium' | 'large';
  /** Stretches button to parent width */
  fullWidth?: boolean;
  /** Optional legacy label prop for existing stories/components */
  label?: string;
  /** Button contents */
  children?: ReactNode;
}

export const Button = ({
  primary = false,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  label,
  children,
  className,
  type = 'button',
  ...props
}: ButtonProps) => {
  const resolvedVariant = primary ? 'primary' : variant;

  return (
    <button
      type={type}
      className={[
        'storybook-button',
        `storybook-button--${resolvedVariant}`,
        `storybook-button--${size}`,
        fullWidth ? 'storybook-button--full-width' : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <span className="storybook-button__label">{children ?? label}</span>
    </button>
  );
};
