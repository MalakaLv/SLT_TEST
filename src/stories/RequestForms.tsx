import { useState } from 'react';

import { AgentBlock } from './AgentBlock';
import { Button } from './Button';
import { DropdownButton } from './complex-components/DropdownButton';
import { DateInput } from './DateInput';
import { getDateInputModeForFlightType, type FlightType } from './flightType';
import { InputField } from './InputField';
import { PhoneInputField } from './PhoneInputField';
import { RequestDestinationField } from './RequestDestinationField';
import './request-forms.css';

type AgentBlockVariant = '390' | '320' | 'auto';

export interface RequestFormsProps {
  className?: string;
  fromLabel?: string;
  toLabel?: string;
  departureDateLabel?: string;
  returnDateLabel?: string;
  phoneLabel?: string;
  emailLabel?: string;
  nameLabel?: string;
  submitLabel?: string;
  agentBlockVariant?: AgentBlockVariant;
}

export const RequestForms = ({
  className,
  fromLabel = 'From*',
  toLabel = 'To*',
  departureDateLabel = 'Departure Date',
  returnDateLabel = 'Return Date',
  phoneLabel = 'Phone number*',
  emailLabel = 'E-mail*',
  nameLabel = 'Name',
  submitLabel = 'Get A Free Quotes',
  agentBlockVariant = 'auto',
}: RequestFormsProps) => {
  const [flightType, setFlightType] = useState<FlightType>('round-trip');

  return (
    <div className={['request-forms-layout', className ?? ''].filter(Boolean).join(' ')}>
      <AgentBlock className="request-forms__agent-block" variant={agentBlockVariant} />

      <div className="request-forms__separator" aria-hidden="true">
        <span className="request-forms__separator-line" />
        <span className="request-forms__separator-text">or Submit a Request</span>
        <span className="request-forms__separator-line" />
      </div>

      <form className="request-forms" onSubmit={(event) => event.preventDefault()}>
        <div className="request-forms__row request-forms__row--dropdowns">
          <div className="request-forms__cell request-forms__cell--dropdown-text">
            <DropdownButton
              variant="text-only"
              listType="standard"
              value={flightType}
              onChange={(nextValue) => setFlightType(nextValue as FlightType)}
              ariaLabel="Trip type"
              className="request-forms__dropdown-button request-forms__dropdown-button--text-only"
            />
          </div>
          <div className="request-forms__cell request-forms__cell--dropdown-info">
            <DropdownButton
              variant="info"
              listType="additional-info"
              ariaLabel="Additional travel info"
              className="request-forms__dropdown-button request-forms__dropdown-button--info"
            />
          </div>
        </div>

        <div className="request-forms__row">
          <div className="request-forms__cell">
            <RequestDestinationField label={fromLabel} ariaLabel="From destination" size={60} />
          </div>
          <div className="request-forms__cell">
            <RequestDestinationField label={toLabel} ariaLabel="To destination" size={60} />
          </div>
        </div>

        <div className="request-forms__row">
          <div className="request-forms__cell request-forms__cell--date-range">
            <DateInput
              mode={getDateInputModeForFlightType(flightType)}
              background="light"
              departureLabel={departureDateLabel}
              returnLabel={returnDateLabel}
              singleLabel={departureDateLabel}
            />
          </div>
        </div>

        <div className="request-forms__row request-forms__row--single">
          <div className="request-forms__cell">
            <PhoneInputField label={phoneLabel} state="default" />
          </div>
        </div>

        <div className="request-forms__row">
          <div className="request-forms__cell">
            <InputField label={emailLabel} state="default" showIcon={false} />
          </div>
          <div className="request-forms__cell">
            <InputField label={nameLabel} state="default" showIcon={false} />
          </div>
        </div>

        <div className="request-forms__actions">
          <Button label={submitLabel} leftIcon={false} rightIcon={false} fullWidth={true} />
        </div>
      </form>
    </div>
  );
};
