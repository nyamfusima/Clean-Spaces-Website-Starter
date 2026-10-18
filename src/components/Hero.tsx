import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { site } from '../site.config';
import styles from './Hero.module.css';

const POSTER = '/images/hero/hero-kitchen-1920.webp';
const POSTER_SRCSET =
  '/images/hero/hero-kitchen-800.webp 800w, /images/hero/hero-kitchen-1280.webp 1280w, /images/hero/hero-kitchen-1920.webp 1920w';

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const smallScreen = useMediaQuery('(max-width: 760px)');

  // The still is always rendered underneath. The video is an enhancement on
  // top of it, so a slow, blocked or missing file simply leaves the still.
  const showVideo = Boolean(site.heroVideo) && !reducedMotion && !smallScreen && !failed;

  useEffect(() => {
    if (!showVideo) return;
    const node = videoRef.current;
    if (!node) return;

    // Autoplay can still be refused; fall back to the still rather than
    // leaving a frozen first frame.
    const attempt = node.play();
    if (attempt && typeof attempt.catch === 'function') {
      attempt.catch(() => setFailed(true));
    }
  }, [showVideo]);

  return (
    <section className={styles.hero} id="top">
      <div className={styles.media}>
        <img
          src={POSTER}
          srcSet={POSTER_SRCSET}
          sizes="100vw"
          width={1920}
          height={1280}
          alt="A contemporary kitchen with full-height oak cabinetry and a black marble island"
          fetchPriority="high"
          decoding="async"
        />

        {showVideo && site.heroVideo && (
          <video
            ref={videoRef}
            className={styles.video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={POSTER}
            aria-hidden="true"
            tabIndex={-1}
            onError={() => setFailed(true)}
          >
            {site.heroVideo.webm && <source src={site.heroVideo.webm} type="video/webm" />}
            <source src={site.heroVideo.mp4} type="video/mp4" />
          </video>
        )}
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={`${styles.eyebrow} ${styles.fade}`} style={{ animationDelay: '120ms' }}>
            Kitchen design and built-in cabinetry
          </p>

          <h1 className={`${styles.title} ${styles.fade}`} style={{ animationDelay: '240ms' }}>
            Beautiful spaces.
            <br />
            <em>Built to last.</em>
          </h1>

          <p className={`${styles.lead} ${styles.fade}`} style={{ animationDelay: '380ms' }}>
            Clean Spaces designs, manufactures and installs kitchens, built-in cabinetry and
            interiors. Every layout is planned around how you live, and detailed to stay beautiful
            for years.
          </p>

          <div className={`${styles.actions} ${styles.fade}`} style={{ animationDelay: '520ms' }}>
            <a className={styles.primary} href="#contact">
              Request a quote
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a className={styles.secondary} href="#projects">
              See our work
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <span className={styles.scrollCue} aria-hidden="true">
        Scroll
        <ArrowDown size={15} />
      </span>
    </section>
  );
}
