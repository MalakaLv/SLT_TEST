import type { Meta, StoryObj } from '@storybook/react-vite';

import { DestinationItem } from './DestinationItem';

const meta = {
  title: 'Base Components/Destination Item',
  component: DestinationItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DestinationItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Enabled: Story = {
  args: {
    state: 'enabled',
    title: 'Paris',
    subtitle: 'All locations in this city',
    code: 'PAR',
  },
};

export const Hover: Story = {
  args: {
    state: 'hover',
    title: 'Paris',
    subtitle: 'All locations in this city',
    code: 'PAR',
  },
};

export const TextHighlight: Story = {
  args: {
    state: 'txt-highlight',
    title: 'Paris',
    subtitle: 'All locations in this city',
    code: 'PAR',
    highlightCount: 3,
  },
};

