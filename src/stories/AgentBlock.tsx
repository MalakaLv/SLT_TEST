import type { CSSProperties } from 'react';

import './agent-block.css';

const DEFAULT_AVATAR_SRC = 'https://www.figma.com/api/mcp/asset/29390359-68e0-4717-828c-6bebd53edae4';

type AgentBlockVariant = '390' | '320' | 'auto';

export interface AgentBlockProps {
  variant?: AgentBlockVariant;
  phoneNumber?: string;
  subtitle?: string;
  promoCode?: string;
  availabilityLabel?: string;
  avatarSrc?: string;
  avatarAlt?: string;
  className?: string;
  style?: CSSProperties;
}

export const AgentBlock = ({
  variant = 'auto',
  phoneNumber = '855-507-9770',
  subtitle = 'Get EXTRA $200 with code',
  promoCode = 'SLT 200',
  availabilityLabel = '24/7',
  avatarSrc = DEFAULT_AVATAR_SRC,
  avatarAlt = 'Travel agent portrait',
  className,
  style,
}: AgentBlockProps) => {
  const resolvedVariantClass = variant === 'auto' ? 'agent-block--390' : `agent-block--${variant}`;

  return (
    <div className={['agent-block', resolvedVariantClass, variant === 'auto' ? 'agent-block--auto' : '', className ?? ''].filter(Boolean).join(' ')} style={style}>
      <div className="agent-block__avatar-wrap">
        <img className="agent-block__avatar" src={avatarSrc} alt={avatarAlt} />
        <span className="agent-block__availability">{availabilityLabel}</span>
      </div>

      <div className="agent-block__content">
        <p className="agent-block__phone">{phoneNumber}</p>

        <div className="agent-block__promo-row">
          <p className="agent-block__subtitle">{subtitle}</p>

          <div className="agent-block__promo-pill" aria-label={promoCode}>
            <span className="agent-block__promo-code">{promoCode}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
