import type { Meta, StoryObj } from '@storybook/react-vite';

import { RequestForms } from './RequestForms';

const meta = {
  title: 'COMPLEX COMPONENTS/RequestForms',
  component: RequestForms,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    fromLabel: 'From*',
    toLabel: 'To*',
    departureDateLabel: 'Departure Date',
    returnDateLabel: 'Return Date',
    phoneLabel: 'Phone number*',
    emailLabel: 'E-mail*',
    nameLabel: 'Name',
    submitLabel: 'Get A Free Quotes',
    agentBlockVariant: '390',
  },
} satisfies Meta<typeof RequestForms>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile320: Story = {
  name: 'Mobile 320px',
  args: {
    agentBlockVariant: '320',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '320px',
          height: 'auto',
          overflow: 'visible',
          padding: '0 16px',
          boxSizing: 'border-box',
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
    agentBlockVariant: '390',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '390px',
          height: 'auto',
          overflow: 'visible',
          padding: '0 16px',
          boxSizing: 'border-box',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const Mobile448: Story = {
  name: 'Mobile 448px',
  args: {
    agentBlockVariant: '390',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '448px',
          height: 'auto',
          overflow: 'visible',
        }}
      >
        <Story />
      </div>
    ),
  ],
};
