import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { PhoneInputField } from './PhoneInputField';

const meta = {
  title: 'Components/PhoneInputField',
  component: PhoneInputField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'],
    },
    state: {
      control: 'inline-radio',
      options: ['default', 'hover-left', 'hover-right', 'focused', 'focused-left', 'focused-right', 'filled', 'error', 'success', 'disabled'],
    },
  },
  args: {
    label: 'Phone number*',
    onChange: fn(),
    onCountryChange: fn(),
  },
} satisfies Meta<typeof PhoneInputField>;

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
  args: { theme: 'light', state: 'default' },
};

export const HoverLeft: Story = {
  args: { theme: 'light', state: 'hover-left' },
};

export const HoverRight: Story = {
  args: { theme: 'light', state: 'hover-right' },
};

export const Focused: Story = {
  args: { theme: 'light', state: 'focused', value: '+1' },
};

export const FocusedLeft: Story = {
  args: { state: 'focused-left' },
};

export const FocusedRight: Story = {
  args: { state: 'focused-right' },
};

export const Filled: Story = {
  args: { theme: 'light', state: 'filled', value: '+1 555-507-5551' },
};

export const Error: Story = {
  args: {
    theme: 'light',
    state: 'error',
    value: 'Input Text',
    errorText: 'Please enter the full phone number',
  },
};

export const Success: Story = {
  args: { theme: 'light', state: 'success', value: '+1 555-507-5551' },
};

export const Disabled: Story = {
  args: { theme: 'light', state: 'disabled' },
};

export const DarkDefault: Story = {
  args: { theme: 'dark', state: 'default' },
  decorators: [darkDecorator],
};

export const DarkHover: Story = {
  args: { theme: 'dark', state: 'hover-left' },
  decorators: [darkDecorator],
};

export const DarkHoverRight: Story = {
  args: { theme: 'dark', state: 'hover-right' },
  decorators: [darkDecorator],
};

export const DarkFocused: Story = {
  args: { theme: 'dark', state: 'focused', value: '+1' },
  decorators: [darkDecorator],
};

export const DarkFilled: Story = {
  args: { theme: 'dark', state: 'filled', value: '+1 555-507-5551' },
  decorators: [darkDecorator],
};

export const DarkError: Story = {
  args: {
    theme: 'dark',
    state: 'error',
    value: 'Input Text',
    errorText: 'Please enter the full phone number',
  },
  decorators: [darkDecorator],
};

export const DarkSuccess: Story = {
  args: { theme: 'dark', state: 'success', value: '+1 555-507-5551' },
  decorators: [darkDecorator],
};

export const DarkDisabled: Story = {
  args: { theme: 'dark', state: 'disabled' },
  decorators: [darkDecorator],
};
