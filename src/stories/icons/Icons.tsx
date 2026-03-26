import type { CSSProperties } from 'react';

export type IconSize = 16 | 20 | 24;

type BaseIconProps = {
  containerSize?: IconSize;
  /** @deprecated Use containerSize */
  size?: IconSize;
  className?: string;
};

type SvgIconProps = BaseIconProps;
type SearchIconProps = BaseIconProps;

const STROKE_PROPS = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const PLUS_GLYPH_SIZE: Record<IconSize, number> = { 16: 12, 20: 15, 24: 18 };
const CHEVRON_GLYPH_SIZE: Record<IconSize, number> = { 16: 10, 20: 12, 24: 14 };
const CLEAR_GLYPH_SIZE: Record<IconSize, number> = { 16: 12, 20: 15, 24: 18 };
const USER_GLYPH_SIZE: Record<IconSize, number> = { 16: 10, 20: 13, 24: 16 };
const CHECK_GLYPH_SIZE: Record<IconSize, number> = { 16: 12, 20: 15, 24: 18 };
const ERROR_GLYPH_SIZE: Record<IconSize, number> = { 16: 12, 20: 15, 24: 18 };
const SUCCESS_GLYPH_SIZE: Record<IconSize, number> = { 16: 12, 20: 15, 24: 18 };
const PIN_GLYPH_SIZE: Record<IconSize, number> = { 16: 16, 20: 20, 24: 24 };
const ARROW_UP_RIGHT_GLYPH_SIZE: Record<IconSize, number> = { 16: 16, 20: 20, 24: 24 };
const SEARCH_GLYPH_SIZE: Record<IconSize, string> = {
  16: '10px',
  20: '13px',
  24: '16px',
};

const SEARCH_BASE_STYLE: CSSProperties = {
  lineHeight: 1,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'currentColor',
};

const resolveContainerSize = (containerSize?: IconSize, size?: IconSize): IconSize => containerSize ?? size ?? 16;

const iconFrameStyle = (containerSize: IconSize): CSSProperties => ({
  width: `${containerSize}px`,
  height: `${containerSize}px`,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  lineHeight: 0,
  color: 'currentColor',
});

export const PlusIcon = ({ containerSize, size, className }: SvgIconProps) => {
  const resolvedContainerSize = resolveContainerSize(containerSize, size);
  const glyphSize = PLUS_GLYPH_SIZE[resolvedContainerSize];

  return (
    <span aria-hidden="true" className={className} style={iconFrameStyle(resolvedContainerSize)}>
      <svg width={glyphSize} height={glyphSize} viewBox="0 0 18 18">
        <path d="M9 2.5V15.5M2.5 9H15.5" {...STROKE_PROPS} strokeWidth="1.8" />
      </svg>
    </span>
  );
};

export const ChevronDownIcon = ({ containerSize, size, className }: SvgIconProps) => {
  const resolvedContainerSize = resolveContainerSize(containerSize, size);
  const glyphSize = CHEVRON_GLYPH_SIZE[resolvedContainerSize];

  return (
    <span aria-hidden="true" className={className} style={iconFrameStyle(resolvedContainerSize)}>
      <svg width={glyphSize} height={glyphSize} viewBox="0 0 16 16">
        <path d="M4 6L8 10L12 6" {...STROKE_PROPS} strokeWidth="1.8" />
      </svg>
    </span>
  );
};

export const ChevronUpIcon = ({ containerSize, size, className }: SvgIconProps) => {
  const resolvedContainerSize = resolveContainerSize(containerSize, size);
  const glyphSize = CHEVRON_GLYPH_SIZE[resolvedContainerSize];

  return (
    <span aria-hidden="true" className={className} style={iconFrameStyle(resolvedContainerSize)}>
      <svg width={glyphSize} height={glyphSize} viewBox="0 0 16 16">
        <path d="M4 10L8 6L12 10" {...STROKE_PROPS} strokeWidth="1.8" />
      </svg>
    </span>
  );
};

export const ClearIcon = ({ containerSize, size, className }: SvgIconProps) => {
  const resolvedContainerSize = resolveContainerSize(containerSize, size);
  const glyphSize = CLEAR_GLYPH_SIZE[resolvedContainerSize];

  return (
    <span aria-hidden="true" className={className} style={iconFrameStyle(resolvedContainerSize)}>
      <svg width={glyphSize} height={glyphSize} viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="7.2" {...STROKE_PROPS} strokeWidth="1.6" />
        <path d="M5.3 5.3L10.7 10.7M10.7 5.3L5.3 10.7" {...STROKE_PROPS} strokeWidth="1.6" />
      </svg>
    </span>
  );
};

