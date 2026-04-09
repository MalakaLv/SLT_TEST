import { useMemo, useState } from 'react';

import './date-picker.css';

const WEEKDAY_LABELS = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'] as const;

type RangeValue = {
  start: Date | null;
  end: Date | null;
};

export interface DatePickerProps {
  mode?: 'single' | 'range';
  monthsToShow?: 1 | 2;
  density?: 'default' | 'compact';
  className?: string;
  initialVisibleMonth?: Date;
  defaultSelectedDate?: Date | null;
  selectedDate?: Date | null;
  onDateSelect?: (value: Date | null) => void;
  defaultRange?: RangeValue;
  selectedRange?: RangeValue;
  onRangeSelect?: (value: RangeValue) => void;
}

type CalendarDay = {
  date: Date;
  inMonth: boolean;
  isLeadingOutside: boolean;
};

const startOfMonth = (value: Date) => new Date(value.getFullYear(), value.getMonth(), 1);

const addMonths = (value: Date, months: number) => new Date(value.getFullYear(), value.getMonth() + months, 1);

const addDays = (value: Date, days: number) => {
  const next = new Date(value);
  next.setDate(next.getDate() + days);
  return next;
};

const isSameDay = (left: Date | null, right: Date | null) => {
  if (!left || !right) {
    return false;
  }
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
};

const normalizeDate = (value: Date) => new Date(value.getFullYear(), value.getMonth(), value.getDate());

const compareDates = (left: Date, right: Date) => normalizeDate(left).getTime() - normalizeDate(right).getTime();

const inRange = (candidate: Date, start: Date, end: Date) => {
  const normalized = normalizeDate(candidate).getTime();
  const startValue = normalizeDate(start).getTime();
  const endValue = normalizeDate(end).getTime();
  return normalized >= startValue && normalized <= endValue;
};

const buildCalendarDays = (month: Date): CalendarDay[] => {
  const monthStart = startOfMonth(month);
  const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 0);
  const offset = monthStart.getDay();
  const daysInMonth = monthEnd.getDate();
  const visibleWeeks = Math.ceil((offset + daysInMonth) / 7);
  const gridStart = addDays(monthStart, -offset);

  return Array.from({ length: visibleWeeks * 7 }, (_, index) => {
    const date = addDays(gridStart, index);
    return {
      date,
      inMonth: date.getMonth() === monthStart.getMonth(),
      isLeadingOutside: date < monthStart,
    };
  });
};

const formatMonthYear = (value: Date) =>
  value.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

const clampRangeEnd = (start: Date, end: Date) => (compareDates(end, start) < 0 ? start : end);

