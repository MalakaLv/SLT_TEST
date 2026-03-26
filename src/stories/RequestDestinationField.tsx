import { useMemo, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { DestinationItem } from './DestinationItem';
import { InputField } from './InputField';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const blurTimerRef = useRef<number | null>(null);
  const menuControlsRef = useRef<{ openMenu: () => void; closeMenu: () => void; toggleMenu: () => void } | null>(null);
  const triggerKeyDownRef = useRef<((event: ReactKeyboardEvent<HTMLButtonElement>) => void) | null>(null);

  const filtered = useMemo(() => {
    const term = searchQuery.trim().toLowerCase();
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
  }, [searchQuery]);

  const shouldOpen = isFocused && searchQuery.trim().length >= 2 && filtered.length > 0;
  const displayValue = inputValue;

  return (
    <StandardList<DestinationOption>
      options={filtered}
      getOptionValue={(option) => option.id}
      value={selectedId}
      className="request-forms__destination"
      menuClassName="request-forms__destination-menu"
      optionsClassName="request-forms__destination-options"
      optionClassName="request-forms__destination-option"
      optionActiveClassName="request-forms__destination-option--active"
      optionSelectedClassName="request-forms__destination-option--selected"
      ariaLabel={ariaLabel}
      visualState={shouldOpen ? 'open' : 'default'}
      onChange={(nextId, option) => {
        setSelectedId(nextId);
        setInputValue(option.title);
        setSearchQuery('');
        setIsFocused(false);
      }}
      renderTrigger={({ triggerProps, menuControls }) => {
        menuControlsRef.current = menuControls;
        triggerKeyDownRef.current = triggerProps.onKeyDown;

        return (
          <div className="request-forms__destination-trigger-wrap">
            <InputField
              className="request-forms__destination-input"
              label={label}
              state="default"
              showIcon={false}
              value={displayValue}
              onValueChange={(nextValue) => {
                setInputValue(nextValue);
                setSearchQuery(nextValue);
                setSelectedId(undefined);
                if (nextValue.trim().length >= 2) {
                  const nextTerm = nextValue.trim().toLowerCase();
                  const hasMatches = DESTINATION_OPTIONS.some((item) => {
                    return (
                      item.title.toLowerCase().includes(nextTerm) ||
                      item.subtitle.toLowerCase().includes(nextTerm) ||
                      item.code.toLowerCase().includes(nextTerm)
                    );
                  });
                  if (hasMatches) {
                    menuControlsRef.current?.openMenu();
                  } else {
                    menuControlsRef.current?.closeMenu();
                  }
                } else {
                  menuControlsRef.current?.closeMenu();
                }
              }}
              onInputFocus={() => {
                if (blurTimerRef.current !== null) {
                  window.clearTimeout(blurTimerRef.current);
                  blurTimerRef.current = null;
                }
                setIsFocused(true);
                if (searchQuery.trim().length >= 2 && filtered.length > 0) {
                  menuControlsRef.current?.openMenu();
                }
              }}
              onInputBlur={() => {
                blurTimerRef.current = window.setTimeout(() => {
                  setIsFocused(false);
                }, 120);
              }}
              onInputKeyDown={(event) => {
                if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter' || event.key === 'Escape') {
                  triggerKeyDownRef.current?.(event as unknown as ReactKeyboardEvent<HTMLButtonElement>);
                }
              }}
            />
            <button
              {...triggerProps}
              className="request-forms__destination-hidden-trigger"
              tabIndex={-1}
              aria-hidden="true"
            />
          </div>
        );
      }}
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
