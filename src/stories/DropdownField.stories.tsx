import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { DropdownField } from './DropdownField';

const meta = {
  title: 'Components/DropdownField',
  component: DropdownField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'],
    },
    visualState: {
      control: 'inline-radio',
      options: ['enabled', 'hover', 'open', 'disabled'],
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof DropdownField>;

export default meta;

type Story = StoryObj<typeof meta>;

const darkDecorator = (StoryComponent: () => React.JSX.Element) => (
  <div
    style={{
      padding: '24px',
      background: 'linear-gradient(90deg, #1f1f1f 0%, #2e2e2e 100%)',
    }}
  >
    <StoryComponent />
  </div>
);

export const Default: Story = {
  args: {
    theme: 'light',
    visualState: 'enabled',
  },
};

export const Open: Story = {
  args: {
    theme: 'light',
    visualState: 'open',
    initialOpen: true,
  },
};

export const WithSelectedValue: Story = {
  args: {
    theme: 'light',
    value: 'multi-city',
    visualState: 'enabled',
  },
};

export const Disabled: Story = {
  args: {
    theme: 'light',
    disabled: true,
    visualState: 'disabled',
  },
};

export const DarkDefault: Story = {
  args: {
    theme: 'dark',
    visualState: 'enabled',
  },
  decorators: [darkDecorator],
};

export const DarkOpen: Story = {
  args: {
    theme: 'dark',
    visualState: 'open',
    initialOpen: true,
  },
  decorators: [darkDecorator],
};

export const DarkWithSelectedValue: Story = {
  args: {
    theme: 'dark',
    value: 'multi-city',
    visualState: 'enabled',
  },
  decorators: [darkDecorator],
};

export const DarkDisabled: Story = {
  args: {
    theme: 'dark',
    disabled: true,
    visualState: 'disabled',
  },
  decorators: [darkDecorator],
};
