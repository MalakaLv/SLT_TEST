import type { CSSProperties, ReactNode } from 'react';

export interface IconContainerProps {
  label: string;
  size: 16 | 20 | 24;
  iconSize?: 16 | 20 | 24;
  children: ReactNode;
}

const cardStyle: CSSProperties = {
  border: '1px solid #d7d7d7',
  background: '#ffffff',
  padding: '12px',
  minHeight: '96px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  boxSizing: 'border-box',
};

const labelStyle: CSSProperties = {
  margin: 0,
  color: '#272727',
  fontSize: '12px',
  fontWeight: 600,
  lineHeight: 1.35,
  textAlign: 'center',
};

const iconWrapStyle: CSSProperties = {
  color: '#272727',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 0,
};

const sizeStyle: CSSProperties = {
  margin: 0,
  color: '#767676',
  fontSize: '10px',
  lineHeight: 1,
};

export const IconContainer = ({ label, size, iconSize = size, children }: IconContainerProps) => {
  const iconContainerSize = iconSize;

  return (
    <div style={cardStyle}>
      <span
        style={{
          ...iconWrapStyle,
          width: `${iconContainerSize}px`,
          height: `${iconContainerSize}px`,
        }}
      >
        {children}
      </span>
      <p style={labelStyle}>{label}</p>
      <p style={sizeStyle}>{size}x{size}</p>
    </div>
  );
};
