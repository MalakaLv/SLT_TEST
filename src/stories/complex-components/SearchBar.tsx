import { Button } from '../Button';
import { InputField } from '../InputField';
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
  return (
    <div className={['search-bar-wrapper', className ?? ''].filter(Boolean).join(' ')}>
      <div className="search-bar">
        <div className="search-bar__row search-bar__row--top">
          <div className="search-bar__cell search-bar__cell--dropdown-text">
            <DropdownButton
              variant="text-only"
              listType="standard"
              defaultValue="round-trip"
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
          <div className="search-bar__cell search-bar__cell--departure">
            <InputField label={departureDateLabel} size={60} state="default" showIcon={false} />
          </div>
          <div className="search-bar__cell search-bar__cell--return">
            <InputField label={returnDateLabel} size={60} state="default" showIcon={false} />
          </div>
          <div className="search-bar__cell search-bar__cell--action">
            <Button label={searchLabel} leftIcon={false} rightIcon={false} fullWidth={true} />
          </div>
        </div>
      </div>
    </div>
  );
};
