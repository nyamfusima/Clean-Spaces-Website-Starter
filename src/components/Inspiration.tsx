import { Reveal } from './Reveal';
import { inspiration } from '../data/content';
import styles from './Inspiration.module.css';

export function Inspiration() {
  return (
    <section className={`section ${styles.inspiration}`} id="inspiration">
      <div className="container">
        <Reveal>
          <div className={styles.intro}>
            <p className="eyebrow">Style directions</p>
            <h2 className={styles.heading}>
              Finishes worth <em>talking through.</em>
            </h2>
            <p className={styles.lede}>
              A starting point for conversations about tone, texture and material. Bring us the
              combinations that feel like your home, and we will work out what they cost to build.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div
            className={styles.rail}
            role="region"
            aria-label="Kitchen style and material references, scroll horizontally"
            tabIndex={0}
          >
            {inspiration.map((image) => (
              <figure className={styles.tile} key={image.id}>
                <div className={styles.frame}>
                  <img
                    src={image.src}
                    srcSet={image.srcSet}
                    sizes="(max-width: 760px) 60vw, 26vw"
                    width={image.width}
                    height={image.height}
                    alt={image.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <figcaption className={styles.caption}>{image.caption}</figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
