import type { Meta, StoryObj } from '@storybook/react-vite';

import { InputField } from './InputField';

const meta = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'inline-radio',
      options: ['default', 'hover', 'focused', 'filled', 'error', 'disabled'],
    },
    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'],
    },
    size: {
      control: 'inline-radio',
      options: [48, 60],
    },
    iconSize: {
      control: 'inline-radio',
      options: [16, 20, 24],
    },
    inputText: {
      control: 'text',
    },
  },
  args: {
    size: 48,
    iconSize: 24,
    inputText: 'Input Text',
    label: 'Label',
    errorText: 'Please enter your email address',
  },
} satisfies Meta<typeof InputField>;

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

export const DefaultLight: Story = {
  args: {
    theme: 'light',
    state: 'default',
  },
};

export const FocusedLight: Story = {
  args: {
    theme: 'light',
    state: 'focused',
  },
};

export const Focused: Story = {
  args: {
    theme: 'light',
    state: 'focused',
  },
};

export const Hovered: Story = {
  args: {
    theme: 'light',
    state: 'hover',
  },
};

export const FilledLight: Story = {
  args: {
    state: 'filled',
    theme: 'light',
    inputText: 'Input Text',
    value: 'Input Text',
  },
};

export const ErrorLight: Story = {
  args: {
    theme: 'light',
    state: 'error',
  },
};

export const DisabledLight: Story = {
  args: {
    theme: 'light',
    state: 'disabled',
  },
};

export const DefaultDark: Story = {
  args: {
    theme: 'dark',
    state: 'default',
  },
  decorators: [darkDecorator],
};

export const FocusedDark: Story = {
  args: {
    theme: 'dark',
    state: 'focused',
  },
  decorators: [darkDecorator],
};

export const FilledDark: Story = {
  args: {
    theme: 'dark',
    state: 'filled',
  },
  decorators: [darkDecorator],
};

export const ErrorDark: Story = {
  args: {
    theme: 'dark',
    state: 'error',
  },
  decorators: [darkDecorator],
};

export const DisabledDark: Story = {
  args: {
    theme: 'dark',
    state: 'disabled',
  },
  decorators: [darkDecorator],
};
