import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'ghost'],
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
    },
    fullWidth: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
  },
  args: {
    children: 'Button',
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Get started',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    children: 'Learn more',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'medium',
    children: 'Text action',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Unavailable',
    disabled: true,
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    children: 'Continue',
  },
};

export const Small: Story = {
  args: {
    variant: 'secondary',
    size: 'small',
    children: 'Back',
  },
};

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    fullWidth: true,
    children: 'Create account',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};
