import type { Meta, StoryObj } from '@storybook/react-vite';

import { DropdownButton } from './DropdownButton';

const meta = {
  title: 'Complex Components/Dropdown Button',
  component: DropdownButton,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '400px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['text-only', 'info'],
    },
    listType: {
      control: {
        type: 'inline-radio',
        labels: {
          standard: 'Standard List',
          'additional-info': 'Additional Info List',
        },
      },
      options: ['standard', 'additional-info'],
    },
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
    theme: 'light',
    listType: 'standard',
  },
} satisfies Meta<typeof DropdownButton>;

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

export const TextOnly: Story = {
  args: {
    variant: 'text-only',
    defaultValue: 'round-trip',
    visualState: 'enabled',
  },
};

export const TextOnlyOpen: Story = {
  args: {
    variant: 'text-only',
    defaultValue: 'round-trip',
    visualState: 'open',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    listType: 'additional-info',
    visualState: 'enabled',
  },
};

export const InfoOpen: Story = {
  args: {
    variant: 'info',
    listType: 'additional-info',
    visualState: 'open',
  },
};

export const DarkInfo: Story = {
  args: {
    variant: 'info',
    listType: 'additional-info',
    theme: 'dark',
    visualState: 'enabled',
  },
  decorators: [darkDecorator],
};