export const UserIcon = ({ containerSize, size, className }: SvgIconProps) => {
  const resolvedContainerSize = resolveContainerSize(containerSize, size);
  const glyphSize = USER_GLYPH_SIZE[resolvedContainerSize];

  return (
    <span aria-hidden="true" className={className} style={iconFrameStyle(resolvedContainerSize)}>
      <svg width={glyphSize} height={glyphSize} viewBox="0 0 10 10">
        <path
          d="M5 0C5.66304 0 6.29893 0.263392 6.76777 0.732233C7.23661 1.20107 7.5 1.83696 7.5 2.5C7.5 3.16304 7.23661 3.79893 6.76777 4.26777C6.29893 4.73661 5.66304 5 5 5C4.33696 5 3.70107 4.73661 3.23223 4.26777C2.76339 3.79893 2.5 3.16304 2.5 2.5C2.5 1.83696 2.76339 1.20107 3.23223 0.732233C3.70107 0.263392 4.33696 0 5 0ZM5 6.25C7.7625 6.25 10 8.75 10 8.75V10H0V8.75C0 8.75 2.2375 6.25 5 6.25Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
};

export const CheckIcon = ({ containerSize, size, className }: SvgIconProps) => {
  const resolvedContainerSize = resolveContainerSize(containerSize, size);
  const glyphSize = CHECK_GLYPH_SIZE[resolvedContainerSize];

  return (
    <span aria-hidden="true" className={className} style={iconFrameStyle(resolvedContainerSize)}>
      <svg width={glyphSize} height={glyphSize} viewBox="0 0 24 24">
        <path d="M4 12.5L9.5 18L20 7.5" {...STROKE_PROPS} strokeWidth="1.8" />
      </svg>
    </span>
  );
};

export const ErrorIcon = ({ containerSize, size, className }: SvgIconProps) => {
  const resolvedContainerSize = resolveContainerSize(containerSize, size);
  const glyphSize = ERROR_GLYPH_SIZE[resolvedContainerSize];

  return (
    <span aria-hidden="true" className={className} style={iconFrameStyle(resolvedContainerSize)}>
      <svg width={glyphSize} height={glyphSize} viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="7.2" {...STROKE_PROPS} strokeWidth="1.6" />
        <path d="M8 4.4V8.8M8 11.3V11.7" {...STROKE_PROPS} strokeWidth="1.6" />
      </svg>
    </span>
  );
};

export const SuccessIcon = ({ containerSize, size, className }: SvgIconProps) => {
  const resolvedContainerSize = resolveContainerSize(containerSize, size);
  const glyphSize = SUCCESS_GLYPH_SIZE[resolvedContainerSize];

  return (
    <span aria-hidden="true" className={className} style={iconFrameStyle(resolvedContainerSize)}>
      <svg width={glyphSize} height={glyphSize} viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="7.2" {...STROKE_PROPS} strokeWidth="1.6" />
        <path d="M4.8 8.2L7.1 10.2L11.2 6.1" {...STROKE_PROPS} strokeWidth="1.6" />
      </svg>
    </span>
  );
};

export const PinIcon = ({ containerSize, size, className }: SvgIconProps) => {
  const resolvedContainerSize = resolveContainerSize(containerSize, size);
  const glyphSize = PIN_GLYPH_SIZE[resolvedContainerSize];

  return (
    <span aria-hidden="true" className={className} style={iconFrameStyle(resolvedContainerSize)}>
      <svg width={glyphSize} height={glyphSize} viewBox="0 0 24 24">
        <path
          d="M12 2C8.96 2 6.5 4.46 6.5 7.5C6.5 11.71 12 20.5 12 20.5C12 20.5 17.5 11.71 17.5 7.5C17.5 4.46 15.04 2 12 2ZM12 10C10.62 10 9.5 8.88 9.5 7.5C9.5 6.12 10.62 5 12 5C13.38 5 14.5 6.12 14.5 7.5C14.5 8.88 13.38 10 12 10Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
};

export const ArrowUpRightIcon = ({ containerSize, size, className }: SvgIconProps) => {
  const resolvedContainerSize = resolveContainerSize(containerSize, size);
  const glyphSize = ARROW_UP_RIGHT_GLYPH_SIZE[resolvedContainerSize];

  return (
    <span aria-hidden="true" className={className} style={iconFrameStyle(resolvedContainerSize)}>
      <svg width={glyphSize} height={glyphSize} viewBox="0 0 24 24">
        <path d="M8 16L16 8M10 8H16V14" {...STROKE_PROPS} strokeWidth="2" />
      </svg>
    </span>
  );
};

export const SearchIcon = ({ containerSize, size, className }: SearchIconProps) => {
  const resolvedContainerSize = resolveContainerSize(containerSize, size);

  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        ...SEARCH_BASE_STYLE,
        ...iconFrameStyle(resolvedContainerSize),
        fontSize: SEARCH_GLYPH_SIZE[resolvedContainerSize],
      }}
    >
      ⌕
    </span>
  );
};
