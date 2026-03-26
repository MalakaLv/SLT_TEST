import { useMemo, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './Button';
import { DestinationItem } from './DestinationItem';
import type { DestinationItemKind, DestinationItemState } from './DestinationItem';
import { PlusIcon, SearchIcon } from './icons/Icons';
import { StandardList } from './StandardList';
import './dropdown-field.css';
import './country-selector.css';
import './destination-item.css';
import './standard-list-story.css';

type TripOption = {
  value: string;
  label: string;
};

type CountryOption = {
  iso2: string;
  name: string;
  dialCode: string;
  flag: string;
};

type MenuOnlyProps = {
  theme?: 'light' | 'dark';
};

type DestinationOption = {
  id: string;
  title: string;
  subtitle: string;
  code: string;
  kind: DestinationItemKind;
  state?: DestinationItemState;
  showDividerBefore?: boolean;
  showFadeAfter?: boolean;
};

const TRIP_OPTIONS: TripOption[] = [
  { value: 'one-way', label: 'One-Way' },
  { value: 'round-trip', label: 'Round-Trip' },
  { value: 'multi-city', label: 'Multi-City' },
];

const COUNTRY_OPTIONS: CountryOption[] = [
  { iso2: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸' },
  { iso2: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
  { iso2: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
  { iso2: 'LV', name: 'Latvija', dialCode: '+371', flag: '🇱🇻' },
];

const DESTINATION_OPTIONS: DestinationOption[] = [
  { id: 'city-par', title: 'Paris', subtitle: 'All locations in this city', code: 'PAR', kind: 'city' },
  { id: 'apt-cdg', title: 'Paris Charles de Gaulle', subtitle: 'France', code: 'CDG', kind: 'airport' },
  { id: 'apt-ory', title: 'Paris Orly', subtitle: 'France', code: 'ORY', kind: 'airport', state: 'hover' },
  { id: 'apt-bva', title: 'Paris Beauvais', subtitle: 'France', code: 'BVA', kind: 'airport' },
  {
    id: 'city-us-par',
    title: 'United States,Paris',
    subtitle: 'All locations in this city',
    code: 'PAR',
    kind: 'city',
    showDividerBefore: true,
  },
  {
    id: 'apt-cdg-2',
    title: 'Paris Charles de Gaulle',
    subtitle: 'France',
    code: 'CDG',
    kind: 'airport',
    showFadeAfter: true,
  },
];

const HiddenTrigger = (props: {
  type: 'button';
  disabled: boolean;
  'aria-expanded': boolean;
  'aria-haspopup': 'listbox';
  'aria-controls': string;
  'aria-label'?: string;
  onClick: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
}) => (
  <button {...props} className="standard-list-story__hidden-trigger" tabIndex={-1} aria-hidden="true" />
);

const DefaultListMenu = ({ theme = 'light' }: MenuOnlyProps) => (
  <StandardList<TripOption>
    options={TRIP_OPTIONS}
    getOptionValue={(option) => option.value}
    defaultValue="round-trip"
    theme={theme}
    visualState="open"
    className="standard-list-story standard-list-story--dropdown"
    menuClassName="dropdown-field__menu standard-list-story__menu"
    optionsClassName="dropdown-field__options"
    optionClassName="dropdown-field__option"
    optionSelectedClassName="dropdown-field__option--selected"
    optionActiveClassName="dropdown-field__option--active"
    renderTrigger={({ triggerProps }) => <HiddenTrigger {...triggerProps} />}
    renderOption={({ option, isSelected }) => (
      <>
        <span className="dropdown-field__option-label">{option.label}</span>
        {isSelected ? <span className="country-selector__check">✓</span> : null}
      </>
    )}
  />
);

const CountryListMenu = ({ theme = 'light' }: MenuOnlyProps) => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) {
      return COUNTRY_OPTIONS;
    }
    return COUNTRY_OPTIONS.filter((country) => {
      return (
        country.name.toLowerCase().includes(term) ||
        country.iso2.toLowerCase().includes(term) ||
        country.dialCode.toLowerCase().includes(term)
      );
    });
  }, [query]);

  return (
    <StandardList<CountryOption>
      options={filtered}
      getOptionValue={(option) => option.iso2}
      defaultValue="GB"
      theme={theme}
      visualState="open"
      className="standard-list-story standard-list-story--country"
      menuClassName="country-selector__menu standard-list-story__menu"
      optionsClassName="country-selector__list"
      optionClassName="country-selector__item"
      optionSelectedClassName="country-selector__item--selected"
      renderTrigger={({ triggerProps }) => <HiddenTrigger {...triggerProps} />}
      renderMenuHeader={() => (
        <div className="country-selector__search-wrap">
          <span className="country-selector__search-icon" aria-hidden="true">
            ⌕
          </span>
          <input
            type="text"
            className="country-selector__search-input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search"
          />
        </div>
      )}
      renderOption={({ option, isSelected }) => (
        <>
          <span className="country-selector__item-main">
            <span className="country-selector__flag">{option.flag}</span>
            <span className="country-selector__item-label">
              {option.name} ({option.iso2}) {option.dialCode}
            </span>
          </span>
          {isSelected ? <span className="country-selector__check">✓</span> : null}
        </>
      )}
    />
  );
};

