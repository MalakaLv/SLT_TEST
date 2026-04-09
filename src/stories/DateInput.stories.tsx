import type { Meta, StoryObj } from '@storybook/react-vite';

import { DateInput } from './DateInput';

const meta = {
  title: 'Base Components/Date input',
  component: DateInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'inline-radio',
      options: ['two-field', 'single-field'],
    },
    state: {
      control: 'inline-radio',
      options: ['default', 'hover', 'focused', 'pressed', 'error', 'disabled'],
    },
    background: {
      control: 'inline-radio',
      options: ['light', 'dark'],
    },
  },
  args: {
    mode: 'two-field',
    state: 'default',
    background: 'light',
    defaultDepartureValue: '',
    defaultReturnValue: '',
    defaultSingleValue: '',
  },
} satisfies Meta<typeof DateInput>;

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

export const TwoFieldLight: Story = {
  args: {
    mode: 'two-field',
    background: 'light',
  },
};

export const SingleFieldLight: Story = {
  args: {
    mode: 'single-field',
    state: 'default',
    background: 'light',
    singleLabel: 'Departure Date',
  },
};

export const HoverLight: Story = {
  args: {
    mode: 'single-field',
    state: 'hover',
    background: 'light',
  },
};

export const FocusedLight: Story = {
  args: {
    mode: 'single-field',
    state: 'focused',
    background: 'light',
  },
};

export const PressedLight: Story = {
  args: {
    mode: 'single-field',
    state: 'pressed',
    background: 'light',
  },
};

export const ErrorLight: Story = {
  args: {
    mode: 'single-field',
    state: 'error',
    background: 'light',
  },
};

export const DisabledLight: Story = {
  args: {
    mode: 'single-field',
    state: 'disabled',
    background: 'light',
  },
};

export const TwoFieldDark: Story = {
  args: {
    mode: 'two-field',
    background: 'dark',
  },
  decorators: [darkDecorator],
};

export const SingleFieldDark: Story = {
  args: {
    mode: 'single-field',
    state: 'default',
    background: 'dark',
    singleLabel: 'Departure Date',
  },
  decorators: [darkDecorator],
};

export const HoverDark: Story = {
  args: {
    mode: 'single-field',
    state: 'hover',
    background: 'dark',
  },
  decorators: [darkDecorator],
};

export const FocusedDark: Story = {
  args: {
    mode: 'single-field',
    state: 'focused',
    background: 'dark',
  },
  decorators: [darkDecorator],
};

export const PressedDark: Story = {
  args: {
    mode: 'single-field',
    state: 'pressed',
    background: 'dark',
  },
  decorators: [darkDecorator],
};

export const ErrorDark: Story = {
  args: {
    mode: 'single-field',
    state: 'error',
    background: 'dark',
  },
  decorators: [darkDecorator],
};

export const DisabledDark: Story = {
  args: {
    mode: 'single-field',
    state: 'disabled',
    background: 'dark',
  },
  decorators: [darkDecorator],
};
