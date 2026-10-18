import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { site } from '../site.config';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Last-resort fallback. If a section throws, the visitor still sees the
 * business name and a way to make contact rather than a blank page.
 */
export class ErrorBoundary extends Component<Props, State> {
  override state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Clean Spaces site error:', error, info.componentStack);
  }

  override render(): ReactNode {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        style={{
          minHeight: '100svh',
          display: 'grid',
          placeItems: 'center',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem' }}>{site.name}</h1>
          <p style={{ margin: '1rem 0', color: 'var(--muted)' }}>
            Something went wrong loading this page. Please reload, or reach us directly.
          </p>
          <a
            href={`https://wa.me/${site.whatsappNumber}`}
            style={{
              display: 'inline-block',
              padding: '0.9rem 1.5rem',
              background: 'var(--charcoal)',
              color: 'var(--white)',
              fontWeight: 600,
            }}
          >
            WhatsApp {site.phoneDisplay}
          </a>
        </div>
      </div>
    );
  }
}
