import { Phone } from 'lucide-react';
import { Logo } from './Logo';
import { TikTokIcon } from './icons/TikTokIcon';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { site, whatsappLink } from '../site.config';
import styles from './Footer.module.css';

const LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Our work' },
  { href: '#videos', label: 'Project videos' },
  { href: '#about', label: 'About' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Request a quote' },
] as const;

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brandBlock}>
            <a href="#top" aria-label="Clean Spaces, back to top">
              <Logo variant="reversed" height={58} />
            </a>
            <p className={styles.tagline}>{site.tagline}</p>
            <p className={styles.blurb}>
              Kitchen design, built-in cabinetry, renovations and installation. Drawn, built and
              fitted by one team.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className={styles.colTitle}>Explore</h2>
            <ul className={styles.list}>
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={styles.colTitle}>Get in touch</h2>
            <ul className={styles.list}>
              <li>
                <a
                  className={styles.withIcon}
                  href={whatsappLink(`Hello ${site.name}, I would like to discuss a project.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon size={16} />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a className={styles.withIcon} href={`tel:${site.phoneHref}`}>
                  <Phone size={15} strokeWidth={1.6} aria-hidden="true" />
                  {site.phoneDisplay}
                </a>
              </li>
              {site.emailConfirmed ? (
                <li>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
              ) : (
                <li>
                  <span className={styles.pending}>Email to be confirmed</span>
                </li>
              )}
              {site.serviceArea && (
                <li>
                  <span>{site.serviceArea}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          {site.tiktok && (
            <a
              className={styles.credit}
              href={site.tiktok.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <TikTokIcon size={14} />
              {site.tiktok.handle}
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
