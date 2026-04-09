import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Button } from './Button';

const meta = {
  title: 'Base Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Ir6cAfm2NJjVpdSR4tmbc4/-SLT_V3--UI-Kit?node-id=37-268030&t=b7m9j6mSF14QK2cE-4',
    },
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
    iconSize: {
      control: 'inline-radio',
      options: [16, 20, 24],
    },
    children: {
      control: 'text',
    },
  },
  args: {
    children: 'Button',
    iconSize: 20,
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
