// url=https://www.figma.com/design/Ir6cAfm2NJjVpdSR4tmbc4/-SLT_V3--UI-Kit?node-id=37-268030&t=b7m9j6mSF14QK2cE-4
// source=src/stories/Button.tsx
// component=Button
import figma from 'figma';

const instance = figma.selectedInstance;

const asStringProp = (value: unknown, fallback: string): string => {
  if (typeof value === 'string') {
    const normalized = value.trim();
    if (
      normalized &&
      normalized.toLowerCase() !== 'error' &&
      normalized.toLowerCase() !== 'undefined' &&
      normalized.toLowerCase() !== 'null'
    ) {
      return normalized;
    }
  }
  return fallback;
};

const asBooleanProp = (value: unknown, fallback = false): boolean => {
  if (value === true || value === false) {
    return value;
  }
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (normalized === 'true') return true;
    if (normalized === 'false') return false;
  }
  return fallback;
};

const accentMap = {
  Primary: 'primary',
  primary: 'primary',
  Secondary: 'secondary',
  secondary: 'secondary',
  Stroke: 'stroke',
  stroke: 'stroke',
  Ghost: 'stroke',
  ghost: 'stroke',
};

const stateMap = {
  Default: 'default',
  default: 'default',
  Hovered: 'hovered',
  hovered: 'hovered',
  Pressed: 'pressed',
  pressed: 'pressed',
  Focused: 'focused',
  focused: 'focused',
  Disabled: 'disabled',
  disabled: 'disabled',
};

const children =
  asStringProp(instance.getString('Text'), '') ||
  asStringProp(instance.getString('Label'), 'Button');
const accentRaw =
  instance.getEnum('Accent', accentMap) ??
  instance.getEnum('Variant', accentMap);
const stateRaw = instance.getEnum('State', stateMap);
const leftIconRaw =
  instance.getBoolean('Left icon') ?? instance.getBoolean('LeftIcon');
const rightIconRaw =
  instance.getBoolean('Right icon') ?? instance.getBoolean('RightIcon');

const accent = asStringProp(accentRaw, 'primary');
const state = asStringProp(stateRaw, 'default');
const leftIcon = asBooleanProp(leftIconRaw, false);
const rightIcon = asBooleanProp(rightIconRaw, false);

export default {
  example: figma.code`
    <Button
      accent="${accent}"
      state="${state}"
      leftIcon={${leftIcon}}
      rightIcon={${rightIcon}}
    >
      ${children}
    </Button>
  `,
  imports: ['import { Button } from "src/stories/Button"'],
  id: 'button',
  metadata: {
    nestable: true,
  },
};
