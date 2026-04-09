import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Button } from '../Button';
import { DatePicker } from '../DatePicker';
import { DateInput } from '../DateInput';
import { getDateInputModeForFlightType, type FlightType } from '../flightType';
import { RequestDestinationField } from '../RequestDestinationField';
import { DropdownButton } from './DropdownButton';
import './search-bar.css';

export interface SearchBarProps {
  className?: string;
  fromLabel?: string;
  toLabel?: string;
  departureDateLabel?: string;
  returnDateLabel?: string;
  searchLabel?: string;
}

export const SearchBar = ({
  className,
  fromLabel = 'From*',
  toLabel = 'To*',
  departureDateLabel = 'Departure Date',
  returnDateLabel = 'Return Date',
  searchLabel = 'Search flight',
}: SearchBarProps) => {
  const today = new Date();
  const defaultDeparture = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const defaultReturn = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2);
  const [flightType, setFlightType] = useState<FlightType>('round-trip');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({
    start: defaultDeparture,
    end: defaultReturn,
  });
  const dateRangeRef = useRef<HTMLDivElement | null>(null);
  const datePickerPopoverRef = useRef<HTMLDivElement | null>(null);
  const [popupPosition, setPopupPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const dateMode = getDateInputModeForFlightType(flightType);

  const formatDate = (value: Date | null) =>
    value
      ? value.toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        })
      : '';

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (dateRangeRef.current?.contains(target) || datePickerPopoverRef.current?.contains(target)) {
        return;
      }
      setIsCalendarOpen(false);
    };
    window.addEventListener('pointerdown', onPointerDown);
    return () => window.removeEventListener('pointerdown', onPointerDown);
  }, []);

  useEffect(() => {
    if (!isCalendarOpen) {
      return;
    }

    const updatePopupPosition = () => {
      const anchor = dateRangeRef.current;
      const popup = datePickerPopoverRef.current;
      if (!anchor || !popup) {
        return;
      }

      const anchorRect = anchor.getBoundingClientRect();
      const popupRect = popup.getBoundingClientRect();
      const viewportPadding = 16;
      const maxLeft = window.innerWidth - popupRect.width - viewportPadding;
      const nextLeft = Math.max(viewportPadding, Math.min(anchorRect.left, maxLeft));
      const nextTop = anchorRect.bottom + 2;

      setPopupPosition({ top: nextTop, left: nextLeft });
    };

    updatePopupPosition();
    window.addEventListener('resize', updatePopupPosition);
    window.addEventListener('scroll', updatePopupPosition, true);

    return () => {
      window.removeEventListener('resize', updatePopupPosition);
      window.removeEventListener('scroll', updatePopupPosition, true);
    };
  }, [isCalendarOpen, dateRange.start, dateMode]);

  useEffect(() => {
    if (dateMode === 'single-field' && dateRange.end) {
      setDateRange((prev) => ({ start: prev.start, end: null }));
    }
  }, [dateMode, dateRange.end]);

  return (
    <div className={['search-bar-wrapper', className ?? ''].filter(Boolean).join(' ')}>
      <div className="search-bar">
        <div className="search-bar__row search-bar__row--top">
          <div className="search-bar__cell search-bar__cell--dropdown-text">
            <DropdownButton
              variant="text-only"
              listType="standard"
              value={flightType}
              onChange={(nextValue) => setFlightType(nextValue as FlightType)}
              ariaLabel="Trip type"
              className="search-bar__dropdown-button search-bar__dropdown-button--text-only"
            />
          </div>
          <div className="search-bar__cell search-bar__cell--dropdown-info">
            <DropdownButton
              variant="info"
              listType="additional-info"
              ariaLabel="Additional travel info"
              className="search-bar__dropdown-button search-bar__dropdown-button--info"
            />
          </div>
        </div>

        <div className="search-bar__row search-bar__row--fields">
          <div className="search-bar__cell search-bar__cell--from">
            <RequestDestinationField label={fromLabel} ariaLabel="From destination" size={60} />
          </div>
          <div className="search-bar__cell search-bar__cell--to">
            <RequestDestinationField label={toLabel} ariaLabel="To destination" size={60} />
          </div>
          <div className="search-bar__cell search-bar__cell--date-range" ref={dateRangeRef}>
            <DateInput
              mode={dateMode}
              background="light"
              departureLabel={departureDateLabel}
              returnLabel={returnDateLabel}
              singleLabel={departureDateLabel}
              departureValue={formatDate(dateRange.start)}
              returnValue={formatDate(dateRange.end)}
              singleValue={formatDate(dateRange.start)}
              readOnly
              showClearControl={false}
              onDepartureFieldClick={() => setIsCalendarOpen(true)}
              onReturnFieldClick={() => setIsCalendarOpen(true)}
              onSingleFieldClick={() => setIsCalendarOpen(true)}
            />
            {isCalendarOpen
              ? createPortal(
                  <div
                    ref={datePickerPopoverRef}
                    className="search-bar__date-picker-popover search-bar__date-picker-popover--portal"
                    style={{
                      top: `${popupPosition.top}px`,
                      left: `${popupPosition.left}px`,
                    }}
                  >
                    <DatePicker
                      mode="range"
                      monthsToShow={2}
                      density="default"
                      initialVisibleMonth={dateRange.start ?? new Date(2025, 2, 1)}
                      selectedRange={dateRange}
                      onRangeSelect={(nextRange) => {
                        if (dateMode === 'single-field') {
                          setDateRange({ start: nextRange.start, end: null });
                          if (nextRange.start) {
                            setIsCalendarOpen(false);
                          }
                          return;
                        }

                        setDateRange(nextRange);
                        if (nextRange.start && nextRange.end) {
                          setIsCalendarOpen(false);
                        }
                      }}
                    />
                  </div>,
                  document.body,
                )
              : null}
          </div>
          <div className="search-bar__cell search-bar__cell--action">
            <Button label={searchLabel} leftIcon={false} rightIcon={false} fullWidth={true} />
          </div>
        </div>
      </div>
    </div>
  );
};
