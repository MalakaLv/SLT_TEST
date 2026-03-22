import type { Meta, StoryObj } from '@storybook/react-vite';

import { IconContainer } from './IconContainer';
import { ICON_DEFINITIONS, iconGridStyle } from './iconDefinitions';

const IconSet20 = () => (
  <div style={iconGridStyle}>
    {ICON_DEFINITIONS.map((icon) => (
      <IconContainer key={icon.label} label={icon.label} size={20}>
        {icon.render(20)}
      </IconContainer>
    ))}
  </div>
);

const meta = {
  title: 'Icon Sets/20x20',
  component: IconSet20,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof IconSet20>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllIcons: Story = {};
