import { useMemo, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './Button';
import { PlusIcon } from './icons/Icons';
import { StandardList } from './StandardList';
import './dropdown-field.css';
import './country-selector.css';
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
