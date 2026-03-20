import type { Meta, StoryObj } from '@storybook/react-vite';

import { RequestForms } from './RequestForms';

const meta = {
  title: 'COMPLEX COMPONENTS/RequestForms',
  component: RequestForms,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RequestForms>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
