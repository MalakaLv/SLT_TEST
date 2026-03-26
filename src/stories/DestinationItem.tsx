import { useState } from 'react';

import './destination-item.css';

export type DestinationItemState = 'enabled' | 'hover' | 'txt-highlight';
export type DestinationItemKind = 'city' | 'airport';

export interface DestinationItemProps {
  title?: string;
  subtitle?: string;
  code?: string;
  state?: DestinationItemState;
  kind?: DestinationItemKind;
  theme?: 'light' | 'dark';
  highlightCount?: number;
  highlightQuery?: string;
  className?: string;
}

const PinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" className="destination-item__pin-svg">
    <path d="M12 2C8.96 2 6.5 4.46 6.5 7.5C6.5 11.71 12 20.5 12 20.5C12 20.5 17.5 11.71 17.5 7.5C17.5 4.46 15.04 2 12 2ZM12 10C10.62 10 9.5 8.88 9.5 7.5C9.5 6.12 10.62 5 12 5C13.38 5 14.5 6.12 14.5 7.5C14.5 8.88 13.38 10 12 10Z" />
  </svg>
);

const ArrowUpRightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" className="destination-item__arrow-svg">
    <path d="M8 16L16 8M10 8H16V14" />
  </svg>
);

export const DestinationItem = ({
  title = 'Paris',
  subtitle = 'All locations in this city',
  code = 'PAR',
  state = 'enabled',
  kind = 'city',
  theme = 'light',
  highlightCount = 0,
  highlightQuery,
  className,
}: DestinationItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const effectiveState: DestinationItemState = state !== 'enabled' ? state : isHovered ? 'hover' : 'enabled';
  const normalized = highlightQuery?.trim().toLowerCase() ?? '';
  const queryIndex = normalized ? title.toLowerCase().indexOf(normalized) : -1;
  const rangeStart = queryIndex >= 0 ? queryIndex : 0;
  const rangeLength = queryIndex >= 0 ? normalized.length : highlightCount;
  const prefix = rangeLength > 0 ? title.slice(0, rangeStart) : '';
  const highlight = rangeLength > 0 ? title.slice(rangeStart, rangeStart + rangeLength) : '';
  const suffix = rangeLength > 0 ? title.slice(rangeStart + rangeLength) : title;

  return (
    <button
      type="button"
      className={[
        'destination-item',
        `destination-item--${effectiveState}`,
        `destination-item--${kind}`,
        `destination-item--${theme}`,
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="destination-item__main">
        <span className="destination-item__pin" aria-hidden="true">
          {kind === 'airport' ? <ArrowUpRightIcon /> : <PinIcon />}
        </span>
        <span className="destination-item__text">
          <span className="destination-item__title">
            {prefix}
            {highlight ? <span className="destination-item__title-highlight">{highlight}</span> : null}
            <span>{suffix}</span>
          </span>
          <span className="destination-item__subtitle">{subtitle}</span>
        </span>
      </span>
      <span className="destination-item__code">{code}</span>
    </button>
  );
};
