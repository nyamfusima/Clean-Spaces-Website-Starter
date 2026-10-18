import logoMono from '../assets/branding/web/cleanspaces-logo-mono-charcoal.webp';
import logoPrimary from '../assets/branding/web/cleanspaces-logo-primary.webp';
import logoReversed from '../assets/branding/web/cleanspaces-logo-reversed.webp';
import markMono from '../assets/branding/web/cleanspaces-mark-mono-charcoal.webp';
import markMarble from '../assets/branding/web/cleanspaces-mark.webp';

/** Intrinsic pixel dimensions of the cleaned artwork, used to reserve space. */
const LOCKUP = { width: 816, height: 399 } as const;
const MARK = { width: 282, height: 399 } as const;

/**
 * The three lockups from the Clean Spaces brand sheet:
 * `primary`  marble house + taupe wordmark, for light surfaces
 * `reversed` the original cream-marble artwork, for dark surfaces
 * `mono`     single-colour charcoal, for low-contrast or mono use
 */
export type LogoVariant = 'primary' | 'reversed' | 'mono';

interface LogoProps {
  variant?: LogoVariant;
  /** `lockup` is the full logo; `mark` is the house symbol alone. */
  shape?: 'lockup' | 'mark';
  /** Rendered height in CSS pixels. Width follows the aspect ratio. */
  height?: number;
  className?: string;
  priority?: boolean;
}

const LOCKUPS: Record<LogoVariant, string> = {
  primary: logoPrimary,
  reversed: logoReversed,
  mono: logoMono,
};

const MARKS: Record<LogoVariant, string> = {
  primary: markMarble,
  reversed: markMarble,
  mono: markMono,
};

export function Logo({
  variant = 'primary',
  shape = 'lockup',
  height = 48,
  className,
  priority = false,
}: LogoProps) {
  const intrinsic = shape === 'lockup' ? LOCKUP : MARK;
  const src = shape === 'lockup' ? LOCKUPS[variant] : MARKS[variant];

  return (
    <img
      src={src}
      alt="Clean Spaces"
      width={intrinsic.width}
      height={intrinsic.height}
      className={className}
      decoding="async"
      {...(priority
        ? { loading: 'eager' as const, fetchPriority: 'high' as const }
        : { loading: 'lazy' as const })}
      style={{ height: `${height}px`, width: 'auto' }}
    />
  );
}
