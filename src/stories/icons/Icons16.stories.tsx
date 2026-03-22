import type { Meta, StoryObj } from '@storybook/react-vite';

import { IconContainer } from './IconContainer';
import { ICON_DEFINITIONS, iconGridStyle } from './iconDefinitions';

const IconSet16 = () => (
  <div style={iconGridStyle}>
    {ICON_DEFINITIONS.map((icon) => (
      <IconContainer key={icon.label} label={icon.label} size={16}>
        {icon.render(16)}
      </IconContainer>
    ))}
  </div>
);

const meta = {
  title: 'Icon Sets/16x16',
  component: IconSet16,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof IconSet16>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllIcons: Story = {};
