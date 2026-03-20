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

const darkDecorator = (Story: () => React.JSX.Element) => (
  <div
    style={{
      background: '#272727',
      padding: '40px',
      width: '100vw',
      minHeight: '300px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '-16px',
    }}
  >
    <Story />
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
