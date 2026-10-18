import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { useScrolledPast } from '../hooks/useScrolledPast';
import { site, whatsappLink } from '../site.config';
import styles from './Header.module.css';

const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Our work' },
  { href: '#about', label: 'About' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolledPast(80);
  const solid = scrolled || open;

  useBodyScrollLock(open);

  // Close the panel on Escape, and when the viewport grows past the breakpoint.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const query = window.matchMedia('(min-width: 961px)');
    const onChange = () => {
      if (query.matches) setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    query.addEventListener('change', onChange);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      query.removeEventListener('change', onChange);
    };
  }, [open]);

  return (
    <header className={styles.header} data-solid={solid} data-open={open}>
      <div className={`container ${styles.inner}`}>
        <a className={styles.brand} href="#top" aria-label="Clean Spaces, home">
          <span className={styles.logoStack}>
            <Logo variant="reversed" height={46} priority className={styles.logoReversed} />
            <Logo variant="primary" height={46} priority className={styles.logoPrimary} />
          </span>
        </a>

        <nav className={styles.nav} aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a key={link.href} className={styles.link} href={link.href}>
              {link.label}
            </a>
          ))}
          <a className={styles.cta} href="#contact">
            Request a quote
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </nav>

        <button
          type="button"
          className={styles.toggle}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <div className={styles.panel} id="mobile-menu">
          <a className={styles.panelLink} href="#top" onClick={() => setOpen(false)}>
            Home
          </a>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              className={styles.panelLink}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a className={styles.panelCta} href="#contact" onClick={() => setOpen(false)}>
            Request a quote
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a
            className={styles.panelWhatsapp}
            href={whatsappLink(`Hello ${site.name}, I would like to discuss a project.`)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            <WhatsAppIcon size={18} />
            WhatsApp {site.phoneDisplay}
          </a>
        </div>
      )}
    </header>
  );
}
