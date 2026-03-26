import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';

import './standard-list.css';

export type StandardListState = 'default' | 'hover' | 'open' | 'disabled';

type RenderTriggerArgs<T> = {
  open: boolean;
  selectedOption: T | undefined;
  stateClass: StandardListState;
  menuControls: {
    openMenu: () => void;
    closeMenu: () => void;
    toggleMenu: () => void;
  };
  triggerProps: {
    type: 'button';
    disabled: boolean;
    'aria-expanded': boolean;
    'aria-haspopup': 'listbox';
    'aria-controls': string;
    'aria-label'?: string;
    onClick: () => void;
    onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  };
};

type RenderOptionArgs<T> = {
  option: T;
  isSelected: boolean;
  isActive: boolean;
};

export interface StandardListProps<T> {
  options: T[];
  getOptionValue: (option: T) => string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, option: T) => void;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  theme?: 'light' | 'dark';
  visualState?: StandardListState;
  initialOpen?: boolean;
  className?: string;
  menuClassName?: string;
  optionsClassName?: string;
  optionClassName?: string;
  optionActiveClassName?: string;
  optionSelectedClassName?: string;
  ariaLabel?: string;
  renderTrigger: (args: RenderTriggerArgs<T>) => ReactNode;
  renderOption: (args: RenderOptionArgs<T>) => ReactNode;
  renderMenuHeader?: () => ReactNode;
}