const CalendarPanel = ({
  month,
  onPrev,
  onNext,
  onDayHover,
  onDayLeave,
  onDaySelect,
  selectedDate,
  range,
  previewEnd,
  showPrev,
  showNext,
  mode,
  panelIndex,
}: {
  month: Date;
  onPrev: () => void;
  onNext: () => void;
  onDayHover: (value: Date | null) => void;
  onDayLeave: () => void;
  onDaySelect: (value: Date) => void;
  selectedDate: Date | null;
  range: RangeValue;
  previewEnd: Date | null;
  showPrev: boolean;
  showNext: boolean;
  mode: 'single' | 'range';
  panelIndex: number;
}) => {
  const days = useMemo(() => buildCalendarDays(month), [month]);

  const resolvedRange = useMemo(() => {
    if (mode !== 'range' || !range.start) {
      return { start: null, end: null as Date | null, preview: false };
    }

    if (range.end) {
      return { start: range.start, end: clampRangeEnd(range.start, range.end), preview: false };
    }

    if (previewEnd && compareDates(previewEnd, range.start) >= 0) {
      return { start: range.start, end: previewEnd, preview: true };
    }

    return { start: range.start, end: null as Date | null, preview: false };
  }, [mode, previewEnd, range.end, range.start]);

  return (
    <section className="date-picker__panel" aria-label={formatMonthYear(month)}>
      <div className="date-picker__month-top">
        <header className="date-picker__header">
          <button
            type="button"
            className={['date-picker__nav', !showPrev ? 'date-picker__nav--hidden' : ''].filter(Boolean).join(' ')}
            aria-label="Previous month"
            onClick={onPrev}
            disabled={!showPrev}
          >
            <span aria-hidden="true">←</span>
          </button>

          <h3 className="date-picker__month-label">{formatMonthYear(month)}</h3>

          <button
            type="button"
            className={['date-picker__nav', !showNext ? 'date-picker__nav--hidden' : ''].filter(Boolean).join(' ')}
            aria-label="Next month"
            onClick={onNext}
            disabled={!showNext}
          >
            <span aria-hidden="true">→</span>
          </button>
        </header>

        <div className="date-picker__weekday-row">
          {WEEKDAY_LABELS.map((day) => (
            <span key={day} className="date-picker__weekday">
              {day}
            </span>
          ))}
        </div>
      </div>

      <div className="date-picker__grid-wrap">
        <div className="date-picker__grid" role="grid" onMouseLeave={onDayLeave}>
          {days.map(({ date, inMonth, isLeadingOutside }) => {
            const shouldShowOutsideDate = isLeadingOutside && panelIndex === 0;
            const label = inMonth || shouldShowOutsideDate ? String(date.getDate()) : '';
            const disabled = !inMonth;
            const isSelected = mode === 'single' && isSameDay(selectedDate, date);
            const isDeparture = mode === 'range' && isSameDay(range.start, date);
            const isReturn = mode === 'range' && isSameDay(range.end, date);
            const isPreviewEnd = mode === 'range' && resolvedRange.preview && isSameDay(resolvedRange.end, date);
            const hasResolvedRange = resolvedRange.start && resolvedRange.end;
            const isBetween =
              mode === 'range' &&
              inMonth &&
              !!hasResolvedRange &&
              !!resolvedRange.start &&
              !!resolvedRange.end &&
              !resolvedRange.preview &&
              !isDeparture &&
              !isReturn &&
              inRange(date, resolvedRange.start, resolvedRange.end);
            const isPreviewBetween =
              mode === 'range' &&
              inMonth &&
              !!hasResolvedRange &&
              !!resolvedRange.start &&
              !!resolvedRange.end &&
              resolvedRange.preview &&
              !isDeparture &&
              !isPreviewEnd &&
              inRange(date, resolvedRange.start, resolvedRange.end);

            return (
              <button
                key={`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`}
                type="button"
                className={[
                  'date-picker__day',
                  disabled ? 'date-picker__day--disabled' : '',
                  isSelected ? 'date-picker__day--selected' : '',
                  isDeparture ? 'date-picker__day--departure' : '',
                  isReturn ? 'date-picker__day--return' : '',
                  isPreviewEnd ? 'date-picker__day--preview-end' : '',
                  isBetween ? 'date-picker__day--between' : '',
                  isPreviewBetween ? 'date-picker__day--preview-between' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                disabled={disabled}
                onMouseEnter={() => {
                  if (!disabled) {
                    onDayHover(date);
                  }
                }}
                onFocus={() => {
                  if (!disabled) {
                    onDayHover(date);
                  }
                }}
                onBlur={onDayLeave}
                onClick={() => onDaySelect(date)}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const DatePicker = ({
  mode = 'range',
  monthsToShow = 2,
  density = 'default',
  className,
  initialVisibleMonth,
  defaultSelectedDate = null,
  selectedDate,
  onDateSelect,
  defaultRange = { start: null, end: null },
  selectedRange,
  onRangeSelect,
}: DatePickerProps) => {
  const [visibleMonth, setVisibleMonth] = useState(startOfMonth(initialVisibleMonth ?? new Date(2025, 2, 1)));

  const [internalSingle, setInternalSingle] = useState<Date | null>(defaultSelectedDate);
  const [internalRange, setInternalRange] = useState<RangeValue>(defaultRange);
  const [previewEnd, setPreviewEnd] = useState<Date | null>(null);

  const isSingleControlled = selectedDate !== undefined;
  const isRangeControlled = selectedRange !== undefined;

  const resolvedSingle = isSingleControlled ? selectedDate ?? null : internalSingle;
  const resolvedRange = isRangeControlled ? selectedRange ?? { start: null, end: null } : internalRange;

  const visibleMonths = monthsToShow === 2 ? [visibleMonth, addMonths(visibleMonth, 1)] : [visibleMonth];

  const handleSelect = (date: Date) => {
    if (mode === 'single') {
      if (!isSingleControlled) {
        setInternalSingle(date);
      }
      onDateSelect?.(date);
      return;
    }

    const nextRange = (() => {
      if (!resolvedRange.start || resolvedRange.end) {
        return { start: date, end: null };
      }

      if (compareDates(date, resolvedRange.start) < 0) {
        return { start: date, end: null };
      }

      return { start: resolvedRange.start, end: date };
    })();

    if (!isRangeControlled) {
      setInternalRange(nextRange);
    }

    setPreviewEnd(null);
    onRangeSelect?.(nextRange);
  };

  const handleHover = (date: Date | null) => {
    if (mode !== 'range') {
      return;
    }

    if (!resolvedRange.start || resolvedRange.end || !date || compareDates(date, resolvedRange.start) < 0) {
      setPreviewEnd(null);
      return;
    }

    setPreviewEnd(date);
  };

  return (
    <div
      className={['date-picker', `date-picker--${monthsToShow}-months`, `date-picker--${density}`, className ?? '']
        .filter(Boolean)
        .join(' ')}
    >
      {visibleMonths.map((month, index) => (
        <CalendarPanel
          key={`${month.getFullYear()}-${month.getMonth()}`}
          month={month}
          onPrev={() => setVisibleMonth((prev) => addMonths(prev, -1))}
          onNext={() => setVisibleMonth((prev) => addMonths(prev, 1))}
          onDayHover={handleHover}
          onDayLeave={() => handleHover(null)}
          onDaySelect={handleSelect}
          selectedDate={resolvedSingle}
          range={resolvedRange}
          previewEnd={previewEnd}
          showPrev={index === 0}
          showNext={index === visibleMonths.length - 1}
          mode={mode}
          panelIndex={index}
        />
      ))}
    </div>
  );
};
