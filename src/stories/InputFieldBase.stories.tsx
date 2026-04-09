import type { Meta, StoryObj } from '@storybook/react-vite';

import { InputFieldBase } from './InputFieldBase';

const meta = {
  title: 'Base Components/InputFieldBase',
  component: InputFieldBase,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'inline-radio',
      options: ['empty', 'filled', 'semiBold'],
    },
    state: {
      control: 'inline-radio',
      options: ['active', 'hover', 'action', 'disabled'],
    },
  },
  args: {
    label: 'Label',
    value: 'Input Text',
    showIcon: true,
    showClearControl: true,
  },
} satisfies Meta<typeof InputFieldBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyActive: Story = {
  args: {
    type: 'empty',
    state: 'active',
  },
};

export const EmptyHover: Story = {
  args: {
    type: 'empty',
    state: 'hover',
  },
};

export const EmptyAction: Story = {
  args: {
    type: 'empty',
    state: 'action',
  },
};

export const FilledActive: Story = {
  args: {
    type: 'filled',
    state: 'active',
  },
};

export const FilledAction: Story = {
  args: {
    type: 'filled',
    state: 'action',
  },
};

export const SemiBoldActive: Story = {
  args: {
    type: 'semiBold',
    state: 'active',
  },
};

export const SemiBoldDisabled: Story = {
  args: {
    type: 'semiBold',
    state: 'disabled',
  },
};
