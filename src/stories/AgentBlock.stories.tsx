import type { Meta, StoryObj } from '@storybook/react-vite';

import { AgentBlock } from './AgentBlock';

const meta = {
  title: 'Base Components/Agent Block',
  component: AgentBlock,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['auto', '390', '320'],
    },
    phoneNumber: { control: 'text' },
    subtitle: { control: 'text' },
    promoCode: { control: 'text' },
    availabilityLabel: { control: 'text' },
  },
  args: {
    variant: 'auto',
    phoneNumber: '855-507-9770',
    subtitle: 'Get EXTRA $200 with code',
    promoCode: 'SLT 200',
    availabilityLabel: '24/7',
  },
} satisfies Meta<typeof AgentBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ResponsiveAuto: Story = {
  name: 'Responsive (Auto)',
};

export const Variant390: Story = {
  name: 'Variant 390',
  args: {
    variant: '390',
  },
};

export const Variant320: Story = {
  name: 'Variant 320',
  args: {
    variant: '320',
  },
};

export const Desktop: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '1024px', display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Tablet: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '768px', display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Mobile: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '320px', display: 'flex', justifyContent: 'center', padding: '16px' }}>
        <Story />
      </div>
    ),
  ],
};
