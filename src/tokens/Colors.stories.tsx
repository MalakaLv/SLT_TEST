import type { Meta, StoryObj } from '@storybook/react-vite';

import './colors.css';

const TOKENS = [{ name: '--slt-black', value: '#272727' }];

const ColorsGallery = () => (
  <div style={{ display: 'grid', gap: '12px', maxWidth: '320px' }}>
    {TOKENS.map((token) => (
      <div
        key={token.name}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '10px 12px',
          border: '1px solid #e5e5e5',
          background: '#ffffff',
        }}
      >
        <span
          style={{
            width: '28px',
            height: '28px',
            backgroundColor: `var(${token.name})`,
            border: '1px solid #d7d7d7',
            display: 'inline-block',
          }}
          aria-hidden="true"
        />
        <div style={{ display: 'grid', gap: '2px' }}>
          <code style={{ fontSize: '13px' }}>{token.name}</code>
          <code style={{ fontSize: '13px', color: '#555555' }}>{token.value}</code>
        </div>
      </div>
    ))}
  </div>
);

const meta = {
  title: 'Tokens/Colors',
  component: ColorsGallery,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ColorsGallery>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllColors: Story = {};
