import './destination-item.css';

export type DestinationItemState = 'enabled' | 'hover' | 'txt-highlight';

export interface DestinationItemProps {
  title?: string;
  subtitle?: string;
  code?: string;
  state?: DestinationItemState;
  highlightCount?: number;
  className?: string;
}

const PinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" className="destination-item__pin-svg">
    <path d="M12 2C8.96 2 6.5 4.46 6.5 7.5C6.5 11.71 12 20.5 12 20.5C12 20.5 17.5 11.71 17.5 7.5C17.5 4.46 15.04 2 12 2ZM12 10C10.62 10 9.5 8.88 9.5 7.5C9.5 6.12 10.62 5 12 5C13.38 5 14.5 6.12 14.5 7.5C14.5 8.88 13.38 10 12 10Z" />
  </svg>
);

export const DestinationItem = ({
  title = 'Paris',
  subtitle = 'All locations in this city',
  code = 'PAR',
  state = 'enabled',
  highlightCount = 0,
  className,
}: DestinationItemProps) => {
  const prefix = highlightCount > 0 ? title.slice(0, highlightCount) : '';
  const suffix = highlightCount > 0 ? title.slice(highlightCount) : title;

  return (
    <button
      type="button"
      className={['destination-item', `destination-item--${state}`, className ?? ''].filter(Boolean).join(' ')}
    >
      <span className="destination-item__main">
        <span className="destination-item__pin" aria-hidden="true">
          <PinIcon />
        </span>
        <span className="destination-item__text">
          <span className="destination-item__title">
            {prefix ? <span className="destination-item__title-highlight">{prefix}</span> : null}
            <span>{suffix}</span>
          </span>
          <span className="destination-item__subtitle">{subtitle}</span>
        </span>
      </span>
      <span className="destination-item__code">{code}</span>
    </button>
  );
};