export const StandardList = <T,>({
  options,
  getOptionValue,
  value,
  defaultValue,
  onChange,
  onOpenChange,
  disabled = false,
  theme = 'light',
  visualState,
  initialOpen = false,
  className,
  menuClassName,
  optionsClassName,
  optionClassName,
  optionActiveClassName,
  optionSelectedClassName,
  ariaLabel,
  renderTrigger,
  renderOption,
  renderMenuHeader,
}: StandardListProps<T>) => {
  const listboxId = useMemo(() => `standard-list-${Math.random().toString(36).slice(2, 10)}`, []);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const resolvedVisualState: StandardListState = visualState ?? 'default';
  const [open, setOpen] = useState(initialOpen || resolvedVisualState === 'open');
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isHovered, setIsHovered] = useState(false);
  const [menuStyle, setMenuStyle] = useState<CSSProperties | undefined>(undefined);

  const selectedValue = isControlled ? value : uncontrolledValue;
  const selectedIndex = useMemo(
    () => options.findIndex((option) => getOptionValue(option) === selectedValue),
    [getOptionValue, options, selectedValue],
  );
  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : options[0];

  const hasExplicitState = visualState !== undefined;
  const visualDisabled = disabled || resolvedVisualState === 'disabled';
  const effectiveOpen = visualDisabled ? false : resolvedVisualState === 'open' ? true : open;
  const stateClass: StandardListState = visualDisabled
    ? 'disabled'
    : effectiveOpen
      ? 'open'
      : hasExplicitState
        ? resolvedVisualState
        : isHovered
          ? 'hover'
          : 'default';

  const canInteractiveToggle = !visualDisabled && !hasExplicitState;

  useEffect(() => {
    if (!effectiveOpen) {
      setActiveIndex(-1);
      return;
    }
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
  }, [effectiveOpen, selectedIndex]);

  useEffect(() => {
    if (!effectiveOpen || !canInteractiveToggle) {
      return;
    }
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!rootRef.current?.contains(target)) {
        setOpen(false);
        onOpenChange?.(false);
      }
    };
    window.addEventListener('pointerdown', onPointerDown);
    return () => window.removeEventListener('pointerdown', onPointerDown);
  }, [canInteractiveToggle, effectiveOpen, onOpenChange]);

  useEffect(() => {
    if (!effectiveOpen) {
      setMenuStyle(undefined);
      return;
    }

    const viewportPadding = 8;

    const updateMenuBounds = () => {
      const menu = menuRef.current;
      const root = rootRef.current;
      if (!menu) {
        return;
      }

      const nextBaseStyle: CSSProperties = {
        maxWidth: `calc(100vw - ${viewportPadding * 2}px)`,
      };

      setMenuStyle(nextBaseStyle);

      requestAnimationFrame(() => {
        const rect = menu.getBoundingClientRect();
        const formContainer = root?.closest('.request-forms') as HTMLElement | null;
        const boundaryRect = formContainer?.getBoundingClientRect();

        const boundaryLeft = Math.max(viewportPadding, boundaryRect?.left ?? viewportPadding);
        const boundaryRight = Math.min(window.innerWidth - viewportPadding, boundaryRect?.right ?? window.innerWidth - viewportPadding);

        const boundaryWidth = Math.max(0, boundaryRight - boundaryLeft);
        let shiftX = 0;

        if (rect.width > boundaryWidth && boundaryWidth > 0) {
          const width = Math.floor(boundaryWidth);
          setMenuStyle({
            ...nextBaseStyle,
            width: `${width}px`,
            minWidth: `${width}px`,
            maxWidth: `${width}px`,
          });
          return;
        }

        if (rect.right > boundaryRight) {
          shiftX = boundaryRight - rect.right;
        }

        if (rect.left + shiftX < boundaryLeft) {
          shiftX += boundaryLeft - (rect.left + shiftX);
        }

        setMenuStyle({
          ...nextBaseStyle,
          transform: `translateX(${Math.round(shiftX)}px)`,
        });
      });
    };

    updateMenuBounds();
    window.addEventListener('resize', updateMenuBounds);
    window.addEventListener('scroll', updateMenuBounds, true);

    return () => {
      window.removeEventListener('resize', updateMenuBounds);
      window.removeEventListener('scroll', updateMenuBounds, true);
    };
  }, [effectiveOpen]);

  const updateOpen = (nextOpen: boolean) => {
    if (!canInteractiveToggle) {
      onOpenChange?.(nextOpen);
      return;
    }
    setOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  const selectAt = (index: number) => {
    const option = options[index];
    if (!option) {
      return;
    }
    const nextValue = getOptionValue(option);
    if (!isControlled) {
      setUncontrolledValue(nextValue);
    }
    onChange?.(nextValue, option);
    updateOpen(false);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (visualDisabled) {
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!effectiveOpen) {
        updateOpen(true);
        return;
      }
      setActiveIndex((prev) => {
        const base = prev < 0 ? selectedIndex : prev;
        return Math.min(options.length - 1, base + 1);
      });
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!effectiveOpen) {
        updateOpen(true);
        return;
      }
      setActiveIndex((prev) => {
        const base = prev < 0 ? selectedIndex : prev;
        return Math.max(0, base - 1);
      });
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      if (!effectiveOpen) {
        updateOpen(true);
        return;
      }
      const targetIndex = activeIndex >= 0 ? activeIndex : selectedIndex;
      if (targetIndex >= 0) {
        selectAt(targetIndex);
      }
      return;
    }
    if (event.key === 'Escape' && effectiveOpen) {
      event.preventDefault();
      updateOpen(false);
    }
  };

  return (
    <div
      ref={rootRef}
      className={['standard-list', `standard-list--${theme}`, className ?? ''].filter(Boolean).join(' ')}
      onMouseEnter={() => {
        if (!hasExplicitState && !visualDisabled) {
          setIsHovered(true);
        }
      }}
      onMouseLeave={() => {
        if (!hasExplicitState && !visualDisabled) {
          setIsHovered(false);
        }
      }}
    >
      {renderTrigger({
        open: effectiveOpen,
        selectedOption,
        stateClass,
        menuControls: {
          openMenu: () => updateOpen(true),
          closeMenu: () => updateOpen(false),
          toggleMenu: () => updateOpen(!effectiveOpen),
        },
        triggerProps: {
          type: 'button',
          disabled: visualDisabled,
          'aria-expanded': effectiveOpen,
          'aria-haspopup': 'listbox',
          'aria-controls': listboxId,
          'aria-label': ariaLabel,
          onClick: () => updateOpen(!effectiveOpen),
          onKeyDown,
        },
      })}

      {effectiveOpen ? (
        <div
          id={listboxId}
          role="listbox"
          ref={menuRef}
          style={menuStyle}
          className={['standard-list__menu', menuClassName ?? ''].filter(Boolean).join(' ')}
        >
          {renderMenuHeader ? renderMenuHeader() : null}
          <div className={['standard-list__options', optionsClassName ?? ''].filter(Boolean).join(' ')}>
            {options.map((option, index) => {
              const isSelected = getOptionValue(option) === getOptionValue(selectedOption as T);
              const isActive = index === activeIndex;
              return (
                <button
                  key={`${getOptionValue(option)}-${index}`}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={[
                    'standard-list__option',
                    optionClassName ?? '',
                    isSelected ? `standard-list__option--selected ${optionSelectedClassName ?? ''}` : '',
                    isActive ? `standard-list__option--active ${optionActiveClassName ?? ''}` : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => selectAt(index)}
                >
                  {renderOption({ option, isSelected, isActive })}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};
