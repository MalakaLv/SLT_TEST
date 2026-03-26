import { useState } from 'react';

import { ArrowUpRightIcon, PinIcon } from './icons/Icons';
import type { IconSize } from './icons/Icons';
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
  iconSize?: IconSize;
  className?: string;
}

export const DestinationItem = ({
  title = 'Paris',
  subtitle = 'All locations in this city',
  code = 'PAR',
  state = 'enabled',
  kind = 'city',
  theme = 'light',
  highlightCount = 0,
  highlightQuery,
  iconSize = 24,
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
        <span
          className="destination-item__pin"
          aria-hidden="true"
          style={{ width: iconSize, height: iconSize, flexBasis: iconSize }}
        >
          {kind === 'airport' ? (
            <ArrowUpRightIcon containerSize={iconSize} className="destination-item__icon" />
          ) : (
            <PinIcon containerSize={iconSize} className="destination-item__icon" />
          )}
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
