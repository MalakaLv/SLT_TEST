import type { CSSProperties, ReactElement } from 'react';

import {
  ArrowUpRightIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClearIcon,
  ErrorIcon,
  PinIcon,
  PlusIcon,
  SearchIcon,
  SuccessIcon,
  UserIcon,
} from './Icons';
import type { IconSize } from './Icons';

type IconDefinition = {
  readonly label: string;
  readonly render: (size: IconSize) => ReactElement;
};

export const iconGridStyle: CSSProperties = {
  width: '100%',
  maxWidth: '1200px',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '12px',
  padding: '12px',
  boxSizing: 'border-box',
};

export const ICON_DEFINITIONS: IconDefinition[] = [
  {
    label: 'Plus',
    render: (size) => <PlusIcon containerSize={size} />,
  },
  {
    label: 'Chevron Down',
    render: (size) => <ChevronDownIcon containerSize={size} />,
  },
  {
    label: 'Chevron Up',
    render: (size) => <ChevronUpIcon containerSize={size} />,
  },
  {
    label: 'Clear/Close',
    render: (size) => <ClearIcon containerSize={size} />,
  },
  {
    label: 'User/Person',
    render: (size) => <UserIcon containerSize={size} />,
  },
  {
    label: 'Check',
    render: (size) => <CheckIcon containerSize={size} />,
  },
  {
    label: 'Error/Info',
    render: (size) => <ErrorIcon containerSize={size} />,
  },
  {
    label: 'Success Check Circle',
    render: (size) => <SuccessIcon containerSize={size} />,
  },
  {
    label: 'Pin/Location',
    render: (size) => <PinIcon containerSize={size} />,
  },
  {
    label: 'Arrow Up Right',
    render: (size) => <ArrowUpRightIcon containerSize={size} />,
  },
  {
    label: 'Search',
    render: (size) => <SearchIcon containerSize={size} />,
  },
];
