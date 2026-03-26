import { useMemo, useState } from 'react';

import { DestinationItem } from './DestinationItem';
import { SearchIcon } from './icons/Icons';
import { StandardList } from './StandardList';
import './request-forms.css';

type DestinationOption = {
  id: string;
  title: string;
  subtitle: string;
  code: string;
  kind: 'city' | 'airport';
};

const DESTINATION_OPTIONS: DestinationOption[] = [
  { id: 'city-par', title: 'Paris', subtitle: 'All locations in this city', code: 'PAR', kind: 'city' },
  { id: 'apt-cdg', title: 'Paris Charles de Gaulle', subtitle: 'France', code: 'CDG', kind: 'airport' },
  { id: 'apt-ory', title: 'Paris Orly', subtitle: 'France', code: 'ORY', kind: 'airport' },
  { id: 'apt-bva', title: 'Paris Beauvais', subtitle: 'France', code: 'BVA', kind: 'airport' },
];

export interface RequestDestinationFieldProps {
  label: string;
  ariaLabel: string;
}

export const RequestDestinationField = ({ label, ariaLabel }: RequestDestinationFieldProps) => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) {
      return DESTINATION_OPTIONS;
    }
    return DESTINATION_OPTIONS.filter((item) => {
      return (
        item.title.toLowerCase().includes(term) ||
        item.subtitle.toLowerCase().includes(term) ||
        item.code.toLowerCase().includes(term)
      );
    });
  }, [query]);

  return (
    <StandardList<DestinationOption>
      options={filtered}
      getOptionValue={(option) => option.id}
      defaultValue="city-par"
      className="request-forms__destination"
      menuClassName="request-forms__destination-menu"
      optionsClassName="request-forms__destination-options"
      optionClassName="request-forms__destination-option"
      optionActiveClassName="request-forms__destination-option--active"
      optionSelectedClassName="request-forms__destination-option--selected"
      ariaLabel={ariaLabel}
      renderTrigger={({ selectedOption, triggerProps, menuControls }) => (
        <button
          {...triggerProps}
          className="request-forms__destination-trigger"
          onClick={(event) => {
            event.preventDefault();
            menuControls.openMenu();
          }}
          onFocus={() => menuControls.openMenu()}
        >
          <span className="request-forms__destination-trigger-label">{label}</span>
          <span className="request-forms__destination-trigger-value">{selectedOption?.title ?? ''}</span>
        </button>
      )}
      renderMenuHeader={() => (
        <div className="request-forms__destination-search">
          <SearchIcon containerSize={20} className="request-forms__destination-search-icon" />
          <input
            type="text"
            className="request-forms__destination-search-input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search destination"
          />
        </div>
      )}
      renderOption={({ option, isActive }) => (
        <DestinationItem
          as="div"
          title={option.title}
          subtitle={option.subtitle}
          code={option.code}
          kind={option.kind}
          state={isActive ? 'hover' : 'enabled'}
          className="request-forms__destination-item"
        />
      )}
    />
  );
};

