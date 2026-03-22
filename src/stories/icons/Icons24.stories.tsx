import type { Meta, StoryObj } from '@storybook/react-vite';

import { IconContainer } from './IconContainer';
import { ICON_DEFINITIONS, iconGridStyle } from './iconDefinitions';

const IconSet24 = () => (
  <div style={iconGridStyle}>
    {ICON_DEFINITIONS.map((icon) => (
      <IconContainer key={icon.label} label={icon.label} size={24}>
        {icon.render(24)}
      </IconContainer>
    ))}
  </div>
);

const meta = {
  title: 'Icon Sets/24x24',
  component: IconSet24,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof IconSet24>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllIcons: Story = {};
