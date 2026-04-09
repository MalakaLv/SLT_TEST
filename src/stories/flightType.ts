import type { DateInputMode } from './DateInput';

export type FlightType = 'round-trip' | 'one-way' | 'multi-city';

export const getDateInputModeForFlightType = (flightType: FlightType): DateInputMode =>
  flightType === 'one-way' ? 'single-field' : 'two-field';
