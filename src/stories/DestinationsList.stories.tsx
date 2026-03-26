import type { Meta, StoryObj } from '@storybook/react-vite';

import { DestinationsList } from './DestinationsList';

const meta = {
  title: 'Components/Destinations List',
  component: DestinationsList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DestinationsList>;

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

export const LightDefault: Story = {
  args: {
    theme: 'light',
  },
};

export const LightSearchParis: Story = {
  args: {
    theme: 'light',
    defaultQuery: 'par',
  },
};

export const DarkDefault: Story = {
  args: {
    theme: 'dark',
  },
  decorators: [darkDecorator],
};

export const DarkSearchParis: Story = {
  args: {
    theme: 'dark',
    defaultQuery: 'par',
  },
  decorators: [darkDecorator],
};

