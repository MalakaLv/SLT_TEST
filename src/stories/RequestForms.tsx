import { Button } from './Button';
import { DropdownField } from './DropdownField';
import { InputField } from './InputField';
import { PhoneInputField } from './PhoneInputField';
import './request-forms.css';

export interface RequestFormsProps {
  className?: string;
}

export const RequestForms = ({ className }: RequestFormsProps) => {
  return (
    <form className={['request-forms', className ?? ''].filter(Boolean).join(' ')} onSubmit={(event) => event.preventDefault()}>
      <div className="request-forms__row">
        <div className="request-forms__cell">
          <DropdownField ariaLabel="Request type" />
        </div>
        <div className="request-forms__cell">
          <DropdownField ariaLabel="Request category" />
        </div>
      </div>

      <div className="request-forms__row">
        <div className="request-forms__cell">
          <InputField label="First name" state="default" />
        </div>
        <div className="request-forms__cell">
          <InputField label="Last name" state="default" />
        </div>
      </div>

      <div className="request-forms__row">
        <div className="request-forms__cell">
          <InputField label="Email address" state="default" />
        </div>
        <div className="request-forms__cell">
          <InputField label="Company" state="default" />
        </div>
      </div>

      <div className="request-forms__row">
        <div className="request-forms__cell">
          <PhoneInputField label="Phone number*" state="default" />
        </div>
        <div className="request-forms__cell">
          <InputField label="Department" state="default" />
        </div>
      </div>

      <div className="request-forms__row">
        <div className="request-forms__cell">
          <InputField label="Reference number" state="default" />
        </div>
        <div className="request-forms__cell">
          <InputField label="Additional note" state="default" />
        </div>
      </div>

      <div className="request-forms__actions">
        <Button label="Submit Request" leftIcon={false} rightIcon={false} />
      </div>
    </form>
  );
};
