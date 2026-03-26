import { useMemo, useState } from 'react';

import { SearchIcon } from './icons/Icons';
import { DestinationItem } from './DestinationItem';
import type { DestinationItemKind, DestinationItemState } from './DestinationItem';
import './destinations-list.css';

export interface DestinationRecord {
  id: string;
  title: string;
  subtitle: string;
  code: string;
  kind: DestinationItemKind;
  state?: DestinationItemState;
}

export interface DestinationsListProps {
  theme?: 'light' | 'dark';
  query?: string;
  defaultQuery?: string;
  onQueryChange?: (value: string) => void;
  items?: DestinationRecord[];
  className?: string;
}

const DEFAULT_ITEMS: DestinationRecord[] = [
  { id: 'city-par', title: 'Paris', subtitle: 'All locations in this city', code: 'PAR', kind: 'city' },
  { id: 'apt-cdg', title: 'Paris Charles de Gaulle', subtitle: 'France', code: 'CDG', kind: 'airport' },
  { id: 'apt-ory', title: 'Paris Orly', subtitle: 'France', code: 'ORY', kind: 'airport', state: 'hover' },
  { id: 'apt-bva', title: 'Paris Beauvais', subtitle: 'France', code: 'BVA', kind: 'airport' },
  { id: 'city-us-par', title: 'United States,Paris', subtitle: 'All locations in this city', code: 'PAR', kind: 'city' },
  { id: 'apt-cdg-2', title: 'Paris Charles de Gaulle', subtitle: 'France', code: 'CDG', kind: 'airport' },
];

export const DestinationsList = ({
  theme = 'light',
  query,
  defaultQuery = '',
  onQueryChange,
  items = DEFAULT_ITEMS,
  className,
}: DestinationsListProps) => {
  const isControlled = query !== undefined;
  const [internalQuery, setInternalQuery] = useState(defaultQuery);
  const searchValue = isControlled ? query : internalQuery;

  const visibleItems = useMemo(() => {
    const term = searchValue.trim().toLowerCase();
    if (!term) {
      return items;
    }
    return items.filter((item) => item.title.toLowerCase().includes(term) || item.subtitle.toLowerCase().includes(term) || item.code.toLowerCase().includes(term));
  }, [items, searchValue]);

  const onSearchChange = (value: string) => {
    if (!isControlled) {
      setInternalQuery(value);
    }
    onQueryChange?.(value);
  };

  return (
    <div className={['destinations-list', `destinations-list--${theme}`, className ?? ''].filter(Boolean).join(' ')}>
      <div className="destinations-list__search">
        <SearchIcon containerSize={20} className="destinations-list__search-icon" />
        <input
          type="text"
          className="destinations-list__search-input"
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search destination"
        />
      </div>

      <div className="destinations-list__items">
        {visibleItems.map((item, index) => (
          <div key={item.id}>
            {item.id === 'city-us-par' ? <div className="destinations-list__divider" /> : null}
            <DestinationItem
              title={item.title}
              subtitle={item.subtitle}
              code={item.code}
              kind={item.kind}
              theme={theme}
              state={item.state ?? 'enabled'}
              highlightQuery={searchValue}
              className="destinations-list__item"
            />
            {index === visibleItems.length - 1 ? <div className="destinations-list__fade" aria-hidden="true" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
};

