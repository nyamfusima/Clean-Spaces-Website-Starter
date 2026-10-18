import { useState } from 'react';
import { Play } from 'lucide-react';
import { Reveal } from './Reveal';
import { TikTokIcon } from './icons/TikTokIcon';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { projectVideos } from '../data/content';
import { site } from '../site.config';
import styles from './ProjectVideos.module.css';

/**
 * Each card is a poster facade. The official TikTok player is only mounted
 * after the visitor asks for it, so the page never loads six embeds up front.
 */
export function ProjectVideos() {
  const [playing, setPlaying] = useState<string | null>(null);
  // Below this width the grid becomes a horizontal rail, which needs to be
  // announced and reachable by keyboard.
  const isRail = useMediaQuery('(max-width: 700px)');

  if (projectVideos.length === 0) return null;

  return (
    <section className={`section ${styles.videos}`} id="videos">
      <div className="container">
        <Reveal>
          <div className={styles.intro}>
            <p className="eyebrow">On site</p>
            <h2 className={styles.heading}>
              Walk through <em>finished kitchens.</em>
            </h2>
            <p className={styles.lede}>
              Short clips filmed on our own installations, posted as each project is handed over.
            </p>
            {site.tiktok && (
              <a
                className={styles.follow}
                href={site.tiktok.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TikTokIcon size={16} />
                Follow {site.tiktok.handle} on TikTok
              </a>
            )}
          </div>
        </Reveal>

        <div
          className={styles.grid}
          {...(isRail
            ? {
                role: 'region' as const,
                'aria-label': 'Project videos, swipe horizontally',
                tabIndex: 0,
              }
            : {})}
        >
          {projectVideos.map((video, index) => {
            const isPlaying = playing === video.id;
            return (
              <Reveal key={video.id} delay={(index % 3) * 90} disabled={isRail}>
                <article className={styles.card}>
                  {isPlaying ? (
                    <iframe
                      className={styles.frame}
                      src={`https://www.tiktok.com/embed/v2/${video.id}`}
                      title={video.caption}
                      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  ) : (
                    <button
                      type="button"
                      className={styles.facade}
                      onClick={() => setPlaying(video.id)}
                      aria-label={`Play video: ${video.caption}`}
                    >
                      <img
                        src={video.poster}
                        srcSet={video.posterSrcSet}
                        sizes="(max-width: 560px) 86vw, (max-width: 1000px) 44vw, 29vw"
                        width={640}
                        height={1138}
                        alt={video.alt}
                        loading="lazy"
                        decoding="async"
                      />
                      <span className={styles.veil} aria-hidden="true" />
                      <span className={styles.play} aria-hidden="true">
                        <Play size={18} fill="currentColor" strokeWidth={0} />
                      </span>
                    </button>
                  )}

                  <div className={styles.body}>
                    <h3 className={styles.caption}>{video.caption}</h3>
                    <div className={styles.meta}>
                      <span>{video.project ?? 'Clean Spaces'}</span>
                      <a
                        className={styles.source}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <TikTokIcon size={13} />
                        Watch on TikTok
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
