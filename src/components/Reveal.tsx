import type { ElementType, ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';

interface RevealProps {
  children: ReactNode;
  /** Stagger, in milliseconds. */
  delay?: number;
  as?: ElementType;
  className?: string;
  /**
   * Render the children immediately, with no reveal animation. Used where an
   * element can sit outside the viewport horizontally, such as a card in a
   * swipeable rail, which would otherwise stay hidden until it is scrolled to.
   */
  disabled?: boolean;
}

/** Fades and lifts its children into view on first scroll past. */
export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className,
  disabled = false,
}: RevealProps) {
  const { ref, visible } = useReveal<HTMLElement>();

  if (disabled) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag
      ref={ref}
      className={className ? `reveal ${className}` : 'reveal'}
      data-visible={visible}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
