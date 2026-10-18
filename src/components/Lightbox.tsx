import { useCallback, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import type { GalleryImage } from '../data/content';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import styles from './Lightbox.module.css';

interface LightboxProps {
  images: readonly GalleryImage[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}

export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const image = images[index];

  useBodyScrollLock(true);

  const step = useCallback(
    (delta: number) => {
      onNavigate((index + delta + images.length) % images.length);
    },
    [index, images.length, onNavigate],
  );

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight') {
        step(1);
      } else if (event.key === 'ArrowLeft') {
        step(-1);
      } else if (event.key === 'Tab') {
        // Keep focus inside the dialog.
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button');
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose, step]);

  if (!image) return null;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={`${image.caption}, image ${index + 1} of ${images.length}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.dialog} ref={dialogRef}>
        <button type="button" className={styles.close} onClick={onClose} ref={closeRef} aria-label="Close image viewer">
          <X size={22} aria-hidden="true" />
        </button>

        <button
          type="button"
          className={`${styles.nav} ${styles.prev}`}
          onClick={() => step(-1)}
          aria-label="Previous image"
        >
          <ArrowLeft size={20} aria-hidden="true" />
        </button>

        <figure className={styles.figure}>
          <img
            src={image.src}
            srcSet={image.srcSet}
            sizes="(max-width: 900px) 94vw, 78vw"
            width={image.width}
            height={image.height}
            alt={image.alt}
            decoding="async"
          />
          <figcaption className={styles.caption}>
            <span>{image.caption}</span>
            <span className={styles.counter}>
              {index + 1} / {images.length}
            </span>
          </figcaption>
        </figure>

        <button
          type="button"
          className={`${styles.nav} ${styles.next}`}
          onClick={() => step(1)}
          aria-label="Next image"
        >
          <ArrowRight size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
