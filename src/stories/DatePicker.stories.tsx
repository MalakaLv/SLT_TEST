import type { Meta, StoryObj } from '@storybook/react-vite';

import { DatePicker } from './DatePicker';

const meta = {
  title: 'Base Components/Date picker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TwoMonths: Story = {
  name: 'Date picker / Two Months',
  render: () => (
    <DatePicker
      mode="range"
      monthsToShow={2}
      density="default"
      initialVisibleMonth={new Date(2025, 2, 1)}
      defaultRange={{
        start: new Date(2025, 2, 6),
        end: new Date(2025, 2, 16),
      }}
    />
  ),
};

export const CompactOneMonth: Story = {
  name: 'Date picker / Compact One Month',
  render: () => (
    <DatePicker
      mode="single"
      monthsToShow={1}
      density="compact"
      initialVisibleMonth={new Date(2025, 2, 1)}
      defaultSelectedDate={new Date(2025, 2, 6)}
    />
  ),
};