const DestinationsListMenu = ({ theme = 'light' }: MenuOnlyProps) => {
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
      theme={theme}
      visualState="open"
      className={['standard-list-story', 'standard-list-story--destinations', `standard-list-story--destinations-${theme}`].join(' ')}
      menuClassName="standard-list-story__destinations-menu"
      optionsClassName="standard-list-story__destinations-options"
      optionClassName="standard-list-story__destinations-option"
      renderTrigger={({ triggerProps }) => <HiddenTrigger {...triggerProps} />}
      renderMenuHeader={() => (
        <div className="standard-list-story__destinations-search">
          <SearchIcon containerSize={20} className="standard-list-story__destinations-search-icon" />
          <input
            type="text"
            className="standard-list-story__destinations-search-input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search destination"
          />
        </div>
      )}
      renderOption={({ option }) => (
        <div>
          {option.showDividerBefore ? <div className="standard-list-story__destinations-divider" /> : null}
          <DestinationItem
            title={option.title}
            subtitle={option.subtitle}
            code={option.code}
            kind={option.kind}
            theme={theme}
            state={option.state ?? 'enabled'}
            highlightQuery={query}
            className="standard-list-story__destinations-item"
          />
          {option.showFadeAfter ? <div className="standard-list-story__destinations-fade" aria-hidden="true" /> : null}
        </div>
      )}
    />
  );
};

const AdditionalInfoListPanel = () => (
  <div className="standard-list-story__additional-info">
    <section className="standard-list-story__section">
      <h3 className="standard-list-story__title">Travelers</h3>
      <div className="standard-list-story__traveler-row">
        <p className="standard-list-story__label">Passenger</p>
        <div className="standard-list-story__counter">
          <button type="button" className="standard-list-story__icon-button" aria-label="Decrease passenger count">
            <span className="standard-list-story__minus-icon" aria-hidden="true" />
          </button>
          <span className="standard-list-story__counter-value">1</span>
          <button type="button" className="standard-list-story__icon-button" aria-label="Increase passenger count">
            <PlusIcon containerSize={20} className="standard-list-story__plus-icon" />
          </button>
        </div>
      </div>
    </section>

    <div className="standard-list-story__divider" aria-hidden="true" />

    <section className="standard-list-story__section">
      <h3 className="standard-list-story__title">Cabin Class</h3>
      <div className="standard-list-story__chips">
        <button type="button" className="standard-list-story__chip standard-list-story__chip--selected">
          Business Class
        </button>
        <button type="button" className="standard-list-story__chip">
          First Class
        </button>
        <button type="button" className="standard-list-story__chip">
          Premium Economy
        </button>
      </div>
    </section>

    <Button leftIcon={false} rightIcon={false} fullWidth className="standard-list-story__done-button">
      Done
    </Button>
  </div>
);

const meta = {
  title: 'Components/StandardList',
  component: DefaultListMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DefaultListMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultList: Story = {
  render: () => <DefaultListMenu theme="light" />,
};

export const CountryList: Story = {
  render: () => <CountryListMenu theme="light" />,
};

export const AdditionalInfoList: Story = {
  name: 'Additional Info List',
  render: () => <AdditionalInfoListPanel />,
};

export const DestinationsList: Story = {
  name: 'Destinations List',
  render: () => <DestinationsListMenu theme="light" />,
};

export const DestinationsListDark: Story = {
  name: 'Destinations List Dark',
  render: () => <DestinationsListMenu theme="dark" />,
  decorators: [
    (StoryComponent: () => React.JSX.Element) => (
      <div
        style={{
          padding: '24px',
          background: 'linear-gradient(90deg, #1f1f1f 0%, #2e2e2e 100%)',
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
};
