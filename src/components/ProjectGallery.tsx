import { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { Lightbox } from './Lightbox';
import { Reveal } from './Reveal';
import { projects } from '../data/content';
import type { GalleryImage } from '../data/content';
import styles from './ProjectGallery.module.css';

/**
 * Tile spans, in render order. The six photographs fill a 3x3 grid exactly,
 * so the DOM order matches the visual order and keyboard tabbing stays sane.
 */
const LAYOUT: ReadonlyArray<{ id: string; span?: 'wide' | 'tall' }> = [
  { id: 'island-view', span: 'tall' },
  { id: 'cabinetry-elevation', span: 'wide' },
  { id: 'cabinetry-run' },
  { id: 'tall-units' },
  { id: 'galley-pano', span: 'wide' },
  { id: 'oak-shelving' },
];

const byId = new Map(projects.map((project) => [project.id, project]));

const photographs: GalleryImage[] = LAYOUT.map((item) => byId.get(item.id)).filter(
  (item): item is GalleryImage => item !== undefined,
);

const renders: GalleryImage[] = projects.filter((project) => project.kind === 'render');

/** One flat list so the lightbox can page through everything. */
const all: GalleryImage[] = [...photographs, ...renders];

export function ProjectGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={`section ${styles.projects}`} id="projects">
      <div className="container">
        <Reveal>
          <div className={styles.intro}>
            <p className="eyebrow">Our work</p>
            <h2 className={styles.heading}>
              Kitchens we have <em>designed and built.</em>
            </h2>
            <p className={styles.lede}>
              Photographs from completed Clean Spaces installations. Select any image to see it
              larger.
            </p>
          </div>
        </Reveal>

        <div className={styles.grid}>
          {LAYOUT.map((item, index) => {
            const image = byId.get(item.id);
            if (!image) return null;
            const spanClass = item.span ? styles[item.span] : '';

            return (
              <Reveal key={image.id} className={spanClass} delay={index * 70}>
                <button
                  type="button"
                  className={styles.tile}
                  onClick={() => setOpenIndex(index)}
                  aria-label={`View larger: ${image.caption}`}
                >
                  <img
                    src={image.src}
                    srcSet={image.srcSet}
                    sizes="(max-width: 620px) 92vw, (max-width: 1000px) 48vw, 32vw"
                    width={image.width}
                    height={image.height}
                    alt={image.alt}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className={styles.caption}>
                    <span className={styles.captionText}>{image.caption}</span>
                    <Maximize2 size={16} className={styles.zoom} aria-hidden="true" />
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className={styles.renders}>
            <div className={styles.rendersHead}>
              <h3 className={styles.rendersTitle}>Design visualisations</h3>
              <p className={styles.rendersNote}>
                Renders produced for a client during the design stage, so the kitchen could be seen
                and adjusted before anything was built.
              </p>
            </div>
            <div className={styles.rendersGrid}>
              {renders.map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  className={styles.renderTile}
                  onClick={() => setOpenIndex(photographs.length + index)}
                  aria-label={`View larger: ${image.caption}`}
                >
                  <img
                    src={image.src}
                    width={image.width}
                    height={image.height}
                    alt={image.alt}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className={styles.renderLabel}>Render</span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {openIndex !== null && (
        <Lightbox
          images={all}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </section>
  );
}
