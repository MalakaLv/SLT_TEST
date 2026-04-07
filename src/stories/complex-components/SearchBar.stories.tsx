import type { Meta, StoryObj } from '@storybook/react-vite';

import { SearchBar } from './SearchBar';

const meta = {
  title: 'Complex Components/Search bar',
  component: SearchBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    fromLabel: 'From*',
    toLabel: 'To*',
    departureDateLabel: 'Departure Date',
    returnDateLabel: 'Return Date',
    searchLabel: 'Search flight',
  },
} satisfies Meta<typeof SearchBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: 'search-bar--default',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '1100px', maxWidth: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
        <Story />
      </div>
    ),
  ],
};

export const Mobile320: Story = {
  name: 'Mobile 320px',
  args: {
    className: 'search-bar--mobile-320',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '320px',
          maxWidth: '100%',
          boxSizing: 'border-box',
          padding: '0 16px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const Mobile390: Story = {
  name: 'Mobile 390px',
  args: {
    className: 'search-bar--mobile-390',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '390px',
          maxWidth: '100%',
          boxSizing: 'border-box',
          padding: '0 16px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Story />
      </div>
    ),
  ],
};
