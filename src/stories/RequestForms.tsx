import { Button } from './Button';
import { DropdownButton } from './complex-components/DropdownButton';
import { InputField } from './InputField';
import { PhoneInputField } from './PhoneInputField';
import { RequestDestinationField } from './RequestDestinationField';
import './request-forms.css';

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
}: RequestFormsProps) => {
  return (
    <form className={['request-forms', className ?? ''].filter(Boolean).join(' ')} onSubmit={(event) => event.preventDefault()}>
      <div className="request-forms__row">
        <div className="request-forms__cell">
          <DropdownButton variant="text-only" listType="standard" defaultValue="round-trip" ariaLabel="Trip type" />
        </div>
        <div className="request-forms__cell">
          <DropdownButton variant="info" listType="additional-info" ariaLabel="Additional travel info" />
        </div>
      </div>

      <div className="request-forms__row">
        <div className="request-forms__cell">
          <RequestDestinationField label={fromLabel} ariaLabel="From destination" />
        </div>
        <div className="request-forms__cell">
          <RequestDestinationField label={toLabel} ariaLabel="To destination" />
        </div>
      </div>

      <div className="request-forms__row">
        <div className="request-forms__cell">
          <InputField label={departureDateLabel} state="default" showIcon={false} />
        </div>
        <div className="request-forms__cell">
          <InputField label={returnDateLabel} state="default" showIcon={false} />
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
  );
};
