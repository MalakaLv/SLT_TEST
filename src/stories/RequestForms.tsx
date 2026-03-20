import { Button } from './Button';
import { DropdownField } from './DropdownField';
import { InputField } from './InputField';
import { PhoneInputField } from './PhoneInputField';
import './request-forms.css';

export interface RequestFormsProps {
  className?: string;
  tripTypeLabel?: string;
  passengersClassLabel?: string;
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
  tripTypeLabel = 'Trip Type',
  passengersClassLabel = 'Passengers & Class',
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
          <label className="request-forms__field-label">{tripTypeLabel}</label>
          <DropdownField ariaLabel={tripTypeLabel} />
        </div>
        <div className="request-forms__cell">
          <label className="request-forms__field-label">{passengersClassLabel}</label>
          <DropdownField ariaLabel={passengersClassLabel} />
        </div>
      </div>

      <div className="request-forms__row">
        <div className="request-forms__cell">
          <InputField label={fromLabel} state="default" />
        </div>
        <div className="request-forms__cell">
          <InputField label={toLabel} state="default" />
        </div>
      </div>

      <div className="request-forms__row">
        <div className="request-forms__cell">
          <InputField label={departureDateLabel} state="default" />
        </div>
        <div className="request-forms__cell">
          <InputField label={returnDateLabel} state="default" />
        </div>
      </div>

      <div className="request-forms__row request-forms__row--single">
        <div className="request-forms__cell">
          <PhoneInputField label={phoneLabel} state="default" />
        </div>
      </div>

      <div className="request-forms__row">
        <div className="request-forms__cell">
          <InputField label={emailLabel} state="default" />
        </div>
        <div className="request-forms__cell">
          <InputField label={nameLabel} state="default" />
        </div>
      </div>

      <div className="request-forms__actions">
        <Button label={submitLabel} leftIcon={false} rightIcon={false} />
      </div>
    </form>
  );
};
