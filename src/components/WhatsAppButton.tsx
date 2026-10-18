import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { useScrolledPast } from '../hooks/useScrolledPast';
import { site, whatsappLink } from '../site.config';
import styles from './WhatsAppButton.module.css';

/** Floating WhatsApp badge, revealed once the visitor is past the hero. */
export function WhatsAppButton() {
  const shown = useScrolledPast(600);

  return (
    <a
      className={styles.button}
      data-shown={shown}
      href={whatsappLink(`Hello ${site.name}, I would like to discuss a project.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat to Clean Spaces on WhatsApp at ${site.phoneDisplay}`}
      title={`WhatsApp ${site.phoneDisplay}`}
      tabIndex={shown ? 0 : -1}
      aria-hidden={!shown}
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
